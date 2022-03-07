import { AbstractKatakanaAnimation } from "./abstractKatakanaAnimations.js";

export class MatrixKatakanaRandom extends AbstractKatakanaAnimation {
    moveCanvas(canvasElement, delay, randomNumber) {
        setInterval(() => {
            let offsetLeft = canvasElement.offsetLeft;
            canvasElement.style.right = "auto;";
            if (randomNumber <= 0.3) {
                canvasElement.style.left = `${--offsetLeft}px`;
            } else {
                canvasElement.style.left = `${++offsetLeft}px`;
            }
        }, delay);
    }

    getRandomCanvasParams() {
        let offsetLeftStart =
            -this.fontSize + Math.random() * (this.canvasDiv.offsetWidth / 3);

        let offsetLeftEnd =
            this.canvasDiv.offsetWidth +
            this.fontSize -
            Math.random() * (this.canvasDiv.offsetWidth / 3);

        let offsetTop = this.randomBetween(
            0,
            this.canvasDiv.offsetHeight - 3 * this.fontSize
        );

        return {
            offsetLeftStart: offsetLeftStart,
            offsetLeftEnd: offsetLeftEnd,
            offsetTop: offsetTop,

            get width() {
                return this.offsetLeftEnd - this.offsetLeftStart;
            },
        };
    }

    animateMatrixEffekt(delay) {
        // Canvas element erzeugen & zufaellig im parent Div platzieren
        let objCanvasParams = this.getRandomCanvasParams();
        let canvasElement = this.createCanvas(
            objCanvasParams.width,
            this.fontSize * 1.66,
            objCanvasParams.offsetTop,
            objCanvasParams.offsetLeftStart
        );

        // Canvas 2D-Kontext holen und im canvas element im DOM-Tree einfuegen
        this.canvasDiv.append(canvasElement);
        this.setActiveCanvasElements.add(canvasElement);
        let canvasCtx = canvasElement.getContext("2d");
        canvasCtx.font = `${this.fontSize}px ${this.font}`;

        // Anzahl der Columns im canvas ermitteln inkl. Pufferzonen links und
        // rechts von jewils max. 2 * fontSize
        // --> ergibt X-Koordinaten fuer Matrix Effekt
        let maxColumns = Math.floor(canvasElement.offsetWidth / this.fontSize);

        let initialCoordinateX = 0; // In der linken Pufferzone starten

        let arrXCoordinates = Array(maxColumns).fill(0);
        arrXCoordinates.forEach((element, index) => {
            arrXCoordinates[index] =
                index == 0
                    ? initialCoordinateX
                    : arrXCoordinates[index - 1] + this.fontSize;
        });

        let coordY = this.fontSize * 1.33;

        let arrRandomKatakana = [];

        for (let i = 0; i < arrXCoordinates.length; i++) {
            let randomIndex = Math.floor(
                Math.random() * this.arrKatakanaSymbols.length
            );
            let randomSymbol = this.arrKatakanaSymbols[randomIndex];
            arrRandomKatakana.push(randomSymbol);
        }

        let maxVisisbleLength = Math.round(this.randomBetween(5, 17));

        this.moveCanvas(canvasElement, delay * 0.65, Math.random());

        let intervalID = setInterval(() => {
            let coordX = arrXCoordinates.shift();
            let katakana = arrRandomKatakana.shift();

            if (this.isAnimationOn) {
                this.drawMatrixEffect(
                    canvasCtx,
                    coordX,
                    coordY,
                    katakana,
                    delay,
                    maxVisisbleLength
                );
            } else {
                clearInterval(intervalID);
            }
        }, delay * this.randomBetween(0.75, 2.0));
    }

    /**
     * @param {number} numAnimations
     * @param {number} delay
     */
    initMatrixeffect(numAnimations, delay) {
        numAnimations = Math.min(numAnimations, 10); // 10 max wg. Performance
        for (let j = 0; j < numAnimations; j++) {
            let intervalID = setInterval(() => {
                if (this.isAnimationOn) {
                    if (this.setActiveCanvasElements.size < numAnimations) {
                        this.animateMatrixEffekt(delay);
                    }
                } else {
                    clearInterval(intervalID);
                }
            }, delay * this.randomBetween(7, 17));
        }
    }
}

export class MatrixKatakanaEvenspaced extends AbstractKatakanaAnimation {
    animateMatrixEffekt(animationSpeed, coordY) {
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
    initMatrixeffect(animationSpeed) {
        this.numCanvasID[0].fillStyle = this.bgColor.toString();
        this.numCanvasID[0].fillRect(
            0,
            0,
            this.canvasDiv.offsetWidth,
            this.canvasDiv.offsetHeight
        );

        // ################################ Y-Achse ####################################
        let lanes = Math.floor(this.canvasDiv.offsetHeight / this.fontSize);
        let uniformRowheight = this.canvasDiv.offsetHeight / lanes;

        let arrYCordinates = Array(Math.ceil(lanes)).fill(0);
        arrYCordinates.forEach((element, index) => {
            arrYCordinates[index] =
                index * uniformRowheight +
                Math.abs(this.fontSize - uniformRowheight) / 2;
        });

        while (arrYCordinates.length > 0) {
            // let randomIndex = Math.ceil(Math.random() * arrYCordinates.length);
            let nextY = arrYCordinates.shift(); // arrYCordinates[randomIndex];
            // arrYCordinates.splice(randomIndex, 1);

            let timeoutID = setTimeout(() => {
                if (this.isAnimationOn) {
                    this.animateMatrixEffekt(animationSpeed, nextY);
                } else {
                    clearInterval(timeoutID);
                }
            }, animationSpeed * this.randomBetween(7, 17));
        }
    }
}
