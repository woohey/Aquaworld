# Aquaworld — Project Context

## Architecture Overview

Aquaworld is a single-page React 19 + TypeScript app, deployed as a static site to GitHub Pages via a force-pushed `gh-pages` branch (build output from `dist/`).

### Component Tree
```
App
├── WorldScrollCanvas (homepage — scroll map)
│   ├── basin-node (7 habitat hotspots)
│   └── fish-shadow-marker (fish thumbnails on map)
├── BiotopeLayerOverlay (habitat detail — fish layers + panel)
│   ├── swimLayers (top/middle/bottom — rendered in fish-field)
│   └── __panel (detail panel — conditional on selectedFish)
└── TuningDrawer (search + filter sidebar)
```

### Data Flow
- `src/data/fish.ts` — 42 fish entries, single source of truth
- `src/data/habitats.ts` — 7 habitat definitions with water params + color palettes
- `src/data/worldLayout.ts` — %-based position mapping for homepage hotspots
- `src/data/fishMedia.ts` — maps fish IDs to single-image URLs (for detail panel)
- `src/components/BiotopeLayerOverlay.tsx` — has its own `fishSpriteUrls` map (for sprite animation)
- `src/utils/filterFish.ts` — pure filtering by habitat, size, temperament, care level, search

### Key Constants (v0.11, tuned through iteration)
| Parameter | Value | Notes |
|---|---|---|
| Fish base sizes | top=101, mid=154, bot=129 | 70% of original 144/220/184 |
| Size multiplier | `clamp(0.55 + cm × 0.07, 0.6, 2.2)` | 5cm→0.9x, 15cm→1.6x |
| Sprite threshold | `multiplier < 1.3` | Larger fish use single images |
| Layer yBase | top=10%, mid=48%, bot=85% | Center-point positioning |
| Layer yRange | top=±4, mid=±4, bot=±3 | Tight bounds to prevent crossover |
| Horizontal layout | 1-2 fish: 28-72%, 3: 18-82%, 4+: 8-92% | Context-aware spread |
| xJitter | ±3% | Natural scatter |
| Sprite animation | 1.6s steps(4) | 4-frame tail wagging cycle |
| World map fit | `background-size: cover` | With responsive clamp() insets |
| Habitat positions | See `worldLayout.ts` | %-based on 2560×1440 map image |

### Image Pipeline
1. Gemini generates PNG (white background)
2. Python PIL: decontamination (remove white bg → alpha channel)
3. `cwebp -q 85` conversion
4. Vite asset hashing on build
5. Referenced via ES import in BiotopeLayerOverlay.tsx

### Deployment
- Build: `npm run build` → `dist/`
- Deploy: `git init` in tmp dir → copy dist → force push to `gh-pages` branch
- CDN: GitHub Pages CDN caches for 600s (10 min)
- Cache busting: Vite generates unique hashed filenames on each build

### CDN Caveat
`npx gh-pages` doesn't invalidate GitHub's CDN. After deploy, it takes up to 10 minutes for the CDN cache to expire. Verify with:
```bash
curl -s "https://woohey.github.io/Aquaworld/" | grep -oE 'index-[A-Za-z0-9]+\.js'
```

## Workflow Orchestration

### 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately - do not keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

### 3. Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes - do not over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Do not ask for hand-holding
- Point at logs, errors, failing tests -> then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

## Task Management
1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections

## Core Principles
- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what is necessary. Avoid introducing bugs.
