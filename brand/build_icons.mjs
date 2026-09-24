// Copyright Alejandro Martínez Corriá and the Thinkube contributors
// SPDX-License-Identifier: Apache-2.0

// Write the Thinkube service icons as tk_<name>.svg (default: public/icons/).
//
// The files are one colour. Web pages tint them with a CSS mask (TkBrandIcon);
// a program that needs a file in another colour gets one from --color.
//
// Usage: node brand/build_icons.mjs [--color #rrggbb] [--out DIR]
import { writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { NAMES, toSVG } from './icons.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const { values } = parseArgs({ options: { color: { type: 'string', default: '#006680' }, out: { type: 'string', default: join(here, '..', 'public', 'icons') } } });
for (const name of NAMES) {
  const file = join(values.out, `tk_${name}.svg`);
  writeFileSync(file, toSVG(name, values.color));
  console.log('wrote', relative(process.cwd(), file));
}
