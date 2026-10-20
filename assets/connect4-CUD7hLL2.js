const e=`# Turtle／Connect Four — source and Web adaptation\r
\r
## Identity of the existing successful demo\r
\r
**Turtle is the Turtle implementation of Connect Four, not a turtle drawing toy.**\r
\r
The inspected local registry is:\r
\r
- \`E:/CubeEngine/work/agentic-srtp-integration/srtp/studio/demos.py\`: the \`3D Connect Four\` entry points to \`reference_games/turtle_connect_complete/connect_complete.py\`.\r
- \`E:/CubeEngine/work/agentic-srtp-integration/srtp/reference_games/turtle_connect_complete/connect_complete.py\`: the completed 7-column × 6-row Turtle game actually used for source acceptance.\r
- The adjacent \`README.md\` and \`LICENSE\`: identify its origin in Grant Jenks' Free Python Games Connect exercise and its Apache-2.0 license.\r
- \`E:/CubeEngine/work/agentic-srtp-integration/srtp/reference_games/free_python_games/freegames/connect.py\`: the earlier upstream exercise, whose winner and full-column behavior were exercises rather than completed rules. Its board dimensions are not the completed source's 7×6 dimensions.\r
\r
These local files were read before implementation. The completed local source is the classic baseline; substituting the incomplete upstream exercise would lose the terminal rules that CubeEngine already demonstrated.\r
\r
## Existing engine conversion and viewed output\r
\r
- \`E:/CubeEngine/work/agentic-srtp-integration/srtp/transformed_games.py\`, **\`Connect3D\`**: real integer XYZ board positions; \`drop(x,z)\` scans Y from zero upwards for the lowest empty cell; yellow starts; red and yellow alternate; \`_winning_line\` checks the 13 undirected straight-line families; \`status\` distinguishes playing, win and full-board draw.\r
- \`E:/CubeEngine/work/agentic-srtp-integration/srtp/transformed_viewer.py\`: complete voxel board, centered real XYZ positions, circular/spherical yellow/red pieces, top column cursor, direct cell click → \`drop(x,z)\`, arrow cursor and Enter drop, free orbit, wheel zoom, WASD face turns. The historical arrow adapter maps vertical-axis cursor movement onto column depth; this Web adapter instead retains the shared R3 world-axis mapping explicitly.\r
- \`E:/CubeEngine/work/agentic-srtp-integration/srtp/workbench.py\`: Connect lift policy describes an X/Z gravity column and 13-direction four-in-a-row outcomes.\r
- \`E:/CubeEngine/work/agentic-srtp-integration/artifacts/studio-demos/connect.png\`: opened and inspected; saved Studio result displays a **7×6×3** complete transparent board, source-like blue frame and a top column cursor.\r
- \`E:/CubeEngine/Demo Video/GIF-20261007-Upload/02-Connect4-3D-FullView.gif\`: opened and inspected; its displayed frame shows a **3×4×5** full-volume example with blue translucent cells, free-view controls and X/Z gravity columns. The saved output demonstrates configurable dimensions rather than one fixed cube size. This file is used as a visual reference; it is not bundled into the Web application.\r
\r
The existing Python viewer's WASD implementation first snaps its camera before rotating the root. R3 intentionally uses the shared camera's 90° turns while preserving a free-orbit scene; the adapter does not reproduce that historical snap.\r
\r
## Classic fidelity\r
\r
The completed Turtle source uses:\r
\r
- **7×6**, connect four; yellow starts and alternates with red.\r
- Background/frame blue **\`#1f6fce\`**, pale circular empty sockets **\`#eef4fb\`**, yellow/red round pieces.\r
- Clicking any row of a column drops a piece into that column's lowest empty row.\r
- Full or invalid columns do not consume a turn.\r
- Horizontal, vertical and both planar diagonal four-in-a-row wins.\r
- Full-board draw, terminal input rejection and restart.\r
- Two players sharing one device; the completed source has no AI.\r
\r
The Web classic mode preserves these rules, source dimensions, circular sockets and color identity. Its blue board has actual circular holes and thickness; pieces are shallow circular discs. A short falling animation replaces Turtle's immediate dot drawing. No source font, raster image, audio file or model is required.\r
\r
## V1.2 spatial adaptation\r
\r
X, Y and Z are independently typed positive integers. The default is 6×4×3 and classic is 7×6×1. Every logical cell has a real XYZ coordinate; the host applies one common rendering budget.\r
\r
A new piece falls toward the current camera-down axis. The entry is on the opposite outer face; it stops before the first occupied cell and cannot tunnel through existing chips. Pieces already placed keep their positions when the player changes the view. The landing preview, column highlight and finite fall animation follow all six signed gravity axes. Four-in-a-row still checks the 13 unsigned direction families, accepting only lines that fit the actual dimensions. The default depth of three cannot contain four chips along a depth-changing line; larger custom dimensions retain those possibilities.\r
\r
Right-button drag orbits; left click or Enter drops into the selected gravity column. Arrows select a cell using the current camera basis, and WASD turns the view. X highlights the selected depth layer and successive layers; Z restores the full view. Low-opacity context remains visible and selectable. Hover previews without placing a piece. Restart preserves the view; changing dimensions fits the new space.\r
\r
Choose local 2P or 1P against a deterministic AI. The AI takes a legal immediate win, blocks an immediate threat, then favours central legal columns. The current turn, move count and actual gravity direction appear inside the game window. Source controls remain the sole owners of their actions; window tools proxy them.\r
\r
## Implementation scope and performance\r
\r
\`src/games/connect4.js\` is a **hand-authored JavaScript / Three.js Web adapter** informed by the inspected Python game and its successful CubeEngine spatial rules. This is not a claim that Cubiverse ran an automatic conversion or integrated the Python runtime/engine entry point.\r
\r
Rules, geometry, UI and finite animation are authored locally. No external game image, source asset bundle, heavyweight model, video or AI library is shipped. There is no network dependency beyond the application's existing Three.js dependency. The host supplies original synthesized marimba/groove BGM, controlled together with cues by ♪.\r
\r
Socket geometry is retained and instanced in three batches; piece geometry is one retained instanced batch, and the twelve blue outer beams form another. Cell bodies use the shared voxel batching. Static geometry is not rebuilt per frame. Only one newly dropped piece changes its matrix during a bounded animation; repeated drops are locked until it lands. Geometry, materials and instance resources are disposed on exit or replacement. Independently configured dimensions use the shared cell budget. These implementation bounds are not measured device frame-rate claims; rendered appearance and performance remain subject to integration browser/device acceptance.\r
\r
V1.2 supports two local players or one player against the local heuristic AI. It does not execute Python or connect to the CubeEngine conversion endpoint.\r
\r
## License and attribution\r
\r
Upstream project: [Free Python Games](https://github.com/grantjenks/free-python-games).\r
\r
Upstream source exercise: [freegames/connect.py](https://github.com/grantjenks/free-python-games/blob/master/freegames/connect.py).\r
\r
License: [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).\r
\r
The inspected local completed source states that its drawing/input vocabulary follows Grant Jenks' Apache-2.0 Connect exercise and that CubeEngine's maintained variant completes winner and full-board exercises. The local adjacent license preserves:\r
\r
> Copyright 2017–2023 Grant Jenks. Licensed under the Apache License, Version 2.0. Distributed on an “AS IS” basis, without warranties or conditions of any kind.\r
\r
No Python source text or external artwork is copied into this JavaScript adapter; this attribution records the actual game reference and completed local derivative. Any later redistribution of the Python reference must retain its original Apache-2.0 notices and applicable license terms.\r
\r
## Verification\r
\r
Run \`node --test tests/connect4.test.js\` from \`E:/CubeEngine/Cubiverse\`.\r
\r
The tests cover independent enumeration of the 13 direction families, legal gravity/turns, complete XYZ coordinates, real depth/body-diagonal wins, no false bent/gapped wins, all classic line types, a complete legally played 42-move classic draw checked by an independent line scanner, terminal rejection, full columns, spatial draw, actual module geometry/input/hover/touch/restart/mode changes, retained camera fitting, finite falling transforms, real Three.js/host ray intersections through all three default depths and owned resource disposal. Browser visual acceptance and device performance are separate integration checks.\r
`;export{e as default};
