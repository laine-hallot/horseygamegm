# Horsey Genome Mapper

An interactive reference tool for the horse genetics system in _Horsey Game_. Runs entirely in your browser — no installation, no internet connection required after download.

**[Steam Guide](https://steamcommunity.com/sharedfiles/filedetails/?id=3677395605)** · **[Download Latest Release](https://github.com/laine-hallot/horseygamegm/releases/latest)**

---

## What it does

The game's DNA system works as follows: each horse has 20 double-stranded helices.
Every position in every helix maps directly to one gene, and the base (A/T/C/G) at that position selects one of four allele values for that gene, who's values are set by value "n" in the gene table.
This tool makes that system navigable without memorizing anything.

**Four tabs:**

- **Helix Map** — Visual layout of all 20 helices with every gene at its exact position, color-coded by category. Click any gene to jump to its detail view.
- **Gene Lookup** — Searchable list of all 240 genes. Shows the helix and position, all four allele values, and which base to use for the maximum effect.
- **CRISPR Planner** — Select any gene, get the exact edit instructions: which helix, which position, what base produces what result.
- **Genome Analyzer** — Paste a sequenced horse genome (both strands, all 20 helices) and the tool resolves every position to its gene name and allele value instantly.

## How to use

### Online
1. Visit https://laine-hallot.github.io/horseygamegm/

### Offline
1. Download `horsey-game-genome-mapper.html` from the [latest release](https://github.com/laine-hallot/horseygamegm/releases/latest)
2. Open it in any web browser (Chrome, Firefox, Edge, Safari all work)
3. That's it — no server, no install, no internet needed

The file is entirely self-contained. You can save it anywhere and open it directly.

## Base color reference

| Base | In-game color |
| ---- | ------------- |
| A    | Yellow        |
| T    | Red           |
| C    | Blue          |
| G    | Green         |

## Reading helices in-game

Helices are displayed as an X shape in the CRISPR Lab computer. Read strands from the **top to bottom** — position 0 is the top.
Both the left and right strand (strand 1 and strand 2) at the same position control the same gene independently.

## Technical notes

- 240 genes across 20 helices (labeled in-game 0–19)
- Gene-to-position assignment extracted directly from the game executable
- The `SIZE` gene has no helix position assignment in the executable and appears to evaluate at its baseline value (95) independently, but it may be assumed to fill position 0 in Helix 6.

## Credits

**Research & data collection** — Hikaze
Discovered and documented the DNA system through in-game experimentation. Sequenced genomes across multiple specimens. Provided all game files and in-game domain knowledge including helix reading direction and CRISPR interface behavior.

**Reverse engineering & tool development** — Claude (Anthropic)
Decoded the binary structure of the game executable to extract the complete 240-gene helix assignment table. Determined that gene activation is positional rather than motif-based. Built the interactive tool and Steam guide.

## License

MIT License — see [LICENSE.txt](LICENSE.txt).

This is an unofficial fan tool. All game content belongs to its respective developer.
