import "./style.css";
import { searchResults, fetchAndDisplay } from "./data-handler";
import { populateDisplay } from "./display";

const FormControl = function () {
  const location = document.querySelector("#location");
  const submitBtn = document.querySelector("#location-search");

  submitBtn.addEventListener("click", async (event) => {
    if (location.value != "") {
      event.preventDefault();
      fetchAndDisplay(location.value);
      // Set °F unit switch as checked since it is the default state.
      document.querySelector("#switch-to-F").checked = true;
      // Clear input.
      location.value = "";
    }
  });
};

const DisplayControl = function () {
  // Window load event listener.
  window.addEventListener("load", () => {
    fetchAndDisplay("sadh nagar");
  });

  // Unit switch event listeners.
  const switchToF = document.querySelector("#switch-to-F");
  switchToF.addEventListener("click", () => {
    populateDisplay(searchResults.imperialData);
  });
  const switchToC = document.querySelector("#switch-to-C");
  switchToC.addEventListener("click", () => {
    populateDisplay(searchResults.metricData);
  });
};

DisplayControl();
FormControl();