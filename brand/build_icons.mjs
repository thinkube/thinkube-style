// Copyright Alejandro Martínez Corriá and the Thinkube contributors
// SPDX-License-Identifier: Apache-2.0

// Write the Thinkube hexagon icons (default: public/icons/):
//   tk_<name>.svg            service icons drawn in icons.mjs
//   lucide/<name>.svg        every Lucide icon stored in brand/lucide/
//   chars/<key>.svg          every character in brand/chars.json
// and, when writing to public/icons/, lib/brand-icons.ts: the name of every
// icon there, as TkBrandIcon takes it, for pages that list them.
//
// The files are one colour. Web pages tint them with a CSS mask (TkBrandIcon);
// a program that needs a file in another colour gets one from --color.
//
// Usage: node brand/build_icons.mjs [--color #rrggbb] [--out DIR]
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
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

  if (out === DEFAULT_OUT) {
    const listPath = join(here, '..', 'lib', 'brand-icons.ts');
    writeFileSync(listPath, iconList(lucide, Object.keys(chars)));
    console.log(`wrote the icon names to ${listPath}`);
  }
}

// A fingerprint of every file in the folder, logos included. Pages load
// icons at /icons/<name>.svg?v=<fingerprint>, so a changed drawing has a new
// address and no browser keeps showing a cached old one.
function iconFingerprint(dir) {
  const hash = createHash('sha256');
  const walk = (d) => {
    for (const name of readdirSync(d).sort()) {
      const path = join(d, name);
      if (statSync(path).isDirectory()) walk(path);
      else hash.update(path.slice(dir.length)).update(readFileSync(path));
    }
  };
  walk(dir);
  return hash.digest('hex').slice(0, 12);
}

// The logos are drawn by build_logo.py into the same folder.
function iconList(lucide, chars) {
  const logos = readdirSync(DEFAULT_OUT).filter((f) => /^tk_.*logo\.svg$/.test(f)).map((f) => f.slice(0, -4)).sort();
  const list = (names) => JSON.stringify(names, null, 2);
  return `/*
 * Copyright Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: Apache-2.0
 */

// Written by brand/build_icons.mjs; change the brand scripts, not this file.
// The name of every icon in public/icons/, as <TkBrandIcon icon="..."> takes it.

/** Fingerprint of the icon files; TkBrandIcon adds it to each icon address. */
export const iconVersion = "${iconFingerprint(DEFAULT_OUT)}"

export const logoIcons = ${list(logos)} as const

export const serviceIcons = ${list(NAMES.map((n) => `tk_${n}`))} as const

export const lucideIcons = ${list([...lucide].sort().map((n) => `lucide/${n}`))} as const

export const charIcons = ${list(chars.map((k) => `chars/${k}`))} as const
`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
