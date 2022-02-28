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

const typeWriterList = [];

class TypeWriter {
    constructor(elementId, textValue, callback = null) {
        this.elementId = elementId;
        this.textValue = textValue;
        this.writerIndex = 0;
        this.speed = 0;
        this.element = $(this.elementId);
        this.inPlaceCycle;
        this.inPlaceCounter = this.inPlaceCycle;
        this.callback = callback;
        typeWriterList.push(this);
    }

    show() {
        // Anzahl inPlaceCycle teilweise random
        if (this.inPlaceCycle === undefined) {
            this.inPlaceCycle = Math.floor(
                Math.random() + 13 / this.textValue.length
            );
        }

        // Speed abh. von Anzahl der Zeichn und inPlaceCycle auf 1000 ms verteilt
        if (!this.speed) {
            this.speed =
                1000 / (this.textValue.length * Math.max(1, this.inPlaceCycle));
        }

        if (this.writerIndex < this.textValue.length) {
            let randomKatakana =
                Katakana[Math.floor(Math.random() * Katakana.length)];

            let actualText = this.element.text().substr(0, this.writerIndex);

            // Ersetzt endstaendiges Katakana bis inPlaceCounter bei 0 ist
            // anstatt den actualText weiter aufzubauen
            if (this.inPlaceCounter > 0) {
                this.element.html(actualText + randomKatakana);
                this.inPlaceCounter--;
            }

            // Sonderzeichen die mit & anfangen gesondert behandeln
            else if (this.textValue.charAt(this.writerIndex) == "&") {
                this.element.html(
                    actualText +
                        this.textValue.substring(
                            this.writerIndex,
                            this.writerIndex + 4
                        ) +
                        randomKatakana
                );
                this.writerIndex += 4;
                this.inPlaceCounter = this.inPlaceCycle;
            } else {
                // Der Standardfall
                this.element.html(
                    actualText +
                        this.textValue.charAt(this.writerIndex++) +
                        randomKatakana
                );
                this.inPlaceCounter = this.inPlaceCycle; // Counter resetten
            }

            setTimeout(() => {
                this.show();
            }, this.speed);
        } else {
            // Katakana am Ende entfernen, wenn Text vollständig angezeigt wird
            this.element.html(
                this.element.text().substr(0, this.element.text().length - 1)
            );

            this.writerIndex = 0;
            this.callback ? this.callback.call() : null; // Ggf. callback rufen
        }
    }
}

const descriptionDegree = new TypeWriter("#description_degree", "");
const degree = new TypeWriter("#degree", "", () => {
    $("#degree-city-subdiv").addClass("fade-in");
});
const city = new TypeWriter("#city", "");
const time = new TypeWriter("#time", "");
const date = new TypeWriter("#date", "");
const label_pressure = new TypeWriter("#label_pressure", "");
const pressure = new TypeWriter("#pressure", "");
const label_humidity = new TypeWriter("#label_humidity", "");
const humidity = new TypeWriter("#humidity", "");

const btn_led = new TypeWriter("#btn_led", "LED PIR starten");

const btn_disk_usage = new TypeWriter(
    "#btn_disk_usage",
    "Speicherbelegung anzeigen"
);

const btn_cpu_temp = new TypeWriter(
    "#btn_cpu_temp",
    "Chip Temperatur anzeigen"
);

const label_status = new TypeWriter("#status", "");

function init(callback) {
    $("#buttons").hide();

    time.textValue = getTime();
    //   time.show();
    showTime();

    showDate();

    descriptionDegree.textValue = "Bedeckt kalt, gefühlt 11.5&deg";
    degree.textValue = "12.0&deg";
    city.textValue = "Peißenberg";
    label_pressure.textValue = "Druck";
    pressure.textValue = "1024 hPa";
    label_humidity.textValue = "Luftfeuchtigkeit";
    humidity.textValue = "45.5%";
    label_wind.textValue = "Wind";
    wind.textValue = "300 m/s";
    label_clouds.textValue = "Wolken";
    clouds.textValue = "40%";
    label_rain.textValue = "Regen";
    rain.textValue = "200mm";
    label_snow.textValue = "Schnee";
    snow.textValue = "200mm";

    callback.call();
}

function startUp() {
    typeWriterList.forEach((tw) => tw.show());

    $("#buttons").show();
}

document.addEventListener("DOMContentLoaded", function (event) {
    //do work TODO replace $(document).ready(...)
});

$(document).ready(function () {
    init(function () {
        startUp();
    });

    /* Events */
    btn_led.element.click(() => {
        if (!led_running) {
            btn_led.textValue = "LED PIR stoppen";
            led_running = true;
        } else {
            btn_led.textValue = "LED PIR starten";
            led_running = false;
        }

        btn_led.show();
    });

    btn_disk_usage.element.click(() => {
        label_status.textValue = "Disk-Usage: 25%";
        label_status.inPlaceCycle = 0; // Konsolenoutput ohne inPlaceCycle
        label_status.show();
    });

    btn_cpu_temp.element.click(() => {
        label_status.textValue = "Chip Temperature: 36°";
        label_status.inPlaceCycle = 0; // Konsolenoutput ohne inPlaceCycle
        label_status.show();
    });
});
