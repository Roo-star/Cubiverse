const e=`# Pac-Man：外部 2D 參考與 Cubiverse 改編\r
\r
查閱日期：2026-10-18。這是 Alpha v1 的外部參考 Web 改編，並非 CubeEngine 自動轉換的成果。\r
\r
## 2D 原型資源\r
\r
- 專案：[Brent Ward / pacman-js](https://github.com/bward2/pacman-js)\r
- 上游程式結構：[app/scripts](https://github.com/bward2/pacman-js/tree/master/app/scripts)\r
- 幽靈參考入口：[ghost.js](https://github.com/bward2/pacman-js/blob/master/app/scripts/characters/ghost.js)\r
- 授權：[MIT LICENSE](https://github.com/bward2/pacman-js/blob/master/LICENSE)，Copyright (c) 2020 Brent Ward。\r
- 補充 2D 實作參考：[Dale Harvey / pacman](https://github.com/daleharvey/pacman)，上游標示 [WTFPL](https://github.com/daleharvey/pacman/blob/master/LICENSE)。\r
- 選擇原因：原始黃圓角色、藍色迷宮、四種彩色幽靈、豆子與大力丸的經典識別清楚，容易核對原版動線，且無需下載大型資產包。\r
\r
## 實際使用與還原範圍\r
\r
未複製上述專案的 JavaScript、CSS、音樂、字型、圖像或網格。此模組的 \`PacmanEngine\`、ASCII 迷宮、動畫、UI 與低面數角色均重新撰寫；因此沒有把上游程式授權混入本模組。經典單層模式的迷宮按 28 × 31 佈局重新轉錄，以測試確認恰好 240 顆小豆與 4 顆大力丸且全部可達。\r
\r
經典模式提供單層迷宮、左右隧道環繞、方向預輸入、三條生命、關卡、分數、大力丸、受驚幽靈、被吃後回家重生、清場勝利及重新開始。Blinky 紅直追；Pinky 粉瞄準玩家前四格；Inky 青用玩家前二格相對紅鬼的向量包夾；Clyde 橙距離近時退回角落。分散 7 秒／追逐 20 秒循環；大力丸暫停其計時、反轉幽靈方向並降低速度。連吃幽靈為 200、400、800、1600 分；豆子 10 分、大力丸 50 分；10,000 分獎勵一條生命；達到收集門檻時出現限時水果。\r
\r
本 Alpha 不是特定街機 ROM 的逐幀模擬：轉向在格中心完成，沒有重現所有原機硬體 bug、每關完整計時表、精確出籠豆數計時器或水果插圖；水果以輕量紅色幾何體表示。下一關保留分數與生命並加快移動。這些差異在此明確列出，方便之後細化。\r
\r
## 經典保真核對：已知差異\r
\r
已核對 [上游幽靈實作](https://github.com/bward2/pacman-js/blob/master/app/scripts/characters/ghost.js) 的目標、受驚、速度與返巢流程。經典迷宮、豆子／大力丸、四種追逐目標、隧道、生命與吃鬼核心已實作；**目前不符合「該來源或原街機逐項完全複刻」**，以下是會影響手感或節奏的具體差異。\r
\r
| 項目 | Cubiverse 目前行為／差異 |\r
| --- | --- |\r
| 移動與碰撞 | 邏輯每 0.17 秒移一格，渲染插值；隨關卡每次減 0.009 秒、最低 0.105 秒。同格及相向交錯碰撞生效；未採上游連續座標距離碰撞。 |\r
| 速度細節 | 普通玩家／鬼共用格步進速度；受驚鬼隔步移動。隧道與鬼屋未另減速，返巢眼睛未另加速，吃豆未插入原街機的短暫停頓。 |\r
| 分散與追逐 | 固定 7 秒／20 秒重複；死亡後重置。未採逐關完整時間表或後期永久追逐。分散目標用內側四角，未用上游迷宮外側目標。 |\r
| 受驚選路 | 受驚時在合法非反向路徑隨機選擇；上游選距離玩家更遠的路徑。受驚時長為 max(2, 7−關卡×0.4) 秒，未採原街機逐關表。 |\r
| 幽靈細則 | 沒有 Blinky 的 Cruise Elroy 加速、指定路口禁止向上規則，或原街機向上瞄準溢位 bug。 |\r
| 鬼屋與死亡 | 固定延遲出籠、返巢後等 1.5 秒；未做精確吃豆計數出籠或完整死亡／重生動畫。 |\r
| 水果與過關 | 收集 70／170 顆觸發固定十秒水果，分數依關卡為 100/300/500/700/1000 後封頂；未採完整原街機水果表。清場停下並由玩家按「下一關」。 |\r
| 美術／聲音 | 黃色球體缺口、四種顏色與眼睛維持身份識別；以程序化低面數形狀重建，未重用原版精靈圖、音樂、開場動畫、插曲動畫或水果插圖。 |\r
\r
以上時間與美術簡化在單層經典模式也存在。新版 XYZ 模式採用獨立的體素迷宮圖，不使用樓層入口或傳送。\r
\r
## V1.2 XYZ 第一人稱玩法\r
\r
- 預設 **10×10×10**，XYZ 可獨立輸入正整數，總格數最多 32,768。沿用 V1.1 的稀疏路網：三個互通環路及中央路口，預設 94 路格、45 小豆、4 大力丸與 4 鬼。沒有重生成更密的迷宮或增加豆量。\r
- 角色與幽靈都沿真實六鄰接 XYZ 路格行動；幽靈保留圖上追逐、受驚、返巢、碰撞及關卡規則。\r
- 相機掛在主角的通道中心，自動向自身前方行進；遇牆停止。↑／W 向上俯仰、↓／S 向下俯仰、←／A 左轉、→／D 右轉，每次 90°。下鍵不是倒退；需回頭時可連轉兩次。滑動呼叫相同轉向。\r
- 導航使用主角自己的 forward/up/right，手動觀察相機不改寫它。走到路段中間才收到的轉向在下一格中心執行，鏡頭不斜穿牆。按鍵 repeat 不連續旋轉。\r
- 封閉方向由不透明牆板、地板或頂板阻擋，存在鄰接路格的面留開口。黃色牆腳線與地磚幫助閱讀距離；沒有包住所有路格的透明藍方塊。第一人稱隱藏自己的角色模型，避免遮鏡頭；全局觀察仍顯示黃色主角。\r
- 右鍵按住暫停前進並觀察，放開恢復；全局觀察也暫停模擬。◉、相機重設或方向輸入返回第一人稱。X 先切到全局再高亮層，返回第一人稱會清除切層。\r
- \`ctx.spatial.firstPerson({position,forward,up,fov:78,near:0.035})\` 每幀更新眼睛位置。這取代 V1.1 的「最近外側面跟隨」與 W/A 深入、S/D 返回。\r
- 清完整個空間的豆子過關；大力丸、吃鬼計分、三條生命、萬分獎勵、水果及下一關保留。這是 Cubiverse 的空間改編，不宣稱外部 2D 原作已有這些控制。\r
\r
## 既有 CubeEngine 示範的實際參考\r
\r
已只讀查看 \`E:/CubeEngine/work/agentic-srtp-integration/srtp/transformed_viewer.py\`、\`transformed_games.py\`、\`presentation_bridge.py\`，以及 \`artifacts/studio-demos/minesweeper.png\`、\`2048.png\` 的實際畫面：完整體素體積常駐，透明立方體保留空間，右拖自由旋轉；箭頭依相機畫面方向映射真實軸，WASD 是 90° 跨面。R3 依此統一互動方向；沒有複製該 Ursina 程式、貼圖或遊戲資產，Web 邏輯及 Three.js 呈現仍為自行編寫。\r
\r
## 大小與效能\r
\r
牆面及裝飾使用共用 instanced boxes，只有新局／尺寸／關卡改變時生成。豆子使用實例化球體，吃掉時更新 instance；玩家、幽靈、果實保留低面數 mesh。視點沿路段插值，主角附近的本地光源照亮通道。\r
\r
沒有下載貼圖、音樂或模型；平台另提供原創合成追逐配樂。維持自有幾何、材質與 instance 的重置／離場釋放。這些是實作方式，不是任何裝置上的幀率保證。\r
\r
## 可驗證項目\r
\r
執行 \`node --test tests/pacman.test.js\`。測試涵蓋經典迷宮與規則、稀疏路網及豆子配置不變、24 個朝向的俯仰／左右轉向、自動前進與撞牆、格心排隊轉向、六軸可通關路徑、全局觀察暫停及 XYZ 自訂。\r
\r
場景測試以真實 Raycaster 驗證每個路格六方向：開口不被板材堵住，封閉方向在格界碰牆。第一人稱視覺舒適度、照明、操作與裝置效能需另外記錄實際瀏覽器驗收；本頁不引用舊版測試數作 V1.2 驗收結果。\r
\r
\r
\r
## V1.3: A · Chase / B · Click & Go\r
\r
The Play style selector offers both experiments under the existing Pac-Man title. The 2D Classic option remains available.\r
\r
### A · Chase\r
\r
- Keeps the V1.2 sparse XYZ maze (94 traversable cells at the default size).\r
- Player and normal ghost steps now take 0.46 seconds at level 1, compared with the earlier 0.24 seconds. This slows both sides together. Frightened ghosts retain their additional reduction.\r
- Arrow keys and WASD turn in the protagonist's local frame. Automatic forward movement and centre-of-cell turns remain. The character is now visible.\r
- The normal camera intent is 2.8 cells behind and 2 cells above the player, about 35.5 degrees. The host smooths position, target and orientation.\r
- A traversable pitch turn starts a 1.35-second widening envelope: the camera moves back to 3.95 cells, rises to 2.65 cells, shifts 0.65 cells sideways, and opens its field of view from 58 to 62 degrees. Simulation slows by at most 40% during that same envelope. Ordinary left/right turns do not invoke a cinematic shot; a pitch into a blocked cell does not either.\r
- Walls, floor tiles and sills are opaque. A local camera-side dollhouse cutaway removes occluding panels, including those intersecting the normal and widened sight corridors. This keeps the protagonist visible without making the road translucent.\r
- Overview pauses A. Returning to the follow control, directional input or camera reset resumes the chase view.\r
\r
Camera research: Unity's [Third Person Follow documentation](https://docs.unity.cn/Packages/com.unity.cinemachine%403.1/manual/CinemachineThirdPersonFollow.html) describes target-relative offsets, damping and keeping the target visible around obstacles. Cubiverse implements its own lightweight camera intent and cutaway geometry; it does not include Cinemachine or Unity code.\r
\r
### B · Click & Go\r
\r
- A seeded, asymmetric three-dimensional maze replaces the symmetric circuits. An iterative spanning-tree carve plus additional edges produces genuine loops and varied junctions; all cells are connected. At 10×10×10 the maze is roughly twice the route size of A, without copied floor plans.\r
- Uses a 45-degree overview, translucent blue passage volumes, visible corridor spines, classic score/lives/level counters and bright pellets.\r
- Left-click any traversable cell to find a shortest six-neighbour XYZ path. A gold route and rotating target marker show exactly where the player is going.\r
- Retargeting between cells first finishes the current segment, then follows the new route. No teleporting or diagonal corner cutting. After reaching a target the player continues forward until the next wall or another click.\r
- Arrow movement and swipe turns are disabled. WASD rotates the overview; right-drag still orbits. X isolates depth layers so interior route targets can be selected.\r
- Preserves the previous 0.24 seconds per cell at level 1. Ghost chase, pellets, energizers, fruit, lives, collisions and clear/game-over conditions use the same XYZ rule engine.\r
\r
### Validation\r
\r
\`node --test tests/pacman.test.js\`: 35 passing tests. Added assertions cover A/B speeds, crossing-only camera widening and slowing, maze connectivity/loops/asymmetry, every-cell path routing, in-flight retargeting, A/B input separation, and actual raycast line-of-sight checks through the opaque chase cutaway at both camera distances. Browser camera comfort and visual composition require integration checks with the host camera implementation.\r
\r
\r
## V1.3.1 visual refinement\r
\r
A now uses a 3.5-cell rear offset and a 2.7-cell vertical offset (37.6 degrees), while preserving the original smooth follow and crossing choreography. The crossing shot adds 1.15 cells behind and 0.65 above; the solid cutaway expands with it. Pac-Man and ghosts render at 70% of their former size, without changing collision cells, movement speeds, pellet rules or maze topology. Navy structural panels, teal insets, warm route strips, rounded illuminated deck markers and a soft teal forward light clarify the passage.\r
\r
B now renders real connected round pipes. Every graph edge is an open-ended cylinder; spheres round corners, branches and dead ends. Straight cells have no repeated spherical beads or flat caps. No rectangular route cubes remain. The pipe skin is translucent enough to show actors and pellets, with a stronger visible surface than the previous faint cell boxes. The two instanced batches share geometry/material and retain logical cell picking.\r
\r
B uses a five-color blue/teal/mint/amber/rose palette. All positions on one horizontal plane share a color. A continuous camera-up vector rotates this gradient as the player orbits or changes view; color changes are damped and are independent of game simulation. Opposite views pass through a shared middle color rather than flipping abruptly.\r
\r
Play style is locked once the session starts. The module exposes \`setVariant('a' | 'b' | 'classic')\` for the launch selector, \`setStarted(boolean)\` for the host lifecycle, and visual-only \`updateView(dt)\`. Both the selector event and programmatic variant call reject changes while locked; reset, next level and XYZ editing preserve that lock. The host supplies \`spatial.viewUp()\` for continuous manual-orbit recoloring.\r
\r
Verification: 40 Pac-Man tests pass, including actual mesh topology and gap checks, all-direction camera cutaway rays at the longer distances, actor scales, layered palette transitions without simulation, degenerate map sizes, GPU resource disposal and the guarded mode lifecycle.\r
`;export{e as default};
