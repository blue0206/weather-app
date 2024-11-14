import "./style.css";
import { fetchAndDisplay } from "./data-handler";

const FormControl = function() {
    const location = document.querySelector("#location");
    const submitBtn = document.querySelector("#location-search");
    
    submitBtn.addEventListener('click', async (event) => {
        if (location.value != "") {
            event.preventDefault();
            fetchAndDisplay(location.value);
        }
    });
}();

const DisplayControl = function() {
    // Window load event listener.
    window.addEventListener("load", () => {
        fetchAndDisplay("sadh nagar");
    })
}();