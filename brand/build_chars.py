# Copyright Alejandro Martínez Corriá and the Thinkube contributors
# SPDX-License-Identifier: Apache-2.0
"""Write brand/chars.json: outlines of the character icons, centred on the origin.

Characters: the numbers 0-99, a-z and A-Z, in Quicksand SemiBold (a rounded
font with the same single-storey a and g as Poppins). build_icons.mjs puts
each outline in the hexagon frame.

Keys: number-<n>, lower-<letter>, upper-<letter>. Upper and lower case need
different names because macOS and Windows file systems ignore case.

Sizes:
  - one character: capital height CAP; lower case uses the same font size;
  - two digits: one smaller size for all of 10-99, so "88" fits MAX_WIDTH_2.
Main strokes come out at 18.0 and 15.8 units, near the icon line thickness.

Usage: python3 brand/build_chars.py
Requires fontTools.
"""
import json
import os
import string

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

HERE = os.path.dirname(os.path.abspath(__file__))
FONT = os.path.join(HERE, "fonts", "quicksand-latin-600-normal.woff")
CAP = 120.0          # capital height of a single character, in icon units
MAX_WIDTH_2 = 150.0  # ink width of the widest two-digit number


def fmt(v):
    s = f"{v:.2f}".rstrip("0").rstrip(".")
    return "0" if s == "-0" else s


def characters():
    items = [(f"number-{n}", str(n)) for n in range(100)]
    items += [(f"lower-{c}", c) for c in string.ascii_lowercase]
    items += [(f"upper-{c.lower()}", c) for c in string.ascii_uppercase]
    return items


def main():
    font = TTFont(FONT)
    gs, cmap, upm = font.getGlyphSet(), font.getBestCmap(), font["head"].unitsPerEm

    def bounds(text):
        pen, x = BoundsPen(gs), 0
        for ch in text:
            gs[cmap[ord(ch)]].draw(TransformPen(pen, (1, 0, 0, -1, x, 0)))
            x += gs[cmap[ord(ch)]].width
        return pen.bounds

    cap_height = -bounds("H")[1]
    em1 = CAP / cap_height * upm
    x0, _, x1, _ = bounds("88")
    em2 = min(em1, MAX_WIDTH_2 / (x1 - x0) * upm)

    out = {}
    for key, text in characters():
        s = (em2 if len(text) > 1 else em1) / upm
        bx0, by0, bx1, by1 = bounds(text)
        ox, oy = -(bx0 + bx1) / 2 * s, -(by0 + by1) / 2 * s
        pen, x = SVGPathPen(gs, ntos=fmt), 0
        for ch in text:
            gs[cmap[ord(ch)]].draw(TransformPen(pen, (s, 0, 0, -s, ox + x * s, oy)))
            x += gs[cmap[ord(ch)]].width
        out[key] = pen.getCommands()

    path = os.path.join(HERE, "chars.json")
    with open(path, "w") as f:
        json.dump(out, f, indent=0)
        f.write("\n")
    print(f"wrote {len(out)} characters to {os.path.relpath(path)}")


if __name__ == "__main__":
    main()
