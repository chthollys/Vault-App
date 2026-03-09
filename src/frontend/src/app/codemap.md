# Codemap

## Purpose
Application root for the Next.js App Router frontend. This directory defines the global shell, providers, global styles, and shared hydration prefetching used by route groups.

## Key Files
- `layout.tsx`: Root HTML/body layout, global metadata, React provider wiring, analytics mount, and modal portal root.
- `provider.tsx`: Client-side provider stack (`QueryClientProvider`, `HeroUIProvider`, MUI App Router cache provider, and toast provider).
- `hydration.tsx`: Server component prefetching current user, games, genres, and infinite games before passing dehydrated state.
- `loading.tsx`: Full-screen loading spinner fallback.
- `error.tsx`: Global route error boundary UI.
- `globals.css`: Tailwind/HeroUI integration, design tokens, and global utility/styles.
- `hero.ts`: HeroUI Tailwind plugin export.
- `icon.png`: App icon asset.

## Subdirectories
- `(main)`: Storefront routes (`/`, `/games/*`, `/game/[id]`, `/cart`).
- `(auth)`: Authentication routes (`/login`, `/signup`) and auth flow UI.
- `hooks`: App-scoped query and mutation hooks.
