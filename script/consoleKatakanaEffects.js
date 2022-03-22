import { AbstractKatakanaAnimation } from "./abstractKatakanaAnimations.js";

export class ConsoleKatakana extends AbstractKatakanaAnimation {
    animateConsoleEffekt(animationSpeed, coordY) {
        // ################################ X-Achse ####################################
        // Anzahl der Columns ermitteln (speichert die X-Koordinaten fuer Matrix Effekt)
        let maxColumns = Math.floor(
            (this.canvasDiv.offsetWidth + 8 * this.fontSize) / this.fontSize
        );

        let initialCoordinateX =
            -this.fontSize * 4 + Math.round(Math.random() * 4) * this.fontSize;

        let arrXCoordinates = Array(maxColumns).fill(0);
        arrXCoordinates.forEach((element, index) => {
            arrXCoordinates[index] =
                index == 0
                    ? initialCoordinateX
                    : arrXCoordinates[index - 1] + this.fontSize;
        });

        // Rechte Limitierung = Element-Breite + Pufferzone - Random factor
        let rLimit =
            this.canvasDiv.offsetWidth +
            this.fontSize * Math.round(Math.random() * 4);

        // ############################ Katakana Symbole ###############################
        let arrRandomKatakana = [];

        for (let i = 0; i < arrXCoordinates.length; i++) {
            let randomIndex = Math.floor(
                Math.random() * this.arrKatakanaSymbols.length
            );
            let randomSymbol = this.arrKatakanaSymbols[randomIndex];
            arrRandomKatakana.push(randomSymbol);
        }

        let maxVisisbleLength = Math.round(this.randomBetween(5, 17));

        // ############################ Animation ###############################
        let intervalID = setInterval(() => {
            let nextX = arrXCoordinates.shift();
            let nextKatakana = arrRandomKatakana.shift();

            if (nextX && nextX < rLimit && nextKatakana && this.isAnimationOn) {
                this.drawMatrixEffect(
                    nextX,
                    coordY,
                    nextKatakana,
                    animationSpeed,
                    maxVisisbleLength
                );
            } else {
                clearInterval(intervalID);
            }
        }, animationSpeed * this.randomBetween(0.75, 2.0));
    }

    /**
     * @param {number} numAnimations
     * @param {number} animationSpeed
     */
    initConsoleffect() {
        let canvasElement = this.createCanvas(
            this.canvasDiv.offsetWidth - 5,
            this.canvasDiv.offsetHeight - 5,
            5,
            5
        );

        // Canvas 2D-Kontext holen und im canvas element im DOM-Tree einfuegen
        this.canvasDiv.append(canvasElement);
        let canvasCtx = canvasElement.getContext("2d");
        canvasCtx.font = `${this.fontSize}px ${this.font}`;
        canvasCtx.fillStyle = this.fontColor.toString();

        // Lanes und Columns ermitteln
        let maxLanes = Math.floor(
            canvasElement.getAttribute("height") / (this.fontSize + 2)
        );
        let maxColumns = Math.floor(
            canvasElement.getAttribute("width") / this.fontSize
        );

        let initialCoordinateX = 0; // In der linken Pufferzone starten

        let arrXCoordinates = Array(maxColumns).fill(0);
        arrXCoordinates.forEach((element, index) => {
            arrXCoordinates[index] =
                index == 0
                    ? initialCoordinateX
                    : arrXCoordinates[index - 1] + this.fontSize;
        });

        let coordY = this.fontSize;

        let arrRandomKatakana = [];

        for (let i = 0; i < arrXCoordinates.length; i++) {
            let randomIndex = Math.floor(
                Math.random() * this.arrKatakanaSymbols.length
            );
            let randomSymbol = this.arrKatakanaSymbols[randomIndex];
            arrRandomKatakana.push(randomSymbol);
        }

        let intervalID = setInterval(() => {
            canvasCtx.fillText(
                arrRandomKatakana.shift(),
                arrXCoordinates.shift(),
                coordY
            );
        }, 20);

        let testY = 0;

        let otherIntervalID = setInterval(() => {
            let imageData = canvasCtx.getImageData(
                0,
                0,
                canvasCtx.canvas.width,
                canvasCtx.canvas.height
            );
            canvasCtx.putImageData(imageData, 0, testY);
            testY += 20;
        }, 20);

        // while (arrYCordinates.length > 0) {
        //     // let randomIndex = Math.ceil(Math.random() * arrYCordinates.length);
        //     let nextY = arrYCordinates.shift(); // arrYCordinates[randomIndex];
        //     // arrYCordinates.splice(randomIndex, 1);

        //     let timeoutID = setTimeout(() => {
        //         if (this.isAnimationOn) {
        //             this.animateConsoleEffekt(animationSpeed, nextY);
        //         } else {
        //             clearInterval(timeoutID);
        //         }
        //     }, animationSpeed * this.randomBetween(7, 17));
        // }
    }
}
