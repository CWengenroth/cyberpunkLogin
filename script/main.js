import { KatakanaAnimations } from "./miscAnimations.js";

let mainDiv = document.querySelector("#login-main-container");
let label = document.querySelector(".form-control-label");
let fontSize = parseFloat(window.getComputedStyle(label).fontSize);

const matrixKatakana = new KatakanaAnimations(mainDiv, "#21e2e2", fontSize, 80);
matrixKatakana.init();
matrixKatakana.animate("matrixEvenlySpaced", 1, 80);
