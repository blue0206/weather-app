import { setBackground } from "./background";
import { populateDisplay } from "./display";

const searchResults = {
  imperialData: null,
  metricData: null,
};

async function fetchAndDisplay(location) {
  // Create URL.
  let url = createURL(location);
  // Fetch data in imperial units.
  const imperialData = await getData(url.imperialURL);
  imperialData.units = "imperial";
  // Fetch data in metric units.
  const metricData = await getData(url.metricURL);
  metricData.units = "metric";
  // Store data in an object for access without fetch request.
  searchResults.imperialData = imperialData;
  searchResults.metricData = metricData;
  // Display fetched data in default imperial units.
  populateDisplay(imperialData);
  // Setup background according to current weather conditions
  // that have been fetched.
  setBackground(imperialData);
}

function createURL(location) {
  const resolvedLocation = location.split(" ").join("-");
  const apiKey = "FQNNDH99DKU5EPWAR5GGXRSN6";
  const imperialURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${resolvedLocation}?key=${apiKey}&iconSet=icons2&elements=datetime,tempmax,tempmin,temp,feelslike,precip,humidity,dew,pressure,snow,windspeed,windgust,visibility,uvindex,sunrise,sunset,moonphase,moonrise,moonset,conditions,description,icon`;
  const metricURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${resolvedLocation}?unitGroup=metric&key=${apiKey}&iconSet=icons2&elements=datetime,tempmax,tempmin,temp,feelslike,precip,humidity,dew,pressure,snow,windspeed,windgust,visibility,uvindex,sunrise,sunset,moonphase,moonrise,moonset,conditions,description,icon`;

  console.log("URL START", imperialURL, metricURL, "URL END");

  return {
    imperialURL,
    metricURL,
  };
}

async function getData(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return response.json();
    } else {
      if (response.status == 400) {
        ErrorHandler.throwError("Location does not exist!");
        throw new Error(`${response.status}: Invalid parameter(s).`);
      } else if (response.status == 401) {
        ErrorHandler.throwError("Invalid API key.");
        throw new Error(`${response.status}: Invalid API key.`);
      } else if (response.status == 404) {
        ErrorHandler.throwError(`${response.status}: Not Found`);
        throw new Error(`${response.status}: Not Found.`);
      } else if (response.status == 429) {
        ErrorHandler.throwError("You have exceeded the maximum allowed searches per day.");
        throw new Error(`${response.status}: Rate limit exceeded.`);
      } else if (response.status == 500) {
        ErrorHandler.throwError(
          "The server is not available at the moment. Please try later.",
        );
        throw new Error(`${response.status}: Internal server error.`);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

const ErrorHandler = function() {
    const errorModal = document.querySelector(".error-modal");
    const messageNode = document.querySelector(".message");
    const closeBtn = document.querySelector('.error-close');
    closeBtn.addEventListener('click', () => {
        errorModal.close();
    });

    function throwError(message) {
        messageNode.textContent = message;
        errorModal.showModal();
    }

    return { throwError };
}();

export { searchResults, fetchAndDisplay };
