# Codemap

## Purpose
Auth route group container for unauthenticated flows. Provides auth-specific layout, hydration, and route entry pages.

## Route Surface
- `/login` from `login/page.tsx`
- `/signup` from `signup/page.tsx`

## Key Files
- `layout.tsx`: Wraps auth pages with header/footer, scroll utility, and auth hydration boundary.
- `hydration.tsx`: Prefetches signup step state for multi-step signup UX.
- `login/page.tsx`: Renders login card.
- `signup/page.tsx`: Renders signup flow controller.

## Subdirectories
- `components`: Auth UI building blocks and flow containers.
- `login`: Login page route segment.
- `signup`: Signup page route segment.
