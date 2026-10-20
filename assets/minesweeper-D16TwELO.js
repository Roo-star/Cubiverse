const e=`# Minesweeper — source and conversion record

Updated 2026-10-19 for V1.3.1. This Web module manually ports the existing CubeEngine Python spatial Minesweeper rules. It uses that validated spatial model as its rules reference; it is not a new automatic engine conversion.

## Recorded source review

- \`E:/CubeEngine/work/agentic-srtp-integration/srtp/transformed_games.py\`: \`Minesweeper3D\`, including 26-neighbour counting, delayed first-click mine generation, unique mines, flags, zero-cell flood and outcomes.
- \`transformed_viewer.py\` in that directory: full volumes and colliders, six-face textures, rotation, face transitions, reveal and stationary right-click flagging. Its old Z selector was not carried into the R3 scene.
- \`presentation_bridge.py\`: the original \`2000.png\` atlas mappings for covered, empty, flag, mine, exploded mine and 1–8 tiles.
- Local \`srtp/reference_games/pygame_minesweeper\`: recorded review of \`core/board.py\`, \`core/board_tile.py\`, \`user_interface_board.py\`, \`sprites/tile.py\`, \`__main__.py\`, \`README-CUBEENGINE.md\`, the atlas and three MIT licenses.
- Public source: [pygame-minesweeper](https://pypi.org/project/pygame-minesweeper/). Local records identify pygame-minesweeper 1.0.11, core 1.0.18 and sprites 1.0.41.

## Rules

The default is **5×8×3** with independently editable X/Y/Z. Classic mode uses 10×10 and 10 mines. Spatial density is approximately 10%, using the source's ties-to-even rounding. The first cell and its complete neighbourhood are safe. Numbers count up to 26 surrounding cells.

Reveal every safe cell to win. Revealing a mine loses, marks the explosion red, exposes all mines and marks incorrect flags with a red ×. Flagged cells cannot be revealed. Zeroes flood through XYZ neighbours without crossing flags. The timer starts on the first reveal, stops at either outcome and clears on restart.

Documented adaptations:

- The original 2D source cycles covered → flag → question. The existing 3D engine and this Web version use two-state flags.
- Clicking an open number, or pressing C, chords only when its neighbouring flag count matches. Incorrect flags can expose a mine. The local transformed class did not implement chord.
- Flooding respects incorrectly flagged safe cells; those flags must be removed to complete the game.
- Tiny or dense custom boards reduce the actual mine count if necessary to keep the entire first neighbourhood safe. The original transformed class could instead protect only the first cell.

## V1.3.1 presentation and input

Covered cells keep their familiar raised gray cubes, six-face caps and light/dark bevels. Revealed safe cells use a smaller **opaque, matte sage-gray inset** behind their number faces, a darker recessed rim and a subdued floor. They no longer disappear into an almost empty cavity. The smaller inner dimensions and lack of raised caps distinguish them from unopened cells. Empty safe cells have the same inset without an invented zero label. Traditional 1–8 colors are retained; 9–26 use deep purple. Flags and mines are procedural six-face glyphs, not copied atlas pixels.

The full-size pick-only proxy remains invisible so the whole open cell stays actionable. All visible inset parts retain the logical cell index. X highlights the selected layer; double X highlights its 26 neighbours; Z restores the full volume. The shared slice renderer dims inactive cells to 3.5% while preserving active opaque faces and accurate interior picking. Normal covered-cell geometry and slice behavior are unchanged by the V1.3.1 inset change.

Left click reveals. A stationary right click toggles a flag; right drag orbits and does not flag on release. F is the keyboard flag shortcut and C chords. There is no extra flag-mode button. Arrows select relative to the current view, Enter reveals or chords, and WASD changes the viewing face. The in-window HUD contains the mine counter, timer and familiar smile restart control.

Reset, mode or dimensions changes initialize the volume. Reveal and flag actions do not move the camera. Cursor following preserves the chosen observation angle and zoom.

## Performance and verification

No external image, font or audio assets are bundled by this game. Shared instanced boxes render the procedural tiles; covered bevel detail is simplified above 512 logical cells. Each revealed cell adds one small opaque inset box. Shared cached text supplies numbers. The timer updates the HUD without rebuilding the board.

\`tests/minesweeper.test.js\` covers boundary neighbour counts, protected first clicks, mine generation, flags, flood, chords, outcomes, timer lifecycle, unequal XYZ and atomic settings. Rendering tests check opaque recessed faces behind the number planes, unchanged covered tiles, and invisible pick volumes. Real Three.js ray and slice tests confirm that covered and open interior cells remain selectable, that inactive geometry remains faint, and that Z restores opacity and depth writing. Browser appearance remains an integration check.

The platform supplies original synthesized light-jazz BGM and shared action effects through its sound toggle.

## License record

pygame-minesweeper is MIT, Copyright (c) 2019 Andreas Isnes; core and sprites are MIT, Copyright (c) 2020 Andreas Isnes. The recorded source review included \`LICENSE-pygame-minesweeper.txt\`, \`LICENSE-pygame-minesweeper-core.txt\` and \`LICENSE-pygame-minesweeper-sprites.txt\`. This adapter's JavaScript and geometry are newly authored. Python source, atlas, audio and font files were not copied. Full upstream notices remain in the local reference project.\r
`;export{e as default};
