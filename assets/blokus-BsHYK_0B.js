const e=`# BLOKUS — source and conversion record\r
\r
Updated 2026-10-19 for V1.3.1. This is an original authored Web adapter for the externally referenced alpha demo collection. It is not an output of the CubeEngine converter.\r
\r
## Primary references\r
\r
- 2D reference implementation: [Kully/blokus](https://github.com/Kully/blokus), C engine with a conventional square board and rotate/reflect controls. Its [LICENSE.txt](https://github.com/Kully/blokus/blob/master/LICENSE.txt) is identified by GitHub as MIT. The repository README and conventional board/control presentation were reviewed. No C source, artwork, or binary assets were copied.\r
- Publisher rules: [Mattel BJV44 English instructions](https://service.mattel.com/instruction_sheets/bjv44-eng.pdf), © 2013 Mattel. Used to check the piece inventory, starting corners, diagonal contact, four-color sequence, passing and advanced scoring. The rules document and its illustrations are not redistributed.\r
- Additional interaction reference: [Andytule/blokkus](https://github.com/Andytule/blokkus), MIT according to GitHub, a Three.js adaptation by Andy Le and Amos Yu. Its documented hover preview and rotate/flip interaction informed usability; its 3D models and code are not included.\r
\r
## Implemented classic behavior\r
\r
20×20 board; four colors in blue/yellow/red/green order; all 21 distinct free polyominoes (1 mono, 1 domino, 2 triominoes, 5 tetrominoes, 12 pentominoes; 89 cells per color). Rotation/reflection, corner-covering opening, same-color diagonal contact without shared edges, overlap and bounds checks, compulsory passing only after exhaustive legal-move search, four blocked turns ending the game, final ranking and restart. Advanced scoring: remaining cells count negative; an empty inventory earns +15, plus +5 for a final monomino. Four local participants or one human with three deterministic legal-move bots. Bots select the first available large piece; they are demonstration opponents, not a competitive AI.\r
\r
## Cubiverse V1.3.1 XYZ adaptation\r
\r
Default **10×10×5**. Logical **X/Y form the ground plane and Z is height**. The renderer maps this to world X/-Z ground and world Y height; shared slicing uses the same logical-basis adapter. The four starting corners all lie on logical Z=0. Default inventory remains the 21 original shapes per color. Custom dimensions scale equal per-player inventories to fitting shapes and the field budget; large fields may use repeated sets and small fields reduced sets.\r
\r
Each new voxel must be supported immediately below by the ground, an existing voxel of another color, or another voxel of the same new rigid piece. Horizontal overhangs are rejected if any voxel lacks that support. Separate same-color pieces must meet at a corner or diagonal edge. All six face contacts are forbidden, including direct vertical stacking. Within a single rigid piece, its own cells may of course share faces. Existing differently colored support does not replace the requirement for legal own-color contact. The first piece must cover its own ground corner. These are explicit Cubiverse stacking rules, distinct from the commercial game named Blokus 3D.\r
\r
In 3D, every opposing piece touched by the candidate must share at least an edge or a face. An edge-only contact is legal. A pure corner-only contact is not. Contacts are classified across the entire candidate and each individual opposing piece: incidental corners are allowed when that same pair also shares an edge or face. A valid contact with one opposing piece cannot excuse a corner-only contact with a separate piece, even of the same color. Opening pieces follow this rule too. Classic 2D opponents retain unrestricted touching.\r
\r
Each successful placement records one stable ID for all its cells. Snapshots copy the ID array. Legacy or hand-built board fixtures without IDs infer face-connected same-color components as pieces; under the own-color face restriction, this matches valid rigid pieces. The hint and bot search, preview and final placement all use the same contact and support checks. Terminal states return no available bot move.\r
\r
Pieces retain up to 24 proper spatial orientations; asymmetric shapes have all 24. Q/Z/C rotate around logical X/Y/Z and Shift reverses. +/- Z buttons or PageUp/PageDown change placement height. Ground cells and supported stack tops are selectable surfaces. Hover previews without committing; Enter places the whole shape only after every support, contact, overlap and bounds check passes. The preview and hint search use the same legality predicate.\r
\r
Right drag observes; arrows use the camera basis mapped to logical ground/height; A / D turn faces; W / S are disabled. X highlights a logical layer and Z returns to global rendering before any piece rotation. The game initializes its camera on reset/resize; placement follows the cursor without discarding the free observation angle. The visible floor, colored starting corners, placed pieces and supported top surfaces replace the former floating cage/reference-point presentation.\r
\r
## Assets and performance\r
\r
Procedural plastic pieces, a ground grid and miniature inventory icons preserve the four familiar colors. No raster or model downloads. Shared instanced voxels update on actions or hover changes, not every animation frame. Default logical volume is 500 cells. Move search uses contact-frontier candidates and cached orientations. The platform provides original synthesized plucked-string BGM.\r
\r
\`tests/blokus.test.js\` covers classic inventory/scoring, spatial orientations, equal inventory scaling, X/Y ground and Z height mapping, supported stacking, all six forbidden same-color faces, edge-only opposing contact, forbidden pure corners, incidental corners on the same opposing piece, separate-piece identities, legacy fixtures, opening restrictions, overhang rejection and actual solo-bot actions. A full legal match is independently checked for own face and per-opponent contact violations and physical support. Browser appearance remains an integration check.\r
\r
\r
V1.3 terminal-state audit: a pass is accepted only after legal-move search finds none. One blocked pass per active player ends the match; placing a legal piece resets the pass chain. Inactive players cannot win. Enter repeat is ignored, and the host routes Enter from game tool buttons to placement rather than native button activation.\r
`;export{e as default};
