const e=`# Numpuz — source and V1.3 spatial adaptation\r
\r
## Original 2D reference\r
\r
- [krishealty/puzzle — Classic Puzzle Maker](https://github.com/krishealty/puzzle)\r
- [Playable reference](https://krishealty.github.io/puzzle/example.html)\r
- [Original JavaScript](https://github.com/krishealty/puzzle/blob/main/fifteen_puzzle.js)\r
- [MIT license](https://github.com/krishealty/puzzle/blob/main/LICENSE), Copyright (c) 2024 Krish Lalwani. Previously reviewed 2026-10-18.\r
\r
The Web game is an original authored adapter based on the classic one-cell sliding rules. No source code or assets from the reference are copied. Its image puzzle/editor and multiple-tile row slide are outside this demo. Woodwork, numerals and decoration are procedural and use the shared instanced renderer.\r
\r
## Core rules and win state\r
\r
Default 2×2×2 contains seven numbered tiles and one empty cell. A move swaps exactly one orthogonally adjacent tile with that empty cell, including the vertical Y direction. The solution index is \`x + X * (z + Z * y)\`; tile number is index + 1, except the final corner is empty. XYZ remains independently configurable, up to 4096 cells. Classic mode is a 4×1×4 fifteen puzzle.\r
\r
Every shuffle consists of legal moves from the solution and retains a reversible route. Hint retraces that route; arbitrary player moves extend it and direct reversals shorten it. Hints are guaranteed to solve but not guaranteed shortest. Undo restores the board, move count, hint count and route. Winning stops the timer and subsequent slides. Restart restores the current scramble; Shuffle creates another.\r
\r
## V1.3 connected wood rail presentation\r
\r
The separate tier floors have been removed in 3D. One connected three-axis wooden rail lattice surrounds open cell passages, with brass junctions showing where vertical and horizontal tracks meet. There is no panel between Y levels. Every grid pitch is 1.32 world units; the default has 54 short rail segments. Classic mode keeps a physical wooden bed.\r
\r
Each tile is a thin 0.84×0.84×0.12 wood plaque with a light face, walnut inlay and one Georgia numeral. A plaque and its single numeral share a quaternion; on a camera-face change, they turn smoothly to stay upright and readable from every one of the six observing sides. There are no six-face numbered cubes. Plaques fit inside the rail opening throughout rotation.\r
\r
Every accepted move animates the real numbered plaque along exactly one axis into the empty cell over 0.34 seconds. A faint brass guide shows this path, including travel between levels. Additional slide actions wait until that motion finishes; Undo follows the reverse path. Reduced-motion preference shortens movement to 0.08 seconds. Hover updates do not reset a moving plaque or the camera.\r
\r
Only two miniature goal diagrams sit on the left: UP and DOWN. At 2×2×2, UP is \`5 6 / 7 empty\`; DOWN is \`1 2 / 3 4\`. The diagrams use the same wood/ink palette. Taller dimensions page through pairs of Y levels, with the active sliced layer outlined. Move count and timer use small top badges; there is no paragraph around the diagrams.\r
\r
Right drag orbits; left click slides a neighbor. Arrows use the active camera basis; WASD changes viewing faces. X highlights the selected layer and Z returns to the whole volume. U undoes; H hints.\r
\r
## Performance and verification\r
\r
Rails are cached until reset or size changes. Mesh lists update only on interaction, slide animation or face-turn animation. Numerals use a shared glyph atlas with one plane per tile, rather than box-label geometry. Static frames only update the timer once per second. No downloaded images, models or fonts are needed.\r
\r
\`tests/numpuz.test.js\` verifies constructive solvability, six neighbors, immutable snapshots, terminal states, actual six-direction input, absence of blocking floors, connected vertical rails, correct goal diagrams, single-face numeral geometry, all six gimbal orientations, matching plaque/label transforms, real raycasting, continuous midpoint motion, input lock during motion and inverse Undo paths. Browser visual acceptance is recorded separately.\r
`;export{e as default};
