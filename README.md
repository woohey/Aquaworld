# Aquaworld | 观赏鱼原生地图谱

Aquaworld is a lightweight ornamental fish biotope atlas.
Aquaworld 是一个轻量级的观赏鱼原生地图谱。

It presents freshwater and reef-inspired habitats as an immersive scroll map, then lets readers explore representative fish, water conditions, visual traits, and compatibility notes.
它以沉浸式的卷轴地图呈现淡水与礁岩风格的水域,让读者进一步探索代表性鱼种、水质参数、外观特征与混养建议。

The project is intentionally shaped as a small, fresh, static frontend experience rather than an aquarium-management tool.
本项目刻意保持小巧、克制的前端静态体验,而非养鱼管理工具。

It does not include accounts, tank profiles, schedules, or backend storage.
不包含账户系统、鱼缸配置、计划表或后端存储。

## Current Focus | 当前方向

- Explore ornamental fish through native or representative habitats.
- 围绕原生地或代表性水域探索观赏鱼。
- Keep the first screen visual, calm, and map-led.
- 保持首屏以地图为主导、视觉沉静。
- Use search and ecological filters as supporting controls.
- 用搜索与生态过滤作为辅助手段。
- Keep species entries concise: Chinese name, common name, scientific name, origin, water parameters, temperament, care level, swim layer, visual tags, and compatibility notes.
- 鱼种条目保持精炼:中文名、常用名、学名、产地、水质参数、习性、饲养难度、泳层、视觉标签与混养建议。
- Prioritize a polished atlas experience over broad encyclopedic coverage.
- 优先打磨图谱体验,而不是追求百科式的广度覆盖。

## Tech Stack | 技术栈

- React 19
- TypeScript
- Vite
- Vitest
- Testing Library

## Run Locally | 本地运行

```bash
npm install
npm run dev
```

## Validate | 校验

```bash
npm test
npm run build
```

The build script runs TypeScript checks for both app and Vite config before producing the static bundle.
构建脚本会在生成静态产物之前,先对应用与 Vite 配置分别执行 TypeScript 类型检查。

## Project Shape | 项目结构

```text
src/
  components/      UI components for the scroll map, overlays, filters, and detail views
                   卷轴地图、覆盖层、过滤与详情视图等 UI 组件
  data/            Habitat, fish, visual theme, media, and layout data
                   水域、鱼种、视觉主题、素材与版式数据
  types/           Domain model types
                   领域模型类型定义
  utils/           Pure filtering and search helpers
                   纯函数实现的过滤与搜索辅助方法
docs/
  superpowers/     Design specs and implementation notes from earlier project phases
                   早期项目阶段的设计规范与实现笔记
```

## Product Direction | 产品方向

Aquaworld is moving toward a v0.1 atlas release:
Aquaworld 正朝 v0.1 图谱版本迈进:

- 7 habitat sections
- 7 个水域版块
- About 45-60 representative fish entries
- 约 45-60 条代表性鱼种记录
- Complete, readable species cards
- 完整且易读的鱼种卡片
- Lightweight search and filters
- 轻量的搜索与过滤
- Refined desktop and mobile presentation
- 桌面端与移动端的精细呈现
- Static deployment through a frontend host such as GitHub Pages or Vercel
- 通过 GitHub Pages 或 Vercel 等前端托管平台进行静态部署

See [docs/project-direction.md](docs/project-direction.md) and [docs/content-roadmap.md](docs/content-roadmap.md) for the working plan.
详细工作规划见 [docs/project-direction.md](docs/project-direction.md) 与 [docs/content-roadmap.md](docs/content-roadmap.md)。

## Data Note | 数据声明

Fish care parameters vary by source, strain, local water conditions, and husbandry practice.
鱼只饲养参数会因来源、品系、当地水质与饲养习惯而异。

Aquaworld's ranges and compatibility notes are intended as an atlas-style reference, not as veterinary, commercial, or definitive aquarium advice.
Aquaworld 所列参数范围与混养建议,仅作为图谱式参考,并非兽医、商业或最终饲养建议。

## License | 许可证

MIT. See [LICENSE](LICENSE).
MIT 许可证,详见 [LICENSE](LICENSE)。
