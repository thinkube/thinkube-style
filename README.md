# Thinkube Style

A React component library for Thinkube applications, and a style-guide app that shows every component. Built with Vite, Tailwind CSS and shadcn/ui.

## What it does

- **Component library.** 65 React components, all named with the `Tk`
  prefix, in category folders under `components/`. They are built on
  shadcn/ui (`components/ui/`) and Radix UI primitives.
- **Theme tokens.** `styles.css` defines the light and dark colour tokens
  and the fonts. Every project that uses the library imports this file.
- **Theme switch.** `TkThemeProvider`, `useTkTheme` and `TkThemeToggle`
  (`components/theme/`) set the theme to light, dark or the system setting,
  with the `light` or `dark` class on the root element.
- **Style-guide app.** `app/` is a Vite app with one page per category and
  live examples of each component. `npm run build` writes it to
  `demo-dist/`, and `Containerfile.jinja` serves it with nginx.
- **Migration documentation.** Guides for moving from Vue + DaisyUI to
  React + shadcn/ui (see [Documentation](#documentation)).

## How it reaches a user

It reaches a user in two ways. It is not installed on its own.

- **As a GitHub dependency.** thinkube-control, the Thinkube installer, and
  the templates tkt-webapp-react-fastapi, tkt-docling and tkt-seaweedfs list
  it in their `package.json` as `"thinkube-style": "github:thinkube/thinkube-style"`.
  It is not published to a package registry. When a project installs its
  dependencies, the `prepare` script builds the library into `dist/`.
- **As a template.** The style-guide app is on the Templates page of
  thinkube-control (`repositories.json` in thinkube-metadata, type
  `application_template`). Deploying it builds the container from
  `Containerfile.jinja` and serves the app on `/`, with `/health` for the
  health check (`thinkube.yaml`, `nginx.conf`).

See [Thinkube](https://github.com/thinkube/thinkube) for the platform.

## Usage

### Important: Direct Imports Only

Due to circular dependency issues with barrel exports, always import components directly from their category folders:

```typescript
// ✅ CORRECT - Direct imports
import { TkButton, TkBadge } from 'thinkube-style/components/buttons-badges'
import { TkCard, TkCardHeader } from 'thinkube-style/components/cards-data'
import { TkInput, TkLabel } from 'thinkube-style/components/forms-inputs'

// ❌ WRONG - Don't use main barrel export
import { TkButton } from 'thinkube-style'
```

`components/index.ts` still re-exports every component, and `package.json`
maps `thinkube-style` to it. Do not import from it: use the category paths
(`thinkube-style/components/<category>`).

### Component Categories

- **buttons-badges**: Buttons, badges, loading buttons, GPU badge
- **cards-data**: Cards, stat cards
- **component-cards**: Component card
- **data-viz**: Health chart, semicircular gauge, metrics card
- **forms-inputs**: Inputs, password input, textarea, selects, checkboxes, radio groups, switches, file input, drop zone
- **tables**: Table components
- **modals-overlays**: Dialogs, confirm dialog, tooltips
- **navigation**: Vertical navigation, breadcrumbs, dropdown menu, tabs, folder tabs
- **progress**: Progress bars, subway progress, step list, dot progress
- **feedback**: Alerts, loaders, status indicator, code block, toasts
- **brand-icons**: Thinkube brand icons
- **service-cards**: Service card
- **playbook-executor**: Playbook executor with its log
- **theme**: Theme provider and theme toggle
- **utilities**: Separators, avatars, page wrapper, app header

`TkAppLayout` is in `components/TkAppLayout.tsx`.

### Example Usage

```tsx
import { TkButton } from 'thinkube-style/components/buttons-badges'
import { TkCard, TkCardHeader, TkCardTitle } from 'thinkube-style/components/cards-data'

export function MyComponent() {
  return (
    <TkCard>
      <TkCardHeader>
        <TkCardTitle>Welcome to Thinkube</TkCardTitle>
      </TkCardHeader>
      <TkButton onClick={() => console.log('Clicked!')}>
        Get Started
      </TkButton>
    </TkCard>
  )
}
```

## Design System

### Colors

All components use the CSS variables in `styles.css`. Each has a light value
(`:root`) and a dark value (`.dark`), and a `-foreground` variable for text
on it:

```css
--primary              /* Thinkube teal */
--brand-secondary      /* Thinkube orange (#FF6B35), with white on it */
--brand-secondary-text /* orange as text or a thin line */
--success              /* green states */
--warning              /* yellow states */
--destructive          /* red states */
--info                 /* blue states */
--background, --foreground, --card, --popover, --secondary,
--muted, --accent, --border, --input, --ring, --radius
```

`--secondary` and `--accent` are neutral surfaces, not the orange. The dark
values follow the Thinkube Dark theme of the IDE. The Tailwind theme
(`app/globals.css`) maps each variable to a `--color-*` name, for example
`--color-primary` and `--color-brand-secondary`, so Tailwind classes such as
`bg-primary` use them.

### Typography

- **All text**: Poppins (`--font-poppins`)
- **Code**: Noto Sans Mono (`--font-noto-sans-mono`)

## Documentation

### Migration Guides

- [Component Mapping](COMPONENT_MAPPING.md) - DaisyUI to shadcn/ui component mappings
- [Design Patterns](DESIGN_PATTERNS.md) - When to create Tk components
- [Code Quality Rules](CODE_QUALITY_RULES.md) - Standards and best practices
- [Migration Strategy](MIGRATION_STRATEGY.md) - Step-by-step migration process

## Tech Stack

- **Vite 7** - build tool and development server
- **React 19** - UI library
- **Tailwind CSS 4** - utility-first CSS
- **shadcn/ui** - component primitives
- **Radix UI** - accessible component foundation
- **TypeScript 5** - type safety

## Project Structure

```
thinkube-style/
├── app/                   # Style-guide app: one folder per category page
├── components/            # Component library
│   ├── buttons-badges/    # Button components
│   ├── cards-data/        # Card components
│   ├── forms-inputs/      # Form components
│   ├── ui/                # shadcn/ui primitives
│   └── ...                # Other categories
├── lib/                   # Utility functions
├── public/                # Static files for the app
├── styles.css             # Theme tokens and base styles
├── Containerfile.jinja    # Container for the style-guide app
└── thinkube.yaml          # Deployment of the style-guide app
```

## Working on it

### Running the Demo Application

```bash
# Clone the repository
git clone https://github.com/thinkube/thinkube-style.git

# Install dependencies
cd thinkube-style
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see all components in action.

### Other scripts

- `npm run build:lib` - build the library into `dist/` (also run by `prepare`)
- `npm run build` - build the style-guide app into `demo-dist/`
- `npm run preview` - serve the built app
- `npm run lint` - run ESLint

### Contributing

This is a Thinkube internal project. For contributions:

1. Create a feature branch
2. Make your changes
3. Ensure all components follow the Tk prefix convention
4. Submit a pull request

## Related Projects

- [thinkube-installer](https://github.com/thinkube/thinkube-installer) - Thinkube installer application
- [thinkube-control](https://github.com/thinkube/thinkube-control) - Thinkube control panel

## License

Copyright Alejandro Martínez Corriá and the Thinkube contributors

Licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE) file for details.
