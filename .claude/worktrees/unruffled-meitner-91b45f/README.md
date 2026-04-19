# Thinkube Style

A comprehensive React component library and style guide for Thinkube applications, built with Vite 5 and shadcn/ui.

## 🎯 Purpose

This repository serves two critical functions:

1. **Component Library**: 56+ Tk-prefixed React components for Thinkube applications
2. **Migration Guide**: Complete documentation for migrating from Vue + DaisyUI to React + shadcn/ui

## ✨ Features

- **56+ Thinkube Components**: All prefixed with `Tk` for easy identification
- **shadcn/ui Foundation**: Built on top of Radix UI primitives
- **Direct Import Pattern**: Avoids barrel export issues for better tree-shaking
- **Complete Demo Application**: Live examples of every component
- **Migration Documentation**: Step-by-step guides for Vue to React conversion
- **Apache 2.0 Licensed**: Open source and enterprise-friendly

## 📦 Installation

Install directly from GitHub in your Thinkube projects:

```bash
npm install github:thinkube/thinkube-style
```

Or using yarn:

```bash
yarn add github:thinkube/thinkube-style
```

## 🚀 Usage

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

### Component Categories

- **buttons-badges**: Buttons, badges, loading states
- **cards-data**: Cards, stats cards, highlight cards
- **forms-inputs**: Inputs, selects, checkboxes, switches
- **tables**: Table components
- **modals-overlays**: Dialogs, tooltips, overlays
- **navigation**: Navigation components
- **progress**: Progress bars, step indicators
- **feedback**: Alerts, loaders, status messages
- **brand-icons**: Thinkube brand icons
- **service-cards**: Complex service card components
- **utilities**: Separators, avatars, helpers

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

## 🎨 Design System

### Colors

All components use CSS variables for consistent theming:

```css
--color-primary: Thinkube teal
--color-accent: Thinkube orange
--color-success: Green states
--color-warning: Yellow states
--color-error: Red states
--color-info: Blue states
```

### Typography

- **Headings**: Roboto Slab
- **Body**: Poppins

## 📚 Documentation

### Migration Guides

- [Component Mapping](COMPONENT_MAPPING.md) - DaisyUI to shadcn/ui component mappings
- [Design Patterns](DESIGN_PATTERNS.md) - When to create Tk components
- [Code Quality Rules](CODE_QUALITY_RULES.md) - Standards and best practices
- [Migration Strategy](MIGRATION_STRATEGY.md) - Step-by-step migration process

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

## 🏗️ Tech Stack

- **Vite 5.0.1** - React framework with Turbopack
- **React 19.2.0** - UI library
- **Tailwind CSS 4.1** - Utility-first CSS
- **shadcn/ui** - Component primitives
- **Radix UI** - Accessible component foundation
- **TypeScript 5** - Type safety

## 📂 Project Structure

```
thinkube-style/
├── src/                    # Demo application pages
│   ├── [ComponentName].tsx           # Homepage
│   ├── buttons-badges/    # Button demos
│   ├── cards-data/        # Card demos
│   └── ...                # Other demo pages
├── components/            # Component library
│   ├── buttons-badges/    # Button components
│   ├── cards-data/        # Card components
│   ├── forms-inputs/      # Form components
│   └── ...                # Other categories
├── lib/                   # Utility functions
└── styles/               # Global styles
```

## 🤝 Contributing

This is a Thinkube internal project. For contributions:

1. Create a feature branch
2. Make your changes
3. Ensure all components follow the Tk prefix convention
4. Submit a pull request

## 📄 License

Copyright 2025 Alejandro Martínez Corriá and the Thinkube contributors

Licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE) file for details.

## 🔗 Related Projects

- [thinkube-installer-react](https://github.com/thinkube/thinkube-installer-react) - Thinkube installer application
- [thinkube-control](https://github.com/thinkube/thinkube-control) - Thinkube control panel

## ⚠️ Important Notes

### Barrel Export Issue

The main `components/index.ts` file has barrel exports disabled to prevent circular dependency issues. Always import components directly from their category folders as shown in the usage examples.

### Version 0.1.0

This is an initial release. The API may change in future versions as we refine the component library based on usage in production applications.

---

Built with ❤️ by the Thinkube team