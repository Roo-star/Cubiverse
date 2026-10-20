const e=`# Tetris：外部 2D 參考與 Cubiverse 改編\r
\r
查閱日期：2026-10-18。這是 Alpha v1 的外部參考 Web 改編，並非 CubeEngine 自動轉換的成果。\r
\r
## 2D 原型資源\r
\r
- 專案：[Jake Gordon / javascript-tetris](https://github.com/jakesgordon/javascript-tetris)\r
- 可直接檢視的原始遊戲：[index.html](https://github.com/jakesgordon/javascript-tetris/blob/master/index.html)\r
- 上游展示：[Javascript Tetris](https://jakesgordon.com/javascript-tetris/)\r
- 授權：[MIT LICENSE](https://github.com/jakesgordon/javascript-tetris/blob/master/LICENSE)，Copyright (c) 2011–2016 Jake Gordon and contributors。\r
- 選擇原因：簡單 HTML5 Canvas、經典 10 × 20 棋盤、七種四格骨牌、明確的原色辨識、下一塊預覽，接近原始街機的基本玩法，且無大型素材依賴。\r
\r
## 實際使用與還原範圍\r
\r
本模組以此專案的玩法、尺寸及視覺識別作參考。經典旋轉佈局資料採用上游的 28 個四格狀態，保留其出生方向、旋轉中心與原色；已在模組註明作者，並於本文下方完整保留 MIT 授權。\`TetrisEngine\`、碰撞、UI 與 Three.js 渲染重新撰寫；未重用來源貼圖、音效或畫面程式。幾何體由共享 Three.js 方塊產生。\r
\r
經典模式使用獨立的 \`rules: 'source-classic'\` 設定，固定 10 × 20 × 1，對齊所選 Jake Gordon 2D 來源的核心規則。XYZ 模式使用 \`spatial-modern\`，其操作便利與空間改編獨立列於下節。\r
\r
## 經典保真核對\r
\r
以下與選定的 [2D 原始實作](https://github.com/jakesgordon/javascript-tetris/blob/master/index.html) 逐項核對。這裡的經典是此公開 2D 來源的規則，並未宣稱它等同官方 NES、街機 ROM 或現代 SRS 規範。\r
\r
| 項目 | 選定 2D 來源 | Cubiverse 經典模式 |\r
| --- | --- | --- |\r
| 棋盤／勝負核心 | 10×20，七種四格骨牌，橫行消除，出生受阻結束 | 相同核心 |\r
| 隨機／出生 | 每袋每種四塊，共 28 塊；隨機 X 出生 | 相同；採來源的浮點抽樣截斷與 X 四捨五入方式 |\r
| 旋轉／鎖定 | 原地單方向旋轉；下降受阻直接鎖定 | 相同旋轉佈局與出生朝向；沒有踢牆或鎖定延遲 |\r
| 計分 | 每鎖定一塊 +10；消 1–4 行為 100/200/400/800 | 相同；下降成功不另加分，不乘等級 |\r
| 加速 | 起始 0.6 秒，每消一行減 0.005 秒，最低 0.1 秒 | 相同；來源的重力計時餘數保留到下一塊 |\r
| 預覽／便利操作 | 一塊下一塊預覽 | 一塊預覽；保留、落點影子、直接落下、逆轉皆停用，相關觸控按鈕隱藏 |\r
| 美術 | 平面色塊、黑框、背景貼圖 | 同色低面數立體方塊與開放井框；未使用來源背景貼圖 |\r
\r
仍存在的外層差異：使用 Cubiverse 的開始／暫停／重置介面及觸控按鈕，畫面是 Three.js 3D；鍵盤直接回應事件，未模擬來源每影格只取一個佇列操作的瀏覽器時序。新遊戲重新建立隨機袋，沒有保留來源頁面重新開始時的舊袋與舊下一塊。它保留可玩的核心規則，並未複製來源背景貼圖或逐影格 Canvas 動畫。\r
\r
## XYZ 玩法適配\r
\r
- V1.2 預設 **6 × 20 × 6 開放落井**，X／Y／Z 可各自輸入正整數；總格數上限 32,768。經典模式仍可直接切換。\r
- 七種四格骨牌以整數 XYZ 體素儲存；Q／Z／C 分別繞 X／Y／Z 旋轉，Shift 反轉。旋轉可跨越多個深度座標。\r
- 敞開立體井可右鍵旋轉觀察。A／D 橫向轉面；此遊戲不使用 W／S。方向鍵按目前相機基底移動方塊，X 切層，切層中 Z 先返回全局。\r
- 重力固定為世界 −Y。每個骨牌仍由四格組成、出生在中央附近；所有體素都參與井壁、堆疊與落點碰撞。V1.3 在同一高度上，只要任一 X 方向整行或 Z 方向整行填滿即消除；Y 垂直行不參與判定。交叉行同步消除，交點只刪除一次。\r
- XYZ 使用七袋、中央出生、三軸順逆轉、三維井壁與底部踢牆、0.42 秒鎖定延遲、H 保留、完整立體落點影子及 Space 直接落下。接觸堆疊後最多 15 次操作重置鎖定延遲，首次接觸起 8 秒內必須落定，防止反覆向上搬動無限拖延。基礎消除分數為 100/300/500/800 × 等級（超過四行，每多一行再加 300 × 等級）；向下每格 1 分，直接落下每格 2 分；每十行加速一級。這些便利操作不會滲入來源經典模式。\r
- 使用少量立柱、底部邊條與 XZ 底格，全部堆疊、作用中骨牌與立體落點持續存在；已移除切片選單及「總覽後操作切回平面」的互斥模式。\r
- \`volume\` 只在重開／模式與尺寸變更時初始化。方向移動、旋轉、保留、重力、落定與新骨牌出生後以 \`follow\` 跟隨實際骨牌中心，保持玩家的觀察角度與縮放，不重新鎖回正面。相同目標不重複啟動跟隨。\r
\r
## 大小與效能\r
\r
無外部圖像、字型或音樂檔。所有方塊交給主程式共用 instancing；只有玩家操作、重力步進或重置時才重建方塊清單，不在每個動畫影格重建。V1.2 預設 6×20×6＝720 個可佔用格，XYZ 自訂的總格數上限為 32,768；空格不建立實體塊，只顯示底格與簡潔井框。配樂由平台提供原創合成曲，不下載音樂檔。\r
\r
## 可驗證項目\r
\r
\`tests/tetris.test.js\` 覆蓋來源規則、空間旋轉、完整碰撞與消行、保留、非等邊尺寸、相機方向移動和 A／D 操作。瀏覽器觀感、窗口 HUD 與切層由整合流程驗收。\r
\r
## 上游 MIT 授權（旋轉佈局資料）\r
\r
Copyright (c) 2011, 2012, 2013, 2014, 2015, 2016 Jake Gordon and contributors\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in\r
all copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN\r
THE SOFTWARE.\r
\r
\r
\r
## V1.3 line-clear and terminal-state correction\r
\r
The spatial game clears each completely occupied horizontal X line and each completely occupied horizontal Z line. Y is only the falling direction. Lines are detected simultaneously; intersecting lines count separately for scoring, but their shared voxel is removed once. A one-cell axis is not counted as a line when the other ground axis is longer. Thus depth-one wells retain ordinary horizontal-row behavior.\r
\r
In each XZ column, cells above deleted positions fall by the number of deleted positions below. Unrelated gaps remain intact. Any new horizontal lines created by this collapse clear in another wave before the next piece spawns. Score per resolution is 100 / 300 / 500 / 800 for one to four lines, plus 300 per additional line, multiplied by the current level. Classic mode retains the original source scoring and whole-row collapse. The HUD reports cleared lines and points with a clear sound.\r
\r
A blocked next spawn ends play. Movement, rotation, hold, hard drop, and gravity remain blocked until reset. Tests cover X-only lines, Z-only lines, crossed lines, simultaneous heights, Y-column non-clears, a cascade, classic rows, depth-spanning piece locks, spawn loss, and reset.\r
`;export{e as default};
