
function createURL(location, date1, date2) {
    console.log(date1, date2);
    const apiKey = "FQNNDH99DKU5EPWAR5GGXRSN6";
    let baseURL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
    let imperialURL = "";
    let metricURL = "";
    
    // If date-1 not specified by user.
    if (!date1) {
        date1 = date2;
    }
    // If date-2 is specified by user.
    if (date2) {
        imperialURL = `${baseURL}${location}/${date1}/${date2}?key=${apiKey}`;
        metricURL = `${baseURL}${location}/${date1}/${date2}?unitGroup=metric&key=${apiKey}`;
    } else {
        // If only date-1 specified by user.
        imperialURL = `${baseURL}${location}/${date1}?key=${apiKey}`;
        metricURL = `${baseURL}${location}/${date1}?unitGroup=metric&key=${apiKey}`;
    }

    return {
        imperialURL,
        metricURL
    }
}

async function getData(url) {
    try {
        const data = await fetch(url);
        return await data.json();
    } catch(error) {
        console.log(error);
    }
}

function reportData(data) {
    const retrievedData = {
        location: data.resolvedAddress,
        description: data.description,
        days: [],
    };

    data.days.forEach((day) => {
        retrievedData.days.push({
            date: day.datetime,
            tempmax: day.tempmax,
            tempmin: day.tempmin,
            temp: day.temp,
            feelslike: day.feelslike,
            precipitation: day.precip,
            snow: day.snow,
            wind: day.windspeed,
            visibility: day.visibility,
            sunrise: day.sunrise,
            sunset: day.sunset,
            conditions: day.conditions,
            description: day.description
        });
    });

    console.table(retrievedData);
    console.log(retrievedData);
    return retrievedData;
}

function setUnits(data, metric=false) {
    if (metric) {
        const metricUnits = {
            temp: "°C",
            precipitation: "mm",
            snow: "cm",
            wind: "kmph",
            visibility: "km"
        };

        data.days.forEach((day) => {
            day.tempmax += metricUnits.temp;
            day.tempmin += metricUnits.temp;
            day.temp += metricUnits.temp;
            day.feelslike += metricUnits.temp;
            day.precipitation += metricUnits.precipitation;
            day.snow += metricUnits.snow;
            day.wind += metricUnits.wind;
            day.visibility += metricUnits.visibility;
        });
    } else {
        const imperialUnits = {
            temp: "°F",
            precipitation: "in",
            snow: "in",
            wind: "mph",
            visibility: "mi"
        }

        data.days.forEach((day) => {
            day.tempmax += imperialUnits.temp;
            day.tempmin += imperialUnits.temp;
            day.temp += imperialUnits.temp;
            day.feelslike += imperialUnits.temp;
            day.precipitation += imperialUnits.precipitation;
            day.snow += imperialUnits.snow;
            day.wind += imperialUnits.wind;
            day.visibility += imperialUnits.visibility;
        });
    }

    return data;
}

const FormControl = function() {
    const location = document.querySelector("#location");
    const date1 = document.querySelector("#date-one");
    const date2 = document.querySelector("#date-two");
    const submitBtn = document.querySelector(".generate-weather-data");
    
    submitBtn.addEventListener('click', async (event) => {
        if (location.value != "") {
            event.preventDefault();

            let url = createURL(location.value, date1.value, date2.value);
            console.log(url.imperialURL, url.metricURL);

            const imperialData = await getData(url.imperialURL);
            const metricData = await getData(url.metricURL);

            console.log("IMPERIAL DATA", imperialData);
            console.log("METRIC DATA", metricData);

            const retrievedImperialData = reportData(imperialData);
            console.log("IMPERIAL DATA", retrievedImperialData);

            const retrievedMetricData = reportData(metricData);
            console.log("METRIC DATA", retrievedMetricData);
            console.log("TEST", retrievedImperialData);

            const finalImperialData = setUnits(retrievedImperialData);
            const finalMetricData = setUnits(retrievedMetricData, true);
            console.log("FINAL IMPERIAL DATA", finalImperialData);
            console.log("FINAL METRIC DATA", finalMetricData);
        }
    });
}();