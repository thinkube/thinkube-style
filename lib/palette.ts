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
  "#41739d",
  "#6c80b4",
  "#948ec4",
  "#ba9dce",
  "#ddaed3",
  "#fbc2d6"
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

/** Scales for amounts, low to high, per theme. The first is the default. */
export const sequential = {
  "tide": {
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
  },
  "dusk": {
    "light": [
      "#fbc2d6",
      "#ddaed3",
      "#ba9dce",
      "#948ec4",
      "#6c80b4",
      "#41739d",
      "#006680"
    ],
    "dark": [
      "#006680",
      "#41739d",
      "#6c80b4",
      "#948ec4",
      "#ba9dce",
      "#ddaed3",
      "#fbc2d6"
    ]
  },
  "teal": {
    "light": [
      "#c3e0ec",
      "#a1ccdd",
      "#79b5cb",
      "#539cb5",
      "#22829f",
      "#006680",
      "#004d61"
    ],
    "dark": [
      "#004d61",
      "#006680",
      "#22829f",
      "#539cb5",
      "#79b5cb",
      "#a1ccdd",
      "#c3e0ec"
    ]
  },
  "sand": {
    "light": [
      "#e6d9c5",
      "#d7c1a0",
      "#c6a575",
      "#b3884b",
      "#9b6b23",
      "#7f5100",
      "#613c00"
    ],
    "dark": [
      "#613c00",
      "#7f5100",
      "#9b6b23",
      "#b3884b",
      "#c6a575",
      "#d7c1a0",
      "#e6d9c5"
    ]
  }
} as const

/** Scales for two sides of a baseline, grey middle, per theme. The first is the default. */
export const diverging = {
  "brand": {
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
  },
  "temperature": {
    "light": [
      "#183f8c",
      "#3f71d3",
      "#a9c5f6",
      "#d1d1d1",
      "#f5b0a7",
      "#ca3c36",
      "#84090e"
    ],
    "dark": [
      "#cbdcf9",
      "#84abf2",
      "#3f71d3",
      "#636363",
      "#ca3c36",
      "#f08a7f",
      "#f7d0cb"
    ]
  },
  "growth": {
    "light": [
      "#552e7a",
      "#8b5bbc",
      "#cfb9eb",
      "#d1d1d1",
      "#a6d1ae",
      "#2f8b4b",
      "#005423"
    ],
    "dark": [
      "#e1d4f3",
      "#ba9ae0",
      "#8b5bbc",
      "#636363",
      "#2f8b4b",
      "#81bb8c",
      "#c7e4cb"
    ]
  }
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

/** The default scale for amounts (tide), low to high. */
export const seqVars = [
  "var(--seq-1)",
  "var(--seq-2)",
  "var(--seq-3)",
  "var(--seq-4)",
  "var(--seq-5)",
  "var(--seq-6)",
  "var(--seq-7)"
] as const

/** Every scale for amounts by name, low to high. */
export const seqScales = {
  "tide": [
    "var(--seq-tide-1)",
    "var(--seq-tide-2)",
    "var(--seq-tide-3)",
    "var(--seq-tide-4)",
    "var(--seq-tide-5)",
    "var(--seq-tide-6)",
    "var(--seq-tide-7)"
  ],
  "dusk": [
    "var(--seq-dusk-1)",
    "var(--seq-dusk-2)",
    "var(--seq-dusk-3)",
    "var(--seq-dusk-4)",
    "var(--seq-dusk-5)",
    "var(--seq-dusk-6)",
    "var(--seq-dusk-7)"
  ],
  "teal": [
    "var(--seq-teal-1)",
    "var(--seq-teal-2)",
    "var(--seq-teal-3)",
    "var(--seq-teal-4)",
    "var(--seq-teal-5)",
    "var(--seq-teal-6)",
    "var(--seq-teal-7)"
  ],
  "sand": [
    "var(--seq-sand-1)",
    "var(--seq-sand-2)",
    "var(--seq-sand-3)",
    "var(--seq-sand-4)",
    "var(--seq-sand-5)",
    "var(--seq-sand-6)",
    "var(--seq-sand-7)"
  ]
} as const

/** The default diverging scale (brand). */
export const divVars = [
  "var(--div-1)",
  "var(--div-2)",
  "var(--div-3)",
  "var(--div-4)",
  "var(--div-5)",
  "var(--div-6)",
  "var(--div-7)"
] as const

/** Every diverging scale by name. */
export const divScales = {
  "brand": [
    "var(--div-brand-1)",
    "var(--div-brand-2)",
    "var(--div-brand-3)",
    "var(--div-brand-4)",
    "var(--div-brand-5)",
    "var(--div-brand-6)",
    "var(--div-brand-7)"
  ],
  "temperature": [
    "var(--div-temperature-1)",
    "var(--div-temperature-2)",
    "var(--div-temperature-3)",
    "var(--div-temperature-4)",
    "var(--div-temperature-5)",
    "var(--div-temperature-6)",
    "var(--div-temperature-7)"
  ],
  "growth": [
    "var(--div-growth-1)",
    "var(--div-growth-2)",
    "var(--div-growth-3)",
    "var(--div-growth-4)",
    "var(--div-growth-5)",
    "var(--div-growth-6)",
    "var(--div-growth-7)"
  ]
} as const
