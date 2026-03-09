# Codemap

## Purpose
Context-aware sidebar for home, all-games, and game-detail pages.

## Files
- `index.tsx`: Barrel exports for sidebar modules.
- `NavAsideBar.tsx`: Client controller that switches sidebar blocks by pathname and genre data availability.
- `QuickAction.tsx`: Static shortcut links.
- `GenresNav.tsx`: Nested genre link sections for home/game detail contexts.
- `GenresCheckbox.tsx`: Client filter controls syncing selected categories to URL query params.

## Notes
- Sidebar is hidden on `/cart`.
- On `/games/all`, checkbox filters and URL state drive listing query behavior.
