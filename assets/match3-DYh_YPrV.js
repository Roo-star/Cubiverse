const e=`# Match-3 — source and adaptation record\r
\r
Reviewed for Cubiverse alpha. This is an independently authored Web adapter, referenced against 2D match-3 games. It is not an engine conversion output.\r
\r
## Primary references and licenses\r
\r
- [Rembound/Match-3-Game-HTML5](https://github.com/rembound/Match-3-Game-HTML5): an 8×8 JavaScript/Canvas example with adjacent swapping, invalid-swap rewind, three-or-more runs, cascades and gravity. Also reviewed the [author tutorial](https://rembound.com/articles/how-to-make-a-match3-game-with-html5-canvas).\r
- [EA / PopCap Bejeweled 3](https://www.ea.com/games/bejeweled/bejeweled-3) and [EA Bejeweled](https://www.ea.com/games/bejeweled): primary visual references for a recognizable colorful jewel grid, shape-distinct pieces, clear gem highlights and sparkling match feedback. These commercial assets remain owned by their respective owners. No artwork, sound, models or code was copied.\r
\r
The Rembound repository [LICENSE](https://raw.githubusercontent.com/rembound/Match-3-Game-HTML5/master/LICENSE) says MIT, © 2015 Rembound.com, while the header of [match3-example.js](https://raw.githubusercontent.com/rembound/Match-3-Game-HTML5/master/match3-example.js) says GPL v3 or later. This discrepancy is recorded; the implementation does not depend on either license because no code or assets were copied. Logic, controls, geometry, scoring and tests were independently authored.\r
\r
## V1.3 gameplay and end states\r
\r
Default space is 5×5×3 (75 cells), with independently editable XYZ and the existing 4,096-cell budget. Classic mode is 8×8. Both modes have 120 seconds and 30 valid swaps. Reach the score target to win; running out of time or moves ends the round. Invalid swaps rewind without spending a move. All terminal states reject further swaps and powers; restart creates a fresh board.\r
\r
Match at least three along any X, Y or Z axis. Four aligned animals clear the complete row along that axis. Five or more clear the three complete axes through the run centre. Crossing cells score once per cascade. Gravity and refill preserve actual XYZ positions; deadlocks reshuffle. Four/five-match rewards activate immediately instead of creating persistent striped or bomb pieces.\r
\r
Each cascade scores ten points per cleared animal, multiplied by its cascade depth and the active fast-match chain. Additional row and blast rewards are 50 and 150 points. Successful swaps within seven seconds grow the chain to a maximum of 5×. The charge meter earns one burst and five extra seconds per five cascades; burst inventory is capped at three. The default target is 2,400 points.\r
\r
Three starting tools are available in persistent in-window buttons: **1** clears the selected animal's screen-horizontal row, **2** clears its 3×3×3 neighbourhood, and **3** adds ten seconds. Row and burst require a selected cell and resolve through the same cascade system. Each tool starts with one charge. The burst charge can be earned again through cascades. Tools do not spend a move.\r
\r
## V1.3 open animal lattice\r
\r
The prior V1.2 thick slot trays are removed as requested. A dark translucent 3D lattice contains six rounded, authored animal forms. Spherical bodies, ears and facial components are actual geometry. V1.3.1 gives each rotating animal exactly one front expression: two eyes, one muzzle and one nose. A small face-facing shader prevents the front expression from showing through the back of the head when a layer is transparent. Slow self-rotation and tiny floating motion respect reduced-motion preferences.\r
\r
The score, timer, moves, timed combo bar and power inventory are styled as compact pastel toy panels. Cascades show bounded sparkle bursts; line rewards send luminous beams along their real axis. Large rewards have brief animated praise and a distinct terminal result panel. The new background uses softly moving pastel shapes at the viewport edges. All visible instructions and accessibility labels are English.\r
\r
Geometry is instanced into 21 draw batches. The default scene stays below 230,000 triangles; no per-cell textures, downloads or independent materials are used. Idle toy motion updates at 30 Hz. Resource disposal and slice-cell ownership are covered by automated tests. Large user-configured spaces still cost proportionally more rendering work and have no fixed frame-rate guarantee.\r
\r
## Controls and integration\r
\r
Click two adjacent animals, or select one and use an arrow key to swap in the current camera direction. WASD rotates the view, right-drag orbits, X isolates a layer and V restores the complete space. H only suggests a pair in the active slice. Esc clears selection. Powers are persistent clickable HUD buttons and keyboard 1/2/3.\r
\r
## V1.3.1 idle assistance\r
\r
Idle assistance never makes a swap, consumes a move, changes selection or reshuffles. After five idle seconds it pulses a legal pair on the currently facing outer plane. If the currently facing exterior plane has no legal pair but another exterior face does, it starts a smooth turn toward the nearest suitable face after 0.9 idle seconds, then pulses the pair. If no exterior face has any legal move, it may reveal an interior legal slice after three idle seconds. Within a slice, it keeps a local legal pair and waits five idle seconds before pulsing; if the slice has no legal pair, it switches to another legal slice after 0.9 idle seconds. Candidate ordering is deterministic, including thin and custom spaces.\r
\r
Any manual pointer, wheel, keyboard or control action immediately cancels a pending turn and removes an automatic glow. Held input, an animal selection, resolving swaps, and terminal states block automatic actions. Assistance rearms after fresh inactivity. Explicit V/global restore suppresses automatic slicing until the player manually enters a slice or starts a new board/mode. Exterior-face hints and turns remain available. Automatic actions produce no toast or explanatory panel.\r
\r
Legal moves are cached by board revision. Idle updates, camera changes and hint requests reuse that cache. Board reset, a successful swap, a board-clearing power or a shuffle invalidates it. Host integration uses \`assistFace({axis, sign, duration:850})\`, \`assistSlice({axis, index, sign, duration:850})\` and \`cancelAssist()\`. Durations are milliseconds; the highlight starts after the turn has settled. Synchronous automatic slice callbacks are distinguished from manual slice entry.\r
\r
The host controls pause, visibility and audio. The round clock advances only while the game receives host updates. Sound events are \`move\`, \`clear\`, \`combo\`, \`line\`, \`burst\`, \`power\`, \`win\` and \`error\`; the host supplies the V1.3 downloaded music/SFX layer. Existing original synthesized music remains a fallback.\r
\r
## Verification\r
\r
\`tests/match3.test.js\` and \`tests/match3-assist.test.js\` have 43 focused tests covering initial/deadlocked boards, XYZ matching, rollback, gravity, cascades, 4/5-run row rewards, timer/move/goal endings, finite power charges, combo expiry, camera-based input, visibility-respecting hints, real picking, single-expression geometry, slice alpha ownership, resource release, geometry budget, idle priorities/timing, all manual interruptions, V suppression, host callbacks and move caching. Browser appearance, shader compilation and sound are integration checks performed separately.\r
`;export{e as default};
