# Copyright Alejandro Martínez Corriá and the Thinkube contributors
# SPDX-License-Identifier: Apache-2.0
"""Generate the Thinkube logo SVGs from geometric rules.

Writes tk_logo.svg (icon), tk_text_logo.svg (wordmark) and tk_full_logo.svg
(icon over wordmark) into public/icons/. Other repositories copy these files.

The icon is a house outline around a hexagon with a chip cut out of it.
Every measure below is in logo units (1 unit = 1pt at the default size).

Rules:
  - House line 20 thick; chip ring and pins 14 thick.
  - One outer corner radius (14) for house, hexagon and chip ring;
    inner corners are concentric (outer radius minus thickness, never below 0).
  - All line ends are round.
  - Regular hexagon; everything symmetric about the vertical centre line.
  - Wordmark is Poppins SemiBold (600) converted to outlines.

The files are one colour. Web pages tint them with a CSS mask (TkBrandIcon);
a program that needs a file in another colour gets one from --color.

Usage: python3 brand/build_logo.py [--color #rrggbb] [--out DIR]
Requires fontTools.
"""
import argparse
import math
import os

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.ttLib import TTFont

COLOR = "#006680"

# Icon geometry
ICON_W, ICON_H = 336.0, 308.0
CX = ICON_W / 2
HOUSE_T = 20.0            # house line thickness
CORNER_R = 14.0           # outer corner radius used everywhere
ROOF_DEG = 32.65          # roof slope from horizontal
HOUSE_HALF_W = ICON_W / 2 - HOUSE_T / 2   # wall centre lines
HOUSE_BOTTOM = ICON_H - HOUSE_T / 2       # floor centre line
FOOT_END = 86.0           # distance of each foot's centre-line end from CX
HEX_CY = 183.6
HEX_R = 117.0             # circumradius (centre to vertex)
CHIP_HALF = 50.0          # half size of the ring's outer square
CHIP_T = 14.0             # ring and pin thickness
PIN_LEN = 30.0            # pin length beyond the ring, including the round tip

# Wordmark layout (full logo): word width, word height, gap under the icon
WORD_H = 80.8
WORD_TRACKING = -0.0125   # em
FULL_GAP = 34.0


def fmt(v):
    s = f"{v:.2f}".rstrip("0").rstrip(".")
    return "0" if s == "-0" else s


def pt(p):
    return f"{fmt(p[0])} {fmt(p[1])}"


def rounded(points, r, closed):
    """SVG path through points with each corner rounded to radius r (arcs tangent to both sides)."""
    n = len(points)
    corners = range(n) if closed else range(1, n - 1)
    segs = []
    for i in corners:
        a, p, b = points[i - 1], points[i], points[(i + 1) % n]
        u = ((a[0] - p[0]), (a[1] - p[1]))
        v = ((b[0] - p[0]), (b[1] - p[1]))
        lu, lv = math.hypot(*u), math.hypot(*v)
        u, v = (u[0] / lu, u[1] / lu), (v[0] / lv, v[1] / lv)
        phi = math.acos(max(-1.0, min(1.0, u[0] * v[0] + u[1] * v[1])))
        d = r / math.tan(phi / 2)
        t1 = (p[0] + u[0] * d, p[1] + u[1] * d)
        t2 = (p[0] + v[0] * d, p[1] + v[1] * d)
        # Clockwise turn on screen (y down) needs sweep flag 1.
        cross = (p[0] - a[0]) * (b[1] - p[1]) - (p[1] - a[1]) * (b[0] - p[0])
        segs.append((t1, t2, 1 if cross > 0 else 0))
    if closed:
        out = [f"M{pt(segs[-1][1])}"]
    else:
        out = [f"M{pt(points[0])}"]
    for t1, t2, sweep in segs:
        out.append(f"L{pt(t1)}A{fmt(r)} {fmt(r)} 0 0 {sweep} {pt(t2)}")
    out.append("Z" if closed else f"L{pt(points[-1])}")
    return "".join(out)


def house_path(ox, oy):
    th = math.radians(ROOF_DEG)
    # Apex centre-line height chosen so the outer edge of the rounded apex touches y=0:
    # the arc centre sits rc/sin(half) below the vertex, its top rc above the centre.
    half = math.radians(180 - 2 * ROOF_DEG) / 2
    rc = CORNER_R - HOUSE_T / 2
    ya = oy + HOUSE_T / 2 + rc - rc / math.sin(half)
    eave_y = ya + HOUSE_HALF_W * math.tan(th)
    cx = ox + CX
    yb = oy + HOUSE_BOTTOM
    pts = [(cx - FOOT_END, yb), (cx - HOUSE_HALF_W, yb), (cx - HOUSE_HALF_W, eave_y), (cx, ya),
           (cx + HOUSE_HALF_W, eave_y), (cx + HOUSE_HALF_W, yb), (cx + FOOT_END, yb)]
    return rounded(pts, rc, closed=False)


def hex_path(ox, oy):
    cx, cy = ox + CX, oy + HEX_CY
    pts = [(cx + HEX_R * math.cos(math.radians(-90 + 60 * i)),
            cy + HEX_R * math.sin(math.radians(-90 + 60 * i))) for i in range(6)]
    return rounded(pts, CORNER_R, closed=True)


def chip_hole_path(ox, oy):
    """Outline of the ring's outer square joined with the four pins (the cut-out)."""
    cx, cy = ox + CX, oy + HEX_CY
    a, w, r = CHIP_HALF, CHIP_T / 2, CORNER_R
    tip = a + PIN_LEN - w   # centre of each pin's round tip
    d = [f"M{pt((cx - w, cy - a))}",
         f"L{pt((cx - w, cy - tip))}A{fmt(w)} {fmt(w)} 0 0 1 {pt((cx + w, cy - tip))}",
         f"L{pt((cx + w, cy - a))}L{pt((cx + a - r, cy - a))}A{fmt(r)} {fmt(r)} 0 0 1 {pt((cx + a, cy - a + r))}",
         f"L{pt((cx + a, cy - w))}L{pt((cx + tip, cy - w))}A{fmt(w)} {fmt(w)} 0 0 1 {pt((cx + tip, cy + w))}",
         f"L{pt((cx + a, cy + w))}L{pt((cx + a, cy + a - r))}A{fmt(r)} {fmt(r)} 0 0 1 {pt((cx + a - r, cy + a))}",
         f"L{pt((cx + w, cy + a))}L{pt((cx + w, cy + tip))}A{fmt(w)} {fmt(w)} 0 0 1 {pt((cx - w, cy + tip))}",
         f"L{pt((cx - w, cy + a))}L{pt((cx - a + r, cy + a))}A{fmt(r)} {fmt(r)} 0 0 1 {pt((cx - a, cy + a - r))}",
         f"L{pt((cx - a, cy + w))}L{pt((cx - tip, cy + w))}A{fmt(w)} {fmt(w)} 0 0 1 {pt((cx - tip, cy - w))}",
         f"L{pt((cx - a, cy - w))}L{pt((cx - a, cy - a + r))}A{fmt(r)} {fmt(r)} 0 0 1 {pt((cx - a + r, cy - a))}Z"]
    return "".join(d)


def chip_core_path(ox, oy):
    cx, cy = ox + CX, oy + HEX_CY
    h = CHIP_HALF - CHIP_T
    r = max(0.0, CORNER_R - CHIP_T)
    if r == 0:
        return f"M{pt((cx - h, cy - h))}H{fmt(cx + h)}V{fmt(cy + h)}H{fmt(cx - h)}Z"
    return rounded([(cx - h, cy - h), (cx + h, cy - h), (cx + h, cy + h), (cx - h, cy + h)], r, closed=True)


def icon_elements(ox, oy, color):
    return (f'<path d="{house_path(ox, oy)}" fill="none" stroke="{color}" stroke-width="{fmt(HOUSE_T)}" '
            f'stroke-linecap="round" stroke-linejoin="round"/>'
            f'<path d="{hex_path(ox, oy)}{chip_hole_path(ox, oy)}{chip_core_path(ox, oy)}" '
            f'fill="{color}" fill-rule="evenodd"/>')


def word_element(font_path, ox, oy, color):
    """'thinkube' in the given font, scaled so its ink box is WORD_H tall, top-left at (ox, oy)."""
    font = TTFont(font_path)
    gs, cmap, upm = font.getGlyphSet(), font.getBestCmap(), font["head"].unitsPerEm
    bounds = BoundsPen(gs)
    advances, x = [], 0.0
    for ch in "thinkube":
        advances.append(x)
        gs[cmap[ord(ch)]].draw(TransformPen(bounds, (1, 0, 0, -1, x, 0)))
        x += gs[cmap[ord(ch)]].width + WORD_TRACKING * upm
    x0, y0, x1, y1 = bounds.bounds
    s = WORD_H / (y1 - y0)
    pen = SVGPathPen(gs, ntos=fmt)
    for ch, adv in zip("thinkube", advances):
        t = (s, 0, 0, -s, ox + (adv - x0) * s, oy - y0 * s)
        gs[cmap[ord(ch)]].draw(TransformPen(pen, t))
    return f'<path d="{pen.getCommands()}" fill="{color}"/>', (x1 - x0) * s


def svg(w, h, body):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{fmt(w)}pt" height="{fmt(h)}pt" '
            f'viewBox="0 0 {fmt(w)} {fmt(h)}">{body}</svg>\n')


def build(font_path, out_dir, color):
    icon = svg(ICON_W, ICON_H, icon_elements(0, 0, color))
    word, word_w = word_element(font_path, 0, 0, color)
    text = svg(word_w, WORD_H, word)
    full_w, full_h = word_w, ICON_H + FULL_GAP + WORD_H
    full_word, _ = word_element(font_path, 0, ICON_H + FULL_GAP, color)
    full = svg(full_w, full_h, icon_elements((full_w - ICON_W) / 2, 0, color) + full_word)
    written = []
    for name, content in (("tk_logo", icon), ("tk_text_logo", text), ("tk_full_logo", full)):
        path = os.path.join(out_dir, f"{name}.svg")
        with open(path, "w") as f:
            f.write(content)
        written.append(path)
    return written


if __name__ == "__main__":
    here = os.path.dirname(os.path.abspath(__file__))
    ap = argparse.ArgumentParser(description="Generate the Thinkube logo SVGs.")
    ap.add_argument("--color", default=COLOR, help="fill colour (default %(default)s)")
    ap.add_argument("--out", default=os.path.join(here, "..", "public", "icons"), help="output directory")
    args = ap.parse_args()
    font = os.path.join(here, "fonts", "poppins-latin-600-normal.woff")
    for p in build(font, args.out, args.color):
        print("wrote", os.path.normpath(p))
