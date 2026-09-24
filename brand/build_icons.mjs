// Copyright Alejandro Martínez Corriá and the Thinkube contributors
// SPDX-License-Identifier: Apache-2.0

// Write the Thinkube hexagon icons (default: public/icons/):
//   tk_<name>.svg            service icons drawn in icons.mjs
//   lucide/<name>.svg        every Lucide icon stored in brand/lucide/
//   chars/<key>.svg          every character in brand/chars.json
//
// The files are one colour. Web pages tint them with a CSS mask (TkBrandIcon);
// a program that needs a file in another colour gets one from --color.
//
// Usage: node brand/build_icons.mjs [--color #rrggbb] [--out DIR]
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { NAMES, charToSVG, lucideToSVG, toSVG } from './icons.mjs';

const here = dirname(fileURLToPath(import.meta.url));
export const LUCIDE_DIR = join(here, 'lucide');
export const DEFAULT_OUT = join(here, '..', 'public', 'icons');

export function writeLucide(names, out, color) {
  mkdirSync(join(out, 'lucide'), { recursive: true });
  for (const name of names) {
    writeFileSync(join(out, 'lucide', `${name}.svg`), lucideToSVG(name, readFileSync(join(LUCIDE_DIR, `${name}.svg`), 'utf8'), color));
  }
}

function main() {
  const { values } = parseArgs({ options: { color: { type: 'string', default: '#006680' }, out: { type: 'string', default: DEFAULT_OUT } } });
  const { color, out } = values;

  mkdirSync(out, { recursive: true });
  for (const name of NAMES) writeFileSync(join(out, `tk_${name}.svg`), toSVG(name, color));

  const lucide = readdirSync(LUCIDE_DIR).filter((f) => f.endsWith('.svg')).map((f) => f.slice(0, -4));
  writeLucide(lucide, out, color);

  const chars = JSON.parse(readFileSync(join(here, 'chars.json'), 'utf8'));
  mkdirSync(join(out, 'chars'), { recursive: true });
  for (const [key, d] of Object.entries(chars)) writeFileSync(join(out, 'chars', `${key}.svg`), charToSVG(key, d, color));

  console.log(`wrote ${NAMES.length} service icons, ${lucide.length} Lucide icons and ${Object.keys(chars).length} characters to ${out}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
