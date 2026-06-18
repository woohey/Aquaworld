# Aqua Biotope Atlas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the MVP for Aqua Biotope Atlas / 观赏鱼原生地探索图谱: a desktop-first React app where users explore ornamental fish by native habitat, filters, fish details, and compatibility.

**Architecture:** Use a Vite React TypeScript single-page app with static data. Keep domain types and data separate from UI components. Derive visible fish from selected habitat, search, and filters in pure functions so core behavior is easy to test.

**Tech Stack:** React, Vite, TypeScript, Vitest, React Testing Library, CSS modules or plain CSS, SVG/HTML habitat map.

---

## File Structure

- `package.json`: scripts and dependencies.
- `index.html`: Vite HTML entry.
- `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `vitest.setup.ts`: TypeScript, Vite, and test config.
- `src/main.tsx`: React entry.
- `src/App.tsx`: top-level app state and layout.
- `src/styles.css`: global design tokens, layout, responsive behavior, animation.
- `src/types/domain.ts`: `Habitat`, `Fish`, filter, and compatibility types.
- `src/data/habitats.ts`: seven habitat records.
- `src/data/fish.ts`: MVP fish records.
- `src/utils/filterFish.ts`: pure filter/search helpers.
- `src/components/TopBar.tsx`: product name, current habitat, search.
- `src/components/FilterRail.tsx`: habitat/ecological filters.
- `src/components/HabitatMap.tsx`: central habitat map and fish overlays.
- `src/components/DetailPanel.tsx`: habitat overview and fish detail states.
- `src/components/CompatibilityBar.tsx`: selected fish compatibility layer.
- `src/components/FishList.tsx`: compact list for search results and mobile fallback.
- `src/components/__tests__/*.test.tsx`: component tests.
- `src/utils/__tests__/filterFish.test.ts`: pure helper tests.

## Task 1: Scaffold Vite React TypeScript App

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `vitest.setup.ts`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles.css`

- [ ] **Step 1: Create package and config files**

Create `package.json`:

```json
{
  "name": "aqua-biotope-atlas",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.0.5",
    "typescript": "^5.7.2",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@testing-library/user-event": "^14.5.2",
    "@types/react": "^19.0.2",
    "@types/react-dom": "^19.0.2",
    "jsdom": "^25.0.1",
    "vitest": "^2.1.8"
  }
}
```

Create `index.html`:

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Aqua Biotope Atlas</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ES2020"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

Create `tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "composite": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

Create `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    globals: true,
  },
});
```

Create `vitest.setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 2: Create minimal React shell**

Create `src/main.tsx`:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

Create `src/App.tsx`:

```tsx
export default function App() {
  return (
    <main className="app-shell">
      <section className="atlas-loading">
        <p>Aqua Biotope Atlas</p>
        <h1>观赏鱼原生地探索图谱</h1>
      </section>
    </main>
  );
}
```

Create `src/styles.css`:

```css
:root {
  color-scheme: dark;
  --bg: #061017;
  --panel: rgba(9, 25, 34, 0.78);
  --panel-strong: rgba(13, 38, 50, 0.92);
  --line: rgba(166, 236, 255, 0.18);
  --text: #ecfbff;
  --muted: #8eb5bf;
  --aqua: #6ee7f7;
  --green: #75e6b4;
  --amber: #ffc56b;
  --danger: #ff8a6b;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background: radial-gradient(circle at 30% 20%, rgba(53, 129, 146, 0.2), transparent 35%), var(--bg);
  color: var(--text);
}

button,
input,
select {
  font: inherit;
}

.app-shell {
  min-height: 100vh;
}

.atlas-loading {
  display: grid;
  min-height: 100vh;
  place-items: center;
  text-align: center;
}

.atlas-loading p {
  margin: 0;
  color: var(--aqua);
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.atlas-loading h1 {
  margin: 12px 0 0;
  font-size: 40px;
}
```

- [ ] **Step 3: Install dependencies**

Run: `npm install`

Expected: `package-lock.json` is created and install exits with code 0.

- [ ] **Step 4: Verify scaffold**

Run: `npm run build`

Expected: TypeScript and Vite build complete with no errors and `dist/` is created.

- [ ] **Step 5: Commit scaffold**

```bash
git add package.json package-lock.json index.html tsconfig.json tsconfig.node.json vite.config.ts vitest.setup.ts src/main.tsx src/App.tsx src/styles.css
git commit -m "feat: scaffold Aqua Biotope Atlas app"
```

## Task 2: Add Domain Types And Static Data

**Files:**
- Create: `src/types/domain.ts`
- Create: `src/data/habitats.ts`
- Create: `src/data/fish.ts`
- Create: `src/utils/__tests__/filterFish.test.ts`
- Create: `src/utils/filterFish.ts`

- [ ] **Step 1: Define domain types**

Create `src/types/domain.ts`:

```ts
export type Range = {
  min: number;
  max: number;
};

export type Temperament = 'peaceful' | 'semiAggressive' | 'aggressive';
export type CareLevel = 'easy' | 'moderate' | 'advanced';
export type SwimLayer = 'top' | 'middle' | 'bottom' | 'all';

export type Habitat = {
  id: string;
  name: string;
  englishName: string;
  subtitle: string;
  description: string;
  waterType: string;
  temperatureRange: Range;
  phRange: Range;
  hardnessRange: Range;
  visualMood: string;
  mapPosition: { x: number; y: number };
  colorPalette: {
    primary: string;
    secondary: string;
    glow: string;
  };
  representativeFishIds: string[];
};

export type Compatibility = {
  usuallySuitable: string[];
  useCaution: string[];
  notRecommended: string[];
  notes: string;
};

export type Fish = {
  id: string;
  commonName: string;
  chineseName: string;
  scientificName: string;
  originRegion: string;
  habitatId: string;
  habitat: string;
  temperatureRange: Range;
  phRange: Range;
  hardnessRange: Range;
  temperament: Temperament;
  adultSizeCm: number;
  swimLayer: SwimLayer;
  colors: string[];
  visualTags: string[];
  careLevel: CareLevel;
  schooling: string;
  compatibility: Compatibility;
  similarSpecies: string[];
  storyNote: string;
  markerPosition: { x: number; y: number };
};

export type FishFilters = {
  habitatId: string;
  temperature: number | null;
  ph: number | null;
  temperament: Temperament | 'all';
  maxAdultSizeCm: number | null;
  color: string;
  careLevel: CareLevel | 'all';
};

export const defaultFilters: FishFilters = {
  habitatId: 'all',
  temperature: null,
  ph: null,
  temperament: 'all',
  maxAdultSizeCm: null,
  color: 'all',
  careLevel: 'all',
};
```

- [ ] **Step 2: Add habitat data**

Create `src/data/habitats.ts` with exactly seven records:

```ts
import type { Habitat } from '../types/domain';

export const habitats: Habitat[] = [
  {
    id: 'amazon-blackwater',
    name: '亚马逊黑水',
    englishName: 'Amazon Blackwater',
    subtitle: '酸性软水里的霓虹鱼群',
    description: '落叶和腐殖质染深的慢流水域，光线柔和，常见小型群游鱼、短鲷、鼠鱼和七彩神仙。',
    waterType: '酸性软水',
    temperatureRange: { min: 24, max: 30 },
    phRange: { min: 5.0, max: 7.0 },
    hardnessRange: { min: 1, max: 8 },
    visualMood: '暗金、茶色水体、蓝红霓虹光点',
    mapPosition: { x: 22, y: 42 },
    colorPalette: { primary: '#7a4d2b', secondary: '#2cc7ff', glow: '#f5a45d' },
    representativeFishIds: ['neon-tetra', 'cardinal-tetra', 'discus', 'apistogramma', 'pencilfish', 'corydoras'],
  },
  {
    id: 'southeast-asian-streams',
    name: '东南亚溪流',
    englishName: 'Southeast Asian Streams',
    subtitle: '草丛、缓流与迷鳃鱼',
    description: '温暖、植被密集的溪流与湿地，适合斗鱼、拉斯波拉、鲃类和丝足鱼等观赏鱼。',
    waterType: '温暖弱酸至中性水',
    temperatureRange: { min: 23, max: 29 },
    phRange: { min: 6.0, max: 7.5 },
    hardnessRange: { min: 2, max: 12 },
    visualMood: '浓绿水草、浅金光、橙红鱼影',
    mapPosition: { x: 58, y: 48 },
    colorPalette: { primary: '#2f8f6b', secondary: '#ff8055', glow: '#78ffd6' },
    representativeFishIds: ['betta', 'pearl-gourami', 'harlequin-rasbora', 'tiger-barb', 'zebra-danio', 'rainbow-shark'],
  },
  {
    id: 'african-rift-lakes',
    name: '非洲裂谷湖',
    englishName: 'African Rift Lakes',
    subtitle: '硬水岩岸里的高对比色彩',
    description: '以岩岸、沙地和硬碱性湖水为核心的水域，慈鲷多样性极高，领域性和混养边界明显。',
    waterType: '碱性硬水',
    temperatureRange: { min: 24, max: 28 },
    phRange: { min: 7.6, max: 8.8 },
    hardnessRange: { min: 10, max: 25 },
    visualMood: '钴蓝、岩石灰、亮黄色',
    mapPosition: { x: 48, y: 68 },
    colorPalette: { primary: '#315f9f', secondary: '#f4c542', glow: '#83b7ff' },
    representativeFishIds: ['mbuna-cichlid', 'shell-dweller', 'frontosa', 'electric-blue-hap', 'blue-dolphin-cichlid', 'butterfly-cichlid'],
  },
  {
    id: 'south-asian-slow-waters',
    name: '南亚稻田与缓流水域',
    englishName: 'South Asian Rice Fields and Slow Waters',
    subtitle: '浅水、草丛和适应力',
    description: '稻田、浅渠与缓流水域形成高适应性鱼类场景，适合表现小型鱼的韧性和色彩。',
    waterType: '中性缓流水',
    temperatureRange: { min: 22, max: 29 },
    phRange: { min: 6.5, max: 7.8 },
    hardnessRange: { min: 4, max: 16 },
    visualMood: '稻田绿、浅褐泥底、银色鱼群',
    mapPosition: { x: 66, y: 62 },
    colorPalette: { primary: '#6f8f45', secondary: '#d7b26d', glow: '#d7ff8a' },
    representativeFishIds: ['guppy', 'platy', 'molly', 'medaka', 'small-barb', 'blue-gourami'],
  },
  {
    id: 'central-american-rivers',
    name: '中美洲河流',
    englishName: 'Central American Rivers',
    subtitle: '河流、石块和强个性慈鲷',
    description: '中性到偏硬水的河流系统，常见胎生鳉和中大型慈鲷，色彩鲜明但混养需要谨慎。',
    waterType: '中性至偏硬水',
    temperatureRange: { min: 22, max: 28 },
    phRange: { min: 7.0, max: 8.0 },
    hardnessRange: { min: 8, max: 20 },
    visualMood: '河石灰、橙红、墨绿',
    mapPosition: { x: 26, y: 60 },
    colorPalette: { primary: '#5b6b54', secondary: '#ff7b45', glow: '#ffc08a' },
    representativeFishIds: ['swordtail', 'livebearer', 'firemouth-cichlid', 'convict-cichlid', 'texas-cichlid', 'pearlscale-cichlid'],
  },
  {
    id: 'coral-reef-shallows',
    name: '珊瑚礁浅滩',
    englishName: 'Coral Reef Shallows',
    subtitle: '海水浅滩的高饱和色彩',
    description: '明亮、高盐度、高流动的珊瑚礁浅水环境，代表鱼种色彩强烈，适合做视觉冲击层。',
    waterType: '海水',
    temperatureRange: { min: 24, max: 27 },
    phRange: { min: 8.0, max: 8.4 },
    hardnessRange: { min: 20, max: 30 },
    visualMood: '珊瑚粉、荧光蓝、亮黄',
    mapPosition: { x: 78, y: 36 },
    colorPalette: { primary: '#2eb8c7', secondary: '#ff9f7a', glow: '#8df7ff' },
    representativeFishIds: ['clownfish', 'blue-tang', 'yellow-tang', 'damselfish', 'goby', 'flame-angelfish'],
  },
  {
    id: 'chinese-southern-streams',
    name: '中国南方溪流与稻田水域',
    englishName: 'Chinese Southern Streams and Rice-Field Waters',
    subtitle: '本土溪流里的低调观赏性',
    description: '南方清澈溪流、稻田水域和缓流水渠里的小型原生鱼群落，强调本土感、季节感和细腻生态关系。',
    waterType: '清澈溪流与缓流水',
    temperatureRange: { min: 16, max: 26 },
    phRange: { min: 6.5, max: 7.8 },
    hardnessRange: { min: 4, max: 16 },
    visualMood: '青绿、米白、浅金、溪石灰',
    mapPosition: { x: 70, y: 52 },
    colorPalette: { primary: '#5f9f8a', secondary: '#d6c27a', glow: '#b7ffe4' },
    representativeFishIds: ['white-cloud-minnow', 'paradise-fish', 'roundtail-paradise-fish', 'chinese-bitterling', 'chinese-medaka', 'stream-goby'],
  },
];
```

- [ ] **Step 3: Add fish data**

Create `src/data/fish.ts`. Add the following 14 seed records first, two from each habitat. Task 7 expands this seed set to full MVP coverage with the exact fish IDs listed there.

```ts
import type { Fish } from '../types/domain';

export const fish: Fish[] = [
  {
    id: 'neon-tetra',
    commonName: 'Neon Tetra',
    chineseName: '霓虹灯',
    scientificName: 'Paracheirodon innesi',
    originRegion: '南美洲亚马逊流域',
    habitatId: 'amazon-blackwater',
    habitat: '黑水支流与林下缓流',
    temperatureRange: { min: 22, max: 27 },
    phRange: { min: 5.5, max: 7.0 },
    hardnessRange: { min: 1, max: 10 },
    temperament: 'peaceful',
    adultSizeCm: 4,
    swimLayer: 'middle',
    colors: ['blue', 'red', 'silver'],
    visualTags: ['霓虹线条', '小型群游', '高对比'],
    careLevel: 'easy',
    schooling: '建议 8 条以上群游',
    compatibility: {
      usuallySuitable: ['cardinal-tetra', 'pencilfish', 'corydoras'],
      useCaution: ['discus', 'apistogramma'],
      notRecommended: ['mbuna-cichlid', 'convict-cichlid'],
      notes: '适合温和小型鱼，避免与强攻击或吞食风险鱼混养。',
    },
    similarSpecies: ['cardinal-tetra'],
    storyNote: '霓虹蓝红线条让它成为黑水鱼群的经典视觉符号。',
    markerPosition: { x: 19, y: 40 },
  },
  {
    id: 'cardinal-tetra',
    commonName: 'Cardinal Tetra',
    chineseName: '红绿灯',
    scientificName: 'Paracheirodon axelrodi',
    originRegion: '南美洲奥里诺科与亚马逊黑水',
    habitatId: 'amazon-blackwater',
    habitat: '酸性黑水支流',
    temperatureRange: { min: 24, max: 29 },
    phRange: { min: 4.5, max: 6.8 },
    hardnessRange: { min: 1, max: 8 },
    temperament: 'peaceful',
    adultSizeCm: 5,
    swimLayer: 'middle',
    colors: ['blue', 'red'],
    visualTags: ['完整红线', '群游', '黑水代表'],
    careLevel: 'moderate',
    schooling: '建议 10 条以上群游',
    compatibility: {
      usuallySuitable: ['neon-tetra', 'pencilfish', 'corydoras'],
      useCaution: ['discus'],
      notRecommended: ['tiger-barb', 'mbuna-cichlid'],
      notes: '偏好更温暖、更软酸的水，混养需匹配水质。',
    },
    similarSpecies: ['neon-tetra'],
    storyNote: '比霓虹灯更完整的红色侧线让它在暗水中非常醒目。',
    markerPosition: { x: 25, y: 46 },
  },
  {
    id: 'betta',
    commonName: 'Betta',
    chineseName: '斗鱼',
    scientificName: 'Betta splendens',
    originRegion: '东南亚',
    habitatId: 'southeast-asian-streams',
    habitat: '浅水湿地、缓流和植被密集水域',
    temperatureRange: { min: 24, max: 30 },
    phRange: { min: 6.0, max: 7.5 },
    hardnessRange: { min: 2, max: 12 },
    temperament: 'semiAggressive',
    adultSizeCm: 7,
    swimLayer: 'top',
    colors: ['red', 'blue', 'purple'],
    visualTags: ['长鳍', '单养美学', '迷鳃鱼'],
    careLevel: 'easy',
    schooling: '雄鱼通常单养',
    compatibility: {
      usuallySuitable: ['corydoras', 'harlequin-rasbora'],
      useCaution: ['pearl-gourami', 'tiger-barb'],
      notRecommended: ['betta', 'mbuna-cichlid'],
      notes: '雄鱼之间冲突明显，长鳍也容易被啃咬。',
    },
    similarSpecies: ['paradise-fish'],
    storyNote: '斗鱼把观赏鱼的性格、姿态和色彩都推到前景。',
    markerPosition: { x: 55, y: 44 },
  },
  {
    id: 'harlequin-rasbora',
    commonName: 'Harlequin Rasbora',
    chineseName: '三角灯',
    scientificName: 'Trigonostigma heteromorpha',
    originRegion: '马来半岛、苏门答腊等东南亚水域',
    habitatId: 'southeast-asian-streams',
    habitat: '植被丰富的弱酸性缓流水',
    temperatureRange: { min: 23, max: 28 },
    phRange: { min: 6.0, max: 7.5 },
    hardnessRange: { min: 2, max: 12 },
    temperament: 'peaceful',
    adultSizeCm: 5,
    swimLayer: 'middle',
    colors: ['orange', 'black'],
    visualTags: ['三角斑', '群游', '温和'],
    careLevel: 'easy',
    schooling: '建议 8 条以上群游',
    compatibility: {
      usuallySuitable: ['betta', 'pearl-gourami', 'corydoras'],
      useCaution: ['tiger-barb'],
      notRecommended: ['convict-cichlid'],
      notes: '适合温和群落缸，避免强势或追咬鱼。',
    },
    similarSpecies: ['small-barb'],
    storyNote: '黑色三角斑让它在水草背景中非常有识别度。',
    markerPosition: { x: 62, y: 50 },
  },
  {
    id: 'mbuna-cichlid',
    commonName: 'Mbuna Cichlid',
    chineseName: '马鲷',
    scientificName: 'Pseudotropheus / Maylandia spp.',
    originRegion: '马拉维湖',
    habitatId: 'african-rift-lakes',
    habitat: '岩岸硬碱性湖水',
    temperatureRange: { min: 24, max: 28 },
    phRange: { min: 7.8, max: 8.6 },
    hardnessRange: { min: 10, max: 25 },
    temperament: 'aggressive',
    adultSizeCm: 12,
    swimLayer: 'middle',
    colors: ['blue', 'yellow', 'black'],
    visualTags: ['高饱和', '岩岸领域', '慈鲷'],
    careLevel: 'moderate',
    schooling: '按种群和性别比例规划',
    compatibility: {
      usuallySuitable: ['electric-blue-hap'],
      useCaution: ['frontosa', 'blue-dolphin-cichlid'],
      notRecommended: ['neon-tetra', 'guppy', 'betta'],
      notes: '领域性强，混养通常应限制在相近水质和体型的裂谷湖鱼。',
    },
    similarSpecies: ['electric-blue-hap'],
    storyNote: '裂谷湖鱼把颜色和领域行为绑定在一起，是生态关系很强的一组鱼。',
    markerPosition: { x: 45, y: 65 },
  },
  {
    id: 'shell-dweller',
    commonName: 'Shell Dweller',
    chineseName: '卷贝鱼',
    scientificName: 'Neolamprologus multifasciatus',
    originRegion: '坦噶尼喀湖',
    habitatId: 'african-rift-lakes',
    habitat: '贝壳床与沙地交界',
    temperatureRange: { min: 24, max: 27 },
    phRange: { min: 7.8, max: 8.8 },
    hardnessRange: { min: 10, max: 25 },
    temperament: 'semiAggressive',
    adultSizeCm: 4,
    swimLayer: 'bottom',
    colors: ['cream', 'brown'],
    visualTags: ['贝壳领地', '小型慈鲷', '行为观察'],
    careLevel: 'moderate',
    schooling: '可小群落饲养',
    compatibility: {
      usuallySuitable: ['frontosa'],
      useCaution: ['mbuna-cichlid'],
      notRecommended: ['neon-tetra', 'betta'],
      notes: '体型小但领地明确，适合坦湖主题缸。',
    },
    similarSpecies: ['butterfly-cichlid'],
    storyNote: '它让“家”这个概念直接变成贝壳领地。',
    markerPosition: { x: 52, y: 72 },
  },
  {
    id: 'guppy',
    commonName: 'Guppy',
    chineseName: '孔雀鱼',
    scientificName: 'Poecilia reticulata',
    originRegion: '南美洲北部，水族贸易中广泛人工选育',
    habitatId: 'south-asian-slow-waters',
    habitat: '浅水、缓流与人工环境适应场景',
    temperatureRange: { min: 22, max: 28 },
    phRange: { min: 6.8, max: 7.8 },
    hardnessRange: { min: 6, max: 20 },
    temperament: 'peaceful',
    adultSizeCm: 5,
    swimLayer: 'top',
    colors: ['red', 'blue', 'yellow', 'multicolor'],
    visualTags: ['尾型变化', '人工选育', '入门经典'],
    careLevel: 'easy',
    schooling: '可小群饲养，注意繁殖速度',
    compatibility: {
      usuallySuitable: ['platy', 'molly', 'corydoras'],
      useCaution: ['tiger-barb', 'betta'],
      notRecommended: ['convict-cichlid', 'mbuna-cichlid'],
      notes: '长尾品系需要避开啃鳍鱼和强攻击鱼。',
    },
    similarSpecies: ['platy', 'molly'],
    storyNote: '孔雀鱼是人工选育观赏性的代表，但也适合放在适应型水域中讲。',
    markerPosition: { x: 63, y: 64 },
  },
  {
    id: 'platy',
    commonName: 'Platy',
    chineseName: '月光鱼',
    scientificName: 'Xiphophorus maculatus',
    originRegion: '中美洲，水族贸易中广泛人工选育',
    habitatId: 'south-asian-slow-waters',
    habitat: '浅水缓流与植被边缘',
    temperatureRange: { min: 22, max: 27 },
    phRange: { min: 7.0, max: 8.0 },
    hardnessRange: { min: 8, max: 20 },
    temperament: 'peaceful',
    adultSizeCm: 6,
    swimLayer: 'middle',
    colors: ['orange', 'red', 'yellow'],
    visualTags: ['胎生鳉', '温和', '高适应'],
    careLevel: 'easy',
    schooling: '可小群饲养',
    compatibility: {
      usuallySuitable: ['guppy', 'molly', 'swordtail'],
      useCaution: ['betta'],
      notRecommended: ['mbuna-cichlid'],
      notes: '适合温和社区缸，注意胎生鱼繁殖。',
    },
    similarSpecies: ['swordtail'],
    storyNote: '月光鱼把稳定、明亮和易观察的社区缸气质表现得很清楚。',
    markerPosition: { x: 69, y: 60 },
  },
  {
    id: 'swordtail',
    commonName: 'Swordtail',
    chineseName: '剑尾',
    scientificName: 'Xiphophorus hellerii',
    originRegion: '中美洲河流',
    habitatId: 'central-american-rivers',
    habitat: '中性至偏硬河流与植被边缘',
    temperatureRange: { min: 22, max: 28 },
    phRange: { min: 7.0, max: 8.2 },
    hardnessRange: { min: 8, max: 20 },
    temperament: 'peaceful',
    adultSizeCm: 12,
    swimLayer: 'middle',
    colors: ['orange', 'green', 'black'],
    visualTags: ['剑形尾鳍', '胎生鳉', '河流感'],
    careLevel: 'easy',
    schooling: '可小群饲养',
    compatibility: {
      usuallySuitable: ['platy', 'molly'],
      useCaution: ['firemouth-cichlid'],
      notRecommended: ['mbuna-cichlid', 'convict-cichlid'],
      notes: '体型和活动量高于多数小型灯鱼，混养需留空间。',
    },
    similarSpecies: ['platy'],
    storyNote: '剑尾的尾鳍让它在轮廓上非常容易识别。',
    markerPosition: { x: 24, y: 58 },
  },
  {
    id: 'firemouth-cichlid',
    commonName: 'Firemouth Cichlid',
    chineseName: '火口',
    scientificName: 'Thorichthys meeki',
    originRegion: '中美洲',
    habitatId: 'central-american-rivers',
    habitat: '慢流河段、沙底与石块区域',
    temperatureRange: { min: 24, max: 28 },
    phRange: { min: 6.8, max: 8.0 },
    hardnessRange: { min: 8, max: 20 },
    temperament: 'semiAggressive',
    adultSizeCm: 15,
    swimLayer: 'middle',
    colors: ['red', 'silver', 'blue'],
    visualTags: ['红喉展示', '慈鲷行为', '领地'],
    careLevel: 'moderate',
    schooling: '通常成对或单独规划',
    compatibility: {
      usuallySuitable: ['swordtail'],
      useCaution: ['texas-cichlid', 'convict-cichlid'],
      notRecommended: ['neon-tetra', 'guppy'],
      notes: '繁殖期领域性上升，不适合与太小或太温和的鱼混养。',
    },
    similarSpecies: ['convict-cichlid'],
    storyNote: '火口的展示行为让“性格”成为视觉体验的一部分。',
    markerPosition: { x: 30, y: 65 },
  },
  {
    id: 'clownfish',
    commonName: 'Clownfish',
    chineseName: '小丑鱼',
    scientificName: 'Amphiprioninae spp.',
    originRegion: '印度洋与太平洋珊瑚礁',
    habitatId: 'coral-reef-shallows',
    habitat: '珊瑚礁与海葵共生环境',
    temperatureRange: { min: 24, max: 27 },
    phRange: { min: 8.0, max: 8.4 },
    hardnessRange: { min: 20, max: 30 },
    temperament: 'semiAggressive',
    adultSizeCm: 10,
    swimLayer: 'middle',
    colors: ['orange', 'white', 'black'],
    visualTags: ['海葵共生', '高识别度', '海水经典'],
    careLevel: 'moderate',
    schooling: '常见成对饲养',
    compatibility: {
      usuallySuitable: ['goby', 'damselfish'],
      useCaution: ['flame-angelfish'],
      notRecommended: ['mbuna-cichlid'],
      notes: '属于海水系统，不能与淡水鱼混养。',
    },
    similarSpecies: ['damselfish'],
    storyNote: '小丑鱼是海水观赏鱼里最容易被大众识别的入口。',
    markerPosition: { x: 76, y: 34 },
  },
  {
    id: 'blue-tang',
    commonName: 'Blue Tang',
    chineseName: '蓝吊',
    scientificName: 'Paracanthurus hepatus',
    originRegion: '印度洋与太平洋珊瑚礁',
    habitatId: 'coral-reef-shallows',
    habitat: '开阔礁区与高流动水体',
    temperatureRange: { min: 24, max: 27 },
    phRange: { min: 8.0, max: 8.4 },
    hardnessRange: { min: 20, max: 30 },
    temperament: 'semiAggressive',
    adultSizeCm: 30,
    swimLayer: 'middle',
    colors: ['blue', 'yellow', 'black'],
    visualTags: ['强蓝色块', '高活动量', '海水大空间'],
    careLevel: 'advanced',
    schooling: '需要较大空间',
    compatibility: {
      usuallySuitable: ['yellow-tang', 'clownfish'],
      useCaution: ['flame-angelfish'],
      notRecommended: ['neon-tetra', 'guppy'],
      notes: '海水鱼且成体较大，MVP 中仅作生态与视觉展示，不做饲养推荐。',
    },
    similarSpecies: ['yellow-tang'],
    storyNote: '蓝吊的大面积蓝色非常适合承担珊瑚礁节点的视觉锚点。',
    markerPosition: { x: 82, y: 40 },
  },
  {
    id: 'white-cloud-minnow',
    commonName: 'White Cloud Mountain Minnow',
    chineseName: '白云金丝',
    scientificName: 'Tanichthys albonubes',
    originRegion: '中国南方溪流',
    habitatId: 'chinese-southern-streams',
    habitat: '清澈溪流与较凉水域',
    temperatureRange: { min: 16, max: 24 },
    phRange: { min: 6.5, max: 7.5 },
    hardnessRange: { min: 4, max: 16 },
    temperament: 'peaceful',
    adultSizeCm: 4,
    swimLayer: 'middle',
    colors: ['silver', 'red', 'gold'],
    visualTags: ['本土代表', '冷水适应', '小型群游'],
    careLevel: 'easy',
    schooling: '建议 8 条以上群游',
    compatibility: {
      usuallySuitable: ['chinese-medaka', 'chinese-bitterling'],
      useCaution: ['paradise-fish'],
      notRecommended: ['mbuna-cichlid', 'blue-tang'],
      notes: '偏好较凉且清洁的水，不适合与高温或攻击性强的鱼混养。',
    },
    similarSpecies: ['chinese-medaka'],
    storyNote: '白云金丝让中国本土水域成为图谱里有辨识度的一章。',
    markerPosition: { x: 68, y: 50 },
  },
  {
    id: 'paradise-fish',
    commonName: 'Paradise Fish',
    chineseName: '中国斗鱼',
    scientificName: 'Macropodus opercularis',
    originRegion: '中国南方及周边地区',
    habitatId: 'chinese-southern-streams',
    habitat: '稻田、沟渠、缓流水与植被丰富水域',
    temperatureRange: { min: 16, max: 26 },
    phRange: { min: 6.0, max: 8.0 },
    hardnessRange: { min: 4, max: 18 },
    temperament: 'semiAggressive',
    adultSizeCm: 8,
    swimLayer: 'top',
    colors: ['red', 'blue', 'brown'],
    visualTags: ['本土迷鳃鱼', '鳍展', '领域性'],
    careLevel: 'easy',
    schooling: '雄鱼通常需要谨慎搭配',
    compatibility: {
      usuallySuitable: ['white-cloud-minnow'],
      useCaution: ['roundtail-paradise-fish', 'chinese-medaka'],
      notRecommended: ['betta', 'guppy'],
      notes: '有领域性，混养要看个体性格、空间和遮蔽物。',
    },
    similarSpecies: ['roundtail-paradise-fish', 'betta'],
    storyNote: '中国斗鱼把本土鱼的观赏性和性格都放到台前。',
    markerPosition: { x: 73, y: 54 },
  },
];
```

- [ ] **Step 4: Write failing filter tests**

Create `src/utils/__tests__/filterFish.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { fish } from '../../data/fish';
import { defaultFilters } from '../../types/domain';
import { filterFish } from '../filterFish';

describe('filterFish', () => {
  it('filters fish by habitat', () => {
    const result = filterFish(fish, {
      ...defaultFilters,
      habitatId: 'chinese-southern-streams',
    }, '');

    expect(result.map((item) => item.id)).toEqual(['white-cloud-minnow', 'paradise-fish']);
  });

  it('filters fish by temperature and pH', () => {
    const result = filterFish(fish, {
      ...defaultFilters,
      temperature: 18,
      ph: 7,
    }, '');

    expect(result.some((item) => item.id === 'white-cloud-minnow')).toBe(true);
    expect(result.some((item) => item.id === 'clownfish')).toBe(false);
  });

  it('searches Chinese, common, and scientific names', () => {
    expect(filterFish(fish, defaultFilters, '白云').map((item) => item.id)).toEqual(['white-cloud-minnow']);
    expect(filterFish(fish, defaultFilters, 'Neon').map((item) => item.id)).toEqual(['neon-tetra']);
    expect(filterFish(fish, defaultFilters, 'Macropodus').map((item) => item.id)).toEqual(['paradise-fish']);
  });
});
```

- [ ] **Step 5: Run tests to verify they fail**

Run: `npm test -- src/utils/__tests__/filterFish.test.ts`

Expected: FAIL with an import error because `src/utils/filterFish.ts` does not exist.

- [ ] **Step 6: Implement filter helper**

Create `src/utils/filterFish.ts`:

```ts
import type { Fish, FishFilters } from '../types/domain';

function includesRange(value: number | null, min: number, max: number) {
  return value === null || (value >= min && value <= max);
}

function matchesSearch(fish: Fish, searchQuery: string) {
  const query = searchQuery.trim().toLowerCase();
  if (!query) return true;

  return [
    fish.chineseName,
    fish.commonName,
    fish.scientificName,
    fish.originRegion,
    fish.habitat,
    ...fish.visualTags,
  ].some((value) => value.toLowerCase().includes(query));
}

export function filterFish(fish: Fish[], filters: FishFilters, searchQuery: string) {
  return fish.filter((item) => {
    if (filters.habitatId !== 'all' && item.habitatId !== filters.habitatId) return false;
    if (!includesRange(filters.temperature, item.temperatureRange.min, item.temperatureRange.max)) return false;
    if (!includesRange(filters.ph, item.phRange.min, item.phRange.max)) return false;
    if (filters.temperament !== 'all' && item.temperament !== filters.temperament) return false;
    if (filters.maxAdultSizeCm !== null && item.adultSizeCm > filters.maxAdultSizeCm) return false;
    if (filters.color !== 'all' && !item.colors.includes(filters.color)) return false;
    if (filters.careLevel !== 'all' && item.careLevel !== filters.careLevel) return false;
    return matchesSearch(item, searchQuery);
  });
}
```

- [ ] **Step 7: Verify tests pass**

Run: `npm test -- src/utils/__tests__/filterFish.test.ts`

Expected: PASS for all three tests.

- [ ] **Step 8: Commit domain data foundation**

```bash
git add src/types/domain.ts src/data/habitats.ts src/data/fish.ts src/utils/filterFish.ts src/utils/__tests__/filterFish.test.ts
git commit -m "feat: add habitat and fish domain data"
```

## Task 3: Build Top-Level App State And Layout

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles.css`
- Create: `src/components/TopBar.tsx`
- Create: `src/components/__tests__/App.test.tsx`

- [ ] **Step 1: Write failing app shell test**

Create `src/components/__tests__/App.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from '../../App';

describe('App', () => {
  it('renders product identity and selected habitat', () => {
    render(<App />);

    expect(screen.getByText('Aqua Biotope Atlas')).toBeInTheDocument();
    expect(screen.getByText('观赏鱼原生地探索图谱')).toBeInTheDocument();
    expect(screen.getByText('亚马逊黑水')).toBeInTheDocument();
  });

  it('updates search input', async () => {
    const user = userEvent.setup();
    render(<App />);

    const search = screen.getByLabelText('搜索鱼种');
    await user.type(search, '白云');

    expect(search).toHaveValue('白云');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/__tests__/App.test.tsx`

Expected: FAIL because the current app shell does not render the final UI or search input.

- [ ] **Step 3: Add `TopBar` component**

Create `src/components/TopBar.tsx`:

```tsx
import type { Habitat } from '../types/domain';

type TopBarProps = {
  selectedHabitat: Habitat;
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

export function TopBar({ selectedHabitat, searchQuery, onSearchChange }: TopBarProps) {
  return (
    <header className="top-bar">
      <div>
        <p className="product-name">Aqua Biotope Atlas</p>
        <h1>观赏鱼原生地探索图谱</h1>
      </div>
      <div className="top-bar__context">
        <span>{selectedHabitat.name}</span>
        <label>
          搜索鱼种
          <input
            aria-label="搜索鱼种"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            aria-describedby="fish-search-help"
          />
          <span id="fish-search-help" className="sr-only">可输入中文名、英文名或学名</span>
        </label>
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Implement app state and temporary layout surfaces**

Replace `src/App.tsx` with:

```tsx
import { useMemo, useState } from 'react';
import { habitats } from './data/habitats';
import { fish } from './data/fish';
import { TopBar } from './components/TopBar';
import { defaultFilters, type FishFilters } from './types/domain';
import { filterFish } from './utils/filterFish';

export default function App() {
  const [selectedHabitatId, setSelectedHabitatId] = useState(habitats[0].id);
  const [selectedFishId, setSelectedFishId] = useState<string | null>(null);
  const [filters, setFilters] = useState<FishFilters>(defaultFilters);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedHabitat = habitats.find((habitat) => habitat.id === selectedHabitatId) ?? habitats[0];
  const visibleFish = useMemo(() => filterFish(fish, filters, searchQuery), [filters, searchQuery]);
  const selectedFish = fish.find((item) => item.id === selectedFishId) ?? null;

  return (
    <main className="app-shell">
      <TopBar selectedHabitat={selectedHabitat} searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <section className="atlas-layout" aria-label="观赏鱼原生地图谱">
        <aside className="filter-rail">
          <h2>生态条件</h2>
          <button
            type="button"
            onClick={() => {
              setFilters(defaultFilters);
              setSelectedHabitatId(habitats[0].id);
              setSelectedFishId(null);
            }}
          >
            重置筛选
          </button>
        </aside>
        <section className="map-stage">
          <p>{selectedHabitat.description}</p>
          <p>当前可见鱼种：{visibleFish.length}</p>
        </section>
        <aside className="detail-panel">
          <h2>{selectedFish ? selectedFish.chineseName : selectedHabitat.name}</h2>
        </aside>
      </section>
    </main>
  );
}
```

- [ ] **Step 5: Add layout CSS**

Append to `src/styles.css`:

```css
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 20px 24px 12px;
}

.product-name {
  margin: 0 0 4px;
  color: var(--aqua);
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.top-bar h1 {
  margin: 0;
  font-size: 24px;
  line-height: 1.2;
}

.top-bar__context {
  display: flex;
  align-items: center;
  gap: 16px;
  color: var(--muted);
}

.top-bar label {
  display: grid;
  gap: 6px;
  color: var(--muted);
  font-size: 12px;
}

.top-bar input {
  width: 260px;
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 10px 12px;
  background: rgba(3, 12, 18, 0.8);
  color: var(--text);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.atlas-layout {
  display: grid;
  grid-template-columns: 260px minmax(420px, 1fr) 320px;
  gap: 16px;
  height: calc(100vh - 86px);
  padding: 12px 24px 24px;
}

.filter-rail,
.map-stage,
.detail-panel {
  border: 1px solid var(--line);
  background: var(--panel);
  border-radius: 18px;
  min-height: 0;
}

.filter-rail,
.detail-panel {
  padding: 18px;
}

.map-stage {
  position: relative;
  overflow: hidden;
  padding: 18px;
}

@media (max-width: 980px) {
  .top-bar,
  .top-bar__context {
    align-items: stretch;
    flex-direction: column;
  }

  .top-bar input {
    width: 100%;
  }

  .atlas-layout {
    grid-template-columns: 1fr;
    height: auto;
  }
}
```

- [ ] **Step 6: Run app test**

Run: `npm test -- src/components/__tests__/App.test.tsx`

Expected: PASS.

- [ ] **Step 7: Run build**

Run: `npm run build`

Expected: PASS.

- [ ] **Step 8: Commit app shell**

```bash
git add src/App.tsx src/components/TopBar.tsx src/components/__tests__/App.test.tsx src/styles.css
git commit -m "feat: add atlas app shell"
```

## Task 4: Implement Filter Rail

**Files:**
- Create: `src/components/FilterRail.tsx`
- Create: `src/components/__tests__/FilterRail.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Write failing filter rail test**

Create `src/components/__tests__/FilterRail.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { habitats } from '../../data/habitats';
import { defaultFilters } from '../../types/domain';
import { FilterRail } from '../FilterRail';

describe('FilterRail', () => {
  it('changes selected habitat and ecological filters', async () => {
    const user = userEvent.setup();
    const onFiltersChange = vi.fn();
    const onHabitatSelect = vi.fn();

    render(
      <FilterRail
        habitats={habitats}
        filters={defaultFilters}
        selectedHabitatId="amazon-blackwater"
        onFiltersChange={onFiltersChange}
        onHabitatSelect={onHabitatSelect}
        onReset={() => undefined}
      />,
    );

    await user.selectOptions(screen.getByLabelText('原生地'), 'chinese-southern-streams');
    expect(onHabitatSelect).toHaveBeenCalledWith('chinese-southern-streams');

    await user.selectOptions(screen.getByLabelText('性格'), 'peaceful');
    expect(onFiltersChange).toHaveBeenCalledWith({ ...defaultFilters, temperament: 'peaceful' });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/__tests__/FilterRail.test.tsx`

Expected: FAIL because `FilterRail` does not exist.

- [ ] **Step 3: Implement `FilterRail`**

Create `src/components/FilterRail.tsx`:

```tsx
import type { CareLevel, FishFilters, Habitat, Temperament } from '../types/domain';

type FilterRailProps = {
  habitats: Habitat[];
  filters: FishFilters;
  selectedHabitatId: string;
  onFiltersChange: (filters: FishFilters) => void;
  onHabitatSelect: (habitatId: string) => void;
  onReset: () => void;
};

const temperamentOptions: Array<{ value: Temperament | 'all'; label: string }> = [
  { value: 'all', label: '全部' },
  { value: 'peaceful', label: '温和' },
  { value: 'semiAggressive', label: '半攻击' },
  { value: 'aggressive', label: '攻击性强' },
];

const careOptions: Array<{ value: CareLevel | 'all'; label: string }> = [
  { value: 'all', label: '全部' },
  { value: 'easy', label: '容易' },
  { value: 'moderate', label: '中等' },
  { value: 'advanced', label: '进阶' },
];

const colorOptions = ['all', 'blue', 'red', 'yellow', 'orange', 'silver', 'black', 'green', 'multicolor'];

export function FilterRail({
  habitats,
  filters,
  selectedHabitatId,
  onFiltersChange,
  onHabitatSelect,
  onReset,
}: FilterRailProps) {
  return (
    <aside className="filter-rail">
      <div className="panel-heading">
        <p>Ecology Tuning</p>
        <h2>生态条件</h2>
      </div>

      <label>
        原生地
        <select value={selectedHabitatId} onChange={(event) => onHabitatSelect(event.target.value)}>
          {habitats.map((habitat) => (
            <option key={habitat.id} value={habitat.id}>
              {habitat.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        水温 {filters.temperature ?? '全部'}°C
        <input
          type="range"
          min="16"
          max="30"
          value={filters.temperature ?? 23}
          onChange={(event) => onFiltersChange({ ...filters, temperature: Number(event.target.value) })}
        />
      </label>

      <label>
        pH {filters.ph ?? '全部'}
        <input
          type="range"
          min="4.5"
          max="8.8"
          step="0.1"
          value={filters.ph ?? 7}
          onChange={(event) => onFiltersChange({ ...filters, ph: Number(event.target.value) })}
        />
      </label>

      <label>
        性格
        <select
          value={filters.temperament}
          onChange={(event) => onFiltersChange({ ...filters, temperament: event.target.value as Temperament | 'all' })}
        >
          {temperamentOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        最大体长 {filters.maxAdultSizeCm ?? '全部'} cm
        <input
          type="range"
          min="3"
          max="30"
          value={filters.maxAdultSizeCm ?? 30}
          onChange={(event) => onFiltersChange({ ...filters, maxAdultSizeCm: Number(event.target.value) })}
        />
      </label>

      <label>
        色彩
        <select value={filters.color} onChange={(event) => onFiltersChange({ ...filters, color: event.target.value })}>
          {colorOptions.map((color) => (
            <option key={color} value={color}>
              {color === 'all' ? '全部' : color}
            </option>
          ))}
        </select>
      </label>

      <label>
        饲养难度
        <select
          value={filters.careLevel}
          onChange={(event) => onFiltersChange({ ...filters, careLevel: event.target.value as CareLevel | 'all' })}
        >
          {careOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <button type="button" className="secondary-button" onClick={onReset}>
        重置筛选
      </button>
    </aside>
  );
}
```

- [ ] **Step 4: Wire `FilterRail` into `App`**

Modify `src/App.tsx`: import `FilterRail`, replace the temporary `<aside className="filter-rail">...</aside>` with:

```tsx
<FilterRail
  habitats={habitats}
  filters={filters}
  selectedHabitatId={selectedHabitatId}
  onFiltersChange={setFilters}
  onHabitatSelect={(habitatId) => {
    setSelectedHabitatId(habitatId);
    setSelectedFishId(null);
    setFilters((current) => ({ ...current, habitatId }));
  }}
  onReset={() => {
    setFilters(defaultFilters);
    setSelectedHabitatId(habitats[0].id);
    setSelectedFishId(null);
  }}
/>
```

- [ ] **Step 5: Add filter rail styles**

Append to `src/styles.css`:

```css
.panel-heading p {
  margin: 0 0 4px;
  color: var(--aqua);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.panel-heading h2 {
  margin: 0 0 18px;
  font-size: 18px;
}

.filter-rail {
  display: grid;
  align-content: start;
  gap: 16px;
}

.filter-rail label {
  display: grid;
  gap: 8px;
  color: var(--muted);
  font-size: 13px;
}

.filter-rail select,
.filter-rail input[type='range'] {
  width: 100%;
}

.filter-rail select {
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 10px 12px;
  background: rgba(3, 12, 18, 0.85);
  color: var(--text);
}

.secondary-button {
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 11px 12px;
  background: rgba(111, 231, 247, 0.08);
  color: var(--text);
  cursor: pointer;
}
```

- [ ] **Step 6: Verify filter tests and build**

Run: `npm test -- src/components/__tests__/FilterRail.test.tsx src/components/__tests__/App.test.tsx`

Expected: PASS.

Run: `npm run build`

Expected: PASS.

- [ ] **Step 7: Commit filter rail**

```bash
git add src/App.tsx src/components/FilterRail.tsx src/components/__tests__/FilterRail.test.tsx src/styles.css
git commit -m "feat: add ecological filter rail"
```

## Task 5: Implement Habitat Map And Fish Markers

**Files:**
- Create: `src/components/HabitatMap.tsx`
- Create: `src/components/__tests__/HabitatMap.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Write failing habitat map test**

Create `src/components/__tests__/HabitatMap.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { fish } from '../../data/fish';
import { habitats } from '../../data/habitats';
import { HabitatMap } from '../HabitatMap';

describe('HabitatMap', () => {
  it('selects habitat and fish from the map', async () => {
    const user = userEvent.setup();
    const onHabitatSelect = vi.fn();
    const onFishSelect = vi.fn();

    render(
      <HabitatMap
        habitats={habitats}
        fish={fish}
        selectedHabitatId="amazon-blackwater"
        selectedFishId={null}
        onHabitatSelect={onHabitatSelect}
        onFishSelect={onFishSelect}
      />,
    );

    await user.click(screen.getByRole('button', { name: '中国南方溪流与稻田水域' }));
    expect(onHabitatSelect).toHaveBeenCalledWith('chinese-southern-streams');

    await user.click(screen.getByRole('button', { name: '霓虹灯 Neon Tetra' }));
    expect(onFishSelect).toHaveBeenCalledWith('neon-tetra');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/__tests__/HabitatMap.test.tsx`

Expected: FAIL because `HabitatMap` does not exist.

- [ ] **Step 3: Implement `HabitatMap`**

Create `src/components/HabitatMap.tsx`:

```tsx
import type { Fish, Habitat } from '../types/domain';

type HabitatMapProps = {
  habitats: Habitat[];
  fish: Fish[];
  selectedHabitatId: string;
  selectedFishId: string | null;
  onHabitatSelect: (habitatId: string) => void;
  onFishSelect: (fishId: string) => void;
};

export function HabitatMap({
  habitats,
  fish,
  selectedHabitatId,
  selectedFishId,
  onHabitatSelect,
  onFishSelect,
}: HabitatMapProps) {
  return (
    <section className="map-stage" aria-label="原生地生态图谱">
      <div className="map-waterlines" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      {habitats.map((habitat) => (
        <button
          key={habitat.id}
          type="button"
          className={`habitat-node ${habitat.id === selectedHabitatId ? 'is-selected' : ''}`}
          style={{
            left: `${habitat.mapPosition.x}%`,
            top: `${habitat.mapPosition.y}%`,
            '--node-primary': habitat.colorPalette.primary,
            '--node-secondary': habitat.colorPalette.secondary,
            '--node-glow': habitat.colorPalette.glow,
          } as React.CSSProperties}
          onClick={() => onHabitatSelect(habitat.id)}
          aria-label={habitat.name}
        >
          <span className="habitat-node__orb" />
          <span className="habitat-node__name">{habitat.name}</span>
        </button>
      ))}

      {fish.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`fish-marker ${item.id === selectedFishId ? 'is-selected' : ''}`}
          style={{
            left: `${item.markerPosition.x}%`,
            top: `${item.markerPosition.y}%`,
            '--fish-color': item.colors[0],
          } as React.CSSProperties}
          onClick={() => onFishSelect(item.id)}
          aria-label={`${item.chineseName} ${item.commonName}`}
        >
          <span className="fish-marker__shape" />
          <span className="fish-marker__label">{item.chineseName}</span>
        </button>
      ))}
    </section>
  );
}
```

- [ ] **Step 4: Wire `HabitatMap` into `App`**

Modify `src/App.tsx`: import `HabitatMap`, replace the temporary `<section className="map-stage">...</section>` with:

```tsx
<HabitatMap
  habitats={habitats}
  fish={visibleFish}
  selectedHabitatId={selectedHabitatId}
  selectedFishId={selectedFishId}
  onHabitatSelect={(habitatId) => {
    setSelectedHabitatId(habitatId);
    setSelectedFishId(null);
    setFilters((current) => ({ ...current, habitatId }));
  }}
  onFishSelect={setSelectedFishId}
/>
```

- [ ] **Step 5: Add habitat map styles**

Append to `src/styles.css`:

```css
.map-stage {
  background:
    radial-gradient(circle at 20% 35%, rgba(82, 211, 178, 0.15), transparent 22%),
    radial-gradient(circle at 78% 40%, rgba(82, 164, 255, 0.16), transparent 25%),
    linear-gradient(180deg, rgba(5, 16, 24, 0.96), rgba(5, 17, 23, 0.82));
}

.map-waterlines span {
  position: absolute;
  width: 62%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(140, 230, 255, 0.28), transparent);
  transform: rotate(-16deg);
}

.map-waterlines span:nth-child(1) {
  left: 8%;
  top: 30%;
}

.map-waterlines span:nth-child(2) {
  left: 22%;
  top: 55%;
}

.map-waterlines span:nth-child(3) {
  left: 10%;
  top: 76%;
}

.habitat-node,
.fish-marker {
  position: absolute;
  border: 0;
  background: transparent;
  color: var(--text);
  cursor: pointer;
  transform: translate(-50%, -50%);
}

.habitat-node__orb {
  display: block;
  width: 82px;
  height: 58px;
  border: 1px solid color-mix(in srgb, var(--node-glow), transparent 40%);
  border-radius: 50%;
  background: radial-gradient(circle at 40% 38%, var(--node-secondary), var(--node-primary) 58%, rgba(2, 8, 12, 0.35));
  box-shadow: 0 0 32px color-mix(in srgb, var(--node-glow), transparent 55%);
  opacity: 0.8;
}

.habitat-node.is-selected .habitat-node__orb {
  opacity: 1;
  box-shadow: 0 0 42px color-mix(in srgb, var(--node-glow), transparent 30%);
}

.habitat-node__name {
  display: block;
  margin-top: 8px;
  max-width: 120px;
  color: #dffbff;
  font-size: 12px;
  line-height: 1.35;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
}

.fish-marker {
  display: grid;
  justify-items: center;
  gap: 5px;
  animation: drift 5s ease-in-out infinite;
}

.fish-marker__shape {
  width: 34px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.88), var(--aqua));
  box-shadow: 0 0 18px rgba(110, 231, 247, 0.28);
}

.fish-marker.is-selected .fish-marker__shape {
  outline: 2px solid var(--amber);
}

.fish-marker__label {
  border-radius: 999px;
  padding: 3px 7px;
  background: rgba(2, 8, 12, 0.68);
  color: #eafcff;
  font-size: 11px;
}

@keyframes drift {
  0%, 100% {
    translate: 0 0;
  }
  50% {
    translate: 6px -5px;
  }
}
```

- [ ] **Step 6: Verify map tests and build**

Run: `npm test -- src/components/__tests__/HabitatMap.test.tsx src/components/__tests__/App.test.tsx`

Expected: PASS.

Run: `npm run build`

Expected: PASS.

- [ ] **Step 7: Commit habitat map**

```bash
git add src/App.tsx src/components/HabitatMap.tsx src/components/__tests__/HabitatMap.test.tsx src/styles.css
git commit -m "feat: add habitat map and fish markers"
```

## Task 6: Implement Detail Panel And Compatibility Bar

**Files:**
- Create: `src/components/DetailPanel.tsx`
- Create: `src/components/CompatibilityBar.tsx`
- Create: `src/components/__tests__/DetailPanel.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Write failing detail panel test**

Create `src/components/__tests__/DetailPanel.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { fish } from '../../data/fish';
import { habitats } from '../../data/habitats';
import { CompatibilityBar } from '../CompatibilityBar';
import { DetailPanel } from '../DetailPanel';

describe('DetailPanel', () => {
  it('shows habitat overview when no fish is selected', () => {
    render(<DetailPanel habitat={habitats[0]} fish={null} />);

    expect(screen.getByText('亚马逊黑水')).toBeInTheDocument();
    expect(screen.getByText('酸性软水')).toBeInTheDocument();
  });

  it('shows selected fish details and compatibility', () => {
    render(
      <>
        <DetailPanel habitat={habitats[0]} fish={fish[0]} />
        <CompatibilityBar fish={fish[0]} />
      </>,
    );

    expect(screen.getByText('霓虹灯')).toBeInTheDocument();
    expect(screen.getByText('Paracheirodon innesi')).toBeInTheDocument();
    expect(screen.getByText('通常适合')).toBeInTheDocument();
    expect(screen.getByText('cardinal-tetra')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/__tests__/DetailPanel.test.tsx`

Expected: FAIL because `DetailPanel` and `CompatibilityBar` do not exist.

- [ ] **Step 3: Implement `DetailPanel`**

Create `src/components/DetailPanel.tsx`:

```tsx
import type { Fish, Habitat } from '../types/domain';

type DetailPanelProps = {
  habitat: Habitat;
  fish: Fish | null;
};

function formatRange(min: number, max: number, unit = '') {
  return `${min}-${max}${unit}`;
}

export function DetailPanel({ habitat, fish }: DetailPanelProps) {
  if (!fish) {
    return (
      <aside className="detail-panel">
        <div className="panel-heading">
          <p>{habitat.englishName}</p>
          <h2>{habitat.name}</h2>
        </div>
        <p className="detail-copy">{habitat.description}</p>
        <dl className="stat-grid">
          <div><dt>水域</dt><dd>{habitat.waterType}</dd></div>
          <div><dt>水温</dt><dd>{formatRange(habitat.temperatureRange.min, habitat.temperatureRange.max, '°C')}</dd></div>
          <div><dt>pH</dt><dd>{formatRange(habitat.phRange.min, habitat.phRange.max)}</dd></div>
          <div><dt>硬度</dt><dd>{formatRange(habitat.hardnessRange.min, habitat.hardnessRange.max)}</dd></div>
        </dl>
        <p className="story-note">{habitat.visualMood}</p>
      </aside>
    );
  }

  return (
    <aside className="detail-panel">
      <div className="fish-art" aria-hidden="true">
        <span />
      </div>
      <div className="panel-heading">
        <p>{fish.commonName}</p>
        <h2>{fish.chineseName}</h2>
      </div>
      <p className="scientific-name">{fish.scientificName}</p>
      <p className="detail-copy">{fish.storyNote}</p>
      <dl className="stat-grid">
        <div><dt>原生地</dt><dd>{fish.originRegion}</dd></div>
        <div><dt>水温</dt><dd>{formatRange(fish.temperatureRange.min, fish.temperatureRange.max, '°C')}</dd></div>
        <div><dt>pH</dt><dd>{formatRange(fish.phRange.min, fish.phRange.max)}</dd></div>
        <div><dt>体长</dt><dd>{fish.adultSizeCm} cm</dd></div>
        <div><dt>泳层</dt><dd>{fish.swimLayer}</dd></div>
        <div><dt>难度</dt><dd>{fish.careLevel}</dd></div>
      </dl>
      <div className="tag-row">
        {fish.visualTags.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
    </aside>
  );
}
```

- [ ] **Step 4: Implement `CompatibilityBar`**

Create `src/components/CompatibilityBar.tsx`:

```tsx
import type { Fish } from '../types/domain';

type CompatibilityBarProps = {
  fish: Fish | null;
};

export function CompatibilityBar({ fish }: CompatibilityBarProps) {
  if (!fish) return null;

  return (
    <section className="compatibility-bar" aria-label={`${fish.chineseName} 混养关系`}>
      <div>
        <h3>通常适合</h3>
        <p>{fish.compatibility.usuallySuitable.join('、') || '暂未整理'}</p>
      </div>
      <div>
        <h3>需要谨慎</h3>
        <p>{fish.compatibility.useCaution.join('、') || '暂未整理'}</p>
      </div>
      <div>
        <h3>不建议尝试</h3>
        <p>{fish.compatibility.notRecommended.join('、') || '暂未整理'}</p>
      </div>
      <p className="compatibility-note">{fish.compatibility.notes}</p>
    </section>
  );
}
```

- [ ] **Step 5: Wire details into `App`**

Modify `src/App.tsx`: import `DetailPanel` and `CompatibilityBar`, replace the temporary detail panel with:

```tsx
<DetailPanel habitat={selectedHabitat} fish={selectedFish} />
```

Then render after `</section>` closing the `atlas-layout`:

```tsx
<CompatibilityBar fish={selectedFish} />
```

- [ ] **Step 6: Add detail and compatibility styles**

Append to `src/styles.css`:

```css
.detail-copy,
.story-note,
.scientific-name {
  color: var(--muted);
  line-height: 1.65;
}

.fish-art {
  display: grid;
  height: 132px;
  margin-bottom: 18px;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: radial-gradient(circle at 50% 50%, rgba(110, 231, 247, 0.16), transparent 64%);
}

.fish-art span {
  width: 150px;
  height: 58px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 45%, #ffffff, #6ee7f7 40%, #1a4d68 72%, transparent 75%);
  filter: drop-shadow(0 0 24px rgba(110, 231, 247, 0.35));
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin: 18px 0;
}

.stat-grid div {
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 11px;
  background: rgba(2, 8, 12, 0.32);
}

.stat-grid dt {
  color: var(--muted);
  font-size: 12px;
}

.stat-grid dd {
  margin: 4px 0 0;
  color: var(--text);
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-row span {
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 5px 8px;
  color: #dffbff;
  font-size: 12px;
}

.compatibility-bar {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr)) 1.2fr;
  gap: 12px;
  margin: -12px 24px 24px;
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--panel-strong);
}

.compatibility-bar h3 {
  margin: 0 0 6px;
  font-size: 13px;
}

.compatibility-bar p {
  margin: 0;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.5;
}

.compatibility-note {
  border-left: 1px solid var(--line);
  padding-left: 12px;
}

@media (max-width: 980px) {
  .compatibility-bar {
    grid-template-columns: 1fr;
    margin: 0 24px 24px;
  }

  .compatibility-note {
    border-left: 0;
    padding-left: 0;
  }
}
```

- [ ] **Step 7: Verify detail tests and build**

Run: `npm test -- src/components/__tests__/DetailPanel.test.tsx src/components/__tests__/App.test.tsx`

Expected: PASS.

Run: `npm run build`

Expected: PASS.

- [ ] **Step 8: Commit details**

```bash
git add src/App.tsx src/components/DetailPanel.tsx src/components/CompatibilityBar.tsx src/components/__tests__/DetailPanel.test.tsx src/styles.css
git commit -m "feat: add fish details and compatibility layer"
```

## Task 7: Fill MVP Data To All Seven Habitats

**Files:**
- Modify: `src/data/fish.ts`
- Modify: `src/utils/__tests__/filterFish.test.ts`

- [ ] **Step 1: Add data coverage test**

Append to `src/utils/__tests__/filterFish.test.ts`:

```ts
import { habitats } from '../../data/habitats';

it('has at least five fish for every habitat', () => {
  for (const habitat of habitats) {
    const count = fish.filter((item) => item.habitatId === habitat.id).length;
    expect(count).toBeGreaterThanOrEqual(5);
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/utils/__tests__/filterFish.test.ts`

Expected: FAIL because Task 2 initially adds only two fish per habitat.

- [ ] **Step 3: Add remaining fish records**

Modify `src/data/fish.ts` by appending records until every `representativeFishIds` entry in `src/data/habitats.ts` has a matching fish record. Each new record must include all `Fish` fields, cautious compatibility notes, and marker positions near its habitat node.

Use these IDs and Chinese names:

```ts
// Amazon Blackwater
'discus' // 七彩神仙
'apistogramma' // 短鲷
'pencilfish' // 铅笔鱼
'corydoras' // 鼠鱼

// Southeast Asian Streams
'pearl-gourami' // 珍珠马甲
'tiger-barb' // 虎皮鱼
'zebra-danio' // 斑马鱼
'rainbow-shark' // 彩虹鲨

// African Rift Lakes
'frontosa' // 六间
'electric-blue-hap' // 蓝阿里 / 电光蓝
'blue-dolphin-cichlid' // 蓝茉莉
'butterfly-cichlid' // 蝴蝶鲷

// South Asian Rice Fields and Slow Waters
'molly' // 玛丽鱼
'medaka' // 青鳉
'small-barb' // 小型鲃
'blue-gourami' // 蓝曼龙

// Central American Rivers
'livebearer' // 花鳉代表
'convict-cichlid' // 九间菠萝
'texas-cichlid' // 德州豹
'pearlscale-cichlid' // 珍珠豹

// Coral Reef Shallows
'yellow-tang' // 黄吊
'damselfish' // 雀鲷
'goby' // 虾虎
'flame-angelfish' // 火焰仙

// Chinese Southern Streams and Rice-Field Waters
'roundtail-paradise-fish' // 圆尾斗鱼
'chinese-bitterling' // 中华鳑鲏
'chinese-medaka' // 中华青鳉
'stream-goby' // 溪流虾虎
```

Each added record must use the exact `Fish` object shape from Task 2, with all required fields populated. Keep husbandry language cautious and avoid exact claims that have not been verified.

- [ ] **Step 4: Verify data coverage**

Run: `npm test -- src/utils/__tests__/filterFish.test.ts`

Expected: PASS, including the per-habitat coverage test.

- [ ] **Step 5: Run build**

Run: `npm run build`

Expected: PASS.

- [ ] **Step 6: Commit full MVP data**

```bash
git add src/data/fish.ts src/utils/__tests__/filterFish.test.ts
git commit -m "feat: fill representative fish data"
```

## Task 8: Add Fish List, Empty States, And Responsive Polish

**Files:**
- Create: `src/components/FishList.tsx`
- Create: `src/components/__tests__/FishList.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Write failing fish list test**

Create `src/components/__tests__/FishList.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { fish } from '../../data/fish';
import { FishList } from '../FishList';

describe('FishList', () => {
  it('renders empty state and reset action', async () => {
    const user = userEvent.setup();
    const onReset = vi.fn();

    render(<FishList fish={[]} selectedFishId={null} onFishSelect={() => undefined} onReset={onReset} />);

    expect(screen.getByText('没有符合条件的鱼种')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '重置筛选' }));
    expect(onReset).toHaveBeenCalled();
  });

  it('selects a fish from compact list', async () => {
    const user = userEvent.setup();
    const onFishSelect = vi.fn();

    render(<FishList fish={fish.slice(0, 2)} selectedFishId={null} onFishSelect={onFishSelect} onReset={() => undefined} />);

    await user.click(screen.getByRole('button', { name: '霓虹灯 Neon Tetra' }));
    expect(onFishSelect).toHaveBeenCalledWith('neon-tetra');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/__tests__/FishList.test.tsx`

Expected: FAIL because `FishList` does not exist.

- [ ] **Step 3: Implement `FishList`**

Create `src/components/FishList.tsx`:

```tsx
import type { Fish } from '../types/domain';

type FishListProps = {
  fish: Fish[];
  selectedFishId: string | null;
  onFishSelect: (fishId: string) => void;
  onReset: () => void;
};

export function FishList({ fish, selectedFishId, onFishSelect, onReset }: FishListProps) {
  if (fish.length === 0) {
    return (
      <section className="fish-list empty-state">
        <h2>没有符合条件的鱼种</h2>
        <p>放宽水温、pH、颜色或难度条件，再重新探索这个水域。</p>
        <button type="button" className="secondary-button" onClick={onReset}>
          重置筛选
        </button>
      </section>
    );
  }

  return (
    <section className="fish-list" aria-label="可见鱼种列表">
      {fish.map((item) => (
        <button
          key={item.id}
          type="button"
          className={item.id === selectedFishId ? 'is-selected' : ''}
          onClick={() => onFishSelect(item.id)}
          aria-label={`${item.chineseName} ${item.commonName}`}
        >
          <span>{item.chineseName}</span>
          <small>{item.commonName}</small>
        </button>
      ))}
    </section>
  );
}
```

- [ ] **Step 4: Wire `FishList` into `App`**

Modify `src/App.tsx`: import `FishList`, then render it below `HabitatMap` inside a wrapper:

```tsx
<div className="map-column">
  <HabitatMap
    habitats={habitats}
    fish={visibleFish}
    selectedHabitatId={selectedHabitatId}
    selectedFishId={selectedFishId}
    onHabitatSelect={(habitatId) => {
      setSelectedHabitatId(habitatId);
      setSelectedFishId(null);
      setFilters((current) => ({ ...current, habitatId }));
    }}
    onFishSelect={setSelectedFishId}
  />
  <FishList
    fish={visibleFish}
    selectedFishId={selectedFishId}
    onFishSelect={setSelectedFishId}
    onReset={() => {
      setFilters(defaultFilters);
      setSelectedHabitatId(habitats[0].id);
      setSelectedFishId(null);
    }}
  />
</div>
```

Update `.atlas-layout` middle column expectation by replacing direct map-stage child with `.map-column`.

- [ ] **Step 5: Add fish list and responsive styles**

Append to `src/styles.css`:

```css
.map-column {
  display: grid;
  min-height: 0;
  grid-template-rows: minmax(360px, 1fr) auto;
  gap: 12px;
}

.fish-list {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 10px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: rgba(4, 13, 19, 0.72);
}

.fish-list button {
  min-width: 112px;
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.04);
  color: var(--text);
  text-align: left;
  cursor: pointer;
}

.fish-list button.is-selected {
  border-color: var(--amber);
}

.fish-list small {
  display: block;
  margin-top: 4px;
  color: var(--muted);
}

.empty-state {
  display: grid;
  justify-items: start;
  color: var(--muted);
}

.empty-state h2 {
  margin: 0;
  color: var(--text);
  font-size: 16px;
}
```

- [ ] **Step 6: Verify responsive behavior manually**

Run: `npm run dev`

Open the local URL. Verify desktop width:

- Top bar visible.
- Left filters visible.
- Habitat map visible.
- Right detail visible.
- Fish list visible below map.
- Compatibility bar appears after selecting a fish.

Set browser to mobile width around 390px. Verify:

- Layout collapses into one column.
- Search input fits.
- Fish list scrolls horizontally.
- Detail panel appears below map/list.
- No text overlaps or clips.

- [ ] **Step 7: Run tests and build**

Run: `npm test`

Expected: PASS.

Run: `npm run build`

Expected: PASS.

- [ ] **Step 8: Commit polish**

```bash
git add src/App.tsx src/components/FishList.tsx src/components/__tests__/FishList.test.tsx src/styles.css
git commit -m "feat: add fish list and responsive states"
```

## Task 9: Visual QA And Final Handoff

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/styles.css`
- Modify: component files only when a QA issue is tied to that component.

- [ ] **Step 1: Start dev server**

Run: `npm run dev -- --host 127.0.0.1`

Expected: Vite prints a local URL, usually `http://127.0.0.1:5173/`.

- [ ] **Step 2: Browser QA desktop**

Open the app in Browser/IAB first. Verify:

- First viewport reads as “观赏鱼原生地探索图谱”.
- Seven habitat nodes are visible.
- Selecting “中国南方溪流与稻田水域” updates the right panel.
- Selecting “白云金丝” updates fish details and compatibility bar.
- Searching “Macropodus” shows Chinese paradise fish related results.
- Filtering by `peaceful` hides aggressive cichlid examples.

- [ ] **Step 3: Browser QA mobile**

Set viewport to 390px wide. Verify:

- No horizontal page overflow.
- Search input fits.
- Filter controls are usable.
- Fish markers remain clickable enough or fish list provides fallback selection.
- Compatibility text stays readable.

- [ ] **Step 4: Fix visible QA issues**

Make the smallest code/CSS change needed for each recorded QA issue, then rerun:

```bash
npm test
npm run build
```

Expected: both pass after each fix batch.

- [ ] **Step 5: Commit QA fixes**

If fixes were needed:

```bash
git add src
git commit -m "fix: polish atlas QA issues"
```

If no fixes were needed, do not create an empty commit.

- [ ] **Step 6: Final verification commands**

Run:

```bash
npm test
npm run build
git status --short
```

Expected:

- Tests pass.
- Build passes.
- `git status --short` shows no uncommitted source changes, except acceptable local dev artifacts ignored by `.gitignore`.

## Self-Review Notes

- Spec coverage: this plan covers app scaffold, seven habitats, representative fish data, habitat map, filters, fish detail panel, compatibility layer, search, responsive fallback, tests, and browser QA.
- Intentional MVP exclusion: no backend, no account system, no Three.js, no fish tank recommender, no poster export.
- Known data follow-up: Task 7 requires filling all representative fish records and verifying every habitat has at least five fish.
