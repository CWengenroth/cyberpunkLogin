const Katakana = [
    "ア",
    "イ",
    "ウ",
    "エ",
    "オ",
    "カ",
    "キ",
    "ク",
    "ケ",
    "コ",
    "サ",
    "シ",
    "ス",
    "セ",
    "ソ",
    "タ",
    "チ",
    "ツ",
    "テ",
    "ト",
    "ナ",
    "ニ",
    "ヌ",
    "ネ",
    "ノ",
    "ハ",
    "ヒ",
    "フ",
    "ヘ",
    "ホ",
    "マ",
    "ミ",
    "ム",
    "メ",
    "モ",
    "ヤ",
    "ユ",
    "ヨ",
    "ラ",
    "リ",
    "ル",
    "レ",
    "ロ",
    "ワ",
    "ヲ",
    "ン",
];

export class KatakanaAnimations {
    /**
     * @param {HTMLElement} element
     * @param {string} fontColor
     * @param {number} fontSize measured in em units
     */
    constructor(element, fontColor, fontSize) {
        this.canvasDiv = element;
        this.fontColor = fontColor;
        this.fontSize = fontSize;

        this.isAnimationOn = false;
        this.canvasContext = undefined;
    }

    createCanvas() {
        // canvas-Element erstellen ... und im DOM-Tree einfuegen
        const canvas = document.createElement("canvas");
        canvas.setAttribute("id", "canvas");
        canvas.setAttribute("width", this.canvasDiv.offsetWidth);
        canvas.setAttribute("height", this.canvasDiv.offsetHeight);
        canvas.style.position = "absolute";
        canvas.style.zIndex = "10";
        canvas.style.left = `${this.canvasDiv.offsetLeft}px`;

        // ... Context vorbereiten ...
        this.canvasContext = canvas.getContext("2d");
        this.canvasContext.fillStyle = this.fontColor;
        this.canvasContext.font = `${this.fontSize}px Orbitron`;

        // ... und im DOM-Tree einfuegen
        this.canvasDiv.append(canvas);
    }

    setStartingValues() {
        this.isAnimationOn = true;
        // TODO Canvas reset / delete canvas element in HTML
    }

    init() {
        this.setStartingValues();
        this.createCanvas();
    }

    drawMatrixEffect(xCoordinate, yCoordinate, katakanaSymbol, animationSpeed) {
        setTimeout(() => {
            let alphaIncrease = 0.1;

            let intervalID = setInterval(() => {
                if (alphaIncrease < 1.0) {
                    this.canvasContext.fillStyle = `rgba(255,255,0, ${alphaIncrease})`;
                    this.canvasContext.fillRect(
                        xCoordinate,
                        yCoordinate - this.fontSize,
                        this.fontSize + 2,
                        this.fontSize + 2
                    );

                    alphaIncrease += alphaIncrease;
                } else {
                    this.canvasContext.clearRect(
                        xCoordinate,
                        yCoordinate - this.fontSize,
                        this.fontSize + 2,
                        this.fontSize + 2
                    );
                    clearInterval(intervalID);
                }
            }, animationSpeed);
        }, 7 * animationSpeed);

        this.canvasContext.fillStyle = this.fontColor;
        this.canvasContext.fillText(katakanaSymbol, xCoordinate, yCoordinate);
    }

    animateMatrixEffekt(animationSpeed) {
        // Anzahl der Columns ermitteln (speichert die X-Koordinaten fuer Matrix Effekt)
        let maxColumns = Math.floor(
            (this.canvasDiv.offsetWidth + 4 * this.fontSize) / this.fontSize
        );

        let initialCoordinateX =
            -this.fontSize + Math.random() * (this.canvasDiv.offsetWidth / 2);

        let arrXCoordinates = Array(maxColumns).fill(0);
        arrXCoordinates.forEach((element, index) => {
            arrXCoordinates[index] =
                index == 0
                    ? initialCoordinateX
                    : arrXCoordinates[index - 1] + this.fontSize;
        });

        // Rechte Limitierung = Element-Breite + Pufferzone - Random factor
        let rLimit =
            this.canvasDiv.offsetWidth + this.fontSize - Math.random() * 400;

        let fixedY = Math.max(
            this.fontSize * 1.5,
            Math.random() * (this.canvasDiv.offsetHeight - this.fontSize * 1.5)
        );

        let arrRandomKatakana = [];

        for (let i = 0; i < arrXCoordinates.length; i++) {
            let randomIndex = Math.floor(Math.random() * Katakana.length);
            let randomSymbol = Katakana[randomIndex];
            arrRandomKatakana.push(randomSymbol);
        }

        let intervalID = setInterval(() => {
            let nextX = arrXCoordinates.shift();
            let nextKatakana = arrRandomKatakana.shift();

            if (nextX && nextX < rLimit && nextKatakana && this.isAnimationOn) {
                this.drawMatrixEffect(
                    nextX,
                    fixedY,
                    nextKatakana,
                    animationSpeed
                );
            } else {
                clearInterval(intervalID);
            }
        }, animationSpeed);
    }

    /**
     * @param {number} numAnimations
     * @param {number} animationSpeed
     */
    initiateMatrixeffect(numAnimations, animationSpeed) {
        this.canvasContext.fillStyle = "rgb(255,255,0)";
        this.canvasContext.fillRect(
            0,
            0,
            this.canvasDiv.offsetWidth,
            this.canvasDiv.offsetHeight
        );

        for (let j = 0; j < numAnimations; j++) {
            let IntervalID = setInterval(() => {
                if (this.isAnimationOn) {
                    this.animateMatrixEffekt(animationSpeed);
                }
            }, animationSpeed * 4);
        }
    }

    /**
     * @param {string} animationType
     * @param {number} numAnimations
     * @param {number} animationSpeed
     */
    animate(animationType, numAnimations, animationSpeed) {
        switch (animationType) {
            case "matrixEvenlySpaced":
            default:
                this.initiateMatrixeffect(numAnimations, animationSpeed);
                break;
        }
    }

    pause() {
        this.isAnimationOn = false;
    }
}
