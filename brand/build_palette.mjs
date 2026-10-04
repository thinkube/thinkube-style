// Copyright Alejandro Martínez Corriá and the Thinkube contributors
// SPDX-License-Identifier: Apache-2.0

// Write the Thinkube colour palette, built from the two brand colours
// (the logo teal and the icon cream):
//   styles.css             the block between "palette:begin" and "palette:end"
//   tailwind-palette.css   Tailwind colour names for every palette token
//   lib/palette.ts         the same values for chart code
//
// Families are fixed colours, the same in both themes:
//   --tk-teal-<step>, --tk-sand-<step>   tints and shades, 50 (lightest) to 950
//   --tk-tide-<n>, --tk-dusk-<n>         gradients from the teal through
//                                        green to yellow, and through blue
//                                        and violet to pink
// Roles change with the theme:
//   --chart-<n>          eight series colours, in a fixed order
//   --seq-<name>-<n>     amounts, low (1) to high (7): tide, dusk, teal, sand
//   --div-<name>-<n>     two sides of a baseline, grey middle (4): brand
//                        (teal and sand), temperature (blue and red),
//                        growth (violet and green)
//   --seq-<n>, --div-<n> the default scales, tide and brand
//
// The chart sets are checked before anything is written; a set that fails
// a check stops the script with the reason.
//
// Usage: node brand/build_palette.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

export const BRAND = { teal: '#006680', cream: '#ede4d6' };

// ---- colour maths: sRGB <-> OKLab/OKLCH, gamut mapping, contrast, CVD ----

const toLin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toGam = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
const hexToRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
const rgbToHex = (rgb) => '#' + rgb.map((v) => Math.round(Math.min(1, Math.max(0, v)) * 255).toString(16).padStart(2, '0')).join('');

function linToOklab([r, g, b]) {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

function oklabToLin([L, a, b]) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

export function hexToOklch(h) {
  const [L, a, b] = linToOklab(hexToRgb(h).map(toLin));
  return [L, Math.hypot(a, b), ((Math.atan2(b, a) * 180) / Math.PI + 360) % 360];
}

const inGamut = (lin) => lin.every((v) => v >= -1e-6 && v <= 1 + 1e-6);
const lchToLin = (L, C, H) => oklabToLin([L, C * Math.cos((H * Math.PI) / 180), C * Math.sin((H * Math.PI) / 180)]);

// An OKLCH colour as hex; chroma is reduced until the colour fits sRGB,
// so lightness and hue are kept exactly.
export function oklchToHex(L, C, H) {
  let lo = 0, hi = C;
  if (!inGamut(lchToLin(L, C, H))) {
    for (let i = 0; i < 40; i++) {
      const mid = (lo + hi) / 2;
      if (inGamut(lchToLin(L, mid, H))) lo = mid; else hi = mid;
    }
    C = lo;
  }
  return rgbToHex(lchToLin(L, C, H).map(toGam));
}

const relLum = (h) => { const [r, g, b] = hexToRgb(h).map(toLin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
export const contrast = (a, b) => { const [x, y] = [relLum(a), relLum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

// Colour-vision deficiency simulation, Machado, Oliveira & Fernandes 2009,
// severity 1.0, applied to linear RGB.
const CVD = {
  protan: [[0.152286, 1.052583, -0.204868], [0.114503, 0.786281, 0.099216], [-0.003882, -0.048116, 1.051998]],
  deutan: [[0.367322, 0.860646, -0.227968], [0.280085, 0.672501, 0.047413], [-0.01182, 0.04294, 0.968881]],
};
const simulate = (lin, m) => m.map((row) => Math.min(1, Math.max(0, row[0] * lin[0] + row[1] * lin[1] + row[2] * lin[2])));
// Distance in OKLab x 100, under normal vision or a simulated deficiency.
function deltaE(h1, h2, kind) {
  const [p, q] = [h1, h2].map((h) => { const lin = hexToRgb(h).map(toLin); return linToOklab(kind ? simulate(lin, CVD[kind]) : lin); });
  return 100 * Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]);
}

// ---- families ----

export const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const LIGHTNESS = [0.975, 0.945, 0.89, 0.82, 0.74, 0.655, 0.565, 0.475, 0.39, 0.32, 0.26];

// Straight-line interpolation in a table of [lightness, value] points.
function along(table, L) {
  const t = [...table].sort((p, q) => q[0] - p[0]);
  if (L >= t[0][0]) return t[0][1];
  for (let i = 1; i < t.length; i++) {
    if (L >= t[i][0]) { const [l0, v0] = t[i - 1], [l1, v1] = t[i]; return v1 + ((v0 - v1) * (L - l1)) / (l0 - l1); }
  }
  return t[t.length - 1][1];
}

// A family of eleven steps. The brand colour replaces the step closest to
// its own lightness, so the family contains it exactly.
function family(base, chroma, hue) {
  const [bL] = hexToOklch(base);
  const pin = LIGHTNESS.reduce((best, L, i) => (Math.abs(L - bL) < Math.abs(LIGHTNESS[best] - bL) ? i : best), 0);
  return Object.fromEntries(STEPS.map((step, i) => [step, i === pin ? base : oklchToHex(LIGHTNESS[i], along(chroma, LIGHTNESS[i]), along(hue, LIGHTNESS[i]))]));
}

const [, tealC, tealH] = hexToOklch(BRAND.teal);
// Teal keeps its hue; its chroma peaks around the logo teal and fades
// towards the tints and the deepest shades.
export const teal = family(BRAND.teal,
  [[0.975, 0.012], [0.89, 0.035], [0.74, 0.07], [0.565, 0.095], [0.475, tealC], [0.32, 0.07], [0.26, 0.055]],
  [[1, tealH], [0, tealH]]);
// Sand runs from the icon cream through caramel to brown: it gains colour
// as it darkens and warms slightly, as a cream does when it deepens.
export const sand = family(BRAND.cream,
  [[0.975, 0.012], [0.922, 0.021], [0.82, 0.05], [0.74, 0.075], [0.655, 0.095], [0.565, 0.105], [0.475, 0.105], [0.39, 0.09], [0.32, 0.075], [0.26, 0.06]],
  [[1, 80], [0.26, 68]]);

// A gradient of n colours from one colour to another, interpolated in OKLCH
// with the hue turning the given way ('down' lowers the hue angle).
function gradient(from, to, n, turn) {
  const [L0, C0, H0] = hexToOklch(from), [L1, C1, H1] = hexToOklch(to);
  let dH = H1 - H0;
  if (turn === 'down' && dH > 0) dH -= 360;
  if (turn === 'up' && dH < 0) dH += 360;
  return Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    if (i === 0) return from;
    if (i === n - 1) return to;
    return oklchToHex(L0 + (L1 - L0) * t, C0 + (C1 - C0) * t, (H0 + dH * t + 360) % 360);
  });
}

// Tide: teal through green to a light yellow. Dusk: teal through blue and
// violet to a light pink. Both start at the logo teal and end light, so
// either one can show amounts.
export const tide = gradient(BRAND.teal, '#f9f871', 7, 'down');
export const dusk = gradient(BRAND.teal, oklchToHex(0.87, 0.07, 355), 7, 'up');

// Ramps for the arms of the diverging scales that are not brand families.
// Chroma peaks in the middle steps and fades towards both ends.
function ramp(hue, peak) {
  const chroma = [[0.975, 0.015], [0.89, 0.045], [0.74, peak * 0.7], [0.565, peak], [0.39, peak * 0.85], [0.26, peak * 0.6]];
  return Object.fromEntries(STEPS.map((step, i) => [step, oklchToHex(LIGHTNESS[i], along(chroma, LIGHTNESS[i]), hue)]));
}
const blue = ramp(262, 0.16), red = ramp(27, 0.18), violet = ramp(305, 0.15), green = ramp(150, 0.13);

// ---- roles ----

// Chart series, one colour per theme for each slot, in a fixed order: the
// order keeps neighbours apart for colour-blind readers. Teal and brown are
// the brand families at the strength a series needs.
export const CHART = [
  { name: 'teal', light: '#008ca0', dark: '#13a5b2' },
  { name: 'brown', light: '#8f5d04', dark: '#a97d3a' },
  { name: 'blue', light: '#366bd3', dark: '#4e82e5' },
  { name: 'magenta', light: '#d14e95', dark: '#d4599b' },
  { name: 'orange', light: '#e86518', dark: '#e06623' },
  { name: 'violet', light: '#7a4aba', dark: '#956ed2' },
  { name: 'green', light: '#2e9848', dark: '#44aa5a' },
  { name: 'sky', light: '#369dd1', dark: '#439ccc' },
];

// The card each theme's charts sit on, and the checks a chart set passes:
// a lightness band so no series outweighs the others, a chroma floor so
// each reads as a colour, 3:1 against the card, and neighbours at least 8
// apart (OKLab x 100) under protanopia and deuteranopia and 15 apart under
// normal vision.
const SURFACE = { light: '#ffffff', dark: '#003240' };
const BAND = { light: [0.43, 0.77], dark: [0.48, 0.67] };
const CHROMA_FLOOR = 0.1, CONTRAST_MIN = 3, CVD_MIN = 8, NORMAL_MIN = 15;

export function checkChart(mode) {
  const set = CHART.map((s) => s[mode]);
  const faults = [];
  for (const h of set) {
    const [L, C] = hexToOklch(h);
    if (L < BAND[mode][0] || L > BAND[mode][1]) faults.push(`${h} lightness ${L.toFixed(3)} is outside ${BAND[mode].join('-')}`);
    if (C < CHROMA_FLOOR - 0.0005) faults.push(`${h} chroma ${C.toFixed(3)} is below ${CHROMA_FLOOR}`);
    if (contrast(h, SURFACE[mode]) < CONTRAST_MIN) faults.push(`${h} contrast ${contrast(h, SURFACE[mode]).toFixed(2)}:1 on ${SURFACE[mode]} is below ${CONTRAST_MIN}:1`);
  }
  for (let i = 0; i + 1 < set.length; i++) {
    for (const kind of ['protan', 'deutan']) {
      const d = deltaE(set[i], set[i + 1], kind);
      if (d < CVD_MIN) faults.push(`${set[i]} and ${set[i + 1]} are ${d.toFixed(1)} apart under ${kind}, below ${CVD_MIN}`);
    }
    const n = deltaE(set[i], set[i + 1]);
    if (n < NORMAL_MIN) faults.push(`${set[i]} and ${set[i + 1]} are ${n.toFixed(1)} apart under normal vision, below ${NORMAL_MIN}`);
  }
  return faults;
}

// Amounts, low to high. On a light page low is light and high is dark; on
// a dark page the other way round, so the highest value always stands out.
// The first set is the default, also written as --seq-1 … --seq-7.
const rev = (a) => [...a].reverse();
const steps = (f, list) => list.map((k) => f[k]);
export const SEQUENTIAL = {
  tide: { light: rev(tide), dark: tide },
  dusk: { light: rev(dusk), dark: dusk },
  teal: { light: steps(teal, [200, 300, 400, 500, 600, 700, 800]), dark: steps(teal, [800, 700, 600, 500, 400, 300, 200]) },
  sand: { light: steps(sand, [200, 300, 400, 500, 600, 700, 800]), dark: steps(sand, [800, 700, 600, 500, 400, 300, 200]) },
};

// Two sides of a baseline with a neutral grey between; each side gets
// stronger away from the middle. The first set is the default, also
// written as --div-1 … --div-7.
function diverging(a, b) {
  return {
    light: [a[800], a[600], a[300], oklchToHex(0.86, 0, 0), b[300], b[600], b[800]],
    dark: [a[200], a[400], a[600], oklchToHex(0.5, 0, 0), b[600], b[400], b[200]],
  };
}
export const DIVERGING = {
  brand: diverging(teal, sand),
  temperature: diverging(blue, red),
  growth: diverging(violet, green),
};

// A scale for amounts moves one way in lightness, in clear steps.
const SEQ_STEP_MIN = 0.04;
export function checkSequential(name, mode) {
  const L = SEQUENTIAL[name][mode].map((h) => hexToOklch(h)[0]);
  const faults = [];
  for (let i = 0; i + 1 < L.length; i++) {
    const d = mode === 'light' ? L[i] - L[i + 1] : L[i + 1] - L[i];
    if (d < SEQ_STEP_MIN) faults.push(`sequential ${name} ${mode}: step ${i + 1} to ${i + 2} changes lightness by ${d.toFixed(3)}, less than ${SEQ_STEP_MIN}`);
  }
  return faults;
}

// A diverging scale has a colourless middle, and each side moves away
// from the middle's lightness step by step.
export function checkDiverging(name, mode) {
  const set = DIVERGING[name][mode], mid = (set.length - 1) / 2;
  const faults = [];
  if (hexToOklch(set[mid])[1] > 0.005) faults.push(`diverging ${name} ${mode}: the middle ${set[mid]} is not grey`);
  const Lm = hexToOklch(set[mid])[0];
  for (const side of [-1, 1]) {
    for (let k = 1; k <= mid; k++) {
      const near = Math.abs(hexToOklch(set[mid + side * (k - 1)])[0] - Lm), far = Math.abs(hexToOklch(set[mid + side * k])[0] - Lm);
      if (k > 1 && far <= near) faults.push(`diverging ${name} ${mode}: ${set[mid + side * k]} is not further from the middle than ${set[mid + side * (k - 1)]}`);
    }
  }
  return faults;
}

// ---- output ----

const decl = (name, hex) => {
  const [L, C, H] = hexToOklch(hex);
  return `  --${name}: oklch(${(L * 100).toFixed(2)}% ${C.toFixed(4)} ${C < 0.0005 ? 0 : H.toFixed(1)}); /* ${hex} */`;
};
const alias = (name, target) => `  --${name}: var(--${target});`;

const SEQ_DEFAULT = Object.keys(SEQUENTIAL)[0], DIV_DEFAULT = Object.keys(DIVERGING)[0];
const count = (sets) => Object.values(sets)[0].light.length;
const range = (n) => Array.from({ length: n }, (_, i) => i + 1);

// Every token name, in the order it is written.
function tokenNames() {
  return [
    ...STEPS.map((s) => `tk-teal-${s}`), ...STEPS.map((s) => `tk-sand-${s}`),
    ...range(tide.length).map((i) => `tk-tide-${i}`), ...range(dusk.length).map((i) => `tk-dusk-${i}`),
    ...range(CHART.length).map((i) => `chart-${i}`),
    ...range(count(SEQUENTIAL)).map((i) => `seq-${i}`),
    ...Object.keys(SEQUENTIAL).flatMap((n) => range(count(SEQUENTIAL)).map((i) => `seq-${n}-${i}`)),
    ...range(count(DIVERGING)).map((i) => `div-${i}`),
    ...Object.keys(DIVERGING).flatMap((n) => range(count(DIVERGING)).map((i) => `div-${n}-${i}`)),
  ];
}

function cssBlock() {
  const fixed = [
    ...STEPS.map((s) => decl(`tk-teal-${s}`, teal[s])),
    ...STEPS.map((s) => decl(`tk-sand-${s}`, sand[s])),
    ...tide.map((h, i) => decl(`tk-tide-${i + 1}`, h)),
    ...dusk.map((h, i) => decl(`tk-dusk-${i + 1}`, h)),
  ];
  const defaults = [
    ...range(count(SEQUENTIAL)).map((i) => alias(`seq-${i}`, `seq-${SEQ_DEFAULT}-${i}`)),
    ...range(count(DIVERGING)).map((i) => alias(`div-${i}`, `div-${DIV_DEFAULT}-${i}`)),
  ];
  const roles = (mode) => [
    ...CHART.map((s, i) => decl(`chart-${i + 1}`, s[mode])),
    ...Object.entries(SEQUENTIAL).flatMap(([n, set]) => set[mode].map((h, i) => decl(`seq-${n}-${i + 1}`, h))),
    ...Object.entries(DIVERGING).flatMap(([n, set]) => set[mode].map((h, i) => decl(`div-${n}-${i + 1}`, h))),
  ];
  return [
    '/* palette:begin — written by brand/build_palette.mjs; change the script, not this block */',
    ':root {', ...fixed, '', ...defaults, '', ...roles('light'), '}', '',
    '.dark {', ...roles('dark'), '}',
    '/* palette:end */',
  ].join('\n');
}

function tailwindFile() {
  return [
    '/*',
    ' * Written by brand/build_palette.mjs; change the script, not this file.',
    ' * Tailwind colour names for the palette tokens in styles.css: import it',
    ' * after tailwindcss to write bg-tk-teal-500, text-chart-3, fill-seq-7, ...',
    ' */',
    '@theme inline {',
    ...tokenNames().map((n) => `  --color-${n}: var(--${n});`),
    '}',
    '',
  ].join('\n');
}

function tsModule() {
  const obj = (o) => JSON.stringify(o, null, 2);
  const vars = (sets, prefix) => Object.fromEntries(Object.keys(sets).map((n) => [n, range(count(sets)).map((i) => `var(--${prefix}-${n}-${i})`)]));
  return `/*
 * Copyright Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

// Written by brand/build_palette.mjs; change the script, not this file.
//
// The Thinkube palette for code that needs colour values, such as charts.
// Prefer the CSS variables (chartVars, seqVars, divVars): they follow the
// light and dark themes. The hex values are for places that cannot read a
// CSS variable, such as a canvas or an exported image.

export const brand = ${obj(BRAND)} as const

export const teal = ${obj(teal)} as const

export const sand = ${obj(sand)} as const

export const tide = ${obj(tide)} as const

export const dusk = ${obj(dusk)} as const

/** Chart series colours in their fixed order; slot 1 is chart[0]. */
export const chart = ${obj(CHART)} as const

/** Scales for amounts, low to high, per theme. The first is the default. */
export const sequential = ${obj(SEQUENTIAL)} as const

/** Scales for two sides of a baseline, grey middle, per theme. The first is the default. */
export const diverging = ${obj(DIVERGING)} as const

export const chartVars = ${obj(range(CHART.length).map((i) => `var(--chart-${i})`))} as const

/** The default scale for amounts (${SEQ_DEFAULT}), low to high. */
export const seqVars = ${obj(range(count(SEQUENTIAL)).map((i) => `var(--seq-${i})`))} as const

/** Every scale for amounts by name, low to high. */
export const seqScales = ${obj(vars(SEQUENTIAL, 'seq'))} as const

/** The default diverging scale (${DIV_DEFAULT}). */
export const divVars = ${obj(range(count(DIVERGING)).map((i) => `var(--div-${i})`))} as const

/** Every diverging scale by name. */
export const divScales = ${obj(vars(DIVERGING, 'div'))} as const
`;
}

function main() {
  const faults = [
    ...['light', 'dark'].flatMap((mode) => checkChart(mode).map((f) => `chart ${mode}: ${f}`)),
    ...Object.keys(SEQUENTIAL).flatMap((n) => ['light', 'dark'].flatMap((mode) => checkSequential(n, mode))),
    ...Object.keys(DIVERGING).flatMap((n) => ['light', 'dark'].flatMap((mode) => checkDiverging(n, mode))),
  ];
  if (faults.length) {
    console.error('The palette fails these checks; nothing was written:\n  ' + faults.join('\n  '));
    process.exit(1);
  }

  const cssPath = join(root, 'styles.css');
  const css = readFileSync(cssPath, 'utf8');
  const begin = css.indexOf('/* palette:begin'), end = css.indexOf('/* palette:end */');
  if (begin < 0 || end < 0) {
    console.error(`${cssPath} has no "palette:begin" … "palette:end" block to replace`);
    process.exit(1);
  }
  writeFileSync(cssPath, css.slice(0, begin) + cssBlock() + css.slice(end + '/* palette:end */'.length));
  writeFileSync(join(root, 'tailwind-palette.css'), tailwindFile());
  writeFileSync(join(root, 'lib', 'palette.ts'), tsModule());
  console.log('Wrote the palette block in styles.css, tailwind-palette.css and lib/palette.ts');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
