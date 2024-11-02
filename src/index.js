
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