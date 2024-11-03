
function createURL(location, date) {
    console.log(date);
    const apiKey = "FQNNDH99DKU5EPWAR5GGXRSN6";
    let unit = "";
    const metricUnitParameter = "unitGroup=metric&";
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date}2024-11-03/2024-11-05?${unit}key=${apiKey}&iconSet=icons2&elements=datetime,tempmax,tempmin,temp,feelslike,precip,humidity,dew,pressure,snow,windspeed,windgust,visibility,uvindex,sunrise,sunset,moonphase,moonrise,moonset,conditions,description,icon`
    
    if (date) {
        date += "/";
    }

    let imperialURL = url;
    unit = metricUnitParameter;
    let metricURL = url;

    return {
        imperialURL,
        metricURL
    };
}

async function getData(url) {
    try {
        const data = await fetch(url);
        return await data.json();
    } catch(error) {
        console.log(error);
    }
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
        }
    });
}();