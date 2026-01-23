# Design System: Excursions Greece

## Philosophy: "Aegean Luxury"
The design language reflects the core brand values: **Heritage, Precision, and Exclusive Access**. It moves away from generic "tourist" aesthetics (bright blues and yellows) towards a sophisticated, editorial style.

*   **Keywords:** Bespoke, Editorial, Serene, Trusted.
*   **Anti-Patterns:** No generic stock photo collages, no standard Bootstrap grids, no jarring gradients.

## Color Palette

### Primary
*   **Deep Aegean (`#33305e`):** Used for primary text, backgrounds in contrast sections, and footer. Represents depth, reliability, and the sea at dusk.
*   **Luminous Teal (`#51d2c6`):** The primary accent. Used for active states, buttons, and highlights. Represents the vibrant, shallow waters of the Greek islands.

### Secondary / Neutrals
*   **White (`#ffffff`):** Generous use of white space to create "breathing room" and a luxury feel.
*   **Soft Gray (`#f8f9fa`):** Subtle background variation for content blocks.
*   **Muted Text (`rgba(51, 48, 94, 0.7)`):** For body text, ensuring high readability without the harshness of pure black.

## Typography

### Headings: **Syne**
*   **Usage:** All section titles, hero headlines.
*   **Characteristics:** An art-house geometric sans-serif with unique character. It feels modern, bespoke, and "crafted."

### Subheadings / Accents: **Sulphur Point**
*   **Usage:** "Est. 2013", small labels, sustainability tags.
*   **Characteristics:** Monospaced-ish feel, technical yet human. Adds a "logistical precision" vibe.

### Body: **Manrope**
*   **Usage:** Paragraphs, UI elements, buttons.
*   **Characteristics:** Highly readable, modern sans-serif that works well at all sizes.

## Iconography
*   **Library:** `lucide-react` for UI elements (Arrows, Menu, Contact icons).
*   **Custom Assets:** High-fidelity PNG icons for service categories (Boat, VIP, etc.) to maintain a unique illustrative style not found in standard icon sets.

## Motion & Interaction
*   **Entrance:** Orchestrated `fade-in-up` animations using `tailwindcss-animate`. Elements do not just appear; they "arrive."
*   **Hover States:**
    *   **Cards:** Slight lift (`-translate-y-2`) and shadow deepening.
    *   **Images:** Slow, cinematic zoom (`scale-110` over 8s) to suggest movement and journey.
    *   **Buttons:** Color inversion or fill effects.
*   **Map:** Interactive Mapbox integration with custom styling to match the Deep Aegean theme.

## Layout Principles
1.  **Asymmetry:** Use split layouts (Text/Map, Text/Image) to break the monotony of center-aligned containers.
2.  **Whitespace:** generous padding (`py-24` or `py-32`) between sections. Luxury is defined by space.
3.  **Grids:** Clean, responsive grids for Services and Destinations, ensuring alignment.

## Component Architecture
*   **Base:** Built on Radix UI primitives (via shadcn/ui).
*   **Styling:** Tailwind CSS (v4) for utility-first styling.
*   **Map:** Custom `MapboxMap` component.