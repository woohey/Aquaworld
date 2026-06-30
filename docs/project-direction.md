# Aquaworld Project Direction

## Positioning

Aquaworld is a lightweight, small-fresh ornamental fish biotope atlas. It should feel like an interactive field guide: calm, visual, concise, and easy to browse.

The product line for v0.1 is atlas-first, not tool-first.

## What We Are Building

- A static React frontend that opens directly into an immersive habitat scroll map.
- A curated set of biotope or representative habitat sections.
- Species entries that explain identity, origin, water conditions, temperament, care level, swim layer, visual traits, and compatibility notes.
- Search and ecological filters that help browsing without turning the app into an operations dashboard.
- A complete visual presentation suitable for sharing as a portfolio/demo project.

## What We Are Not Building For v0.1

- User accounts.
- Aquarium profile storage.
- Water-change plans.
- Backend services.
- A full compatibility calculator.
- A comprehensive fish encyclopedia.
- Commerce, community, or marketplace features.

## Experience Principles

- The map is the main experience, not a decorative header.
- Content should be light but trustworthy.
- Each habitat should have a distinct mood while still belonging to the same visual system.
- Species details should read like atlas notes, not database rows.
- Filters should support discovery and recovery, not dominate the page.
- Mobile should remain browseable, even if the desktop view is the primary showcase.

## V0.1 Completion Standard

A visitor can open the app, understand the idea within a few seconds, browse 7 habitat sections, inspect representative fish, and leave with the impression of a polished, coherent ornamental fish atlas.

Suggested target:

- 7 habitats.
- 45-60 fish entries.
- Every habitat has enough representative fish to feel populated.
- Every fish has complete core fields.
- Data integrity tests protect IDs, ranges, habitat links, color tokens, and required naming fields.
- `npm test` and `npm run build` pass.
- README explains setup, scope, and data limitations.

## Later, Not Now

If the atlas direction succeeds, later versions can add richer source notes, image credits, species-group pages, or a gentle "build a theme tank" feature. Those should come after the atlas itself feels complete.
