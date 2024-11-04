import { createURL, getData } from "./data-handler";
import "./style.css";

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