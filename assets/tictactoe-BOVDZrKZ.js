const e=`# Tic-Tac-Toe — Web adaptation and V1.3.1 AI

## Source provenance

This module adapts the user's successful CubeEngine Tic-Tac-Toe prototype. The prior source review consulted these local files:

- \`E:/CubeEngine/CubeEngine-SRTP/srtp/examples/rule_ir_v2/tictactoe_3d.rule-ir.json\`: a 3×3×3 board, alternating legal placements, spatial three-in-a-row and terminal input lock.
- \`E:/CubeEngine/CubeEngine-SRTP/srtp/examples/tictactoe_2d.py\`: the classic 3×3 board and eight winning lines.
- \`E:/CubeEngine/CubeEngine-SRTP/tictactoe3d_ursina.py\`: blue solid X marks, red ring O marks, translucent cells, solo/local play, undo and restart.
- \`E:/CubeEngine/Dev/3D/tictactoe3d_logic.py\`: the original 49-line rule engine and basic win/block/centre/corner AI.
- \`E:/CubeEngine/CubeEngine-SRTP/tictactoe3d_pygame.py\`, \`tests/reference_tictactoe_acceptance.py\` and the reviewed successful demo image: additional rule and visual cross-checks.

Recorded source hashes from that review:

| Source | SHA-256 |
| --- | --- |
| Ursina prototype, identical in the SRTP and Dev locations | \`E6D2D5186C4C8160F59B286BD271EB1A69E1EF13E86A5156CCF67B5BA72737DC\` |
| \`Dev/3D/tictactoe3d_logic.py\` | \`6B4C4EB707C06C7A20D146C4484E2F8D6A8D2196D7D78098237EDCAE2AC51ED9\` |

The requested historical \`E:/CubeEngine/Prototype/Application/Dev/3月20日\` path was absent in the prior review; the verified local prototypes above were used. The Web module is newly written JavaScript/Three.js, not an AlphaZero model or a new CubeEngine conversion run. No Python source, screenshots, models or downloaded assets are redistributed by this module. The local sources did not establish a third-party MIT licence; this document makes no such claim. Three.js is covered by the platform notices.

## Rules and controls

- X starts. A legal move places one mark in one empty cell. Invalid, occupied, out-of-turn and post-terminal moves are rejected without altering state.
- Three consecutive marks on an axis, plane diagonal or body diagonal win. Default 3×3×3 has 49 lines: 27 axis lines, 18 plane diagonals and four body diagonals. Classic 3×3 has eight lines.
- Independent positive XYZ dimensions are supported, up to 4,096 cells. Three-in-a-row is retained on rectangular and thin spaces. Spaces that contain no three-cell line can finish in a full-board draw.
- A full board with no winner is a draw. Win takes precedence over draw. Winning lines are shown with gold 3D connections.
- Solo play uses human X and AI O; local play alternates two humans. Undo removes one local move or the completed human/AI pair. Undo during the AI delay removes only the pending human move. Undo reopens a terminal round.
- Left click places, right drag orbits, arrows move the selected cell in the current camera basis, and Enter places. Shared W/S and A/D turn the view. X reveals the centre and Z restores the whole board. U undoes.
- Selection, placements, AI, undo and same-game restart preserve the current view. Initial load or changing dimensions/mode reframes it.

## V1.3.1 AI

The AI operates on a private board copy and follows the same legal rules as the player. Its policy is:

1. Complete an immediate winning line.
2. Block an immediate opponent win. If several different cells already win for the opponent, the position is an unavoidable one-move loss; the AI still makes a legal move.
3. Take the geometric centre if empty. For even axes, the higher of the two centre indices is used, matching the existing selection convention.
4. Find a genuine fork: one move producing at least two different immediate winning cells. Every legal candidate is checked before search pruning.
5. Run iterative deepening negamax with alpha-beta pruning, forcing-threat extensions, line-potential scoring and bounded candidate sets. A partially evaluated depth never replaces the previous completed result.

The search is deterministic and scales its depth/node budget down on large custom spaces. Classic nine-cell positions search to the remaining game length; default spatial positions use at most five plies plus forced replies and 6,500 nodes. Larger volumes use smaller budgets. Immediate win/block checks and fork discovery cover the whole actual board even when deeper search is pruned. No move is chosen to manufacture a target win percentage, and there is no hidden handicap or state change.

The existing 0.4-second presentation delay is driven by \`update(dt)\`, so pausing also pauses the AI. Search itself runs synchronously within the bounded move decision. It does not run every frame.

## Reproducible strength benchmark

Run:

\`\`\`text
node tests/tictactoe-ai-benchmark.mjs 600
\`\`\`

Baseline: immediate win, immediate block, centre, then a seeded random corner or remaining legal cell. It sees only the legal board. Seed is \`19996710\`; the AI alternates first and second, with paired seeds. Every chosen move is applied through \`TicTacToeGame.play\`; an illegal move aborts the benchmark.

Recorded V1.3.1 result on default 3×3×3:

| AI order | Wins | Losses | Draws |
| --- | ---: | ---: | ---: |
| First, 300 games | 300 | 0 | 0 |
| Second, 300 games | 55 | 245 | 0 |
| Total | **355** | **245** | **0** |

Overall win rate: **59.17%** against this declared baseline. The second-player rate is **18.33%**; the overall number must not be presented as the solo mode's guaranteed win rate. The large difference between turn orders is visible in this benchmark. Outcomes against humans or a different policy will differ. There is no defensible universal 60% claim.

### Comparison with the exact V1.3 policy

Run \`node tests/tictactoe-ai-benchmark.mjs --legacy\`. The previous policy was read from \`Cubiverse/src/games/tictactoe.js\` inside the preserved \`E:/CubeEngine/Cubiverse-V1.3-Web.zip\` (SHA-256 \`5350DC3E026AC4ABD6CE0E835D14568806F7958535FCBD8C162C3F6EC5D5D1BF\`). It wins/blocks, takes center, then picks the first corner or empty cell in its deterministic XYZ iteration order. This differs from the seeded random-corner baseline above.

The old policy plays first and the compared AI always plays second. With its exact default center opening, **both the V1.3 AI and V1.3.1 AI lose**, following the same nine-move sequence. Repeating deterministic play does not provide independent samples or establish a probability.

For broader position coverage, a separate opening battery forces each of the 27 legal first cells once, then lets the old policy continue normally:

| Second-player AI | Wins | Losses | Draws |
| --- | ---: | ---: | ---: |
| V1.3 heuristic | 12 | 15 | 0 |
| V1.3.1 tactical search | 26 | 1 | 0 |

The remaining loss is the center-opening position. This battery demonstrates improvement across explicitly varied openings; it does not model a human population or replace the exact center-opening result.

One observed run recorded median 0.01 ms, 95th-percentile 0.59 ms and maximum 3.01 ms per default-board AI decision. A 4,096-cell warm-cache decision was approximately 52–57 ms; its first call, including model/line preparation, was approximately 150–203 ms. These are local observations, not device-independent frame-time guarantees. Rendering and initial board creation have separate costs.

## Presentation and lifecycle

All actual cells retain their original pick index. Spacing is 1.2 units, with 0.98-unit cell bodies. Solid instanced blue X capsules and red torus O marks replace text cards. V1.3 adds twelve thick opaque yellow frame rails on every configured XYZ volume. There is no permanent centre outline; hover and shared focus communicate selection.

Rendering is event-driven. Leaving the game removes retained meshes and disposes private geometries, materials and instance buffers. Shared scene/camera assets remain owned by the host.

## Verification

Run \`node --test tests/tictactoe.test.js\`.

The 24 tests cover an independent 49-line endpoint oracle, every legal winning line, terminal lock, classic draw, undo, arbitrary XYZ, retained geometry, picking, camera-relative controls, AI pause/undo timing, disposal and frame rails. V1.3.1 adds explicit centre/win/block precedence, a real two-target spatial fork, opposite-corner fork defence, exhaustive legal classic opponent continuations with the AI as either starter, and an unchanged 4,096-cell board after an AI decision. The exhaustive classic check allows every legal opponent continuation; it confirms no classic AI loss under either turn order, rather than merely testing a handful of scripted games.\r
`;export{e as default};
