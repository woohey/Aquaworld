# Aqua Biotope Atlas Design

Date: 2026-06-18

## Product Position

Aqua Biotope Atlas is an interactive ornamental fish biotope explorer. It helps aquarium and fish enthusiasts understand ornamental fish through native habitats, ecological conditions, compatibility, and visual traits.

The first version is not an aquarium setup recommender and not a full encyclopedia. It is a polished, data-backed exploratory product: users open the app, see a living habitat map, select a water region, explore representative fish, and inspect water conditions and compatibility relationships.

## Confirmed Decisions

- Product route: **Aqua Biotope Atlas, ornamental fish native-habitat explorer**.
- Target user: fish and aquarium enthusiasts, with secondary value for visual sharing and content display.
- Primary data axis: native habitat / biotope.
- Secondary layer: water parameters and compatibility.
- Visual layer: color, morphology, swimming layer, and ornamental traits.
- First-screen structure: habitat map with fish overlays.
- Visual mood: dark aquatic atlas, glowing habitat nodes, fish overlays, subtle eastern atlas influence, not a full ancient scroll interface.
- MVP data scope: 7 habitat regions and roughly 40 representative fish.

## Core Experience

The main screen is an abstract aquatic habitat map. Each habitat region appears as a distinct water-world node: blackwater river, clear stream, rocky lake shore, rice-field slow water, river system, reef shallows, and Chinese southern stream/rice-field waters.

The primary user flow:

1. Select a habitat region.
2. Inspect the region's representative fish, water profile, visual character, and ecological notes.
3. Select a fish.
4. Read fish details: common name, scientific name, native habitat, water parameters, temperament, swim layer, ornamental traits, similar species, and compatibility relationships.
5. Adjust filters to reshape the visible fish layer.

The intended user reaction is: "These ornamental fish are not isolated species. They come from different water worlds and ecological relationships."

## Information Architecture

The app is a single-screen product surface, not a marketing site.

### Top Bar

- Product name: Aqua Biotope Atlas.
- Current habitat label.
- View controls for habitat map and fish list.
- Search entry for fish names.

### Main Canvas

- Abstract habitat map.
- Seven habitat nodes with visual distinction.
- Fish overlays around their habitat nodes.
- Hover state: fish name, habitat, temperature range.
- Click state: opens fish details in the right panel.

### Left Filter Rail

Filters should feel like tuning ecological conditions, not filling a database form.

- Habitat region.
- Temperature.
- pH.
- Temperament.
- Adult size.
- Color.
- Care level.

### Right Detail Panel

Default state: selected habitat overview.

Fish-selected state:

- Fish visual area using a curated image, generated illustration, or color-tag based fallback art.
- Chinese/common name and scientific name.
- Native region and habitat.
- Temperature, pH, hardness.
- Temperament, adult size, swim layer.
- Visual tags and color tags.
- Care level.
- Story note.
- Similar species.

### Bottom Relationship Layer

When a fish is selected, the bottom layer shows compatibility categories:

- Usually suitable.
- Use caution.
- Not recommended.

Compatibility copy must avoid absolute husbandry claims. Use cautious language because the MVP uses curated heuristic data, not authoritative personalized advice.

## Habitat Regions

The first data set includes seven regions:

1. Amazon Blackwater.
2. Southeast Asian Streams.
3. African Rift Lakes.
4. South Asian Rice Fields and Slow Waters.
5. Central American Rivers.
6. Coral Reef Shallows.
7. Chinese Southern Streams and Rice-Field Waters.

### Chinese Region Scope

The Chinese region represents local ornamental and native fish contexts: clear southern streams, rice-field waters, slow channels, and small native fish communities.

Candidate representative fish:

- White Cloud Mountain Minnow / Tanichthys albonubes.
- Paradise Fish / Macropodus opercularis.
- Roundtail Paradise Fish / Macropodus ocellatus.
- Chinese Bitterling / Rhodeus sinensis.
- Chinese Medaka / Oryzias sinensis.
- Stream goby representative, exact species to verify during data production.

## Representative Fish Scope

Each habitat should include 5 to 6 representative fish for the MVP, for roughly 40 fish total.

Initial examples:

- Amazon Blackwater: neon tetra, cardinal tetra, discus, dwarf cichlid, pencilfish, corydoras.
- Southeast Asian Streams: betta, pearl gourami, harlequin rasbora, tiger barb, zebra danio, rainbow shark.
- African Rift Lakes: mbuna cichlid, Tanganyika shell dweller, frontosa, electric blue hap, butterfly cichlid, blue dolphin cichlid.
- South Asian Rice Fields and Slow Waters: guppy, platy, molly, medaka, small barb, blue gourami.
- Central American Rivers: swordtail, livebearer representative, firemouth cichlid, convict cichlid, Texas cichlid, pearlscale cichlid.
- Coral Reef Shallows: clownfish, blue tang, yellow tang, damselfish, goby, flame angelfish.
- Chinese Southern Streams and Rice-Field Waters: listed above.

Specific fish names can be adjusted during data production if a species is too inaccurate, too controversial, or not a good ornamental representative.

## Data Model

Use static TypeScript data for the MVP.

### Habitat

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

### Fish

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

### Compatibility

Compatibility is stored as curated labels, not computed advice.

- `usuallySuitable`: fish IDs or species groups.
- `useCaution`: fish IDs or species groups.
- `notRecommended`: fish IDs or species groups.
- `notes`: short rationale.

## MVP Scope

Included:

- React single-page app.
- Seven habitat nodes.
- Around 40 fish records.
- Habitat selection.
- Fish selection.
- Filter rail.
- Habitat overview panel.
- Fish detail panel.
- Compatibility bottom layer.
- Search by fish name.
- Responsive desktop-first layout with usable mobile fallback.
- Static local data.

Excluded from MVP:

- Account system.
- Backend API.
- User aquarium setup recommender.
- Disease, feeding, maintenance, or medication advice.
- Real-time biological data.
- Full species database.
- Three.js or WebGL 3D scene.
- Generated poster export.
- Shopping or affiliate flows.

## Technical Direction

- React + Vite + TypeScript.
- SVG, HTML, and CSS for the main habitat map.
- CSS or lightweight custom animation for fish overlays.
- Static data in `src/data/`.
- Shared types in `src/types/`.
- React state for selected habitat, selected fish, filters, and search.
- No global state library for MVP.
- No backend in first version.

## Component Plan

- `App`: top-level layout and state.
- `TopBar`: product name, current habitat, view/search controls.
- `HabitatMap`: central SVG/HTML habitat map.
- `HabitatNode`: individual habitat region.
- `FishMarker`: animated fish marker / overlay.
- `FilterRail`: habitat and ecological filters.
- `DetailPanel`: switches between habitat overview and fish detail.
- `CompatibilityBar`: selected fish relationship layer.
- `FishList`: compact list used for search results and mobile fallback.

## Data Flow

1. Static habitat and fish data load at app startup.
2. App state tracks selected habitat, selected fish, filters, and search query.
3. Filtered fish are derived from static data and current filters.
4. Selecting a habitat updates the visible fish set and right panel overview.
5. Selecting a fish updates the right panel and bottom compatibility layer.
6. Search highlights matching fish and can select a result.

## Error Handling

- Empty filter result: show a calm empty state and a reset filters action.
- Missing fish image: use styled fallback art derived from the fish color and morphology tags.
- Missing compatibility data: show "compatibility data not curated yet" rather than guessing.
- Mobile cramped layout: collapse left filters into a drawer and move compatibility below detail.

## Testing And Verification

Development verification:

- Type check passes.
- Build passes.
- Core interactions work: select habitat, select fish, filter fish, search fish, reset filters.
- Empty state appears when filters remove all fish.
- Detail panel updates correctly.
- Compatibility bar appears only when a fish is selected.

Visual verification:

- Browser desktop check.
- Browser mobile-width check.
- Screenshot review against accepted visual concept.
- Text does not overflow controls or panels.
- Main screen reads as a habitat atlas within 5 seconds.

## Success Criteria

- A user understands within 5 seconds that this is an ornamental fish habitat atlas.
- A user can complete this path within 30 seconds: select habitat, filter fish, open fish detail, inspect compatibility.
- The app feels like a visual product, not a table-driven encyclopedia.
- The Chinese habitat region feels native and differentiated, not a token add-on.
- Husbandry language remains cautious and non-authoritative.

## Open Assumptions To Validate During Implementation

- The first version can use curated static data without damaging the product promise.
- SVG/HTML/CSS can produce enough visual richness without Three.js.
- Around 40 fish records are enough to make the atlas feel populated.
- Fish visuals can be stylized at first, as long as the data and layout are clear.
