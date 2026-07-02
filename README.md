# Aquaworld | 观赏鱼原生地图谱

Aquaworld is a lightweight ornamental fish biotope atlas — an immersive, visual-first field guide to freshwater and reef biotopes.
Aquaworld 是一个轻量级的观赏鱼原生地图谱，以沉浸式视觉体验呈现淡水与礁岩生境。

Readers explore a Chinese ink-wash scroll map, enter biotope overlays with animated fish illustrations, and inspect species details, water conditions, and ecological notes.
读者可探索东方水墨风格的卷轴地图、进入生境浮层浏览游动的鱼只插画、查看物种详情与生态笔记。

The project stays intentionally small — a static frontend atlas, not an aquarium management tool.
本项目刻意保持小巧克制的前端静态体验，而非养鱼管理工具。

## Online | 在线访问

**[woohey.github.io/Aquaworld](https://woohey.github.io/Aquaworld/)**

## Current Status | 当前状态

**v0.11** — 东方水墨画卷风格上线。7 个生境、42 条鱼种，每条鱼配备水墨工笔插画与 4 帧游动精灵图。世界卷轴带生境地标导航，生境浮层按上/中/底三泳层展示，鱼只详情面板支持中式卷轴边框与关闭交互。搜索与生态筛选，桌面端与移动端适配。

### v0.11 Highlights

- **东方画卷视觉系统** — 世界卷轴水墨底图 + 7 张生境专属水下场景 + 42 张水墨工笔鱼图 + 4 帧尾摆精灵图动画
- **地理位置校正** — 7 大流域按真实世界地理映射到画卷坐标
- **适中型群落** — 人工培育品类独立置于画卷中央偏上，区隔于六大地理生境
- **三层泳层布局** — 上层(10%) / 中层(48%) / 底层(85%)，yRange 收束防越界
- **鱼只体型比例** — 线性尺寸缩放(0.55 + 体长×0.07)，大尺寸鱼使用单图避免精灵图压扁
- **详情面板** — 中式卷轴金色边框、四角菱形装饰、鱼名印章效果、关闭按钮

## Tech Stack | 技术栈

- React 19
- TypeScript
- Vite
- Vitest + Testing Library
- GitHub Pages (static deployment)

## Run Locally | 本地运行

```bash
npm install
npm run dev
```

## Validate | 校验

```bash
npm test   # 8 files, 37 tests
npm run build
```

## Project Shape | 项目结构

```text
src/
  components/          WorldScrollCanvas, BiotopeLayerOverlay, TuningDrawer
                       世界卷轴画布、生境浮层、调境抽屉
  data/                fish, habitats, fishMedia, worldLayout
                       鱼种、生境、鱼图素材、世界版式坐标
  types/               Domain model types
                       领域模型类型定义
  utils/               Pure filtering and search helpers
                       纯函数过滤与搜索辅助方法
  assets/
    fish/              42 条鱼的单图 + 4 帧精灵图 WebP
    biotope-*.webp     7 张生境专属水下场景
    world-scroll-bg.webp  世界卷轴水墨地图
docs/
  project-direction.md 产品方向与版本规划
  content-roadmap.md   内容路线图
  v0.11-plan.md        v0.11 实施规划
```

## Product Direction | 产品方向

v0.11 已将 Aquaworld 交付为视觉驱动的观赏鱼原生地图谱。

v0.2 计划在图谱基础上引入生态叙事与造景灵感，并增加轻量主题缸方案功能。

详见 [docs/project-direction.md](docs/project-direction.md)。

## Data Note | 数据声明

Fish care parameters vary by source, strain, local water conditions, and husbandry practice.
鱼只饲养参数会因来源、品系、当地水质与饲养习惯而异。

Aquaworld's ranges and compatibility notes are intended as an atlas-style reference, not as veterinary, commercial, or definitive aquarium advice.
Aquaworld 所列参数范围与混养建议，仅作为图谱式参考，并非兽医、商业或最终饲养建议。

## License | 许可证

MIT. See [LICENSE](LICENSE).
