# Design System Document: The Ethereal Atelier

## 1. Overview & Creative North Star
**Creative North Star: "The Modern Maqam"**
This design system moves beyond the "modest fashion" trope of heavy patterns and predictable layouts. Instead, we embrace a high-end editorial experience that feels like a digital sanctuary. We define the space through **The Modern Maqam**—a philosophy of rhythmic structure, intentional pause (whitespace), and tonal depth.

To achieve a signature premium feel, we break the "standard template" look by utilizing:
*   **Intentional Asymmetry:** Overlapping image containers and staggered text alignments to mimic a physical fashion lookbook.
*   **The Breathable Grid:** Utilizing 24px+ (8.5rem) margins to frame content, treating the mobile screen as a curated gallery wall rather than a dense marketplace.
*   **Typographic Tension:** A dramatic scale contrast between sweeping Display headers and petite, high-kerning Labels.

---

## 2. Colors & Surface Philosophy
The palette is a dialogue between sand, silk, and sunlight. We do not use "lines" to define space; we use "light."

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders for sectioning or containment. Boundaries must be defined solely through background color shifts. A section should transition from `surface` (#fbfbe2) to `surface-container-low` (#f5f5dc) to signal a change in context.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine linen.
*   **Base:** `surface` (#fbfbe2)
*   **Nested Elements:** Place `surface-container-lowest` (#ffffff) cards on `surface-container-low` (#f5f5dc) sections to create a soft, natural lift.
*   **Signature Textures:** Use a subtle linear gradient (Top-Left to Bottom-Right) from `primary` (#735c00) to `primary-container` (#d4af37) for primary CTAs to give them a "metallic silk" finish.

### Glassmorphism
For floating navigation bars or quick-buy overlays, use `surface` at 80% opacity with a `20px` backdrop-blur. This allows the high-quality fashion imagery to bleed through the UI, maintaining a sense of continuity.

---

## 3. Typography
Our typography is the "Voice of the Atelier." It balances the architectural strength of **Manrope** with the fluid readability of **Be Vietnam Pro**.

*   **Display & Headlines (Manrope):** Large, confident, and editorial. Use `display-lg` (3.5rem) for hero statements. These should feel like magazine mastheads.
*   **Body & Titles (Be Vietnam Pro):** Chosen for its exceptional legibility at small sizes and its clean, modern curves that complement Arabic script.
*   **The Arabic Pairing:** Pair English headlines with **Noto Naskh Arabic** or **Amiri**. The Arabic should be sized 15-20% larger than the English counterpart to match visual weight and preserve its calligraphic elegance.
*   **Hierarchy Note:** Use `label-sm` (0.6875rem) with `0.1em` letter-spacing for category tags—this high-kerning approach signals a luxury "boutique" brand.

---

## 4. Elevation & Depth
Depth in this system is atmospheric, not structural.

*   **The Layering Principle:** Avoid shadows where color shifts can do the work. A `surface-container-highest` (#e4e4cc) button on a `surface` (#fbfbe2) background provides enough contrast for premium interaction without visual clutter.
*   **Ambient Shadows:** When a card must "float" (e.g., a featured product), use a shadow color tinted with the `on-surface` color (#1b1d0e) at 6% opacity. 
    *   *Spec:* `0px 20px 40px rgba(27, 29, 14, 0.06)`
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use `outline-variant` (#d0c5af) at 20% opacity. **Never use 100% opaque borders.**

---

## 5. Components

### Cards
*   **Style:** Minimum `xl` (1.5rem/24px) corner radius.
*   **Rule:** Forbid divider lines. Separate product info from imagery using vertical white space (`spacing-4` / 1.4rem).
*   **Imagery:** Images should be "Full-Bleed" within the card or use asymmetrical aspect ratios (e.g., 4:5) to feel like a fashion editorial.

### Buttons
*   **Primary:** A gradient of `primary` to `primary-container` with `on-primary` text. `full` (9999px) roundedness for a soft, modern touch.
*   **Secondary:** `surface-container-highest` background with `on-surface` text. No border.
*   **Tertiary:** Text-only in `primary` (#735c00) with `label-md` styling.

### Inputs & Fields
*   **Style:** Use `surface-container-low` as the field background. 
*   **States:** On focus, the background shifts to `surface-container-lowest` (#ffffff) with a subtle `primary` (#735c00) "Ghost Border" (20% opacity).

### Chips (Filters)
*   **Unselected:** `surface-container-high` background, no border.
*   **Selected:** `primary` background with `on-primary` text.

### Navigation (Mobile-First)
*   **Tab Bar:** Use a glassmorphism effect (80% `surface` + blur). Use custom-drawn, thin-stroke (1.5px) icons. Active state is indicated by a subtle `primary` dot below the icon, never a heavy bar.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use overlapping elements. A product image can slightly overlap a `headline-lg` to create 3D depth.
*   **Do** utilize the `spacing-16` (5.5rem) and `spacing-20` (7rem) tokens for major section breaks. Large gaps signal luxury.
*   **Do** prioritize Arabic typography. Ensure line heights for Arabic are 1.6x–1.8x to prevent clipping of diacritics.

### Don’t:
*   **Don't** use pure black (#000000). Always use `on-background` (#1b1d0e) for text to maintain the soft, organic feel.
*   **Don't** use standard "Drop Shadows." If it looks like a default Photoshop shadow, it is too heavy.
*   **Don't** use icons with fills. Use "Linear" (Outlined) icons to maintain the "light and airy" aesthetic.
*   **Don't** use 1px dividers. If you feel the need for a divider, increase the `spacing` token instead.
