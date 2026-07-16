---
name: Luxe Velocity
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1b1b1d'
  surface-container: '#201f21'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#d0c6ab'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#303032'
  outline: '#999077'
  outline-variant: '#4d4732'
  surface-tint: '#e9c400'
  primary: '#fff6df'
  on-primary: '#3a3000'
  primary-container: '#ffd700'
  on-primary-container: '#705e00'
  inverse-primary: '#705d00'
  secondary: '#c8c5cb'
  on-secondary: '#303034'
  secondary-container: '#47464b'
  on-secondary-container: '#b6b4b9'
  tertiary: '#f8f5fb'
  on-tertiary: '#303034'
  tertiary-container: '#dbd9de'
  on-tertiary-container: '#5f5e63'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe16d'
  primary-fixed-dim: '#e9c400'
  on-primary-fixed: '#221b00'
  on-primary-fixed-variant: '#544600'
  secondary-fixed: '#e4e1e7'
  secondary-fixed-dim: '#c8c5cb'
  on-secondary-fixed: '#1b1b1f'
  on-secondary-fixed-variant: '#47464b'
  tertiary-fixed: '#e4e1e7'
  tertiary-fixed-dim: '#c8c5cb'
  on-tertiary-fixed: '#1b1b1f'
  on-tertiary-fixed-variant: '#47464b'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  stack-xl: 64px
---

## Brand & Style

The design system is engineered to evoke a sense of high-performance luxury and effortless prestige. Targeting a discerning clientele of executives and enthusiasts, the visual language balances the precision of high-end automotive engineering with the digital sophistication of modern productivity tools.

The style is a refined hybrid of **Minimalism** and **Glassmorphism**. It prioritizes extreme clarity through generous whitespace and a restricted palette, while using depth and transparency to create a premium, tactile feel. Every interaction should feel smooth, intentional, and high-fidelity, mirroring the experience of operating a luxury vehicle.

## Colors

This design system utilizes a "Graphite & Gold" palette to establish immediate authority. The core background is a deep, matte Graphite (#121214), providing a high-contrast foundation for content. 

The primary accent is Golden Yellow (#FFD700), used sparingly for calls to action, status indicators, and premium highlighting. Surface levels are defined by varying degrees of transparency rather than flat grays, allowing the background to subtly bleed through and create a cohesive, layered environment.

## Typography

The design system employs **Plus Jakarta Sans** for its modern, geometric clarity and approachable curves. Headlines utilize tight letter-spacing and bold weights to mimic the branding found on luxury automotive instrumentation.

For body copy, line height is kept generous to ensure legibility against the dark background. Labels and auxiliary information use uppercase styling with increased tracking to create a sense of architectural structure and precision.

## Layout & Spacing

The layout philosophy is based on a **Fluid Grid** with fixed maximum constraints. On desktop, a 12-column grid provides the structure for complex filtering and car galleries, while mobile transitions to a 4-column single-stack view.

Spacing is intentionally expansive. The "stack-xl" unit is used between major sections to prevent visual clutter, maintaining the minimalist aesthetic. Margins are generous, pushing content toward the center to create a focused, editorial feel. Use the 8px base unit for all component-level padding and alignment.

## Elevation & Depth

Depth in this design system is achieved through **Glassmorphism** and subtle luminescence rather than traditional shadows. 

1.  **Base Layer:** The Graphite background (#121214).
2.  **Surface Layer:** Glassmorphic cards with a 16px backdrop blur, a 1px solid border at 10% white opacity, and a slight background tint (white at 3% opacity).
3.  **Floating Layer:** Primary buttons and active states feature a subtle "Golden Glow"—a low-spread yellow outer glow (10-15% opacity) that suggests energy and activity.

Transitions between states should use a custom cubic-bezier (0.4, 0, 0.2, 1) for a "weighted" feel that mimics high-end mechanical damping.

## Shapes

The shape language is defined by ultra-soft, **Pill-shaped** containers and large radii. This "organic geometry" contrasts with the technical nature of cars, making the software feel more human and luxurious.

- **Primary Containers:** 32px (rounded-xl)
- **Secondary Cards:** 24px (rounded-lg)
- **Buttons & Inputs:** 16px or fully pill-shaped for smaller tags.

Consistent corner smoothing (iOS-style squircles) is encouraged where supported by the platform to enhance the premium feel.

## Components

### Buttons
Primary buttons are solid Golden Yellow with black typography, utilizing 16px corner radii. Secondary buttons use the glassmorphic style with a subtle white border. Interaction states should involve a slight scale-down (0.98) on click to simulate physical resistance.

### Cards (Car Selection)
The car card is the centerpiece. It must feature the glassmorphic treatment with a 1px border. The vehicle image should bleed over the edges or utilize a subtle 3D hover effect to "pop" from the card surface. Data points (Price, Horsepower) should be rendered in the uppercase `label-sm` style.

### Input Fields
Inputs are dark and recessed. Use a 1px border that illuminates in Golden Yellow only when focused. Placeholder text should be `text_secondary` with high transparency.

### Filter Chips
Pill-shaped with a 1px border. Active states swap the border for a solid Golden Yellow stroke and a subtle background glow.

### Narrative Component: The "Concierge" List
Lists should not have dividers. Instead, use vertical spacing and subtle surface-level changes to separate items, creating a seamless, uninterrupted flow of information.