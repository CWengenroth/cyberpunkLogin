export class RGBA {
    static getRGBAInstanceFromString(rgbaString) {
        if (rgbaString && rgbaString.startsWith("rgba(")) {
            let rawValues = rgbaString
                .replace("rgba(", "")
                .replace(")", "")
                .split(",");

            for (let i = 0; i < rawValues.length; i++) {
                rawValues[i] = +rawValues[i];
            }

            return new RGBA(...rawValues);
        } else return new RGBA(0, 0, 0, 1); // Default black for unsupported format
    }

    /**
     * @param {number} red
     * @param {number} green
     * @param {number} blue
     * @param {number} alpha
     */
    constructor(red, green, blue, alpha) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    /**
     * @param {number} alpha
     */
    toString(alpha = this.alpha) {
        return `rgba(${this.red}, ${this.green}, ${this.blue}, ${alpha})`;
    }
}

export class AbstractKatakanaAnimation {
    /**
     * @param {HTMLElement} element
     * @param {string} fontColor only rgba supported else default black
     * @param {string} bgColor only rgba supported else default black
     * @param {string} font
     * @param {number} fontSize measured in em units
     * @param {boolean} isRevealOn
     */
    constructor(
        element,
        fontColor,
        bgColor,
        font,
        fontSize,
        zIndex = 0,
        isRevealOn = false
    ) {
        this.canvasDiv = element;
        this.fontColor = RGBA.getRGBAInstanceFromString(fontColor);
        this.bgColor = RGBA.getRGBAInstanceFromString(bgColor);
        this.font = font;
        this.fontSize = fontSize;
        this.zIndex = zIndex;
        this.isRevealOn = isRevealOn;

        this.isAnimationOn = false;
        this.setActiveCanvasElements = new Set();
    }

    arrKatakanaSymbols = [
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

    createCanvas(
        width = this.canvasDiv.offsetWidth,
        height = this.canvasDiv.offsetHeight,
        offsetTop = this.canvasDiv.offsetTop,
        offsetLeft = this.canvasDiv.offsetLeft
    ) {
        // canvas-Element erstellen ... und im DOM-Tree einfuegen
        const canvas = document.createElement("canvas");
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
        canvas.style.position = "absolute";
        canvas.style.zIndex = this.zIndex;

        canvas.style.top = `${offsetTop}px`;
        canvas.style.left = `${offsetLeft}px`;

        return canvas;
    }

    setStartingValues() {
        this.isAnimationOn = true;
        // TODO Canvas reset / delete canvas element in HTML
    }

    initParameters() {
        this.setStartingValues();
        // this.createCanvas();
    }

    randomBetween(min, max) {
        let result;

        do {
            result = Math.random() * max;
        } while (result < min);

        return +result.toFixed(2);
    }

    pause() {
        this.isAnimationOn = false;
    }

    get arrKatakanaSymbols() {
        return this.arrKatakanaSymbols;
    }

    /**
     *
     * @param {CanvasRenderingContext2D} canvasCtx
     * @param {numer} xCoordinate
     * @param {string} katakanaSymbol
     * @param {number} modifiedAnimationSpeed
     */
    blendOutCharAt(
        canvasCtx,
        xCoordinate,
        yCoordinate,
        katakanaSymbol,
        modifiedAnimationSpeed
    ) {
        let alpha = 1.0;
        if (xCoordinate !== undefined && this.isAnimationOn) {
            let intervalID = setInterval(() => {
                if (this.isAnimationOn && alpha > 0.1) {
                    canvasCtx.clearRect(
                        xCoordinate - 1,
                        0,
                        this.fontSize + 1,
                        this.fontSize * 1.66
                    );

                    if (this.isRevealOn) {
                        canvasCtx.fillStyle = this.bgColor;
                        canvasCtx.fillRect(
                            xCoordinate - 1,
                            0,
                            this.fontSize + 1,
                            this.fontSize * 1.66
                        );
                    }

                    alpha -= 0.1;
                    canvasCtx.fillStyle = this.fontColor.toString(alpha);
                    canvasCtx.fillText(
                        katakanaSymbol,
                        xCoordinate,
                        yCoordinate
                    );
                } else {
                    clearInterval(intervalID);
                }
            }, modifiedAnimationSpeed);
        } else {
            setTimeout(() => {
                if (canvasCtx) {
                    let canvasToBeDeleted = canvasCtx.canvas;

                    if (canvasToBeDeleted) {
                        try {
                            this.canvasDiv.removeChild(canvasToBeDeleted);
                        } catch (exception) {
                            // Nothing todo here
                        }
                        this.setActiveCanvasElements.delete(canvasCtx.canvas);
                        canvasCtx = null;
                    }
                }
            }, modifiedAnimationSpeed + 500); // 500 ms Pufferzeit
        }
    }

    drawMatrixEffect(
        canvasCtx,
        xCoordinate,
        yCoordinate,
        katakanaSymbol,
        animationSpeed,
        maxVisisbleLength
    ) {
        setTimeout(() => {
            this.blendOutCharAt(
                canvasCtx,
                xCoordinate,
                yCoordinate,
                katakanaSymbol,
                animationSpeed * 0.5
            );
        }, animationSpeed * maxVisisbleLength);

        if (xCoordinate !== undefined && katakanaSymbol && this.isAnimationOn) {
            canvasCtx.fillStyle = this.fontColor.toString();
            canvasCtx.fillText(katakanaSymbol, xCoordinate, yCoordinate);
        }
    }
}
