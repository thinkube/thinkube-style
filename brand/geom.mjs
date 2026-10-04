// Copyright Alejandro Martínez Corriá and the Thinkube contributors
// SPDX-License-Identifier: Apache-2.0

// Geometry helpers that return SVG path data (usable by Path2D and in SVG files).
export const fmt = (v) => { const s = (Math.round(v * 100) / 100).toFixed(2).replace(/\.?0+$/, ''); return s === '-0' ? '0' : s; };
const P = (p) => `${fmt(p[0])} ${fmt(p[1])}`;

// Path through pts with every corner rounded (open: interior corners only).
// r is one radius for all corners, or an array with one radius per point.
export function rounded(pts, radii, closed = true) {
  const n = pts.length, segs = [];
  const idx = closed ? [...Array(n).keys()] : [...Array(n - 2).keys()].map((i) => i + 1);
  for (const i of idx) {
    const r = Array.isArray(radii) ? radii[i] : radii;
    const a = pts[(i - 1 + n) % n], p = pts[i], b = pts[(i + 1) % n];
    let u = [a[0] - p[0], a[1] - p[1]], v = [b[0] - p[0], b[1] - p[1]];
    const lu = Math.hypot(...u), lv = Math.hypot(...v);
    u = [u[0] / lu, u[1] / lu]; v = [v[0] / lv, v[1] / lv];
    const phi = Math.acos(Math.max(-1, Math.min(1, u[0] * v[0] + u[1] * v[1])));
    const d = r / Math.tan(phi / 2);
    const cross = (p[0] - a[0]) * (b[1] - p[1]) - (p[1] - a[1]) * (b[0] - p[0]);
    segs.push([[p[0] + u[0] * d, p[1] + u[1] * d], [p[0] + v[0] * d, p[1] + v[1] * d], cross > 0 ? 1 : 0, r]);
  }
  let s = closed ? `M${P(segs[segs.length - 1][1])}` : `M${P(pts[0])}`;
  for (const [t1, t2, sw, r] of segs) s += r > 0 ? `L${P(t1)}A${fmt(r)} ${fmt(r)} 0 0 ${sw} ${P(t2)}` : `L${P(t1)}`;
  return s + (closed ? 'Z' : `L${P(pts[n - 1])}`);
}

// Point-up hexagon: centre, circumradius, corner radius, vertical scale.
export function hexPoints(cx, cy, R, ky = 1) {
  return [...Array(6).keys()].map((i) => { const a = (-90 + 60 * i) * Math.PI / 180; return [cx + R * Math.cos(a), cy + R * ky * Math.sin(a)]; });
}
export const rect = (x, y, w, h, r = 0) => rounded([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], Math.min(r, w / 2, h / 2), true);
export const circle = (cx, cy, r) => `M${P([cx - r, cy])}A${fmt(r)} ${fmt(r)} 0 1 0 ${P([cx + r, cy])}A${fmt(r)} ${fmt(r)} 0 1 0 ${P([cx - r, cy])}Z`;
export const pt = P;
