# Codemap

## Purpose
App-scoped React Query hooks for reading and mutating core storefront/auth data.

## Query Hooks
- `useGames.ts`: Suspense query for games list with stable keying by categories/sort.
- `useGamesInfinite.ts`: Suspense infinite query for paginated games list.
- `useGenres.ts`: Suspense query for nested genres.
- `useCurrentUser.ts`: Suspense query for current authenticated user.
- `useCart.ts`: Standard query for cart (enable flag supported).
- `useWishlist.ts`: Standard query for wishlist (enable flag supported).
- `useSignupStep.ts`: Suspense query returning current signup step.

## Mutation Hooks
- `useCartAction.ts`: Add/remove/toggle cart items with optimistic updates and toast feedback.
- `useWishlistAction.ts`: Add/remove wishlist items with optimistic updates and toast feedback.

## Notes
- Most hooks depend on shared query-key constants under `@/lib/constants`.
