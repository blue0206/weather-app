import { timeFormat } from "./utility";

function setBackground(data) {
    const condition = data.currentConditions.icon;
    const timeObj = timeFormat(data.currentConditions.datetime);
    const sunriseObj = timeFormat(data.currentConditions.sunrise);
    const sunsetObj = timeFormat(data.currentConditions.sunset);

    if (condition == "hail" || condition.split('').includes("rain") || condition.split('').includes("showers") || condition == "sleet" || condition == "thunder") {
        rain();
    } else if (timeObj.hours == sunriseObj.hours) {
        sunrise();
    } else if (timeObj.hours == sunsetObj.hours) {
        sunset();
    } else if ((timeObj.hours < sunsetObj.hours && timeObj.hours > sunriseObj.hours) && condition.split('').includes("cloud")) {
        cloudyDay();
    } else if ((timeObj.hours < sunriseObj.hours || timeObj.hours > sunsetObj.hours) && condition.split('').includes("cloud")) {
        cloudyNight();
    } else if (timeObj.hours < sunsetObj.hours && timeObj.hours > sunriseObj.hours) {
        day();
    } else {
        night();
    }
}

function night() {
    // Credits
    const creditName = document.querySelector('.credit-name');
    const creditSource = document.querySelector('.credit-source');
    creditName.href =
        "https://unsplash.com/@dennis_jar?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash";
    creditName.textContent = "Dennis Schweizer";
    creditSource.href =
        "https://unsplash.com/photos/a-night-sky-with-stars-and-a-plane-in-the-foreground-18nR85wWyLY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash";
    creditSource.textContent = "Unsplash";

    // Set class
    document.body.className = "bg-night";
}

function sunset() {
    // Credits
    const creditName = document.querySelector('.credit-name');
    const creditSource = document.querySelector('.credit-source');
    creditName.href =
        "https://unsplash.com/@alanrobertjones?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash";
    creditName.textContent = "Alan Jones";
    creditSource.href =
        "https://unsplash.com/photos/orange-and-blue-sky-during-golden-hour-OQsxdghBKrU?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash";
    creditSource.textContent = "Unsplash";

    // Set class
    document.body.className = "bg-sunset";      
}

function sunrise() {
    // Credits
    const creditName = document.querySelector('.credit-name');
    const creditSource = document.querySelector('.credit-source');
    creditName.href =
        "https://unsplash.com/@chuttersnap?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash";
    creditName.textContent = "CHUTTERSNAP";
    creditSource.href =
        "https://unsplash.com/photos/gray-clouds-on-sky-P6ek62anGJ0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash";
    creditSource.textContent = "Unsplash";

    // Set class
    document.body.className = "bg-sunrise";
}

function rain() {
    // Credits
    const creditName = document.querySelector('.credit-name');
    const creditSource = document.querySelector('.credit-source');
    creditName.href =
        "https://unsplash.com/@wackeltin_meem?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash";
    creditName.textContent = "Valentin Müller";
    creditSource.href =
        "https://unsplash.com/photos/dew-drops-on-glass-panel-bWtd1ZyEy6w?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash";
    creditSource.textContent = "Unsplash";

    // Set class
    document.body.className = "bg-rain";       
}

function day() {
    // Credits
    const creditName = document.querySelector('.credit-name');
    const creditSource = document.querySelector('.credit-source');
    creditName.href =
        "https://pixabay.com/users/geralt-9301/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=7161722";
    creditName.textContent = "Gerd Altmann";
    creditSource.href =
        "https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=7161722";
    creditSource.textContent = "Pixabay";
    // Set class
    document.body.className = "bg-day";
}

function cloudyDay() {
    // Credits
    const creditName = document.querySelector('.credit-name');
    const creditSource = document.querySelector('.credit-source');
    creditName.href =
        "https://unsplash.com/@zburival?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash";
    creditName.textContent = "Zbynek Burival";
    creditSource.href =
        "https://unsplash.com/photos/aerial-photography-of-clouds-8iZG31eXkks?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash";
    creditSource.textContent = "Unsplash";
    // Set class
    document.body.className = "bg-cloudy-day";
}

function cloudyNight() {
    // Credits
    const creditName = document.querySelector('.credit-name');
    const creditSource = document.querySelector('.credit-source');
    creditName.href =
        "https://pixabay.com/users/geralt-9301/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2643089";
    creditName.textContent = "Gerd Altmann";
    creditSource.href =
        "https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2643089";
    creditSource.textContent = "Pixabay";
    // Set class
    document.body.className = "bg-cloudy-night";
}

export { setBackground };