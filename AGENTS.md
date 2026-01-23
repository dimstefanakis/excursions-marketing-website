# Repository Guidelines

## Project Structure & Module Organization
- `src/app/`: Next.js App Router entry points (`layout.tsx`, `page.tsx`) and global styles in `globals.css`.
- `src/lib/`: Shared utilities (e.g., `utils.ts` with the `cn` class name helper).
- `public/`: Static assets served from the site root (e.g., `/images/...`).
- `components.json`: shadcn/ui configuration (used if you generate components).

## Build, Test, and Development Commands
- `npm run dev`: Start the local dev server at `http://localhost:3000`.
- `npm run build`: Create a production build.
- `npm run start`: Run the production server (requires `npm run build` first).
- `npm run lint`: Run ESLint with the Next.js config.

## Coding Style & Naming Conventions
- TypeScript + React with the Next.js App Router.
- Use 2-space indentation, double quotes, and keep formatting consistent with the surrounding file.
- Styling is primarily Tailwind CSS utility classes; global styles live in `src/app/globals.css`.
- Prefer small, focused utilities in `src/lib/` and colocate route UI in `src/app/`.

## Testing Guidelines
- No automated test runner is configured yet.
- If you add tests, include a script in `package.json`, document how to run it here, and follow a clear naming pattern (e.g., `*.test.tsx` or `__tests__/`).

## Commit & Pull Request Guidelines
- Current history only includes: “Initial commit from Create Next App.” There is no established convention yet.
- Use short, imperative, sentence-case commit messages (e.g., `Add hero CTA copy`).
- PRs should include: a concise summary, screenshots for UI changes, and the commands you ran (e.g., `npm run lint`).

## Configuration & Security Notes
- Store secrets in `.env.local` and do not commit them.
- Keep third-party keys out of `public/` and client components unless they are explicitly safe to expose.
