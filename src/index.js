
function createURL(location) {
    const apiKey = "FQNNDH99DKU5EPWAR5GGXRSN6";
    let unit = "";
    const metricUnitParameter = "unitGroup=metric&";
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?${unit}key=${apiKey}&iconSet=icons2&elements=datetime,tempmax,tempmin,temp,feelslike,precip,humidity,dew,pressure,snow,windspeed,windgust,visibility,uvindex,sunrise,sunset,moonphase,moonrise,moonset,conditions,description,icon`;

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
        const response = await fetch(url);
        if (response.ok) {
            return response.json();
        } else {
            if (response.status == 400) {
                console.log("Location does not exist!");
                throw new Error(`${response.status}: Invalid parameter(s).`);
            } else if (response.status == 401) {
                console.log("Invalid API key.");
                throw new Error(`${response.status}: Invalid API key.`);
            } else if (response.status == 404) {
                throw new Error(`${response.status}: Not Found.`);
            } else if (response.status == 429) {
                throw new Error(`${response.status}: Rate limit exceeded.`)
            } else if (response.status == 500) {
                console.log("The server is not available at the moment. Please try later.");
                throw new Error(`${response.status}: Internal server error.`);
            }
        }
    } catch (error) {
        console.error(error);
    }
}

const FormControl = function() {
    const location = document.querySelector("#location");
    const submitBtn = document.querySelector("#location-search");
    
    submitBtn.addEventListener('click', async (event) => {
        if (location.value != "") {
            event.preventDefault();

            let url = createURL(location.value);
            console.log(url.imperialURL, url.metricURL);

            const imperialData = await getData(url.imperialURL);
            const metricData = await getData(url.metricURL);

            console.log("IMPERIAL DATA", imperialData);
            console.log("METRIC DATA", metricData);
        }
    });
}();