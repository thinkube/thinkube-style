/*
 * Copyright Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

// Written by brand/build_palette.mjs; change the script, not this file.
//
// The Thinkube palette for code that needs colour values, such as charts.
// Prefer the CSS variables (chartVars, seqVars, divVars): they follow the
// light and dark themes. The hex values are for places that cannot read a
// CSS variable, such as a canvas or an exported image.

export const brand = {
  "teal": "#006680",
  "cream": "#ede4d6"
} as const

export const teal = {
  "50": "#eff9fd",
  "100": "#dff0f7",
  "200": "#c3e0ec",
  "300": "#a1ccdd",
  "400": "#79b5cb",
  "500": "#539cb5",
  "600": "#22829f",
  "700": "#006680",
  "800": "#004d61",
  "900": "#003949",
  "950": "#002935"
} as const

export const sand = {
  "50": "#fbf6ee",
  "100": "#ede4d6",
  "200": "#e6d9c5",
  "300": "#d7c1a0",
  "400": "#c6a575",
  "500": "#b3884b",
  "600": "#9b6b23",
  "700": "#7f5100",
  "800": "#613c00",
  "900": "#492b00",
  "950": "#361e00"
} as const

export const tide = [
  "#006680",
  "#00828c",
  "#05a093",
  "#46bb91",
  "#7ed388",
  "#bae87b",
  "#f9f871"
] as const

export const dusk = [
  "#006680",
  "#306a98",
  "#546ca9",
  "#766db4",
  "#976eb4",
  "#b670ac",
  "#d1749c"
] as const

/** Chart series colours in their fixed order; slot 1 is chart[0]. */
export const chart = [
  {
    "name": "teal",
    "light": "#008ca0",
    "dark": "#13a5b2"
  },
  {
    "name": "brown",
    "light": "#8f5d04",
    "dark": "#a97d3a"
  },
  {
    "name": "blue",
    "light": "#366bd3",
    "dark": "#4e82e5"
  },
  {
    "name": "magenta",
    "light": "#d14e95",
    "dark": "#d4599b"
  },
  {
    "name": "orange",
    "light": "#e86518",
    "dark": "#e06623"
  },
  {
    "name": "violet",
    "light": "#7a4aba",
    "dark": "#956ed2"
  },
  {
    "name": "green",
    "light": "#2e9848",
    "dark": "#44aa5a"
  },
  {
    "name": "sky",
    "light": "#369dd1",
    "dark": "#439ccc"
  }
] as const

/** Amounts, low to high, per theme. */
export const sequential = {
  "light": [
    "#f9f871",
    "#bae87b",
    "#7ed388",
    "#46bb91",
    "#05a093",
    "#00828c",
    "#006680"
  ],
  "dark": [
    "#006680",
    "#00828c",
    "#05a093",
    "#46bb91",
    "#7ed388",
    "#bae87b",
    "#f9f871"
  ]
} as const

/** Two sides of a baseline, teal side first, grey middle, per theme. */
export const diverging = {
  "light": [
    "#004d61",
    "#22829f",
    "#a1ccdd",
    "#d1d1d1",
    "#d7c1a0",
    "#9b6b23",
    "#613c00"
  ],
  "dark": [
    "#c3e0ec",
    "#79b5cb",
    "#22829f",
    "#636363",
    "#9b6b23",
    "#c6a575",
    "#e6d9c5"
  ]
} as const

export const chartVars = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
  "var(--chart-7)",
  "var(--chart-8)"
] as const

export const seqVars = [
  "var(--seq-1)",
  "var(--seq-2)",
  "var(--seq-3)",
  "var(--seq-4)",
  "var(--seq-5)",
  "var(--seq-6)",
  "var(--seq-7)"
] as const

export const divVars = [
  "var(--div-1)",
  "var(--div-2)",
  "var(--div-3)",
  "var(--div-4)",
  "var(--div-5)",
  "var(--div-6)",
  "var(--div-7)"
] as const
