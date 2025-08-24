# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a monorepo for @choiceform/design-tokens - a type-safe, W3C-compliant design token system. The project uses pnpm workspaces and consists of:
- `packages/design-tokens/`: Core design tokens library (npm package)
- `packages/examples/`: React example application showcasing the tokens

## Essential Commands

### Development
```bash
# Install dependencies (use pnpm v8+)
pnpm install

# Develop tokens with watch mode
cd packages/design-tokens && pnpm run dev

# Run example app
pnpm run dev  # from root or packages/examples

# Build everything
pnpm run build  # from root
```

### Testing
```bash
# Run all tests
pnpm run test

# Run tests in watch mode
pnpm run test:watch

# Run tests with coverage
pnpm run test:coverage

# Run a single test file
pnpm run test path/to/test.ts
```

### Token-Specific Commands
```bash
# In packages/design-tokens:
pnpm run build:colors    # Build only color tokens
pnpm run build:helpers   # Build helper functions
pnpm run terrazzo        # Transform tokens via Terrazzo
pnpm run terrazzo:watch  # Transform tokens in watch mode
```

### Linting & Type Checking
```bash
# Type check
pnpm run type-check

# The project uses TypeScript strict mode - ensure all code passes type checking
```

## Architecture & Key Concepts

### Design Token Pipeline
1. **TypeScript Primitives** (`packages/design-tokens/tokens/primitives/`) define raw token values
2. **Node.js scripts** convert TypeScript → W3C-compliant JSON
3. **Terrazzo CLI** transforms JSON → multiple output formats (CSS, SCSS, JS, TS)
4. **Custom plugins** generate helper functions and handle special transformations

### Token Categories
- **Colors (243)**: RGB component format, supports opacity via `color()` helper
- **Typography (39)**: Complete font stacks via `typography()` helper
- **Spacing**: Flexible system supporting fractions via `spacing()` helper
- **Shadows (22)**: Theme-aware via `shadow()` helper
- **Breakpoints (6)**: Responsive design utilities
- **Z-index (9)**: Layering system
- **Border Radius (3)**: Consistent corner radii

### Key Architectural Patterns

1. **Smart Aliases**: Tokens use intuitive paths like `background.default` instead of complex hierarchies
2. **Theme Support**: Built-in light/dark modes using CSS custom properties
3. **Helper Functions**: JavaScript/TypeScript functions that match SCSS API exactly
4. **RGB Components**: Colors stored as `{r, g, b}` objects for maximum flexibility
5. **Type Safety**: Full TypeScript support with auto-generated types

### File Organization
```
packages/design-tokens/
├── src/                    # TypeScript source for helpers
├── tokens/
│   ├── primitives/        # Raw token definitions in TypeScript
│   └── *.json            # W3C-compliant token files
├── dist/                  # Built outputs
├── scripts/              # Build scripts
└── terrazzo.config.js    # Terrazzo configuration
```

### Testing Approach
- Unit tests for helper functions and individual token types
- Integration tests for the build pipeline
- Tests use Vitest with global test environment
- Test files co-located with source files or in `__tests__` directories

### Important Notes
- Always use pnpm (not npm or yarn)
- The project uses Node.js 18+ features
- When modifying tokens, run the full build pipeline to ensure all formats are updated
- Token changes require rebuilding before they're reflected in the example app
- The npm package is published publicly as @choiceform/design-tokens