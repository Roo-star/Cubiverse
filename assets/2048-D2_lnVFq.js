const e=`# 2048 / 既有 XYZ 軸線合併 Web 移植\r
\r
這是將已成功的本地 Game2048_3D 模型人工移植進 Cubiverse Web，不是本次由 CubeEngine 自動編譯產生的轉換成果。\r
\r
## 實際閱讀的已有成果與 2D 原作\r
\r
- E:/CubeEngine/work/agentic-srtp-integration/srtp/transformed_games.py：Game2048_3D 的三軸、六方向、逐線壓縮、移動端成對單次合併、合併計分、spawn、2048 判定及全方向 game_over。\r
- 同目錄 transformed_viewer.py：完整立體格子、自由旋轉、方向鍵映射、點格取「距中心最遠軸」方向、透明空格及實體數字塊。舊 viewer 的切層、PgUp/PgDn／swipe 別名沒有取代 R3 共用跨面操作。\r
- 同目錄 presentation_bridge.py：constants.json 原色盤、Verdana、2/4 深色字及較大數字淺色字，產生實際 cube surface。\r
- 本地 srtp/reference_games/pygame_2048：實讀 README.md、logic.py、game.py、constants.json、LICENSE。\r
- 原始公開專案：[rajitbanerjee/2048-pygame](https://github.com/rajitbanerjee/2048-pygame)，MIT，Copyright (c) 2019 Rajit Banerjee。本地 source_importer.py 的來源對應也指向此專案。\r
\r
## 移植的同一套空間規則\r
\r
預設完整 4³，XYZ 可各自輸入正整數，總格數需為 2–4,096；經典模式為 4×4、Y 維度 1。六方向每次處理所有平行 XYZ 軸線，從移動端起壓縮非零數字，連續相同數字成對合併；新合併數字本步不能再合併。例：2,2,2,2 向左為 4,4,0,0；4,4,8,0 向左為 8,8,0,0，而不是 16。分數增加所有新合併數字之和，保留已有 3D adapter 的計分；原 Pygame game.py 的 score keeping 仍是 TODO。\r
\r
只有整個棋盤確實變動，才計一步並生成一個新格；無變化不生格、不耗 RNG、不加步。初始兩塊皆為 2。空間模式依既有 transformed class：目前佔用格少於 2 時必生 2，其他情況 2／4 各半。經典模式保留原 Pygame 的初始判斷：數字總和為 0 或 2 時必生 2，其他情況 2／4 各半。**不是官方常見的 90%／10% spawn 分配**，而是本次已讀來源的分配。\r
\r
V1.3 的 3D 模式遵循使用者指定變體：填滿最後一個空格即結束，即使仍有同值可合併。2D Classic 保留全滿且無合法合併才結束。達到至少 2048 可按「繼續挑戰」保留棋盤與分數，向 4096 等更大數字繼續。來源沒有 undo，本 Web 亦不新增撤銷。\r
\r
## 已實際核對的來源差異\r
\r
實際執行原 logic.py 發現 moveDown 的三同值順序差異：直列 2,2,2,0 會得到 0,0,4,2，因為它先從上端合併再向下壓縮。正確移動端合併為 0,0,2,4。**本次 Web 以已有成功的 Game2048_3D 為驗收基準，兩模式均保留正確方向端合併，不特意複製原 2D 的 down-order quirk。** 初始／生成政策的經典差異則如上保留。\r
\r
另已實際執行 transformed class 的正 X 測例：在固定 Y=1、Z=2 的 2,2,4,4 線，向正 X 移動、spawn=False，結果為 X=3 的 8、X=2 的 4，分數 12。Web 的六軸測試逐方向驗證同一壓縮、合併與計分規則。\r
\r
原 Pygame 達成 2048 後只詢問是否重新開始；Web 可繼續挑戰。V1.1 左鍵滑動與方向鍵推動數字；右鍵旋轉，WASD 轉面。\r
\r
## 色盤、六面字與完整 Cube\r
\r
TILE_COLORS 轉錄 constants.json 的 light 主題：空格 #cdc1b4；2 #eee4da，4 #ede0c8，8 #f2b179，16 #f59563，32 #f67c5f，64 #f65e3b，128 #edcf72，256 #edcc61，512 #edc850，1024 #edc53f，2048 #edc22e。2/4 字色 #776e65，其餘 #f9f6f2；框／計分牌使用 #bbada0。超出來源色盤的數字使用深灰底作 Web 補充。所有字設定 Verdana, Arial, sans-serif；沒有攜帶字型檔，實際可用字體由瀏覽器決定。\r
\r
所有邏輯格存在於獨立設定的 XYZ 體積中。空位淡色、已佔數字保留原色盤與六面字；X 聚焦選中深度層，其餘層淡化，Z 恢復全局。\r
\r
右鍵拖曳旋轉，左鍵滑動或箭頭按目前相機基底推動整條軸線。X 切層並可直接操作高亮層，Z 返回全局。點外側格仍可依相對中心的最大偏移軸推動。\r
\r
## 效能與驗證\r
\r
沒有複製來源 JPEG、圖標、音樂或模型；沒有遠端資產下載。數字與格子使用共用快取與實例化，尺寸受平台總格數預算限制。靜態棋盤不逐幀重建。\r
\r
tests/2048.test.js 覆蓋六軸合併、總量守恆、計分、生成、勝負、非等邊尺寸、旋轉後方向輸入、左鍵滑動入口與安全重設。瀏覽器視覺及效能另行驗收。\r
\r
## MIT notice for the source palette data\r
\r
Copyright (c) 2019 Rajit Banerjee\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\r
\r
## V1.3 requested full-board variant\r
\r
The 3D adapter defaults to \`lossRule: 'full-board'\`: a newly spawned tile occupying the final empty cell immediately ends the run, even when equal neighbors remain. This is an explicit Cubiverse variant requested for V1.3; standard/source-classic 2048 instead loses when the full board has no possible merge. The 2D Classic option retains that \`no-moves\` rule.\r
\r
Loss takes priority over a goal on the same full board. The game exposes an explicit \`outcome\` (\`playing\`, \`won\`, \`lost\`); no movement can mutate the board after loss. Reaching 2048 with spare space freezes movement until Continue, then allows larger tiles. A fresh run resets all terminal state. A two-cell custom board is immediately full after its two initial tiles under this variant; larger dimensions are recommended for playable space.\r
\r
Regression tests exercise the actual move-and-spawn path into a full board with equal neighbors, loss freeze, Continue gating, win freeze, full-board/goal priority, all six movement directions, mass conservation, classic adjacency loss and reset.\r
`;export{e as default};
