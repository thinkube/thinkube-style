// Copyright Alejandro Martínez Corriá and the Thinkube contributors
// SPDX-License-Identifier: Apache-2.0

// Add Lucide icons to the hexagon set.
//
// Downloads each named icon from lucide-static into brand/lucide/, at the
// lucide-react version this package depends on (so the hexagon icons show the
// same drawing as the app), then writes public/icons/lucide/<name>.svg.
// Names are the Lucide file names, as listed on lucide.dev: "server", "git-branch".
//
// Usage: node brand/add_lucide.mjs <name> [<name> ...] [--color #rrggbb] [--out DIR]
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { DEFAULT_OUT, LUCIDE_DIR, writeLucide } from './build_icons.mjs';

const here = dirname(fileURLToPath(import.meta.url));

function lucideVersion() {
  const pkg = JSON.parse(readFileSync(join(here, '..', 'package.json'), 'utf8'));
  const range = { ...pkg.dependencies, ...pkg.devDependencies, ...pkg.peerDependencies }['lucide-react'];
  if (!range) throw new Error('package.json has no lucide-react dependency; it sets the Lucide version to download');
  const version = range.replace(/^[\^~=]/, '');
  if (!/^\d+\.\d+\.\d+$/.test(version)) throw new Error(`lucide-react version "${range}" is not a plain version`);
  return version;
}

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: { color: { type: 'string', default: '#006680' }, out: { type: 'string', default: DEFAULT_OUT } },
});
if (positionals.length === 0) {
  console.error('Usage: node brand/add_lucide.mjs <name> [<name> ...]  (names as on lucide.dev, e.g. "git-branch")');
  process.exit(2);
}

const version = lucideVersion();
for (const name of positionals) {
  const url = `https://cdn.jsdelivr.net/npm/lucide-static@${version}/icons/${name}.svg`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Lucide ${version} has no icon "${name}" (${res.status} from ${url})`);
  writeFileSync(join(LUCIDE_DIR, `${name}.svg`), await res.text());
  console.log(`added ${name} (lucide ${version})`);
}
writeLucide(positionals, values.out, values.color);
console.log(`wrote ${positionals.length} icon(s) to ${join(values.out, 'lucide')}`);
