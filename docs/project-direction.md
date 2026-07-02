# Aquaworld Project Direction

## Positioning

Aquaworld is a lightweight, small-fresh ornamental fish biotope atlas. It should feel like an interactive field guide: calm, visual, concise, and easy to browse.

The product line for v0.11 is atlas-first, not tool-first.

## What We Have Built (v0.11)

- A static React frontend that opens directly into an immersive Chinese ink-wash scroll map.
- 7 biotope habitats positioned on a world map with geographic fidelity.
- 42 fish species, each with: Chinese ink-wash illustration, 4-frame tail-wagging sprite animation, scientific/common/Chinese names, size, swim layer, water parameters, temperament, care level, and ecological story notes.
- 7 biotope-specific underwater backdrop images matching the ink-wash scroll aesthetic.
- Three-layer swim display (top/middle/bottom) with layer-boundary controls and context-aware horizontal layout.
- Detail panel with Chinese scroll-style gold border, corner ornaments, seal-stamp fish name effect, and close button.
- Search and ecological filters (the "tuning drawer").
- Desktop and mobile responsive layout.
- 37 tests, all passing; TypeScript strict mode.

## What We Are Not Building For v0.x

- User accounts.
- Aquarium profile storage.
- Water-change plans.
- Backend services.
- A full compatibility calculator.
- Commerce, community, or marketplace features.

## Experience Principles

- The map is the main experience, not a decorative header.
- Content should be light but trustworthy.
- Each habitat should have a distinct mood while still belonging to the same visual system.
- Species details should read like atlas notes, not database rows.
- Fish illustrations should feel alive (sprite animation) while maintaining the hand-painted scroll aesthetic.
- Filters should support discovery, not dominate the page.
- Mobile should remain browseable, even if desktop is the primary showcase.

## V0.11 Completion Standard (Achieved)

A visitor can open the app, understand the idea within seconds, browse 7 habitat sections, see animated fish illustrations in each biotope, inspect representative fish details, and leave with the impression of a polished, coherent ornamental fish atlas with a distinctive Chinese ink-wash visual identity.

- 7 habitats with complete ecological framing.
- 42 fish entries with full data fields.
- Every fish has a custom illustration + sprite animation.
- Data integrity tests cover IDs, ranges, habitat links, color tokens, and required naming fields.
- `npm test` (37 tests) and `npm run build` pass.
- README explains setup, scope, and data limitations.

## V0.11 Technical Decisions

### Visual Architecture
- World scroll: CSS cover-fit background with responsive clamp() insets, ensuring the map fills the viewport across resolutions.
- Biotope overlays: positioned absolutely over the world scroll, each with a unique underwater backdrop.
- Fish illustrations: 42 pairs of single-image + 4-frame sprite sheet, processed through Python background-removal pipeline, stored as WebP (~5-44KB each).
- Sprite animation: CSS steps(4) with pixel-precise background-position, 1.6s cycle at 2x perceived speed.

### Layout Engine
- Layer yBase values tuned through iterative testing: top=10%, middle=48%, bottom=85%.
- yRange kept tight (±4-5%) to prevent layer boundary crossing.
- Horizontal distribution is context-aware: small groups (1-2 fish) center in 28-72% range; larger groups spread 8-92%.
- Size multiplier: `clamp(0.55 + adultSizeCm × 0.07, 0.6, 2.2)` for visible size differentiation.
- Sprite threshold: fish with multiplier ≥1.3 use single images to avoid 16:9 sprite aspect-ratio squishing.

### Data Pipeline
- Fish images: Gemini-generated → Python decontamination (white-background removal) → cwebp conversion → Vite asset hashing.
- Content review: batch subagent analysis of all 7 habitats and 42 species, with cross-referencing against authoritative sources.

## V0.2 Direction | v0.2 方向

v0.2 在图谱基础上引入 **生态叙事**、**造景灵感** 和 **轻量主题缸方案** 三个内容层。

### 生态叙事层

每个生境增加水下场景描述、季节性变化、关键生态关系，让用户不只是阅读参数卡片，而是沉浸到水域生态的故事中。

### 造景灵感卡片

每个生境附带底质参考、植物与硬景观建议、光线氛围、造景快照示意。帮助用户理解"如何在自己的缸里复现这个生境的角落"。

### 主题缸方案（轻量）

- 用户在浏览生境时可将感兴趣鱼种加入"我的主题缸"
- 系统做基础兼容性约束检查（水温、pH、性格、泳层），不做绝对推荐
- 输出主题缸卡片：鱼种清单 + 造景参数摘要 + 混养注意事项
- 数据存 localStorage，不需要账号
- **边界清晰：是收藏夹 + 轻量约束检查，不是鱼缸推荐器**

### v0.2 内容扩展

- 生境保持 7 个不变
- 鱼种从 42 扩充到 49-56（每生境 7-8 条）
- 优先补充 `content-roadmap.md` 中标记的 "good additions" 鱼种

### v0.2 不做

- 不做账户系统、后端、鱼缸模拟器
- 不做完整兼容性算法
- 不做疾病/喂食/维护建议
- 不做电商引导

---

## Later, Not Now

If the atlas direction succeeds, later versions can add richer source notes, image credits, species-group pages, or a gentle "build a theme tank" feature. Those should come after the atlas itself feels complete.
