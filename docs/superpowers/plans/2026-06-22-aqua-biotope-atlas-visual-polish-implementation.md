# Aqua Biotope Atlas Visual Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the current functional MVP into an artful, launch-ready showcase with an Eastern scroll-painting visual language and natural-history detail cards.

**Architecture:** Keep the existing React/Vite/TypeScript static app and current product interactions. Add a centralized visual token layer, introduce a `ScrollMapFrame` wrapper for the central scroll-map atmosphere, and refine existing components through scoped class names and CSS rather than adding new UI libraries.

**Tech Stack:** React, Vite, TypeScript, Vitest, React Testing Library, CSS, in-app browser QA.

---

## File Structure

- `src/data/visualTheme.ts`: central visual tokens for ink colors, habitat wash styling, fish color tokens, and helper functions.
- `src/data/colorTokens.ts`: either re-export fish color tokens from `visualTheme.ts` or remain as compatibility shim during migration.
- `src/data/__tests__/visualTheme.test.ts`: unit tests for token coverage and helper output.
- `src/components/ScrollMapFrame.tsx`: decorative map frame and texture layers around `HabitatMap` content.
- `src/components/__tests__/ScrollMapFrame.test.tsx`: tests frame semantics and child rendering.
- `src/components/HabitatMap.tsx`: use `ScrollMapFrame`, habitat wash variables, and fish silhouette classes.
- `src/components/__tests__/HabitatMap.test.tsx`: extend tests for scroll-map frame and visual token usage.
- `src/components/DetailPanel.tsx`: refine detail markup for specimen plate styling without changing data behavior.
- `src/components/__tests__/DetailPanel.test.tsx`: extend tests for specimen plate visual hooks.
- `src/components/FilterRail.tsx`: refine class hooks for tuning-panel styling.
- `src/components/FishList.tsx`: refine class hooks for fish-tag styling.
- `src/components/CompatibilityBar.tsx`: refine class hooks and copy hierarchy for note-strip styling.
- `src/components/__tests__/App.test.tsx`: preserve reset/search/selection tests; add one default screenshot-state structural test if needed.
- `src/styles.css`: reorganize visual sections and implement the scroll-painting visual language.

## Task 1: Centralize Visual Theme Tokens

**Files:**
- Create: `src/data/visualTheme.ts`
- Create: `src/data/__tests__/visualTheme.test.ts`
- Modify: `src/data/colorTokens.ts`
- Modify: `src/data/__tests__/dataIntegrity.test.ts`
- Modify: `src/components/__tests__/HabitatMap.test.tsx`

- [ ] **Step 1: Write failing visual theme tests**

Create `src/data/__tests__/visualTheme.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { fish } from '../fish';
import { habitats } from '../habitats';
import { fishColorTokens, getFishColorToken, getHabitatVisualStyle } from '../visualTheme';

describe('visualTheme', () => {
  it('backs every fish color with a visual token', () => {
    const unsupportedColors = fish.flatMap((item) =>
      item.colors.filter((color) => !(color in fishColorTokens)).map((color) => `${item.id}:${color}`),
    );

    expect(unsupportedColors).toEqual([]);
  });

  it('returns a stable fallback color for unknown fish colors', () => {
    expect(getFishColorToken('not-a-real-color')).toBe('#6f8f8d');
  });

  it('returns scroll-map style variables for every habitat', () => {
    const missingStyles = habitats.flatMap((habitat) => {
      const style = getHabitatVisualStyle(habitat);
      return style['--habitat-wash'] && style['--habitat-ink'] && style['--habitat-glow'] ? [] : [habitat.id];
    });

    expect(missingStyles).toEqual([]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- src/data/__tests__/visualTheme.test.ts
```

Expected: FAIL because `src/data/visualTheme.ts` does not exist.

- [ ] **Step 3: Implement visual theme tokens**

Create `src/data/visualTheme.ts`:

```ts
import type { CSSProperties } from 'react';
import type { Habitat } from '../types/domain';

export const fishColorTokens = {
  black: '#1d2730',
  blue: '#3f8fb9',
  brown: '#816142',
  cream: '#e5d2a8',
  gold: '#d9b96a',
  gray: '#87969a',
  green: '#6e9f87',
  multicolor: '#7fb7aa',
  orange: '#d88d54',
  pink: '#d6a0af',
  purple: '#9b89b9',
  red: '#c85d5d',
  silver: '#c8d2ce',
  turquoise: '#5db8b1',
  white: '#f4efe3',
  yellow: '#d7bd65',
} as const;

export const fishColorOptions = ['all', ...Object.keys(fishColorTokens)] as const;

const habitatWashOverrides: Record<string, { ink: string; wash: string; glow: string }> = {
  'amazon-blackwater': { ink: '#7b5438', wash: '#3d2d22', glow: '#d7a66a' },
  'southeast-asian-streams': { ink: '#5b8f73', wash: '#284d3c', glow: '#9ccfae' },
  'african-rift-lakes': { ink: '#456d93', wash: '#263d58', glow: '#9cb8d9' },
  'south-asian-slow-waters': { ink: '#8a884f', wash: '#3d482d', glow: '#d8c982' },
  'central-american-rivers': { ink: '#7b684a', wash: '#354034', glow: '#d6a06c' },
  'coral-reef-shallows': { ink: '#5aa9ad', wash: '#284c56', glow: '#d6b08b' },
  'chinese-southern-streams': { ink: '#6d9f8d', wash: '#2f4f47', glow: '#d8c98a' },
};

export function getFishColorToken(color: string) {
  return fishColorTokens[color as keyof typeof fishColorTokens] ?? '#6f8f8d';
}

export function getHabitatVisualStyle(habitat: Habitat) {
  const visual = habitatWashOverrides[habitat.id] ?? {
    ink: habitat.colorPalette.primary,
    wash: habitat.colorPalette.secondary,
    glow: habitat.colorPalette.glow,
  };

  return {
    '--node-primary': habitat.colorPalette.primary,
    '--node-secondary': habitat.colorPalette.secondary,
    '--node-glow': habitat.colorPalette.glow,
    '--habitat-ink': visual.ink,
    '--habitat-wash': visual.wash,
    '--habitat-glow': visual.glow,
  } as CSSProperties;
}
```

- [ ] **Step 4: Convert `colorTokens.ts` to a compatibility re-export**

Replace `src/data/colorTokens.ts` with:

```ts
export { fishColorOptions, fishColorTokens, getFishColorToken } from './visualTheme';
```

- [ ] **Step 5: Update data integrity import**

Modify `src/data/__tests__/dataIntegrity.test.ts` so the first imports are:

```ts
import { describe, expect, it } from 'vitest';
import { fishColorTokens } from '../visualTheme';
import { fish } from '../fish';
import { habitats } from '../habitats';
```

- [ ] **Step 6: Update the existing map color-token expectation**

In `src/components/__tests__/HabitatMap.test.tsx`, update the existing shell-dweller style assertion:

```tsx
    expect(screen.getByRole('button', { name: '卷贝鱼 Shell Dweller' })).toHaveStyle({
      '--fish-color': '#e5d2a8',
    });
```

- [ ] **Step 7: Verify token tests and existing affected tests**

Run:

```bash
npm test -- src/data/__tests__/visualTheme.test.ts src/data/__tests__/dataIntegrity.test.ts src/components/__tests__/HabitatMap.test.tsx
```

Expected: PASS, 3 files pass.

- [ ] **Step 8: Commit visual tokens**

```bash
git add src/data/visualTheme.ts src/data/colorTokens.ts src/data/__tests__/visualTheme.test.ts src/data/__tests__/dataIntegrity.test.ts src/components/__tests__/HabitatMap.test.tsx
git commit -m "feat: add scroll painting visual tokens"
```

## Task 2: Add Scroll Map Frame Component

**Files:**
- Create: `src/components/ScrollMapFrame.tsx`
- Create: `src/components/__tests__/ScrollMapFrame.test.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Write failing frame test**

Create `src/components/__tests__/ScrollMapFrame.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ScrollMapFrame } from '../ScrollMapFrame';

describe('ScrollMapFrame', () => {
  it('renders a labelled scroll-map frame and preserves children', () => {
    render(
      <ScrollMapFrame>
        <button type="button">鱼影</button>
      </ScrollMapFrame>,
    );

    expect(screen.getByRole('region', { name: '水域画卷图谱' })).toBeInTheDocument();
    expect(screen.getByText('鱼影')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- src/components/__tests__/ScrollMapFrame.test.tsx
```

Expected: FAIL because `ScrollMapFrame` does not exist.

- [ ] **Step 3: Implement `ScrollMapFrame`**

Create `src/components/ScrollMapFrame.tsx`:

```tsx
import type { ReactNode } from 'react';

type ScrollMapFrameProps = {
  children: ReactNode;
};

export function ScrollMapFrame({ children }: ScrollMapFrameProps) {
  return (
    <section className="scroll-map-frame" aria-label="水域画卷图谱">
      <div className="scroll-map-frame__paper" aria-hidden="true" />
      <div className="scroll-map-frame__wash scroll-map-frame__wash--left" aria-hidden="true" />
      <div className="scroll-map-frame__wash scroll-map-frame__wash--right" aria-hidden="true" />
      <div className="scroll-map-frame__currents" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="scroll-map-frame__content">{children}</div>
    </section>
  );
}
```

- [ ] **Step 4: Add frame styles**

Append near the map section in `src/styles.css`:

```css
.scroll-map-frame {
  position: relative;
  min-height: 100%;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 18px;
  background:
    radial-gradient(circle at 18% 22%, rgba(216, 201, 138, 0.14), transparent 28%),
    linear-gradient(90deg, rgba(19, 38, 39, 0.92), rgba(7, 22, 27, 0.96) 48%, rgba(23, 38, 35, 0.9));
}

.scroll-map-frame__paper,
.scroll-map-frame__wash,
.scroll-map-frame__currents,
.scroll-map-frame__content {
  position: absolute;
  inset: 0;
}

.scroll-map-frame__paper {
  opacity: 0.24;
  background-image:
    linear-gradient(110deg, rgba(244, 239, 227, 0.05) 0 1px, transparent 1px 8px),
    radial-gradient(circle at 24% 30%, rgba(244, 239, 227, 0.08), transparent 18%),
    radial-gradient(circle at 70% 68%, rgba(244, 239, 227, 0.06), transparent 22%);
}

.scroll-map-frame__wash {
  filter: blur(24px);
  opacity: 0.28;
}

.scroll-map-frame__wash--left {
  background: radial-gradient(circle at 26% 44%, rgba(216, 185, 106, 0.46), transparent 24%);
}

.scroll-map-frame__wash--right {
  background: radial-gradient(circle at 76% 42%, rgba(109, 159, 141, 0.42), transparent 24%);
}

.scroll-map-frame__currents span {
  position: absolute;
  width: 64%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(229, 210, 168, 0.2), transparent);
  transform: rotate(-14deg);
}

.scroll-map-frame__currents span:nth-child(1) {
  left: 8%;
  top: 28%;
}

.scroll-map-frame__currents span:nth-child(2) {
  left: 18%;
  top: 54%;
}

.scroll-map-frame__currents span:nth-child(3) {
  left: 7%;
  top: 78%;
}

.scroll-map-frame__content {
  z-index: 1;
}
```

- [ ] **Step 5: Verify component test**

Run:

```bash
npm test -- src/components/__tests__/ScrollMapFrame.test.tsx
```

Expected: PASS.

- [ ] **Step 6: Commit frame component**

```bash
git add src/components/ScrollMapFrame.tsx src/components/__tests__/ScrollMapFrame.test.tsx src/styles.css
git commit -m "feat: add scroll map frame"
```

## Task 3: Convert Habitat Map Into Scroll-Painting Canvas

**Files:**
- Modify: `src/components/HabitatMap.tsx`
- Modify: `src/components/__tests__/HabitatMap.test.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Write failing HabitatMap visual test**

Append to `src/components/__tests__/HabitatMap.test.tsx`:

```tsx
  it('renders habitat wash nodes inside the scroll-map frame', () => {
    render(
      <HabitatMap
        habitats={habitats}
        fish={fish.slice(0, 2)}
        selectedHabitatId="amazon-blackwater"
        selectedFishId={null}
        onHabitatSelect={() => undefined}
        onFishSelect={() => undefined}
      />,
    );

    expect(screen.getByRole('region', { name: '水域画卷图谱' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '亚马逊黑水' })).toHaveStyle({
      '--habitat-wash': '#3d2d22',
    });
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- src/components/__tests__/HabitatMap.test.tsx
```

Expected: FAIL because `HabitatMap` has not rendered `ScrollMapFrame` and habitat wash variables yet.

- [ ] **Step 3: Update HabitatMap imports and wrapper**

Modify the top of `src/components/HabitatMap.tsx`:

```tsx
import type { CSSProperties } from 'react';
import { getFishColorToken, getHabitatVisualStyle } from '../data/visualTheme';
import type { Fish, Habitat } from '../types/domain';
import { ScrollMapFrame } from './ScrollMapFrame';
```

Replace the return wrapper with:

```tsx
  return (
    <section className="map-stage" aria-label="原生地生态图谱">
      <ScrollMapFrame>
        {habitats.map((habitat) => (
          <button
            key={habitat.id}
            type="button"
            className={`habitat-node ${habitat.id === selectedHabitatId ? 'is-selected' : ''}`}
            style={
              {
                left: `${habitat.mapPosition.x}%`,
                top: `${habitat.mapPosition.y}%`,
                ...getHabitatVisualStyle(habitat),
              } as CSSProperties
            }
            onClick={() => onHabitatSelect(habitat.id)}
            aria-label={habitat.name}
            aria-pressed={habitat.id === selectedHabitatId}
          >
            <span className="habitat-node__orb" />
            <span className="habitat-node__name">
              <span className="habitat-node__name-text" aria-hidden="true">
                {Array.from(habitat.name).map((char, index) => (
                  <span key={`${habitat.id}-${index}`}>{char}</span>
                ))}
              </span>
              <small>{habitat.englishName}</small>
            </span>
          </button>
        ))}

        {fish.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`fish-marker ${item.id === selectedFishId ? 'is-selected' : ''}`}
            style={
              {
                left: `${item.markerPosition.x}%`,
                top: `${item.markerPosition.y}%`,
                '--fish-color': getFishColorToken(item.colors[0]),
              } as CSSProperties
            }
            onClick={() => onFishSelect(item.id)}
            aria-label={`${item.chineseName} ${item.commonName}`}
            aria-pressed={item.id === selectedFishId}
          >
            <span className="fish-marker__shape" />
            <span className="fish-marker__label">{item.chineseName}</span>
          </button>
        ))}
      </ScrollMapFrame>
    </section>
  );
```

Remove the old `.map-waterlines` markup from `HabitatMap`.

- [ ] **Step 4: Replace map visual styles**

Update `src/styles.css` map-related styles:

```css
.map-stage {
  position: relative;
  overflow: hidden;
  padding: 0;
  min-height: 520px;
  background: transparent;
}

.habitat-node__orb {
  display: block;
  width: 96px;
  height: 66px;
  border: 1px solid color-mix(in srgb, var(--habitat-glow), transparent 44%);
  border-radius: 54% 46% 58% 42%;
  background:
    radial-gradient(circle at 42% 38%, color-mix(in srgb, var(--habitat-glow), white 10%), transparent 18%),
    radial-gradient(circle at 50% 50%, var(--habitat-ink), var(--habitat-wash) 62%, rgba(10, 18, 18, 0.18));
  box-shadow:
    0 0 34px color-mix(in srgb, var(--habitat-glow), transparent 58%),
    inset 0 0 24px rgba(244, 239, 227, 0.08);
  opacity: 0.78;
}

.habitat-node.is-selected .habitat-node__orb {
  opacity: 1;
  box-shadow:
    0 0 46px color-mix(in srgb, var(--habitat-glow), transparent 30%),
    inset 0 0 28px rgba(244, 239, 227, 0.12);
}

.fish-marker__shape {
  position: relative;
  width: 38px;
  height: 17px;
  border-radius: 55% 45% 50% 50%;
  background:
    radial-gradient(circle at 28% 45%, rgba(244, 239, 227, 0.72), transparent 13%),
    linear-gradient(90deg, rgba(244, 239, 227, 0.72), var(--fish-color, var(--aqua)) 72%);
  box-shadow: 0 0 16px color-mix(in srgb, var(--fish-color, var(--aqua)), transparent 55%);
}

.fish-marker__shape::after {
  position: absolute;
  width: 13px;
  height: 15px;
  background: inherit;
  clip-path: polygon(0 50%, 100% 0, 100% 100%);
  content: '';
  transform: translate(30px, 1px);
}
```

- [ ] **Step 5: Verify map tests**

Run:

```bash
npm test -- src/components/__tests__/HabitatMap.test.tsx src/components/__tests__/ScrollMapFrame.test.tsx
```

Expected: PASS.

- [ ] **Step 6: Commit scroll-map conversion**

```bash
git add src/components/HabitatMap.tsx src/components/__tests__/HabitatMap.test.tsx src/styles.css
git commit -m "feat: turn habitat map into scroll canvas"
```

## Task 4: Refine App Shell, Top Bar, And Global Surface

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/TopBar.tsx`
- Modify: `src/components/__tests__/App.test.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Write failing app shell test**

Append to `src/components/__tests__/App.test.tsx`:

```tsx
  it('renders the visual polish shell hooks', () => {
    render(<App />);

    expect(document.querySelector('.app-shell')).toHaveClass('app-shell--scrollwork');
    expect(screen.getByText('Aqua Biotope Atlas')).toHaveClass('product-name');
    expect(screen.getByText('亚马逊黑水')).toHaveClass('top-bar__habitat');
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- src/components/__tests__/App.test.tsx
```

Expected: FAIL because `.app-shell--scrollwork` and `.top-bar__habitat` do not exist.

- [ ] **Step 3: Add shell and habitat class hooks**

In `src/App.tsx`, change:

```tsx
<main className="app-shell">
```

to:

```tsx
<main className="app-shell app-shell--scrollwork">
```

In `src/components/TopBar.tsx`, render the current habitat span as:

```tsx
<span className="top-bar__habitat">{selectedHabitat.name}</span>
```

Keep existing search behavior unchanged.

- [ ] **Step 4: Apply global scrollwork styling**

Update the top of `src/styles.css`:

```css
:root {
  color-scheme: dark;
  --bg: #07100f;
  --paper: #13201d;
  --paper-soft: rgba(244, 239, 227, 0.08);
  --panel: rgba(14, 28, 27, 0.78);
  --panel-strong: rgba(18, 34, 32, 0.92);
  --line: rgba(224, 207, 163, 0.22);
  --line-strong: rgba(224, 207, 163, 0.42);
  --text: #f4efe3;
  --muted: #a8b8ae;
  --aqua: #9fc9bf;
  --green: #9abf9e;
  --amber: #d7bd65;
  --danger: #c86d5d;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background:
    radial-gradient(circle at 16% 12%, rgba(216, 201, 138, 0.12), transparent 24%),
    radial-gradient(circle at 82% 18%, rgba(109, 159, 141, 0.1), transparent 25%),
    linear-gradient(135deg, #07100f, #0e1d1c 48%, #081211);
  color: var(--text);
}

.app-shell--scrollwork {
  position: relative;
  isolation: isolate;
}

.app-shell--scrollwork::before {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image:
    linear-gradient(100deg, rgba(244, 239, 227, 0.035) 0 1px, transparent 1px 10px),
    radial-gradient(circle at 45% 20%, rgba(244, 239, 227, 0.05), transparent 18%);
  content: '';
  opacity: 0.72;
}
```

Update top bar styles:

```css
.product-name {
  margin: 0 0 5px;
  color: var(--amber);
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.top-bar h1 {
  margin: 0;
  color: var(--text);
  font-size: 28px;
  line-height: 1.15;
  text-shadow: 0 8px 28px rgba(0, 0, 0, 0.28);
}

.top-bar__habitat {
  border-left: 1px solid var(--line);
  padding-left: 14px;
  color: #d8c98a;
}

.top-bar input {
  width: 260px;
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 10px 14px;
  background: rgba(7, 16, 15, 0.78);
  color: var(--text);
}
```

- [ ] **Step 5: Verify shell tests**

Run:

```bash
npm test -- src/components/__tests__/App.test.tsx src/App.test.tsx
```

Expected: PASS.

- [ ] **Step 6: Commit shell polish**

```bash
git add src/App.tsx src/components/TopBar.tsx src/components/__tests__/App.test.tsx src/styles.css
git commit -m "feat: apply scrollwork app shell"
```

## Task 5: Refine Detail Panel Into Specimen Plate

**Files:**
- Modify: `src/components/DetailPanel.tsx`
- Modify: `src/components/__tests__/DetailPanel.test.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Write failing specimen plate test**

Append to `src/components/__tests__/DetailPanel.test.tsx`:

```tsx
  it('uses specimen plate hooks for selected fish', () => {
    const neonTetra = fish.find((item) => item.id === 'neon-tetra') ?? fish[0];
    const { container } = render(<DetailPanel habitat={habitats[0]} fish={neonTetra} />);

    expect(container.querySelector('.detail-panel')).toHaveClass('detail-panel--specimen');
    expect(container.querySelector('.fish-art__body')).toHaveStyle({ '--fish-color': '#3f8fb9' });
    expect(screen.getByLabelText('视觉标签')).toHaveClass('tag-row tag-row--specimen');
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- src/components/__tests__/DetailPanel.test.tsx
```

Expected: FAIL because the new class hooks do not exist.

- [ ] **Step 3: Update DetailPanel class hooks**

In `src/components/DetailPanel.tsx`, change the fish-selected aside:

```tsx
<aside className="detail-panel detail-panel--specimen" aria-label={`${fish.chineseName} 鱼种详情`}>
```

Change fish art span:

```tsx
<span className="fish-art__body" style={{ '--fish-color': getFishColor(fish) } as CSSProperties} />
```

Change tag row:

```tsx
<div className="tag-row tag-row--specimen" aria-label="视觉标签">
```

For the habitat overview aside, use:

```tsx
<aside className="detail-panel detail-panel--habitat" aria-label={`${habitat.name} 原生地概览`}>
```

- [ ] **Step 4: Apply specimen plate styling**

Update `src/styles.css` detail styles:

```css
.detail-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow: auto;
  background:
    linear-gradient(180deg, rgba(244, 239, 227, 0.055), transparent 34%),
    var(--panel);
}

.detail-panel--specimen::before,
.detail-panel--habitat::before {
  position: absolute;
  inset: 12px;
  pointer-events: none;
  border: 1px solid rgba(224, 207, 163, 0.14);
  border-radius: 12px;
  content: '';
}

.fish-art {
  position: relative;
  min-height: 132px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 14px;
  background:
    radial-gradient(circle at 50% 50%, rgba(216, 201, 138, 0.12), transparent 44%),
    linear-gradient(135deg, rgba(244, 239, 227, 0.06), rgba(7, 16, 15, 0.62));
}

.fish-art__body,
.fish-art span {
  position: absolute;
  left: 50%;
  top: 50%;
  width: min(64%, 190px);
  height: 34px;
  border-radius: 56% 44% 52% 48%;
  background:
    radial-gradient(circle at 28% 45%, rgba(244, 239, 227, 0.8), transparent 12%),
    linear-gradient(90deg, rgba(244, 239, 227, 0.82), var(--fish-color, var(--aqua)) 70%);
  box-shadow: 0 0 32px color-mix(in srgb, var(--fish-color, var(--aqua)), transparent 52%);
  transform: translate(-50%, -50%);
}

.story-note {
  margin: 0;
  border-left: 2px solid var(--amber);
  padding: 10px 12px;
  background: rgba(216, 201, 138, 0.08);
  color: #ece2c8;
  font-size: 13px;
  line-height: 1.6;
}

.stat-grid div {
  min-width: 0;
  border: 1px solid rgba(224, 207, 163, 0.18);
  border-radius: 12px;
  padding: 10px;
  background: rgba(7, 16, 15, 0.36);
}

.tag-row--specimen span {
  border-color: rgba(216, 201, 138, 0.34);
  background: rgba(216, 201, 138, 0.08);
  color: #efe7d3;
}
```

- [ ] **Step 5: Verify detail tests**

Run:

```bash
npm test -- src/components/__tests__/DetailPanel.test.tsx
```

Expected: PASS.

- [ ] **Step 6: Commit specimen plate**

```bash
git add src/components/DetailPanel.tsx src/components/__tests__/DetailPanel.test.tsx src/styles.css
git commit -m "feat: polish specimen detail panel"
```

## Task 6: Refine Filter Rail, Fish Tags, And Compatibility Note Strip

**Files:**
- Modify: `src/components/FilterRail.tsx`
- Modify: `src/components/FishList.tsx`
- Modify: `src/components/CompatibilityBar.tsx`
- Modify: `src/components/__tests__/FilterRail.test.tsx`
- Modify: `src/components/__tests__/FishList.test.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Write failing class-hook tests**

Append to `src/components/__tests__/FishList.test.tsx`:

```tsx
  it('uses fish tag visual hooks', () => {
    render(<FishList fish={fish.slice(0, 2)} selectedFishId="neon-tetra" onFishSelect={() => undefined} onReset={() => undefined} />);

    expect(screen.getByRole('region', { name: '鱼种列表' })).toHaveClass('fish-list fish-list--tags');
    expect(screen.getByRole('button', { name: '霓虹灯 Neon Tetra' })).toHaveClass('fish-tag is-selected');
  });
```

Append to `src/components/__tests__/FilterRail.test.tsx`:

```tsx
  it('uses tuning panel visual hooks', () => {
    render(
      <FilterRail
        habitats={habitats}
        filters={defaultFilters}
        selectedHabitatId="amazon-blackwater"
        onFiltersChange={() => undefined}
        onHabitatSelect={() => undefined}
        onReset={() => undefined}
      />,
    );

    expect(document.querySelector('.filter-rail')).toHaveClass('filter-rail--tuning');
  });
```

If `defaultFilters` is not imported in `FilterRail.test.tsx`, add:

```ts
import { defaultFilters } from '../../types/domain';
```

- [ ] **Step 2: Run tests to verify they fail**

Run:

```bash
npm test -- src/components/__tests__/FishList.test.tsx src/components/__tests__/FilterRail.test.tsx
```

Expected: FAIL because the new class hooks do not exist.

- [ ] **Step 3: Add class hooks**

In `src/components/FilterRail.tsx`, change:

```tsx
<aside className="filter-rail">
```

to:

```tsx
<aside className="filter-rail filter-rail--tuning">
```

In `src/components/FishList.tsx`, change non-empty section:

```tsx
<section className="fish-list fish-list--tags" aria-label="鱼种列表">
```

Change button class:

```tsx
className={`fish-tag ${item.id === selectedFishId ? 'is-selected' : ''}`}
```

In `src/components/CompatibilityBar.tsx`, change the section:

```tsx
<aside className="compatibility-bar compatibility-bar--note-strip" aria-label={`${fish.chineseName} 混养提示`}>
```

- [ ] **Step 4: Apply tuning/tag/note strip styles**

Update relevant styles in `src/styles.css`:

```css
.filter-rail--tuning {
  background:
    linear-gradient(180deg, rgba(244, 239, 227, 0.05), transparent 36%),
    var(--panel);
}

.filter-rail select,
.filter-rail input[type='range'] {
  accent-color: var(--amber);
}

.filter-rail select {
  border-color: rgba(224, 207, 163, 0.28);
  border-radius: 12px;
  background: rgba(7, 16, 15, 0.76);
}

.fish-list--tags {
  border-color: rgba(224, 207, 163, 0.2);
  background: rgba(12, 24, 23, 0.7);
}

.fish-tag {
  border-color: rgba(224, 207, 163, 0.18);
  background:
    linear-gradient(180deg, rgba(244, 239, 227, 0.06), rgba(7, 16, 15, 0.38));
}

.fish-tag.is-selected {
  border-color: var(--amber);
  background: rgba(216, 201, 138, 0.12);
  box-shadow: inset 0 0 0 1px rgba(216, 201, 138, 0.22);
}

.compatibility-bar--note-strip {
  border-color: rgba(224, 207, 163, 0.22);
  background:
    linear-gradient(90deg, rgba(216, 201, 138, 0.08), transparent 48%),
    var(--panel-strong);
}

.compatibility-bar--note-strip h3 {
  color: var(--amber);
}
```

- [ ] **Step 5: Verify component tests**

Run:

```bash
npm test -- src/components/__tests__/FishList.test.tsx src/components/__tests__/FilterRail.test.tsx
```

Expected: PASS.

- [ ] **Step 6: Commit panel refinements**

```bash
git add src/components/FilterRail.tsx src/components/FishList.tsx src/components/CompatibilityBar.tsx src/components/__tests__/FilterRail.test.tsx src/components/__tests__/FishList.test.tsx src/styles.css
git commit -m "feat: polish tuning and fish tag panels"
```

## Task 7: Visual QA, Fixes, And Final Verification

**Files:**
- Modify: `src/styles.css`
- Modify: component files only when QA identifies a component-level issue.

- [ ] **Step 1: Start dev server**

Run:

```bash
npm run dev -- --host 127.0.0.1
```

Expected: Vite prints `http://127.0.0.1:5173/`.

- [ ] **Step 2: Browser QA desktop**

Open `http://127.0.0.1:5173/` and verify desktop 1280x720 and 1440x900:

- Page title is `Aqua Biotope Atlas`.
- First viewport reads as `观赏鱼原生地探索图谱`.
- Default page has scroll-painting background, not a plain dashboard surface.
- Seven habitat nodes are visible.
- Habitat label overlaps are absent or visually acceptable.
- Fish labels do not crowd the map by default.
- Selecting `中国南方溪流与稻田水域` updates the top context and detail panel.
- Selecting `白云金丝` shows specimen detail and compatibility note strip.
- Searching `Macropodus` returns `中国斗鱼` and `圆尾斗鱼`.
- Filtering `peaceful` in `非洲裂谷湖` hides `马鲷 / Mbuna Cichlid`.
- Console has no relevant errors or warnings.

- [ ] **Step 3: Browser QA mobile**

Set viewport to 390x844 and verify:

- No horizontal page overflow.
- Search input fits.
- Filter controls remain usable.
- Map height remains at least 480px.
- Fish list scrolls horizontally.
- Detail panel appears below map/list.
- Compatibility strip remains readable when a fish is selected.

- [ ] **Step 4: Fix QA issues**

If visual QA finds issues, make minimal scoped fixes.

Examples of acceptable fixes:

```css
.habitat-node__name {
  max-width: 132px;
}

@media (max-width: 640px) {
  .map-stage {
    min-height: min(620px, 72vh);
  }
}
```

After each fix batch, run:

```bash
npm test
npm run build
```

Expected: both pass.

- [ ] **Step 5: Commit QA fixes if any**

If fixes were made:

```bash
git add src
git commit -m "fix: polish scrollwork visual QA"
```

If no fixes were made, do not create an empty commit.

- [ ] **Step 6: Final verification**

Run:

```bash
npm test
npm run build
git status --short
```

Expected:

- `npm test`: PASS.
- `npm run build`: PASS.
- `git status --short`: no uncommitted source changes.

## Self-Review Notes

- Spec coverage: the plan covers visual tokens, scroll-map central canvas, app shell, top bar, specimen detail panel, tuning panel, fish tags, compatibility strip, motion constraints, responsive QA, and screenshot-state QA.
- Scope control: the plan does not implement the final horizontal long-scroll product, accounts, backend, image generation, CMS, poster export, or sharing system.
- TDD coverage: each component-level change starts with a failing test; visual-only CSS has browser QA and build/test verification.
- Risk controls: visual token centralization prevents invalid business colors; browser QA catches label overlap and mobile overflow; `prefers-reduced-motion` remains part of final QA.
