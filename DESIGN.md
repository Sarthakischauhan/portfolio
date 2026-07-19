# Portfolio Design System

This `DESIGN.md` file defines the visual language and design tokens for the portfolio. It serves as the source of truth for both human developers and AI coding agents to ensure a cohesive, highly performant UI.

## Brand & Vibe
The portfolio reflects a precise, modern, and highly technical engineering background, drawing on experience building robust design systems and complex full-stack workflows in Go, Python, and TypeScript. 

The aesthetic features a deep monochromatic base—utilizing varying shades of black and dark gray—paired with desaturated, "dusty" accent colors. This muted approach ensures excellent code readability and a sophisticated UI while efficiently showcasing architectural decisions, RAG pipelines, and vector database integrations without visual clutter.

## Colors
The core UI palette relies entirely on contrast (brightness and darkness of grays) to maintain a minimal aesthetic. The muted accents are reserved exclusively for code syntax, tags, and subtle interactive states.

```yaml
colors:
  # Monochromatic Base
  background: "#0A0A0A"
  surface: "#171717"
  overlay: "#262626"
  foreground: "#EDEDED"
  subtext: "#A3A3A3"
  comment: "#737373"
  border: "#525252"
  
  # Muted Accents
  accent-rose: "#db6767"
  accent-indigo: "#6374d0"
  accent-sage: "#799e7c"
  accent-mustard: "#cda059"
  accent-teal: "#5a9a95"
  accent-terracotta: "#d08a61"
  accent-dustyblue: "#8ca0cc"
```

## Typography
The typography system uses a clean, geometric sans-serif for UI elements and a strict monospace font for code snippets and engineering metrics.

```yaml
typography:
  headline-display: "700 48px/1.2 'Inter', sans-serif"
  headline-lg: "600 32px/1.3 'Inter', sans-serif"
  headline-md: "600 24px/1.4 'Inter', sans-serif"
  body-lg: "400 18px/1.6 'Inter', sans-serif"
  body-md: "400 16px/1.5 'Inter', sans-serif"
  body-sm: "400 14px/1.5 'Inter', sans-serif"
  code-md: "400 14px/1.5 'JetBrains Mono', monospace"
```

## Spacing & Grid
The application relies on a strict 4px/8px baseline rhythm to ensure predictable vertical scaling and horizontal alignment across all breakpoints.

```yaml
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "64px"
```

## Shapes
Interactive components utilize subtle border radii. We avoid completely sharp corners to keep the UI modern, but keep the radii relatively tight (`8px`) to maintain a structured, engineering-focused layout.

```yaml
rounded:
  none: "0px"
  sm: "4px"
  md: "8px"
  lg: "12px"
  full: "9999px"
```

## Component Tokens
Composite tokens for standard UI elements. They rely on the monochromatic base with subtle border treatments for separation.

```yaml
components:
  button-primary:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.background}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    border: "1px solid {colors.border}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  
  project-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    border: "1px solid {colors.border}"
    
  tech-badge:
    backgroundColor: "{colors.overlay}"
    textColor: "{colors.foreground}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
    padding: "{spacing.xs} {spacing.sm}"
```

## Code Block Theme Map
This defines the syntax highlighting rules mapped directly to our muted palette.

```ts
import type { CodeTheme } from "../types";

export const portfolioMutedTheme: CodeTheme = {
  name: "portfolio-muted",
  shikiTheme: "github-dark",
  colors: {
    background: "#0A0A0A", // Deepest black for the code block base
    foreground: "#EDEDED", // Off-white for standard text
    comment: "#737373",    // Muted mid-gray so it recedes
    keyword: "#db6767",    // Muted rose red for keywords
    string: "#799e7c",     // Desaturated sage green for strings
    function: "#6374d0",   // Soft indigo for function calls
    variable: "#EDEDED",   // Matches foreground
    number: "#d08a61",     // Muted terracotta/orange for numbers
    operator: "#6b6b6b",   // Dark gray, but light enough to read
    punctuation: "#525252",// Darker gray to stay out of the way
    type: "#cda059",       // Muted mustard yellow for types/interfaces
    tag: "#5a9a95",        // Soft teal for HTML/JSX tags
    attribute: "#8ca0cc",  // Light, dusty blue for attributes
    constant: "#d08a61",   // Matches number (terracotta)
    surface: "#171717",    // Slightly elevated background for inline code or borders
    overlay: "#262626",    // Lighter gray for text selection or hover states
    subtext: "#A3A3A3",    // Medium gray for secondary info
  },
};
```