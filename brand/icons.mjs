// Copyright Alejandro Martínez Corriá and the Thinkube contributors
// SPDX-License-Identifier: Apache-2.0

// Thinkube service icons: one hexagon frame with a symbol cut out of it.
// Symbols are described relative to the hexagon centre, in icon units.
//
// Rules shared by every symbol:
//   - one line thickness W (12% of the hexagon radius, as the logo's chip);
//   - corner radius RC on large shapes, RS on small sharp parts; line ends round;
//   - gaps between parts are W wide; arrowheads are HEAD wide and long;
//   - FINE lines (half of W) only for small details: brain folds, pen nib slit.
import { rounded, hexPoints, rect, circle, fmt, pt } from './geom.mjs';

const FRAME_R = 240 / Math.sqrt(3);                    // hexagon 240 wide
export const FRAME = { R: FRAME_R, r: 0.12 * FRAME_R };  // corner radius 12% of R, as in the logo
export const W = 16.63;                          // line thickness of every symbol
export const RC = W;                             // corner radius of large shapes
export const RS = W / 4;                         // corner radius of small, sharp features (arrowheads, teeth, tips)
const HEAD = 1.5 * W;                            // arrowhead half-width and length
export const FINE = W / 2;                       // fine detail lines: brain folds, pen nib slit

const D2R = Math.PI / 180;
const cut = (d) => ({ op: 'cut', d });
const add = (d) => ({ op: 'add', d });
const cutLine = (d, w = W) => ({ op: 'cut', d, stroke: w });
const addLine = (d, w = W) => ({ op: 'add', d, stroke: w });
const poly = (pts) => 'M' + pts.map(pt).join('L');
const mirror = (pts) => pts.map(([x, y]) => [-x, y]);
const quad = (a, b, c) => `M${pt(a)}Q${pt(b)} ${pt(c)}`;

// Chip: ring with four pins and a solid core (same drawing as the logo's chip).
function chip(a, L) {
  const e = a + L - W / 2;
  return [
    cut(rect(-a, -a, 2 * a, 2 * a, RC)),
    cutLine(poly([[0, -a], [0, -e]])), cutLine(poly([[0, a], [0, e]])),
    cutLine(poly([[-a, 0], [-e, 0]])), cutLine(poly([[a, 0], [e, 0]])),
    add(rect(-(a - W), -(a - W), 2 * (a - W), 2 * (a - W), Math.max(0, RC - W))),
  ];
}

// Database cylinder: top ellipse, body with elliptic bottom, curved gaps between the parts.
function cylinder(p) {
  const { rx, ry, top, bottom } = p;
  const body = `M${pt([-rx, top])}L${pt([-rx, bottom])}A${fmt(rx)} ${fmt(ry)} 0 0 0 ${pt([rx, bottom])}L${pt([rx, top])}Z`;
  const ell = `M${pt([-rx, top])}A${fmt(rx)} ${fmt(ry)} 0 1 0 ${pt([rx, top])}A${fmt(rx)} ${fmt(ry)} 0 1 0 ${pt([-rx, top])}Z`;
  // A gap is the band between the lower half-ellipse at y and the same curve W lower.
  const gap = (y) => add(`M${pt([-rx - 1, y])}L${pt([-rx, y])}A${fmt(rx)} ${fmt(ry)} 0 0 0 ${pt([rx, y])}L${pt([rx + 1, y])}`
    + `L${pt([rx + 1, y + W])}L${pt([rx, y + W])}A${fmt(rx)} ${fmt(ry)} 0 0 1 ${pt([-rx, y + W])}L${pt([-rx - 1, y + W])}Z`);
  // The first gap sits directly under the top ellipse.
  return [cut(body), gap(top), gap(p.band), cut(ell)];
}

// Geometry of each symbol, in icon units relative to the hexagon centre.
export const DEFAULTS = {
  dashboard: { a: 58.7, L: 33.1 },
  code: { cy: 0.4, xs: -47, xt: -63.1, h: 55.2, d: 13, xe: -29.9, r1: 13.4, r2: 9.2, r3: 4.2 },
  docs: { cy: -1.1, pw: 121.1, ph: 151.9, y0: -42.8, dy: 34, x0: -33.3, x1: 32.7, x1m: 13.7 },
  search: { cx: -4.2, cy: -22.8, rr: 51.9, ang: 52.9, len: 120 },
  g330: { cx: -0.2, cy: -0.5, Rt: 81, Rb: 62.6, tw: 12.7, bw: 18.1, hole: 32.5 },
  observability: { cy: -3.4, ea: 83.9, eb: 58.5, iris: 36.7 },
  devops: { cx: 0.4, cy: 0.3, rr: 66.3, a1: -10.7 },
  data: { rx: 66.1, ry: 22.3, top: -58.5, bottom: 54.1, band: -4.8 },
  vector: { rx: 66.1, ry: 22.3, top: -58.5, bottom: 54.1, band: -4.8, xa: -58.8, ya: -35.9, xb: 39.8, yb: 68.5 },
  artifact: { cy: -1.2, R: 87, jy: -9.1, ax: 40.4, ah: 29.1 },
  design: { tx: -63.5, ty: 77.5, th: 51.5, s1: 58, w1: 42.6, s2: 91.2, w2: 25.7, s4: 201.7, w3: 26.5, w4: 10,
    sl: 4.6, sh: 55.1, rh: 10.1, bx0: -10.4, bx1: 60.7, by: 80.1 },
  ai: { l1x: -20.4, l1y: -54.7, l1r: 25.6, l2x: -52.1, l2y: -28.6, l2r: 18.7, l3x: -59.6, l3y: 3.8, l3r: 19.7,
    l4x: -53.1, l4y: 29.8, l4r: 14.3, l5x: -49.1, l5y: 37.2, l5r: 18.6, l6x: -24, l6y: 56.4, l6r: 20.3,
    bx: -52.2, by: 66.4, a1x: -28.8, a1y: -53.5, b1x: -29.1, b1y: -41.5, c1x: -5.3, c1y: -35.9, a2x: -48.8,
    a2y: -21.9, b2x: -47.5, b2y: 0.1, c2x: -26.6, c2y: -0.3, a3x: -4.9, a3y: 25.8, b3x: -32.8, b3y: 29.8,
    c3x: -29.1, c3y: 49.3, a4x: 26.6, a4y: -56.2, b4x: 25, b4y: -28.6, c4x: 49.4, c4y: -26.5, d4x: 46.5, d4y: -5.8,
    r4a: 4, r4b: 14, a5x: 11.1, a5y: 2.9, b5x: 29, b5y: 5.1, c5x: 30.1, c5y: 29.8 },
};

const BUILD = {
  dashboard: (p) => chip(p.a, p.L),

  code(p) {
    const left = [[p.xe, p.cy - p.h], [p.xs, p.cy - p.h], [p.xs, p.cy - p.d], [p.xt, p.cy],
                  [p.xs, p.cy + p.d], [p.xs, p.cy + p.h], [p.xe, p.cy + p.h]];
    const radii = [0, p.r1, p.r2, p.r3, p.r2, p.r1, 0];
    return [cutLine(rounded(left, radii, false)), cutLine(rounded(mirror(left), radii, false))];
  },

  docs(p) {
    const ops = [cut(rect(-p.pw / 2, p.cy - p.ph / 2, p.pw, p.ph, RC))];
    [p.x1, p.x1m, p.x1].forEach((x1, i) => ops.push(addLine(poly([[p.x0, p.y0 + i * p.dy], [x1, p.y0 + i * p.dy]]))));
    return ops;
  },

  search(p) {
    const a = p.ang * D2R, u = [Math.cos(a), Math.sin(a)];
    return [
      cutLine(circle(p.cx, p.cy, p.rr)),
      cutLine(poly([[p.cx + u[0] * p.rr, p.cy + u[1] * p.rr], [p.cx + u[0] * (p.len - W / 2), p.cy + u[1] * (p.len - W / 2)]])),
    ];
  },

  g330(p) {
    const pts = [], n = 8;
    for (let k = 0; k < n; k++) {
      const c = (-90 + k * 360 / n) * D2R, bt = Math.asin(p.tw / p.Rt), bb = Math.asin(p.bw / p.Rb);
      for (const [r, b] of [[p.Rb, -bb], [p.Rt, -bt], [p.Rt, bt], [p.Rb, bb]]) pts.push([p.cx + r * Math.cos(c + b), p.cy + r * Math.sin(c + b)]);
    }
    return [cut(rounded(pts, RS, true)), add(circle(p.cx, p.cy, p.hole))];
  },

  observability(p) {
    // Almond from two circular arcs, tips rounded with radius RS.
    const { ea, eb, cy } = p, Rc = (ea * ea + eb * eb) / (2 * eb), k = Rc - eb, rf = RS;
    const xf = Math.sqrt((Rc - rf) ** 2 - k * k);
    const c1 = [0, cy + k], c2 = [0, cy - k];               // centres of the top and bottom arcs
    const tan = (c, f) => [c[0] + (f[0] - c[0]) * Rc / (Rc - rf), c[1] + (f[1] - c[1]) * Rc / (Rc - rf)];
    const fR = [xf, cy], fL = [-xf, cy];
    const tRt = tan(c1, fR), tRb = tan(c2, fR), tLb = tan(c2, fL), tLt = tan(c1, fL);
    const R = fmt(Rc), r = fmt(rf);
    const d = `M${pt(tLt)}A${R} ${R} 0 0 1 ${pt(tRt)}A${r} ${r} 0 0 1 ${pt(tRb)}A${R} ${R} 0 0 1 ${pt(tLb)}A${r} ${r} 0 0 1 ${pt(tLt)}Z`;
    return [cut(d), add(circle(0, cy, p.iris))];
  },

  devops(p) {
    const ops = [];
    for (const rot of [0, 180]) {
      // Each arc starts one line width after the tip of the other arc's arrowhead.
      const a1 = (p.a1 + rot) * D2R, a0 = a1 + (HEAD + W) / p.rr - Math.PI;
      const P = (a) => [p.cx + p.rr * Math.cos(a), p.cy + p.rr * Math.sin(a)];
      const large = (a1 - a0) > Math.PI ? 1 : 0;
      ops.push(cutLine(`M${pt(P(a0))}A${fmt(p.rr)} ${fmt(p.rr)} 0 ${large} 1 ${pt(P(a1))}`));
      const b = P(a1), t = [-Math.sin(a1), Math.cos(a1)], nrm = [Math.cos(a1), Math.sin(a1)];
      ops.push(cut(rounded([[b[0] + nrm[0] * HEAD, b[1] + nrm[1] * HEAD], [b[0] + t[0] * HEAD, b[1] + t[1] * HEAD],
                            [b[0] - nrm[0] * HEAD, b[1] - nrm[1] * HEAD]], RS, true)));
    }
    return ops;
  },

  data: (p) => cylinder(p),

  vector(p) {
    return [...cylinder(p), addLine(poly([[p.xa, p.ya], [p.xb, p.yb]])), addLine(poly([[-p.xa, p.ya], [-p.xb, p.yb]]))];
  },

  artifact(p) {
    const v = hexPoints(0, p.cy, p.R), j = [0, p.cy + p.jy];
    const ext = (q) => [j[0] + (q[0] - j[0]) * 1.3, j[1] + (q[1] - j[1]) * 1.3];
    return [
      cut(rounded(v, RC, true)),
      addLine(poly([ext(v[5]), j, ext(v[1])])), addLine(poly([j, ext(v[3])])),
      addLine(poly([[p.ax, p.ah - HEAD], [p.ax, p.ah]])),   // stem as long as the head
      add(rounded([[p.ax - HEAD, p.ah], [p.ax + HEAD, p.ah], [p.ax, p.ah + HEAD]], RS, true)),
    ];
  },

  design(p) {
    const t = p.th * D2R, A = [Math.cos(t), -Math.sin(t)], N = [Math.sin(t), Math.cos(t)];
    const L = (s, n) => [p.tx + s * A[0] + n * N[0], p.ty + s * A[1] + n * N[1]];
    const nib = [L(0, 0), L(p.s1, -p.w1), L(p.s2, -p.w2), L(p.s2, p.w2), L(p.s1, p.w1)];
    const s3 = p.s2 + W, handle = [L(s3, -p.w3), L(p.s4, -p.w4), L(p.s4, p.w4), L(s3, p.w3)];
    return [
      cut(rounded(nib, RS, true)),
      addLine(poly([L(p.sl, 0), L(p.sh, 0)]), FINE),
      add(circle(...L(p.sh, 0), p.rh)),
      cut(rounded(handle, [RS, p.w4 * 0.999, p.w4 * 0.999, RS], true)),
      cutLine(poly([[p.bx0, p.by], [p.bx1, p.by]])),
    ];
  },

  ai(p) {
    const ops = [];
    for (const s of [1, -1]) {
      for (let i = 1; i <= 6; i++) ops.push(cut(circle(s * p[`l${i}x`], p[`l${i}y`], p[`l${i}r`])));
      const body = [[p.bx, -p.by], [W / 2, -p.by], [W / 2, p.by], [p.bx, p.by]];
      ops.push(cut(rounded(s > 0 ? body : mirror(body), [RC, 0, 0, RC], true)));
    }
    ops.push(addLine(poly([[0, -130], [0, 130]])));
    // Folds with one bend are quadratic curves; the top-right fold turns twice: tight, then smooth.
    for (const i of [1, 2, 3, 5]) ops.push(addLine(quad([p[`a${i}x`], p[`a${i}y`]], [p[`b${i}x`], p[`b${i}y`]], [p[`c${i}x`], p[`c${i}y`]]), FINE));
    ops.push(addLine(rounded([[p.a4x, p.a4y], [p.b4x, p.b4y], [p.c4x, p.c4y], [p.d4x, p.d4y]], [0, p.r4a, p.r4b, 0], false), FINE));
    return ops;
  },
};

export const NAMES = Object.keys(BUILD);
export const build = (name, p = DEFAULTS[name]) => BUILD[name](p);

// Hexagon frame path with its centre at (cx, cy).
export function framePath(cx, cy, R = FRAME.R, r = FRAME.r) {
  return rounded(hexPoints(cx, cy, R), r, true);
}

// Standalone SVG: the hexagon filled with `color`, the symbol cut out through a mask.
export function toSVG(name, color, p = DEFAULTS[name]) {
  // Rounding the top and bottom vertices lowers the hexagon's height by `trim` at each end.
  const w = FRAME.R * Math.sqrt(3), trim = FRAME.r / Math.sin(60 * D2R) - FRAME.r;
  const h = 2 * FRAME.R - 2 * trim, cx = w / 2, cy = h / 2, id = `tk-${name}-symbol`;
  const ops = build(name, p).map((o) => {
    const c = o.op === 'cut' ? '#000' : '#fff';
    return o.stroke
      ? `<path d="${o.d}" fill="none" stroke="${c}" stroke-width="${fmt(o.stroke)}" stroke-linecap="round" stroke-linejoin="round"/>`
      : `<path d="${o.d}" fill="${c}"/>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${fmt(w)}pt" height="${fmt(h)}pt" viewBox="0 0 ${fmt(w)} ${fmt(h)}">`
    + `<defs><mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="${fmt(w)}" height="${fmt(h)}">`
    + `<rect width="${fmt(w)}" height="${fmt(h)}" fill="#fff"/><g transform="translate(${fmt(cx)} ${fmt(cy)})">${ops}</g></mask></defs>`
    + `<path d="${framePath(cx, cy)}" fill="${color}" mask="url(#${id})"/></svg>\n`;
}
