# Excursions Greece Marketing Website

## Project Overview
This project is a high-performance marketing website for **Excursions Greece**, a luxury shore excursions and Destination Management Company (DMC). It is built using **Next.js** (App Router), **TypeScript**, and **Tailwind CSS**.

The site serves as a single-page landing page featuring:
-   **Hero Section:** High-impact visuals with a map integration (`MapboxMap`).
-   **Services:** Detailed breakdown of offerings (Shore Excursions, VIP Services, etc.).
-   **Company:** Trust signals, partner cruise lines, and certifications.
-   **Destinations:** Visual showcase of Greek locations.
-   **Contact:** Comprehensive contact information and footer.

## Architecture & Tech Stack

-   **Framework:** Next.js 16 (App Router)
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS (v4)
-   **UI Components:** shadcn/ui (Radix UI primitives + Tailwind)
-   **Icons:** Lucide React
-   **Maps:** Mapbox GL
-   **Fonts:** `next/font` (Manrope, Syne, Sulphur Point, Geist Mono)
-   **Package Manager:** bun (inferred from `bun.lock`), though `package.json` scripts use `npm`/`yarn`/`pnpm` generic commands.

## Key Files & Directories

-   **`src/app/page.tsx`**: The main entry point containing the entire landing page structure and content.
-   **`src/app/layout.tsx`**: Defines the global root layout, including font configurations and metadata.
-   **`src/components/ui/`**: Reusable UI components (Button, Carousel, DropdownMenu) based on shadcn/ui.
-   **`src/components/mapbox/MapboxMap.tsx`**: Custom component for rendering the interactive map.
-   **`public/images/`**: Stores static assets (images, icons) used throughout the site.
-   **`DESIGN.md`**: Contains the design brief and aesthetic direction (though primarily a template).

## Building and Running

### Prerequisites
-   Node.js (v20+ recommended)
-   Bun (optional, but `bun.lock` is present)

### Development
To start the development server:

```bash
npm run dev
# or
bun dev
```

The site will be available at `http://localhost:3000`.

### Build
To build the application for production:

```bash
npm run build
```

### Start Production Server
To start the production server after building:

```bash
npm run start
```

### Linting
To run the linter:

```bash
npm run lint
```

## Development Conventions

-   **Styling:** Use Tailwind CSS utility classes. Avoid custom CSS files unless necessary (see `src/app/globals.css`).
-   **Components:** Prefer using/extending existing components in `src/components/ui` for consistency.
-   **Icons:** Use `lucide-react` for vector icons.
-   **Images:** Assets are currently referenced from `public/images/figma/` and some hardcoded `localhost` URLs (likely from a design tool export). **Note:** Ensure external/localhost image references are updated for production.
-   **Fonts:** Fonts are managed via `next/font/google` in `layout.tsx` and applied via CSS variables (e.g., `font-[var(--font-syne)]`).

## Notes
-   The project appears to be a direct translation from a Figma design, with some assets still pointing to local servers or placeholders.
-   `MapboxMap` requires a valid Mapbox token (check `.env` or component implementation).
