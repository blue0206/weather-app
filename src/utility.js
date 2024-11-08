function timeFormat(time) {
    const hoursArr = [time.split('')[0], time.split('')[1]];
    const minutesArr = [time.split('')[3], time.split('')[4]];
    let hours = hoursArr.join('');
    let minutes = minutesArr.join('');
    let hours12F = "";
    let isAM = undefined;

    if (hours == "00") {
        hours12F = 12;
        isAM = true;
    } else if (hours < "12") {
        hours12F = hours % 12;
        isAM = true;
    } else if (hours == "12") {
        hours12F = 12;
        isAM = false;
    } else {
        hours12F = hours % 12;
        isAM = false;
    }

    return {
        hours,
        hours12F,
        minutes,
        isAM
    };
}

const LinearGradient = function() {
    function generateGradient(hi, low, unit) {
        let background1 = "";   // Should contain the first color used in linear gradient.
        let count = 0;      // Number of colors to be used for gradient.
        const colors = [
            false, // white
            false, // green
            false, // light yellow
            false, // dark yellow
            false, // red
            false  // dark red
        ]

        if ((low < 8 && unit == "metric") || (low < 46 && unit == "imperial")) {
            // Set white as true and increment the count.
            colors[0] = true;
            ++count;

            background1 = firstBackgroundValue("white");
        }
        if ((low < 16 && unit == "metric") || (low < 61 && unit == "imperial")) {
            // Set green as true and increment the count.
            colors[1] = true;
            ++count;

            if (!colors[0]) {
                background1 = firstBackgroundValue("green");
            }
        }
        if ((low <= 24 && unit == "metric") || (low <= 75 && unit == "imperial")) {
            // Set light yellow as true and increment the count.
            colors[2] = true;
            ++count;

            if (!colors[1]) {
                background1 = firstBackgroundValue("lightYellow");
            }
        }
        if ((hi > 24 && unit == "metric") || (hi > 75 && unit == "imperial")) {
            // Set dark yellow as true and increment the count.
            colors[3] = true;
            ++count;

            if (!colors[2]) {
                background1 = firstBackgroundValue("darkYellow");
            }
        }
        if ((hi >= 32 && unit == "metric") || (hi >= 90 && unit == "imperial")) {
            // Set red as true and increment the count.
            colors[4] = true;
            ++count;

            if (!colors[3]) {
                background1 = firstBackgroundValue("red");
            }
        }
        if ((hi > 38 && unit == "metric") || (hi > 100 && unit == "imperial")) {
            // Set dark red as true and increment the count.
            colors[5] = true;
            ++count;

            if (!colors[4]) {
                background1 = firstBackgroundValue("darkRed");
            }
        }

        let background2 = secondBackgroundValue(colors, count);

        return {
            background1,
            background2
        };
        
    }

    function getColorValue(color) {
        if (color == "white") {
            return "rgba(255,250,250,1)";
        } else if (color == "green") {
            return "rgba(214,255,7,1)";
        } else if (color == "lightYellow") {
            return "rgba(255,248,0,1)";
        } else if (color == "darkYellow") {
            return "rgba(251,188,2,1)";
        } else if (color == "red") {
            return "rgba(252,90,90,1)";
        } else {
            return "rgba(130,0,0,1)";
        }
    }

    function firstBackgroundValue(color) {
        if (color == "white") {
            return "background: rgb(255,250,250);";
        } else if (color == "green") {
            return "background: rgb(214,255,7);";
        } else if (color == "lightYellow") {
            return "background: rgb(255,248,0);";
        } else if (color == "darkYellow") {
            return "background: rgb(251,188,2);";
        } else if (color == "red") {
            return "background: rgb(252,90,90);";
        } else {
            return "background: rgb(252,90,90);";
        }
    }

    function secondBackgroundValue(colors, count) {
        const step = parseInt(100/++count);
        let stopValue = 0;
        const colorValueArr = [];

        for (let i=0; i<colors.length; i++) {
            if (colors[i]) {
                stopValue += step;
                if (i === 0) {
                    colorValueArr.push(`${getColorValue("white")} ${stopValue}%`);
                } else if (i === 1) {
                    colorValueArr.push(`${getColorValue("green")} ${stopValue}%`);
                } else if (i === 2) {
                    colorValueArr.push(`${getColorValue("lightYellow")} ${stopValue}%`);
                } else if (i === 3) {
                    colorValueArr.push(`${getColorValue("darkYellow")} ${stopValue}%`);
                } else if (i === 4) {
                    colorValueArr.push(`${getColorValue("red")} ${stopValue}%`);
                } else if (i == 5) {
                    colorValueArr.push(`${getColorValue("darkRed")} ${stopValue}%`);
                }
            }
        }

        return `background: linear-gradient(90deg,${colorValueArr.join(',')});`;
    }

    return {
        generateGradient
    };
}();

export { timeFormat, LinearGradient };