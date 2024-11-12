import "./style.css";
import { createURL, getData } from "./data-handler";
import { populateDisplay } from "./display";

const FormControl = function() {
    const location = document.querySelector("#location");
    const submitBtn = document.querySelector("#location-search");
    
    submitBtn.addEventListener('click', async (event) => {
        if (location.value != "") {
            event.preventDefault();
            searchResults(location.value);
        }
    });
}();

async function searchResults(location) {
    let url = createURL(location);
    const imperialData = await getData(url.imperialURL);
    imperialData.units = "imperial";
    const metricData = await getData(url.metricURL);
    metricData.units = "metric";
    populateDisplay(imperialData);
    if (searchResultObjects.length) {
        searchResultObjects.splice(0, searchResultObjects.length);
    }
    searchResultObjects.push(imperialData);
    searchResultObjects.push(metricData);
}