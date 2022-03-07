import {
    MatrixKatakanaRandom,
    MatrixKatakanaEvenspaced,
} from "./matrixKatakanaEffects.js";

let mainDiv = document.querySelector("#login-main-container");
let label = document.querySelector(".form-control-label");
let fontSize = parseFloat(window.getComputedStyle(label).fontSize);

// let matrixKatakanaEvenSpaced = new MatrixKatakanaEvenspaced(
//     mainDiv,
//     "rgba(33, 226, 226, 1)",
//     "rgba(255,255,0, 1)",
//     ... font ...
//     /* fontSize */ 25.6,
//     4,
//     true
// );
// matrixKatakanaEvenSpaced.initParameters();
// matrixKatakanaEvenSpaced.initMatrixeffect(80);

let bgCanvasDiv = document.querySelector("#bg-canvas-div");
let matrixKatakanaRandom = new MatrixKatakanaRandom(
    bgCanvasDiv,
    "rgba(33, 226, 226, 1)",
    "rgba(255,255,0, 1)",
    "Orbitron",
    /* fontSize */ 32,
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
    40,
    -1,
    false
);
matrixKatakanaRandom2.initParameters();
matrixKatakanaRandom2.initMatrixeffect(1, 80);

let matrixKatakanaRandom3 = new MatrixKatakanaRandom(
    bgCanvasDiv,
    "rgba(0, 0, 0, 1)",
    "rgba(255,255,0, 1)",
    "Orbitron",
    24,
    -1,
    false
);
matrixKatakanaRandom3.initParameters();
matrixKatakanaRandom3.initMatrixeffect(1, 80);

// TODO: initParameters() ausimplementieren
// window.addEventListener("resize", () => {
//     matrixKatakanaEvenSpaced.pause();
//     setTimeout(() => {
//         matrixKatakanaEvenSpaced.initParameters();
//     }, 1200);
// });
