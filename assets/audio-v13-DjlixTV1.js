const e=`# V1.3 downloaded music and effects

Retrieved and license-checked on 2026-10-19.

Match Three uses **Empacotatron** by **Fupi**, an energetic electronic arcade loop. The [original page](https://opengameart.org/content/empacotatron) identifies the work as CC0 and provides a dedicated loop. Cubiverse includes that original 80-second Ogg Vorbis loop without audio modification. Other games retain their individual procedural music themes.

Eight short effects were selected from Kenney's [Interface Sounds](https://kenney.nl/assets/interface-sounds) and [Music Jingles](https://kenney.nl/assets/music-jingles), both CC0. The downloaded archives' original license text and exact filename mappings are included in \`public/audio/LICENSES.txt\`.

| Cue | Original file | Duration |
| --- | --- | ---: |
| Move | Interface Sounds / tick_004.ogg | 0.055 s |
| Clear | Interface Sounds / glass_004.ogg | 0.692 s |
| Error | Interface Sounds / error_004.ogg | 0.103 s |
| Combo | Interface Sounds / confirmation_004.ogg | 0.490 s |
| Line | Interface Sounds / maximize_008.ogg | 0.225 s |
| Burst | Interface Sounds / drop_004.ogg | 0.287 s |
| Power | Music Jingles / 8-Bit / jingles_NES08.ogg | 0.621 s |
| Win | Music Jingles / Hit / jingles_HIT00.ogg | 0.284 s |

All nine Ogg files were fully decoded using the installed FFmpeg runtime. Codec metadata, duration, channel count, sample rate and original compressed sizes are recorded in \`evidence/audio-assets-v1.3.json\`. All are Vorbis at 44,100 Hz. Audio payload totals **1,893,489 bytes**; notices add about 2 KB. The source archives remain in evidence, outside the public runtime payload.

\`src/asset-audio.js\` shares the platform's existing AudioContext. The controller fetches and decodes after play begins, caches each asset once, limits simultaneous effects to eight, and uses a compressor to control overlapping peaks. Pausing stops effects and retains the loop position; restarting or switching games resets it. Disposal cancels outstanding requests and disconnects nodes.

\`start()\` returns true when Match Three's downloaded loop starts. For other games, or if the asset cannot load/decode, it returns false so the platform can keep the existing procedural music. \`cue()\` returns true only when a sample is played immediately; on a cold sample it begins loading and returns false for immediate synthesized feedback. The controller never schedules a late duplicate effect after the fallback has already sounded.
`;export{e as default};
