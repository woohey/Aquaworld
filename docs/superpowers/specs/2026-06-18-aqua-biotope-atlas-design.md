# Aqua Biotope Atlas / 观赏鱼原生地探索图谱设计文档

日期 / Date: 2026-06-18

## 产品定位 / Product Position

**Aqua Biotope Atlas / 观赏鱼原生地探索图谱** 是一个面向鱼类与水族爱好者的互动探索产品。它用“原生地 / 栖息地”作为主轴，帮助用户理解观赏鱼背后的水域环境、生态条件、混养关系和视觉特征。

第一版不是“鱼缸配置推荐器”，也不是完整鱼类百科。它应该是一个漂亮、有知识密度、可互动的探索产品：用户打开应用后，先看到一张活的水域生态图谱，选择一个原生地，浏览代表鱼种，再查看水质参数和混养关系。

## 已确认决策 / Confirmed Decisions

- 产品路线 / Product route: **Aqua Biotope Atlas，观赏鱼原生地探索图谱**。
- 目标用户 / Target user: 鱼类与水族爱好者，同时兼顾视觉传播和内容展示。
- 主数据轴 / Primary data axis: 原生地 / 栖息地，native habitat / biotope。
- 第二层 / Secondary layer: 水质参数与混养关系，water parameters and compatibility。
- 视觉层 / Visual layer: 色彩、形态、泳层、观赏标签，color, morphology, swim layer, ornamental traits。
- 第一屏结构 / First-screen structure: 栖息地地图 + 鱼群浮层，habitat map with fish overlays。
- 视觉气质 / Visual mood: 深色水域图谱、发光节点、鱼群浮层，局部借一点东方图谱气质，但不做完整古风画卷。
- MVP 数据范围 / MVP data scope: 7 个原生地，约 40 条代表鱼。

## 核心体验 / Core Experience

主界面是一张抽象化的水域生态图谱。每个原生地都是一个有独立视觉气质的“水世界节点”，例如黑水河、清澈溪流、岩岸湖区、稻田缓流、河流系统、珊瑚浅滩、中国南方溪流与稻田水域。

用户的主要路径 / Primary user flow:

1. 选择一个原生地 / Select a habitat region。
2. 查看这个水域的代表鱼种、水质画像、视觉特征和生态备注。
3. 选择一条鱼 / Select a fish。
4. 阅读鱼种详情：中文名、英文名、学名、原生地、水质参数、性格、泳层、观赏标签、相似鱼种、混养关系。
5. 调整筛选条件，让画布上的可见鱼群发生变化。

希望用户产生的感受是：**观赏鱼不是孤立的品种，它们来自不同的水域世界和生态关系。**

## 信息架构 / Information Architecture

应用是一个单屏产品界面，不是营销型网站。

### 顶部栏 / Top Bar

- 产品名：Aqua Biotope Atlas。
- 当前原生地名称。
- 视图切换：生态图谱 / 鱼种列表。
- 搜索入口：按鱼名搜索。

### 主画布 / Main Canvas

- 抽象水域生态图谱。
- 7 个视觉上可区分的原生地节点。
- 鱼群浮层围绕对应原生地出现。
- Hover 状态：显示鱼名、原生地、水温区间。
- Click 状态：右侧面板打开鱼种详情。

### 左侧筛选栏 / Left Filter Rail

筛选应该像“调整生态条件”，不要像填写数据库表单。

- 原生地 / Habitat region。
- 水温 / Temperature。
- pH。
- 性格 / Temperament。
- 成体尺寸 / Adult size。
- 色彩 / Color。
- 饲养难度 / Care level。

### 右侧详情面板 / Right Detail Panel

默认状态：展示当前原生地概览。

选中鱼种后展示 / Fish-selected state:

- 鱼种视觉区域：可使用真实图片、生成插画，或基于色彩标签生成的样式化 fallback art。
- 中文名 / 常用名 / 学名。
- 原生区域与栖息地。
- 水温、pH、硬度。
- 性格、成体尺寸、泳层。
- 视觉标签与色彩标签。
- 饲养难度。
- 故事备注。
- 相似鱼种。

### 底部关系层 / Bottom Relationship Layer

当用户选中一条鱼时，底部展示混养关系分类：

- 通常适合 / Usually suitable。
- 需要谨慎 / Use caution。
- 不建议尝试 / Not recommended。

混养文案必须避免绝对化饲养建议。MVP 使用的是人工整理的启发式标签，不是权威的个性化养殖建议。

## 原生地范围 / Habitat Regions

第一版包含 7 个原生地：

1. 亚马逊黑水 / Amazon Blackwater。
2. 东南亚溪流 / Southeast Asian Streams。
3. 非洲裂谷湖 / African Rift Lakes。
4. 南亚稻田与缓流水域 / South Asian Rice Fields and Slow Waters。
5. 中美洲河流 / Central American Rivers。
6. 珊瑚礁浅滩 / Coral Reef Shallows。
7. 中国南方溪流与稻田水域 / Chinese Southern Streams and Rice-Field Waters。

### 中国地域范围 / Chinese Region Scope

中国地域代表本土观赏鱼与原生鱼语境：南方清澈溪流、稻田水域、缓流水渠、小型原生鱼群落。

候选代表鱼 / Candidate representative fish:

- 白云金丝 / White Cloud Mountain Minnow / Tanichthys albonubes。
- 中国斗鱼 / Paradise Fish / Macropodus opercularis。
- 圆尾斗鱼 / Roundtail Paradise Fish / Macropodus ocellatus。
- 中华鳑鲏 / Chinese Bitterling / Rhodeus sinensis。
- 中华青鳉 / Chinese Medaka / Oryzias sinensis。
- 溪流虾虎类代表 / Stream goby representative，具体种类在数据制作时再核实。

## 代表鱼种范围 / Representative Fish Scope

每个原生地包含 5 到 6 条代表鱼。MVP 总量约 40 条，保证画布足够丰富，但不追求全量数据库。

初始示例 / Initial examples:

- 亚马逊黑水 / Amazon Blackwater: 霓虹灯、红绿灯、七彩神仙、短鲷、铅笔鱼、鼠鱼。
- 东南亚溪流 / Southeast Asian Streams: 斗鱼、珍珠马甲、三角灯、虎皮鱼、斑马鱼、彩虹鲨。
- 非洲裂谷湖 / African Rift Lakes: 马鲷、坦鲷、卷贝鱼、六间、蓝茉莉、蝴蝶鲷。
- 南亚稻田与缓流水域 / South Asian Rice Fields and Slow Waters: 孔雀鱼、月光鱼、玛丽鱼、青鳉、小型鲃、蓝曼龙。
- 中美洲河流 / Central American Rivers: 剑尾、花鳉代表、火口、九间菠萝、德州豹、珍珠豹。
- 珊瑚礁浅滩 / Coral Reef Shallows: 小丑鱼、蓝吊、黄吊、雀鲷、虾虎、火焰仙。
- 中国南方溪流与稻田水域 / Chinese Southern Streams and Rice-Field Waters: 使用上面列出的中国地域候选鱼。

如果某个鱼种不够准确、争议较大，或不适合作为观赏鱼代表，可以在数据制作阶段替换。

## 数据模型 / Data Model

MVP 使用静态 TypeScript 数据，不接后端。

### 原生地 / Habitat

- `id`
- `name`
- `subtitle`
- `description`
- `waterType`
- `temperatureRange`
- `phRange`
- `hardnessRange`
- `visualMood`
- `mapPosition`
- `colorPalette`
- `representativeFishIds`

### 鱼种 / Fish

- `id`
- `commonName`
- `chineseName`
- `scientificName`
- `originRegion`
- `habitatId`
- `habitat`
- `temperatureRange`
- `phRange`
- `hardnessRange`
- `temperament`
- `adultSize`
- `swimLayer`
- `colors`
- `visualTags`
- `careLevel`
- `schooling`
- `compatibility`
- `similarSpecies`
- `storyNote`

### 混养关系 / Compatibility

混养关系以人工整理标签存储，不做算法计算，也不输出绝对建议。

- `usuallySuitable`: 鱼种 ID 或鱼种组。
- `useCaution`: 鱼种 ID 或鱼种组。
- `notRecommended`: 鱼种 ID 或鱼种组。
- `notes`: 简短原因。

## MVP 范围 / MVP Scope

包含 / Included:

- React 单页应用。
- 7 个原生地节点。
- 约 40 条鱼种记录。
- 原生地选择。
- 鱼种选择。
- 筛选栏。
- 原生地概览面板。
- 鱼种详情面板。
- 底部混养关系层。
- 按鱼名搜索。
- 桌面优先的响应式布局，移动端可用即可。
- 本地静态数据。

不包含 / Excluded:

- 账号系统。
- 后端 API。
- 用户鱼缸配置推荐器。
- 疾病、喂食、维护、用药建议。
- 实时生物数据。
- 全量鱼类数据库。
- Three.js 或 WebGL 3D 场景。
- 生成海报导出。
- 电商或 affiliate 流程。

## 技术方向 / Technical Direction

- React + Vite + TypeScript。
- 主画布使用 SVG、HTML、CSS 实现。
- 鱼群浮层使用 CSS 或轻量自定义动画。
- 静态数据放在 `src/data/`。
- 共享类型放在 `src/types/`。
- React state 管理 selected habitat、selected fish、filters、search。
- MVP 不使用全局状态库。
- 第一版不接后端。

## 组件计划 / Component Plan

- `App`: 顶层布局与状态。
- `TopBar`: 产品名、当前原生地、视图 / 搜索控制。
- `HabitatMap`: 中央 SVG/HTML 栖息地图。
- `HabitatNode`: 单个原生地节点。
- `FishMarker`: 动态鱼种标记 / 浮层。
- `FilterRail`: 原生地和生态条件筛选。
- `DetailPanel`: 在原生地概览和鱼种详情之间切换。
- `CompatibilityBar`: 选中鱼种后的混养关系层。
- `FishList`: 搜索结果和移动端 fallback 使用的紧凑列表。

## 数据流 / Data Flow

1. 应用启动时加载静态原生地和鱼种数据。
2. `App` 状态记录当前选中的原生地、鱼种、筛选条件和搜索词。
3. 根据静态数据和筛选状态派生出可见鱼种。
4. 选择原生地后，更新主画布鱼群和右侧原生地概览。
5. 选择鱼种后，更新右侧鱼种详情和底部混养关系。
6. 搜索会高亮匹配鱼种，并允许直接选中结果。

## 异常与空状态 / Error Handling

- 筛选结果为空：展示平静的空状态，并提供重置筛选按钮。
- 鱼种缺少图片：基于鱼的色彩和形态标签生成样式化 fallback art。
- 缺少混养数据：显示“暂未整理混养数据”，不要现场猜测。
- 移动端空间不足：左侧筛选折叠成抽屉，混养关系移动到详情面板下方。

## 测试与验证 / Testing And Verification

开发验证 / Development verification:

- Type check 通过。
- Build 通过。
- 核心交互可用：选择原生地、选择鱼种、筛选鱼种、搜索鱼种、重置筛选。
- 筛选无结果时出现空状态。
- 详情面板能正确更新。
- 只有选中鱼种时才展示混养关系层。

视觉验证 / Visual verification:

- 浏览器桌面宽度检查。
- 浏览器移动宽度检查。
- 截图与已确认视觉概念对照。
- 文本不溢出控件或面板。
- 主界面在 5 秒内能被理解为“原生地观赏鱼图谱”。

## 成功标准 / Success Criteria

- 用户在 5 秒内理解这是一个观赏鱼原生地图谱。
- 用户能在 30 秒内完成：选择原生地、筛选鱼种、打开鱼种详情、查看混养关系。
- 产品感觉像一个视觉化探索工具，而不是表格百科站。
- 中国地域原生地有本土感和差异化，不像象征性补充。
- 饲养相关语言保持谨慎，不输出绝对化结论。

## 实施阶段需要验证的假设 / Open Assumptions To Validate During Implementation

- 第一版使用人工整理静态数据，不会损害产品承诺。
- SVG / HTML / CSS 足以做出需要的视觉丰富度，不必一开始就上 Three.js。
- 约 40 条鱼种记录足以让图谱显得有内容。
- 鱼种视觉可以先用样式化表达，只要数据和布局清楚即可。
