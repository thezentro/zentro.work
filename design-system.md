# Zentro Works — Design System

> This document is the single source of truth for every future page of the Zentro Works website.
> All decisions documented here must be followed exactly.

---

## 1. Brand Identity

Zentro Works is a modern technology company — not an agency. Every visual decision should communicate:
- Corporate precision
- Technical excellence
- Quiet confidence
- Timeless professionalism

Reference benchmarks: Apple (typography + space), Stripe (layout clarity), Notion (simplicity).

---

## 2. Colour Palette

| Token             | Hex       | Usage                                  |
|-------------------|-----------|----------------------------------------|
| `--color-bg`      | `#FFFFFF` | Default page background                |
| `--color-bg-alt`  | `#F8FAFC` | Alternate section background           |
| `--color-bg-dark` | `#0F172A` | Footer, dark CTA section               |
| `--color-blue`    | `#2563EB` | Primary accent, CTAs, links            |
| `--color-blue-light` | `#EFF6FF` | Tinted backgrounds, badge fills     |
| `--color-blue-mid` | `#DBEAFE` | Hover states, subtle highlights       |
| `--color-text`    | `#0F172A` | Primary body text                      |
| `--color-text-muted` | `#64748B` | Secondary text, captions            |
| `--color-border`  | `#E2E8F0` | Borders, dividers                      |
| `--color-shadow`  | `rgba(15,23,42,0.06)` | Card shadows                |

**Rules:**
- Never use gradients except on the hero logo visual
- Never use neon, glassmorphism, or cyberpunk effects
- Blue appears only as accent — never as full-page background
- Dark sections use `--color-bg-dark` only

---

## 3. Typography

### Fonts
- **Sora** — Headings, display text, navigation brand
- **Inter** — Body, captions, UI labels, navigation links

Import via Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

### Scale (8pt base)

| Token          | Size     | Weight | Font  | Usage                     |
|----------------|----------|--------|-------|---------------------------|
| `--text-xs`    | 12px     | 500    | Inter | Labels, badges            |
| `--text-sm`    | 14px     | 400    | Inter | Captions, footnotes       |
| `--text-base`  | 16px     | 400    | Inter | Body text                 |
| `--text-lg`    | 18px     | 500    | Inter | Lead paragraphs           |
| `--text-xl`    | 20px     | 600    | Sora  | Card headings             |
| `--text-2xl`   | 24px     | 700    | Sora  | Section headings (mobile) |
| `--text-3xl`   | 32px     | 700    | Sora  | Section headings          |
| `--text-4xl`   | 48px     | 800    | Sora  | Hero headline (mobile)    |
| `--text-5xl`   | 64px     | 800    | Sora  | Hero headline             |

**Line height:** 1.2 for headings, 1.7 for body.
**Letter spacing:** -0.02em for large headings, 0.05em for badges/labels.

---

## 4. Spacing System (8pt)

| Token    | Value | Usage                          |
|----------|-------|--------------------------------|
| `--s-1`  | 8px   | Inner padding (tight)          |
| `--s-2`  | 16px  | Component padding              |
| `--s-3`  | 24px  | Card padding                   |
| `--s-4`  | 32px  | Section internal gap           |
| `--s-5`  | 40px  | Large component gap            |
| `--s-6`  | 48px  | Section vertical padding       |
| `--s-8`  | 64px  | Section top/bottom padding     |
| `--s-10` | 80px  | Large section padding          |
| `--s-12` | 96px  | XL section padding             |
| `--s-16` | 128px | Max section padding            |

---

## 5. Layout & Grid

- **Max content width:** 1280px
- **Container padding:** 24px on mobile, 48px on desktop
- **Grid:** 12-column, with `gap: 32px`
- Every section must breathe — minimum 80px top and bottom padding

---

## 6. Shadows

```css
--shadow-sm: 0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
--shadow-md: 0 4px 16px rgba(15,23,42,0.08), 0 1px 4px rgba(15,23,42,0.04);
--shadow-lg: 0 16px 48px rgba(15,23,42,0.10), 0 4px 16px rgba(15,23,42,0.06);
```

Never use colored or dark shadows. Shadow is almost invisible — only visible on hover.

---

## 7. Borders

```css
--border: 1px solid #E2E8F0;
--border-radius-sm: 8px;
--border-radius-md: 12px;
--border-radius-lg: 16px;
--border-radius-xl: 24px;
--border-radius-full: 9999px;
```

---

## 8. Buttons

### Primary
```css
background: #2563EB;
color: #FFFFFF;
padding: 14px 28px;
border-radius: 9999px;
font: 600 15px Inter;
transition: all 0.2s ease;
```
Hover: `background: #1D4ED8; box-shadow: 0 8px 24px rgba(37,99,235,0.3);`

### Secondary / Ghost
```css
background: transparent;
color: #0F172A;
border: 1px solid #E2E8F0;
padding: 14px 28px;
border-radius: 9999px;
font: 600 15px Inter;
```
Hover: `border-color: #2563EB; color: #2563EB;`

---

## 9. Cards

```css
background: #FFFFFF;
border: 1px solid #E2E8F0;
border-radius: 16px;
padding: 32px;
box-shadow: 0 1px 3px rgba(15,23,42,0.06);
transition: all 0.25s ease;
```
Hover: `box-shadow: 0 16px 48px rgba(15,23,42,0.10); transform: translateY(-2px);`

---

## 10. Icons

- Line-style SVG icons only
- Size: 24px default, 20px in dense UI, 32px in feature sections
- Color: `#2563EB` for highlighted icons, `#64748B` for secondary
- Always inside a 56px × 56px container with `background: #EFF6FF; border-radius: 12px;`

---

## 11. Animations

All animations follow one rule: **they must feel like physics, not decoration.**

| Animation       | Duration | Easing            | Trigger         |
|-----------------|----------|-------------------|-----------------|
| Fade in up      | 600ms    | `ease-out`        | Scroll into view|
| Card hover lift | 250ms    | `ease`            | Mouse enter     |
| Button hover    | 200ms    | `ease`            | Mouse enter     |
| Navbar scroll   | 300ms    | `ease`            | Scroll event    |
| Hero float      | 4s       | `ease-in-out`     | Continuous loop |
| Link underline  | 200ms    | `ease`            | Mouse enter     |

Use Intersection Observer for scroll-triggered animations. Never use libraries.

---

## 12. Navigation

```
Logo | Links (Home Services Portfolio About Contact) | CTA Button
```

- Transparent background + white text on load
- White background + dark text after 60px scroll
- Sticky position, z-index: 1000
- Height: 72px
- Transition: background 300ms ease, box-shadow 300ms ease

---

## 13. Accessibility

- All interactive elements have `:focus-visible` outlines
- Minimum touch target: 44px × 44px
- Color contrast ratio: ≥ 4.5:1 for body text, ≥ 3:1 for large text
- Images have descriptive `alt` attributes
- Landmarks: `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`
- Headings follow strict H1 → H2 → H3 hierarchy

---

## 14. SEO Checklist

- Single `<h1>` per page
- Meta title: 50–60 characters
- Meta description: 150–160 characters
- Open Graph: title, description, image, url, type
- Twitter Card: summary_large_image
- Canonical URL

---

## 15. Coding Rules

- CSS custom properties (variables) for all tokens — never hardcode values
- Mobile-first responsive breakpoints: 480px, 768px, 1024px, 1280px
- No inline styles except dynamic JS
- Class naming: BEM-inspired, kebab-case (`.hero__title`, `.service-card`)
- JavaScript: `const` and `let` only, no `var`
- Semantic HTML5 elements — never use `<div>` where a semantic element fits
- Comments only for non-obvious logic

---

## 16. Future Page Rules

Every new page must:
1. Import this design system's CSS variables
2. Use only the typefaces defined here
3. Follow the spacing scale exactly
4. Match the navigation component exactly
5. Match the footer component exactly
6. Include the full SEO meta block
7. Animate with Intersection Observer scroll reveals
8. Be responsive at all four breakpoints
