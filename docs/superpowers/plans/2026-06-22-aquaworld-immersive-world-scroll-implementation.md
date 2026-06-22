# Aquaworld Immersive World Scroll Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current three-column atlas UI with a full-screen, immersive world-scroll canvas using basin and fish popovers plus a temporary tuning drawer.

**Architecture:** Keep the existing React + Vite + TypeScript data model and filtering logic. Add focused components for the canvas, basin nodes, fish markers, info popover, and tuning drawer, with `App` remaining the state composition layer. Implement the scroll-painting look through SVG + CSS layers rather than a static screenshot.

**Tech Stack:** React 19, TypeScript, Vite, Vitest, Testing Library, SVG, CSS animations.

---

## Reference Inputs

- Design spec: `docs/superpowers/specs/2026-06-22-aquaworld-immersive-world-scroll-redesign.md`
- Concept image: `docs/superpowers/concepts/aquaworld-immersive-world-scroll-concept.png`
- Existing data: `src/data/habitats.ts`, `src/data/fish.ts`
- Existing filter logic: `src/utils/filterFish.ts`

## File Structure

- Create `src/components/WorldScrollCanvas.tsx`: full-screen visual canvas, basin buttons, fish buttons, popover anchoring.
- Create `src/components/MapInfoPopover.tsx`: basin/fish popover content and close behavior.
- Create `src/components/TuningDrawer.tsx`: temporary search/filter drawer reusing the filter controls concept.
- Create `src/components/__tests__/WorldScrollCanvas.test.tsx`: canvas interaction tests.
- Create `src/components/__tests__/MapInfoPopover.test.tsx`: popover rendering and close tests.
- Create `src/components/__tests__/TuningDrawer.test.tsx`: drawer search/filter/reset tests.
- Modify `src/App.tsx`: replace three-column shell with immersive shell and overlay state.
- Modify `src/styles.css`: implement design tokens, scroll painting layers, popovers, drawer, responsive behavior, reduced motion.
- Modify `src/components/__tests__/App.test.tsx`: update app-level behavior assertions for immersive UI.

## Design System Inventory

- Background: turquoise-green mist, shallow water texture, low-saturation blue-green light.
- Paper: cream-white scroll body, pale gold paper edges, subtle fiber/noise.
- Terrain: teal/ink mountain and world-shape contours with fine gold lines.
- Motion: slow flowing light bands, gentle water path shimmer, subtle fish drift.
- UI chrome: sparse title, one `调境` control, translucent popovers, bottom/side sheet on small viewports.
- Allowed first-viewport copy: `Aqua Biotope Atlas`, `观赏鱼原生地探索图谱`, `调境`, basin labels, selected popover text derived from habitat/fish data.

### Task 1: World Scroll Canvas Behavior

**Files:**
- Create: `src/components/WorldScrollCanvas.tsx`
- Create: `src/components/__tests__/WorldScrollCanvas.test.tsx`

- [ ] **Step 1: Write failing tests**

Add tests that render seven basin buttons, call `onHabitatSelect` with the clicked basin id, render fish markers as buttons, and call `onFishSelect` with the clicked fish id.

Run: `npm test -- src/components/__tests__/WorldScrollCanvas.test.tsx`
Expected: FAIL because `WorldScrollCanvas` does not exist.

- [ ] **Step 2: Implement minimal component**

Implement `WorldScrollCanvas` with accessible `section aria-label="沉浸式世界画卷"`, basin `button`s, fish `button`s, and CSS custom properties for positions and colors.

- [ ] **Step 3: Verify task**

Run: `npm test -- src/components/__tests__/WorldScrollCanvas.test.tsx`
Expected: PASS.

### Task 2: Map Info Popover

**Files:**
- Create: `src/components/MapInfoPopover.tsx`
- Create: `src/components/__tests__/MapInfoPopover.test.tsx`

- [ ] **Step 1: Write failing tests**

Add tests for basin mode, fish mode, compatibility summary, and close button behavior.

Run: `npm test -- src/components/__tests__/MapInfoPopover.test.tsx`
Expected: FAIL because `MapInfoPopover` does not exist.

- [ ] **Step 2: Implement minimal component**

Implement a popover with `role="dialog"`, close button, basin content from `Habitat`, fish content from `Fish`, and compact compatibility summary.

- [ ] **Step 3: Verify task**

Run: `npm test -- src/components/__tests__/MapInfoPopover.test.tsx`
Expected: PASS.

### Task 3: Tuning Drawer

**Files:**
- Create: `src/components/TuningDrawer.tsx`
- Create: `src/components/__tests__/TuningDrawer.test.tsx`

- [ ] **Step 1: Write failing tests**

Add tests for opening drawer content, changing search, selecting habitat, changing color, and reset.

Run: `npm test -- src/components/__tests__/TuningDrawer.test.tsx`
Expected: FAIL because `TuningDrawer` does not exist.

- [ ] **Step 2: Implement minimal component**

Implement a temporary drawer with search, habitat, color, temperament, care, range controls, reset, and close. Reuse existing `FishFilters` shape and keep labels accessible.

- [ ] **Step 3: Verify task**

Run: `npm test -- src/components/__tests__/TuningDrawer.test.tsx`
Expected: PASS.

### Task 4: App Integration

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/__tests__/App.test.tsx`

- [ ] **Step 1: Write failing app tests**

Update tests to expect immersive canvas as the default primary region, no constant three-column layout dependency, `调境` opens the drawer, clicking a basin opens basin popover, clicking a fish opens fish popover, search filtering can produce an empty state inside the drawer/canvas flow.

Run: `npm test -- src/components/__tests__/App.test.tsx`
Expected: FAIL against current three-column implementation.

- [ ] **Step 2: Integrate components**

Replace `TopBar`, `FilterRail`, `HabitatMap`, `FishList`, `DetailPanel`, and `CompatibilityBar` usage in `App` with `WorldScrollCanvas`, `MapInfoPopover`, and `TuningDrawer`. Keep existing state names where practical and add `activeOverlay`.

- [ ] **Step 3: Verify task**

Run: `npm test -- src/components/__tests__/App.test.tsx src/App.test.tsx`
Expected: PASS.

### Task 5: Scroll Painting Visual System

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: Add visual hooks test coverage where useful**

Extend component tests only for stable hooks such as `.app-shell--immersive-scroll`, `.world-scroll-canvas`, `.map-info-popover`, and `.tuning-drawer`.

Run: `npm test -- src/components/__tests__/WorldScrollCanvas.test.tsx src/components/__tests__/App.test.tsx`
Expected: FAIL until classes exist.

- [ ] **Step 2: Implement CSS**

Add tokens and styles for the turquoise mist background, cream scroll paper, SVG terrain layers, flowing light bands, basin/fish selected states, popover, drawer, mobile sheet behavior, and `prefers-reduced-motion`.

- [ ] **Step 3: Verify task**

Run: `npm test`
Expected: PASS all tests.

### Task 6: Build And Browser QA

**Files:**
- Modify only if verification finds concrete issues.

- [ ] **Step 1: Type/build verification**

Run: `npm run build`
Expected: TypeScript and Vite build complete with exit code 0.

- [ ] **Step 2: Browser verification**

Start Vite dev server, open with Browser/IAB, verify page identity, not blank, no framework overlay, console health, screenshot evidence, basin click, fish click, tuning drawer, desktop and mobile viewport.

- [ ] **Step 3: Fidelity comparison**

Use `view_image` on `docs/superpowers/concepts/aquaworld-immersive-world-scroll-concept.png` and the latest browser screenshot. Compare at least palette, first viewport composition, popover model, basin positions, motion/flow treatment, and responsive behavior.

- [ ] **Step 4: Final cleanup**

Remove temporary QA scripts/screenshots from the repo. Keep the concept image because it is a committed design reference.
