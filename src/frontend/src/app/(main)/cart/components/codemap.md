# Codemap

## Purpose
Cart view components used by `/cart`.

## Files
- `TitleSection.tsx`: Breadcrumb + "My Cart" title section.
- `CartContainer.tsx`: Main checkout UI, including table rendering, item toggle/remove actions, and remove-confirmation modal portal.

## Notes
- `CartContainer.tsx` currently prioritizes checkout table rendering; legacy card-list implementation remains commented out.
- Cart actions are powered by `useCartAction` optimistic mutations.
