# Aquaworld Content Roadmap

## Content Goal

For v0.1, keep the atlas curated and complete instead of broad and thin.

Target size:

- 7 habitats.
- 42 fish entries currently.
- 45-60 fish entries total for v0.1 if expansion still feels useful.
- 5-8 fish per habitat where possible.
- All species entries complete enough to stand alone in a detail panel.

Current coverage is balanced: every habitat has 6 fish entries. The next content pass should favor quality, wording, and source confidence over adding many more species.

## Entry Checklist

Each fish entry should include:

- Stable `id`.
- `commonName`.
- `chineseName`.
- `scientificName`.
- `originRegion`.
- `habitatId`.
- Temperature, pH, and hardness ranges.
- Temperament.
- Adult size.
- Swim layer.
- Color tokens.
- Visual tags.
- Care level.
- Schooling note.
- Compatibility notes.
- Similar species when useful.
- Short story note.
- Map marker position.

## Habitat Coverage Targets

### Amazon Blackwater

Current role: soft acidic water, neon schooling fish, dark leaf-litter mood.

Current entries:

- Neon Tetra
- Cardinal Tetra
- Discus
- Apistogramma
- Pencilfish
- Corydoras Catfish

Good additions:

- Rummy-nose tetra
- Black neon tetra
- Angelfish or discus, only if the detail copy makes care needs clear

### Southeast Asian Streams

Current role: planted warm streams, labyrinth fish, rasboras.

Current entries:

- Betta
- Harlequin Rasbora
- Pearl Gourami
- Tiger Barb
- Zebra Danio
- Rainbow Shark

Good additions:

- Dwarf gourami
- Chili rasbora
- Kuhli loach
- Cherry barb

### African Rift Lakes

Current role: hard alkaline water, rock territories, cichlid behavior.

Current entries:

- Mbuna Cichlid
- Shell Dweller
- Frontosa Cichlid
- Electric Blue Hap
- Blue Dolphin Cichlid
- Butterfly Peacock Cichlid

Good additions:

- Yellow lab cichlid
- Demasoni cichlid
- Julidochromis
- Brichardi
- Cyprichromis

### Slow Shallows And Adaptable Waters

Current role: shallow, adaptable, planted or rice-field edges, including aquarium-trade fish that are not framed as native to one region.

Note: current livebearer examples are useful for entry-level aquarium culture. Keep origin language careful because guppy, platy, and molly are not South Asian native fish.

Current entries:

- Guppy
- Platy
- Molly
- Medaka Ricefish
- Small Barb
- Blue Gourami

Good additions:

- Honey gourami
- Dwarf puffer
- Glass catfish

### Central American Rivers

Current role: harder rivers, livebearers, cichlids with stronger personalities.

Current entries:

- Swordtail
- Firemouth Cichlid
- Central American Livebearer
- Convict Cichlid
- Texas Cichlid
- Pearlscale Cichlid

Good additions:

- Jack Dempsey
- Rainbow cichlid
- Thorichthys relatives

### Coral Reef Shallows

Current role: saltwater color contrast and reef shallows.

Current entries:

- Clownfish
- Blue Tang
- Yellow Tang
- Damselfish
- Reef Goby
- Flame Angelfish

Good additions:

- Royal gramma
- Firefish
- Cleaner wrasse, with careful care notes

### Chinese Southern Streams And Rice-Field Waters

Current role: native-feeling, seasonal, understated ornamental value.

Current entries:

- White Cloud Mountain Minnow
- Paradise Fish
- Roundtail Paradise Fish
- Chinese Bitterling
- Chinese Medaka
- Stream Goby

Good additions:

- Chinese high-fin banded shark, with size warning if included
- Tanichthys variants
- Pseudogastromyzon hillstream loach

## Copy Tone

Use concise atlas copy:

- Specific enough to be useful.
- Gentle enough to match the visual mood.
- Honest about care difficulty.
- Avoid overclaiming exact compatibility.
- Mention uncertainty where strain, locality, or trade names vary.

## Data QA

Before release:

- Check all linked fish IDs.
- Check every habitat has visible fish.
- Check fish parameter ranges overlap assigned habitat ranges.
- Check color tokens exist.
- Check required names and notes are not empty.
- Check representative fish IDs point to fish from the same habitat unless intentionally cross-linked.
