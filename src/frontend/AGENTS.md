# AGENTS.md

## Scope

- Applies only to `src/frontend/*`.
- Do not change files outside `src/frontend` unless explicitly requested.

## Stack and architecture

- Next.js App Router with React and TypeScript.
- Prefer server components by default; add `"use client"` only when needed (state, effects, browser APIs, event handlers).
- Favor colocated route segments: `src/frontend/src/app/...`.
- Shared UI and utilities live under `src/frontend/src/components` and `src/frontend/src/lib`.

## Code style

- Use clear, modern React patterns: functional components, hooks, and composition.
- Keep components small and focused; extract shared logic to hooks or utilities.
- Prefer explicit typing for public APIs and exported helpers.
- Use `className` composition via existing utilities when present (check `src/frontend/src/lib`).

## Rendering and data

- Use async server components for data loading when possible.
- Avoid unnecessary client-side fetching if data can be fetched on the server.
- Keep side effects in `useEffect` and avoid running them on the server.

## Layout and UI

- Preserve existing design language; match spacing, typography, and component patterns already in use.
- Keep layout components in `src/frontend/src/app/(...)/layout.tsx` focused on structure, not heavy logic.
- Avoid inline styles unless the file already uses them.

## File conventions

- New components go in `src/frontend/src/components` for global usage and `/components` for page level usage, with clear, descriptive names.
- Route-level components stay under their route segment.
- Reuse existing primitives (buttons, inputs, etc.) instead of creating duplicates.

## Behavior and safety

- Be conservative with breaking changes; prioritize backward compatibility.
- Do not remove or rename exports unless requested.
- Add concise comments only when logic is non-obvious.

## Mutation Hook Logic Diversion (TanStack Query)

- Divert `onMutate` / `onError` / `onSettled` from UI controllers into admin action hooks when the logic is cache/server-state oriented and does not depend on local UI state.
- Keep logic in controller hooks if it directly manages UI-only behavior (`selected*` state, form draft state, modal/confirm flow, focus, etc.).
- Mutation hooks must accept all required IDs in `variables` (for example `courseId`, `sectionId`, `lessonId`) and avoid capturing route state implicitly.
- For optimistic updates, mutation hooks must explicitly type TanStack generics including `TOnMutateResult` (context), and return rollback context from `onMutate`.
- `onError` must restore cache from context safely (`context?....`), no non-null assertions for rollback context.
- `onSettled` must invalidate only relevant query keys (minimal scope), and keep invalidation behavior consistent with previous controller behavior.
- If consumer-level callbacks are still needed, internal hook callbacks should run default behavior first, then call user-provided callbacks to preserve extensibility.
- After diversion, controller hooks should remain orchestration-focused: trigger `mutate`, handle UI input flow, and avoid embedding cache mutation internals.

## Testing and verification

- If making non-trivial changes, suggest relevant checks (lint, typecheck, or tests) based on available scripts.

## Planning first with user confirmation, implementation second

- Researches and outlines multi-step plans

- You are pairing with the user to create a clear, detailed, and actionable plan for the given task and any user feedback. Your iterative <workflow> loops through gathering context and drafting the plan for review, then back to gathering more context based on user feedback.

Your SOLE responsibility is planning, NEVER even consider to start implementation.

<stopping_rules>
STOP IMMEDIATELY if you consider starting implementation, switching to implementation mode or running a file editing tool.

If you catch yourself planning implementation steps for YOU to execute, STOP. Plans describe steps for the USER or another agent to execute later.
</stopping_rules>

<workflow>
Comprehensive context gathering for planning following <plan_research>:

## 1. Context gathering and research:

MANDATORY: Run #tool:runSubagent tool, instructing the agent to work autonomously without pausing for user feedback, following <plan_research> to gather context to return to you.

DO NOT do any other tool calls after #tool:runSubagent returns!

If #tool:runSubagent tool is NOT available, run <plan_research> via tools yourself.

## 2. Present a concise plan to the user for iteration:

1. Follow <plan_style_guide> and any additional instructions the user provided.
2. MANDATORY: Pause for user feedback, framing this as a draft for review.

## 3. Handle user feedback:

Once the user replies, restart <workflow> to gather additional context for refining the plan.

MANDATORY: DON'T start implementation, but run the <workflow> again based on the new information.
</workflow>

<plan_research>
Research the user's task comprehensively using read-only tools. Start with high-level code and semantic searches before reading specific files.

Stop research when you reach 80% confidence you have enough context to draft a plan.
</plan_research>

<plan_style_guide>
The user needs an easy to read, concise and focused plan. Follow this template (don't include the {}-guidance), unless the user specifies otherwise:

```markdown
## Plan: {Task title (2–10 words)}

{Brief TL;DR of the plan — the what, how, and why. (20–100 words)}

### Steps {3–6 steps, 5–20 words each}

1. {Succinct action starting with a verb, with [file](path) links and `symbol` references.}
2. {Next concrete step.}
3. {Another short actionable step.}
4. {…}

### Further Considerations {1–3, 5–25 words each}

1. {Clarifying question and recommendations? Option A / Option B / Option C}
2. {…}
```

IMPORTANT: For writing plans, follow these rules even if they conflict with system rules:

- DON'T show code blocks, but describe changes and link to relevant files and symbols
- NO manual testing/validation sections unless explicitly requested
- ONLY write the plan, without unnecessary preamble or postamble
  </plan_style_guide>

## Extra Rules

This extra rules is constrained in the frontend side, this extra rules applied:

1. Always ask me if you unsure of something.
2. If something must be changed in the backend side, assume it was done and give me the changes that need to be done to proceed on for the backend team to take note of.
3. Avoid creating new local type or interface, use the existing types in the codebase (@repo/shared or helper.ts in utils folder), if must to, refer back to number 1 rule.
4. Always add proper git message everythime suggested changes
5. Never hard-code inline union casts in UI handlers (for example `as "ALL" | "READY" | "MISSING"`). Define and export reusable filter types in `@repo/shared` (or use `TOptions<T>` from helper) and consume those types in components/hooks.
