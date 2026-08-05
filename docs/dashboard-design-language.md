# SnippetFlow Dashboard — Design Language & Blueprint

> Milestone D1.3.1
> Status: `established`
>
> This document is the single source of truth for the Dashboard application visual language.
> Every future Dashboard milestone (Sidebar, Top Navigation, Cards, Home, etc.) MUST follow it.
>
> The Landing Page is a separate interface with its own existing design language.
> These two MUST never merge.

---

## 1. Dashboard Design Goal

The Dashboard is a **desktop SaaS application** — a premium, professional productivity workspace.

| Principle     | Meaning                                                          |
| ------------- | ---------------------------------------------------------------- |
| Modern        | Current, purposeful UI patterns                                   |
| Premium       | Polished details, refined surfaces                               |
| Professional  | Calm, trustworthy, work-focused                                  |
| Clean         | Low visual noise, no clutter                                     |
| Minimal       | Only what is needed                                               |
| Spacious      | Generous whitespace, breathing room                               |
| Dark Theme    | Very dark navy surfaces                                           |
| Readable      | Clear hierarchy, comfortable type                                  |
| Consistent    | One system, reused everywhere                                     |

Never build a flashy, gaming, or colorful interface.

---

## 2. Dashboard Blueprint

Every future Dashboard page follows this fixed structure.

### 2.1 Overall Layout

```
+--------------------------------------------------------------+
|                        Dashboard                              |
+----------------+---------------------------------------------+
|                |  Top Navigation                             |
|                |  Search | Import | New Snippet | Theme |     |
|                |  Notifications | User Avatar                |
|   Sidebar      +---------------------------------------------+
|                |  Workspace Header                           |
|                |  Title + Description                        |
|                +---------------------------------------------+
|                |  Quick Actions                              |
|                |  [ Card ] [ Card ] [ Card ]                 |
|                +---------------------------------------------+
|                |  Continue Working | Recent Activity         |
|                |  [ Large Card ]   [ Large Card ]            |
|                +---------------------------------------------+
|                |  Collections | Helpful Resources            |
|                |  [ Card ]    | [ Card ]                     |
|                +---------------------------------------------+
+----------------+---------------------------------------------+
```

### 2.2 Sidebar (fixed, identical on every page)

- Workspace Switcher
- Dashboard
- Snippets
- Collections
- Shared
- Divider
- Favorites
- Recent
- Archived
- Divider
- Tags
- Divider
- User Profile

### 2.3 Top Navigation (identical on every page)

- Rounded Search
- Import (secondary action)
- New Snippet (primary action)
- Theme Toggle
- Notifications
- User Avatar

### 2.4 Workspace (only this section changes between pages)

- Workspace Header (page title + description)
- Quick Actions
- Continue Working
- Recent Activity
- Collections
- Helpful Resources

> Sidebar and Top Navigation remain identical across all pages.
> Only the Workspace Content changes.

---

## 3. Visual Design Specification

### 3.1 Surfaces

- **Background**: very dark navy.
- **Workspace**: slightly lighter than background.
- **Cards**: sit above the background using subtle elevation.

### 3.2 Cards

- Rounded
- Soft border (1px, low contrast)
- Soft shadow
- Comfortable padding
- Spacious layout

### 3.3 Buttons

| Kind      | Style                                            |
| --------- | ------------------------------------------------ |
| Primary   | Blue, rounded, medium height                     |
| Secondary | Transparent, bordered, hover surface             |

### 3.4 Search

- Rounded
- Large
- Leading icon
- Dark surface

### 3.5 Sidebar

- Fixed width
- Dark surface
- Rounded edges
- Active navigation indicator
- Hover highlight

### 3.6 Top Navigation

- Sticky
- Clean
- Balanced spacing
- Comfortable padding

### 3.7 Whitespace

Use generous spacing. Avoid crowded layouts. The interface must breathe.

---

## 4. Design Tokens

Token sources (existing, reused — never duplicated):

- `lib/design/tokens.ts` — durations, springs, easings, z-index
- `lib/design/motion.ts` — motion presets (fadeIn, fadeInUp, scaleIn, dropdownPreset, cardHover, etc.)
- `app/globals.css` `:root` / `.dark` — color tokens (`--background`, `--card`, `--primary`, `--muted-foreground`, `--border`, `--success`, `--warning`, `--destructive`, `--radius`, `--shadow-*`)

### 4.1 Typography

- Use the **existing project font** (Geist via `next/font`; `--font-sans`, `--font-heading`).
- Dashboard typography only. Never introduce another typography system.

| Level          | Size  | Weight      |
| -------------- | ----- | ----------- |
| Heading        | Large | Bold        |
| Section Title  | Medium| Semi Bold   |
| Body           | Normal| Normal      |
| Caption        | Small | Normal      |

### 4.2 Spacing

One spacing scale only:

```
4  8  12  16  20  24  32  40  48
```

No arbitrary spacing.

### 4.3 Radius

| Element | Radius   |
| ------- | -------- |
| Cards   | 16px     |
| Buttons | 12px     |
| Inputs  | 12px     |
| Badges  | Fully rounded |

### 4.4 Shadows

- Soft, professional.
- No heavy shadows.
- Hover elevation only.

### 4.5 Borders

- 1px
- Subtle
- Low contrast

### 4.6 Color

| Role            | Value                                        |
| --------------- | -------------------------------------------- |
| Background      | Very dark navy                               |
| Surface         | Slightly lighter than background             |
| Primary         | Professional blue                            |
| Secondary text  | Muted gray                                   |
| Borders         | Low contrast                                 |
| Success         | Green                                        |
| Warning         | Orange                                       |
| Error           | Red                                          |

### 4.7 Motion

- Professional, subtle.
- Applies to: hover, focus, sidebar, dropdown, cards, theme transitions.
- No flashy animations.
- Reuse `lib/design/motion.ts` presets and `lib/design/tokens.ts` values.

---

## 5. Design Rules

1. **One design system for the Dashboard** — no parallel styles, no ad-hoc variants.
2. **Reuse components** — never duplicate components that already exist.
3. **Consistent spacing** — use the 4–8–12–16–20–24–32–40–48 scale only.
4. **Consistent radius** — 16px cards, 12px buttons/inputs, full badges.
5. **Subtle everything** — soft shadows, low-contrast borders, gentle motion.
6. **Sidebar and Top Navigation are fixed** — identical on every Dashboard page.
7. **Only the Workspace Content changes** between pages.
8. **Typography**: use the existing project font; keep the heading/section/body/caption hierarchy.

---

## 6. CSS Isolation

- Dashboard styling MUST remain inside Dashboard components.
- Landing styling MUST remain inside Landing components.
- Avoid modifying `globals.css`.
- Avoid changing shared styles that affect the Landing Page.
- Dashboard CSS must never leak into the Landing Page.
- Landing CSS must never leak into the Dashboard.

---

## 7. Independence From the Landing Page

The Landing Page is a marketing website with its own existing design language, typography,
animations, and styling. It MUST remain pixel-identical and completely independent from the
Dashboard. Do NOT modify Landing components, styling, or animations.

---

## 8. Existing Architecture

Respect the existing architecture:

- Do NOT move or rename folders.
- Do NOT change routing.
- Do NOT change feature ownership.
- Do NOT create another architecture.
- Only extend the current structure.
