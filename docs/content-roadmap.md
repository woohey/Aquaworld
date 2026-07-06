# Aquaworld Content Roadmap

## Content Goal

v0.11 completed the content review pass: 7 habitats, 42 fish entries, all data audited and corrected. Every fish has a custom Chinese ink-wash illustration and 4-frame sprite animation.

v0.2 targets:

- 7 habitats (unchanged).
- 42 fish entries (may expand to 49-56 in v0.2).
- Quality, storytelling, and source confidence over volume.

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
- Cherry Barb
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
- Sailfin Molly
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
- Lyretail Anthias
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
- Hillstream Loach
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
