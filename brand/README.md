# Thinkube brand assets

The Thinkube logo and icons are generated from geometric rules. Change the
scripts in this folder, not the SVG files in `public/icons/`.

## What is generated

| Files in `public/icons/` | Made by | Source |
|---|---|---|
| `tk_logo.svg`, `tk_text_logo.svg`, `tk_full_logo.svg` | `build_logo.py` | geometry in the script, Poppins SemiBold |
| `tk_<name>.svg` (ai, code, data, …) | `build_icons.mjs` | symbol drawings in `icons.mjs` |
| `lucide/<name>.svg` | `build_icons.mjs`, `add_lucide.mjs` | Lucide icons stored in `lucide/` |
| `chars/number-<n>.svg`, `chars/lower-<x>.svg`, `chars/upper-<x>.svg` | `build_icons.mjs` | outlines in `chars.json`, from `build_chars.py` |

Every icon is a hexagon with a symbol cut out of it, and all share one set of
rules: the same hexagon, one line thickness, round line ends.

## Commands

Run from the `thinkube-style` folder.

```sh
# Logo (needs Python with fontTools)
python3 brand/build_logo.py

# All hexagon icons: service icons, Lucide icons, characters (needs Node)
node brand/build_icons.mjs

# Add Lucide icons, by their name on lucide.dev
node brand/add_lucide.mjs git-branch cloud-upload

# Character outlines, only after changing build_chars.py or its font
python3 brand/build_chars.py && node brand/build_icons.mjs
```

`add_lucide.mjs` downloads the icons at the `lucide-react` version in
`package.json`, so the hexagon icons show the same drawing as the app.
The downloaded files are stored in `lucide/`; commit them with the generated icons.

## Colour

The files are one colour (`#006680`). Web pages tint them with a CSS mask,
as `TkBrandIcon` does:

```tsx
<TkBrandIcon icon="tk_ai" alt="AI" />
<TkBrandIcon icon="lucide/server" alt="Servers" />
<TkBrandIcon icon="chars/number-42" alt="42" />
```

A program that needs a file in a fixed colour gets one with `--color`, for
example `node brand/build_icons.mjs --color currentColor --out /tmp/icons`.

## Licences

- `fonts/`: Poppins and Quicksand, SIL Open Font License (`OFL-*.txt`).
- `lucide/`: Lucide icons, ISC License (`lucide/LICENSE`).
