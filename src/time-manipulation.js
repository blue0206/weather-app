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

export { timeFormat };