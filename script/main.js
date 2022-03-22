import { MatrixKatakanaRandom } from "./matrixKatakanaEffects.js";
import { ConsoleKatakana } from "./consoleKatakanaEffects.js";

let consoleDiv = document.querySelector(".console-canvas");

let consoleKatakana = new ConsoleKatakana(
    consoleDiv,
    "rgba(33, 226, 226, 1)",
    "rgba(0,0,0, 0)",
    "Orbitron",
    16,
    0,
    true
);
consoleKatakana.initParameters();
consoleKatakana.initConsoleffect();

let bgCanvasDiv = document.querySelector("#bg-canvas-div");
let matrixKatakanaRandom = new MatrixKatakanaRandom(
    bgCanvasDiv,
    "rgba(33, 226, 226, 1)",
    "rgba(255,255,0, 1)",
    "Orbitron",
    32,
    -1,
    false
);
matrixKatakanaRandom.initParameters();
matrixKatakanaRandom.initMatrixeffect(3, 100);

let matrixKatakanaRandom2 = new MatrixKatakanaRandom(
    bgCanvasDiv,
    "rgba(206, 17, 133, 1)",
    "rgba(255,255,0, 1)",
    "Orbitron",
    44,
    -1,
    false
);
matrixKatakanaRandom2.initParameters();
matrixKatakanaRandom2.initMatrixeffect(1, 75);

let matrixKatakanaRandom3 = new MatrixKatakanaRandom(
    bgCanvasDiv,
    "rgba(0, 0, 0, 1)",
    "rgba(255,255,0, 1)",
    "Orbitron",
    20,
    -1,
    false
);
matrixKatakanaRandom3.initParameters();
matrixKatakanaRandom3.initMatrixeffect(1, 125);

// TODO: initParameters() ausimplementieren
// window.addEventListener("resize", () => {
//     matrixKatakanaEvenSpaced.pause();
//     setTimeout(() => {
//         matrixKatakanaEvenSpaced.initParameters();
//     }, 1200);
// });
