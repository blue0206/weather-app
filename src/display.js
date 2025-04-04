import { LoadingComponent } from "./loading-component";
import { format } from "date-fns";
import { timeFormat } from "./utility";
import { LinearGradient } from "./utility";
import HoursIcon from "./assets/icons/hours.svg";
import DaysIcon from "./assets/icons/days.svg";
import FeelsLikeIcon from "./assets/icons/feels-like.svg";
import WindIcon from "./assets/icons/wind.svg";
import VisibilityIcon from "./assets/icons/visibility.svg";
import UVIndexIcon from "./assets/icons/clear-day.svg";
import PrecipitationIcon from "./assets/icons/precipitation.svg";
import HumidityIcon from "./assets/icons/humidity.svg";
import PressureIcon from "./assets/icons/pressure.svg";
import SunriseIcon from "./assets/icons/sunrise.svg";
import SunsetIcon from "./assets/icons/sunset.svg";
import MoonFQ from "./assets/icons/moon-first-quarter.svg";
import MoonFull from "./assets/icons/moon-full.svg";
import MoonLQ from "./assets/icons/moon-last-quarter.svg";
import MoonNew from "./assets/icons/moon-new.svg";
import MoonWaningC from "./assets/icons/moon-waning-crescent.svg";
import MoonWaningG from "./assets/icons/moon-waning-gibbous.svg";
import MoonWaxingC from "./assets/icons/moon-waxing-crescent.svg";
import MoonWaxingG from "./assets/icons/moon-waxing-gibbous.svg";

function populateDisplay(data) {
  // Hide Loading.
  LoadingComponent.hide();
  // Update the header display.
  SectionHeader.generate(data);
  // Update display for hourly weather data.
  SectionHours.generate(data);
  // Update display for daily forecast data.
  SectionDays.generate(data);
  // Update display for feels-like temp.
  SectionFeelsLikeTemp.generate(data);
  // Update display for wind data.
  SectionWind.generate(data);
  // Update display for visibility data.
  SectionVisibility.generate(data);
  // Update display for uv-index data.
  SectionUVIndex.generate(data);
  // Update display for precipitation data.
  SectionPrecipitation.generate(data);
  // Update display for humidity data.
  SectionHumidity.generate(data);
  // Update display for pressure data.
  SectionPressure.generate(data);
  // Update display for sunrise data.
  SectionSunrise.generate(data);
  // Update display for sunset data.
  SectionSunset.generate(data);
  // Update display for moon data.
  SectionMoon.generate(data);
}

const SectionHeader = (function () {
  function generate(data) {
    // Location
    const location = data.resolvedAddress;
    // Current Temperature
    const temp = Math.round(data.currentConditions.temp);
    // Maximum Temperature
    const hi = Math.round(data.days[0].tempmax);
    // Minimum Temperature
    const low = Math.round(data.days[0].tempmin);

    document.querySelector(".location").textContent = location;
    document.querySelector(".head-temp").textContent = `${temp}°`;
    const extremes = document.querySelector(".head-hi-low");
    extremes.querySelector("div").textContent = `H:${hi}°`;
    extremes.lastChild.textContent = `L:${low}°`;
  }

  return { generate };
})();

const SectionHours = (function () {
  function generate(data) {
    const parentElement = document.querySelector(".hours");
    // Clear any existing child nodes of the node to be populated.
    if (parentElement.lastChild) {
      parentElement.removeChild(parentElement.lastChild);
    }

    // Container node to hold the data and append to parent.
    const container = document.createElement("div");

    // Heading of the hourly weather data section (Icon + Heading)
    container.appendChild(generateSectionHeading("HOURLY FORECAST", HoursIcon));

    // Actual hourly data to be displayed in display section.
    const dataList = document.createElement("div");
    dataList.className = "hourly-data-container";

    // Generate forecast data for each hour starting from current one.
    const currentHourObj = timeFormat(data.currentConditions.datetime);
    generate24HourForecast(data, dataList, currentHourObj, 0, 0);

    container.appendChild(dataList);
    parentElement.appendChild(container);
  }

  function generate24HourForecast(
    data,
    dataList,
    currentHourObj,
    currentDay,
    forecastCounter,
  ) {
    let day = currentDay;
    // Boolean variables to make sure that there is only one entry each of sunrise and sunset.
    let sunriseEntryVacancy = true;
    let sunsetEntryVacancy = true;
    for (let i = 0; i < 24 && forecastCounter <= 24; i++) {
      const hour = data.days[day].hours[i];
      const hourObj = timeFormat(hour.datetime);
      let sunriseObj = timeFormat(data.days[day].sunrise);
      let sunsetObj = timeFormat(data.days[day].sunset);

      // Skip if the hour is prior to current hour.
      if (day == 0 && hourObj.hours < currentHourObj.hours) {
        continue;
      }
      // Create entry for sunrise and sunset.
      if (
        (sunriseObj.hours == hourObj.hours &&
          sunriseObj.minutes == hourObj.minutes) ||
        (sunriseObj.hours == hourObj.hours - 1 && sunriseEntryVacancy)
      ) {
        dataList.appendChild(sunriseSunsetDOM(sunriseObj, true));
        sunriseEntryVacancy = false;
      } else if (
        (sunsetObj.hours == hourObj.hours &&
          sunsetObj.minutes == hourObj.minutes) ||
        (sunsetObj.hours == hourObj.hours - 1 && sunsetEntryVacancy)
      ) {
        dataList.appendChild(sunriseSunsetDOM(sunsetObj, false));
        sunsetEntryVacancy = false;
      }

      const container = document.createElement("div");
      container.className = "hour-data";

      const time = document.createElement("div");
      time.className = "hour-time";
      const hourTime = document.createElement("div");
      const suffix = document.createElement("div");

      if (currentHourObj.hours == hourObj.hours && day == 0) {
        hourTime.textContent = "Now";
        suffix.textContent = "";
      } else {
        hourTime.textContent = hourObj.hours12F;
        suffix.textContent = hourObj.isAM ? "AM" : "PM";
      }
      time.appendChild(hourTime);
      time.appendChild(suffix);
      container.appendChild(time);

      const conditionIcon = document.createElement("div");
      conditionIcon.classList.add("hour-icon");
      conditionIcon.classList.add(hour.icon);
      container.appendChild(conditionIcon);

      const temp = document.createElement("div");
      temp.className = "hour-temp";
      temp.textContent = Math.round(hour.temp) + "°";
      container.appendChild(temp);

      dataList.appendChild(container);
      forecastCounter++;
    }

    if (forecastCounter < 24) {
      generate24HourForecast(
        data,
        dataList,
        currentHourObj,
        ++day,
        forecastCounter,
      );
    }
  }

  function sunriseSunsetDOM(timeObj, isSunrise = false) {
    let nameValue = "Sunset";
    let meridiem = "PM";
    let iconClass = "hour-sunset";
    if (isSunrise) {
      nameValue = "Sunrise";
      meridiem = "AM";
      iconClass = "hour-sunrise";
    }

    const container = document.createElement("div");
    container.className = "hour-data";

    const time = document.createElement("div");
    time.className = "hour-time";
    const hourTime = document.createElement("div");
    hourTime.textContent = `${timeObj.hours12F}:${timeObj.minutes}`;
    time.appendChild(hourTime);
    const suffix = document.createElement("div");
    suffix.textContent = meridiem;
    time.appendChild(suffix);
    container.appendChild(time);

    const icon = document.createElement("div");
    icon.classList.add("hour-icon");
    icon.classList.add(iconClass);
    container.appendChild(icon);

    const name = document.createElement("div");
    name.style.fontSize = "1rem";
    name.textContent = nameValue;
    container.appendChild(name);

    return container;
  }

  return { generate };
})();

const SectionDays = (function () {
  function generate(data) {
    const parentElement = document.querySelector(".days");
    // Clear any existing child nodes of the node to be populated.
    if (parentElement.lastChild) {
      parentElement.removeChild(parentElement.lastChild);
    }

    // Container node to hold the data and append to parent.
    const container = document.createElement("div");

    // Heading of the daily weather forecast section (Icon + Heading)
    container.appendChild(generateSectionHeading("15-DAY FORECAST", DaysIcon));

    // Actual daily data to be displayed in display section.
    const dataList = document.createElement("div");
    dataList.className = "daily-data-container";

    data.days.forEach((day) => {
      // Generate a horizontal line before each tab.
      const hLine = document.createElement("div");
      hLine.className = "h-line";
      dataList.appendChild(hLine);

      const container = document.createElement("div");
      container.className = "day-data";

      // The day of the week.
      const dayOfWeek = document.createElement("div");
      if (day === data.days[0]) {
        dayOfWeek.textContent = "Today";
      } else {
        dayOfWeek.textContent = format(day.datetime, "E");
      }
      container.appendChild(dayOfWeek);

      // Weather icon for the day.
      const icon = document.createElement("div");
      icon.classList.add("day-icon");
      if (day === data.days[0]) {
        icon.classList.add(data.currentConditions.icon);
      } else {
        icon.classList.add(day.icon);
      }
      container.appendChild(icon);

      // Temperatures for the day.
      const tempContainer = document.createElement("div");
      tempContainer.className = "temp-container";

      // Min temperature for the day.
      const low = document.createElement("div");
      low.textContent = `${Math.round(day.tempmin)}°`;
      tempContainer.appendChild(low);
      // Temperature Gradient
      const tempGradient = document.createElement("div");
      tempGradient.className = "temp-gradient";
      const gradientCSS = LinearGradient.generateDayForecastGradient(
        Math.round(day.tempmax),
        Math.round(day.tempmin),
        data.units,
      );
      tempGradient.style.cssText = `${gradientCSS.background1} ${gradientCSS.background2}`;
      if (day === data.days[0]) {
        const marker = document.createElement("div");
        marker.className = "temp-gradient-marker";
        const numerator =
          Math.round(data.currentConditions.temp) - Math.round(day.tempmin);
        const denominator = Math.round(day.tempmax) - Math.round(day.tempmin);
        marker.style.left = `${parseInt((numerator / denominator) * 100) - 5}%`;
        tempGradient.appendChild(marker);
      }
      tempContainer.appendChild(tempGradient);
      // Max temperature for the day.
      const hi = document.createElement("div");
      hi.textContent = `${Math.round(day.tempmax)}°`;
      tempContainer.appendChild(hi);

      container.appendChild(tempContainer);
      dataList.appendChild(container);
    });
    container.appendChild(dataList);
    parentElement.appendChild(container);
  }

  return { generate };
})();

const SectionFeelsLikeTemp = (function () {
  function generate(data) {
    const parentElement = document.querySelector(".feels-like");
    // Clear any existing child nodes of the node to be populated.
    if (parentElement.lastChild) {
      parentElement.removeChild(parentElement.lastChild);
    }

    // Container node to hold the data and append to parent.
    const container = document.createElement("div");

    // Heading of the feels-like temperature section (Icon + Heading)
    container.appendChild(generateSectionHeading("FEELS LIKE", FeelsLikeIcon));

    // Temperature
    const temp = document.createElement("div");
    temp.className = "temp-feels-like";
    temp.textContent = `${Math.round(data.currentConditions.feelslike)}°`;
    container.appendChild(temp);

    parentElement.appendChild(container);
  }

  return { generate };
})();

const SectionWind = (function () {
  function generate(data) {
    const parentElement = document.querySelector(".winds");
    // Clear any existing child nodes of the node to be populated.
    if (parentElement.lastChild) {
      parentElement.removeChild(parentElement.lastChild);
    }

    // Container node to hold the data and append to parent.
    const container = document.createElement("div");

    // Heading of the wind section (Icon + Heading)
    container.appendChild(generateSectionHeading("WIND", WindIcon));

    // Wind Data
    const windContainer = document.createElement("div");
    windContainer.className = "wind-data-container";
    // Wind Speed
    windContainer.appendChild(
      generateWindData(
        data.currentConditions.windspeed,
        data.units,
        "wind-speed",
        "Wind",
      ),
    );
    // Horizontal Line
    const hLine = document.createElement("div");
    hLine.className = "h-line";
    windContainer.appendChild(hLine);
    // Wind Gust
    windContainer.appendChild(
      generateWindData(data.days[0].windgust, data.units, "wind-gust", "Gusts"),
    );

    container.appendChild(windContainer);
    parentElement.appendChild(container);
  }

  function generateWindData(
    dataValue,
    dataUnit,
    containerClassName,
    typeValue,
  ) {
    const container = document.createElement("div");
    container.className = containerClassName;

    const value = document.createElement("div");
    value.textContent = Math.round(dataValue);
    container.appendChild(value);

    const secondaryValueContainer = document.createElement("div");
    const unit = document.createElement("div");
    unit.textContent = dataUnit == "metric" ? "KPH" : "MPH";
    secondaryValueContainer.appendChild(unit);
    const type = document.createElement("div");
    type.textContent = typeValue;
    secondaryValueContainer.appendChild(type);
    container.appendChild(secondaryValueContainer);

    return container;
  }

  return { generate };
})();

const SectionVisibility = (function () {
  function generate(data) {
    const parentElement = document.querySelector(".visibility");
    // Clear any existing child nodes of the node to be populated.
    if (parentElement.lastChild) {
      parentElement.removeChild(parentElement.lastChild);
    }

    // Container node to hold the data and append to parent.
    const container = document.createElement("div");

    // Heading of the visibility section (Icon + Heading)
    container.appendChild(generateSectionHeading("VISIBILITY", VisibilityIcon));

    // Visibility data.
    const visibility = document.createElement("div");
    let unit = data.units == "metric" ? "km" : "mi";
    visibility.textContent = `${data.currentConditions.visibility} ${unit}`;
    container.appendChild(visibility);

    parentElement.appendChild(container);
  }

  return { generate };
})();

const SectionUVIndex = (function () {
  function generate(data) {
    const parentElement = document.querySelector(".uv-index");
    // Clear any existing child nodes of the node to be populated.
    if (parentElement.lastChild) {
      parentElement.removeChild(parentElement.lastChild);
    }

    // Container node to hold the data and append to parent.
    const container = document.createElement("div");

    // Heading of the uv-index section (Icon + Heading)
    container.appendChild(generateSectionHeading("UV INDEX", UVIndexIcon));

    // UV-Index Data Container
    const uvIndexContainer = document.createElement("div");
    uvIndexContainer.className = "uv-index-data-container";
    // UV-Index Value
    const value = document.createElement("div");
    value.textContent = data.currentConditions.uvindex;
    uvIndexContainer.appendChild(value);
    // UV-Index Remarks
    const remarks = document.createElement("div");
    if (value.textContent <= 2) {
      remarks.textContent = "Low";
    } else if (value.textContent > 2 && value.textContent <= 5) {
      remarks.textContent = "Moderate";
    } else if (value.textContent > 5 && value.textContent <= 8) {
      remarks.textContent = "High";
    } else {
      remarks.textContent = "Severe";
    }
    uvIndexContainer.appendChild(remarks);
    // UV-Index Gradient
    // Gradient DOM element
    const gradient = document.createElement("div");
    gradient.className = "uv-gradient";
    const gradientCSS = LinearGradient.generateUVIndexGradient();
    gradient.style.cssText = `${gradientCSS.background1} ${gradientCSS.background2}`;
    // Gradient marker to spot current value position;
    const marker = document.createElement("div");
    marker.className = "uv-gradient-marker";
    marker.style.left = `${parseInt(value.textContent) * 10}%`;
    gradient.appendChild(marker);
    uvIndexContainer.appendChild(gradient);

    container.appendChild(uvIndexContainer);
    parentElement.appendChild(container);
  }

  return { generate };
})();

const SectionPrecipitation = (function () {
  function generate(data) {
    const parentElement = document.querySelector(".precipitation");
    // Clear any existing child nodes of the node to be populated.
    if (parentElement.lastChild) {
      parentElement.removeChild(parentElement.lastChild);
    }

    // Container node to hold the data and append to parent.
    const container = document.createElement("div");

    // Heading of the precipitation section (Icon + Heading)
    container.appendChild(
      generateSectionHeading("PRECIPITATION", PrecipitationIcon),
    );

    // Precipitation data.
    const precipitation = document.createElement("div");
    let displayValue =
      data.units == "metric"
        ? `${data.days[0].precip} mm`
        : `${data.days[0].precip}"`;
    precipitation.textContent = displayValue;

    container.appendChild(precipitation);
    parentElement.appendChild(container);
  }

  return { generate };
})();

const SectionHumidity = (function () {
  function generate(data) {
    const parentElement = document.querySelector(".humidity");
    // Clear any existing child nodes of the node to be populated.
    if (parentElement.lastChild) {
      parentElement.removeChild(parentElement.lastChild);
    }

    // Container node to hold the data and append to parent.
    const container = document.createElement("div");

    // Heading of the humidity section (Icon + Heading)
    container.appendChild(generateSectionHeading("HUMIDITY", HumidityIcon));

    // Humidity Value
    const humidity = document.createElement("div");
    humidity.className = "humidity-value";
    humidity.textContent = `${Math.round(data.currentConditions.humidity)}%`;
    container.appendChild(humidity);

    // Dew Point Value
    const dew = document.createElement("div");
    dew.className = "dew-point";
    dew.textContent = `The dew point is ${Math.round(data.currentConditions.dew)}° right now.`;
    container.appendChild(dew);

    parentElement.appendChild(container);
  }

  return { generate };
})();

const SectionPressure = (function () {
  function generate(data) {
    const parentElement = document.querySelector(".pressure");
    // Clear any existing child nodes of the node to be populated.
    if (parentElement.lastChild) {
      parentElement.removeChild(parentElement.lastChild);
    }

    // Container node to hold the data and append to parent.
    const container = document.createElement("div");

    // Heading of the pressure section (Icon + Heading)
    container.appendChild(generateSectionHeading("PRESSURE", PressureIcon));

    // Pressure data.
    const pressure = document.createElement("div");
    pressure.textContent = `${data.currentConditions.pressure} hPa`;
    container.appendChild(pressure);

    parentElement.appendChild(container);
  }

  return { generate };
})();

const SectionSunrise = (function () {
  function generate(data) {
    const parentElement = document.querySelector(".sunrise");
    // Clear any existing child nodes of the node to be populated.
    if (parentElement.lastChild) {
      parentElement.removeChild(parentElement.lastChild);
    }

    // Container node to hold the data and append to parent.
    const container = document.createElement("div");

    // Heading of the sunrise section (Icon + Heading)
    container.appendChild(generateSectionHeading("SUNRISE", SunriseIcon));

    // Sunrise data.
    const sunrise = document.createElement("div");
    const time = document.createElement("div");
    const timeObj = timeFormat(data.currentConditions.sunrise);
    time.textContent = `${timeObj.hours12F}:${timeObj.minutes}`;
    sunrise.appendChild(time);
    const meridiem = document.createElement("div");
    meridiem.textContent = "AM";
    sunrise.appendChild(meridiem);

    container.appendChild(sunrise);
    parentElement.appendChild(container);
  }

  return { generate };
})();

const SectionSunset = (function () {
  function generate(data) {
    const parentElement = document.querySelector(".sunset");
    // Clear any existing child nodes of the node to be populated.
    if (parentElement.lastChild) {
      parentElement.removeChild(parentElement.lastChild);
    }

    // Container node to hold the data and append to parent.
    const container = document.createElement("div");

    // Heading of the sunset section (Icon + Heading)
    container.appendChild(generateSectionHeading("SUNSET", SunsetIcon));

    // Sunset data.
    const sunset = document.createElement("div");
    const time = document.createElement("div");
    const timeObj = timeFormat(data.currentConditions.sunset);
    time.textContent = `${timeObj.hours12F}:${timeObj.minutes}`;
    sunset.appendChild(time);
    const meridiem = document.createElement("div");
    meridiem.textContent = "PM";
    sunset.appendChild(meridiem);

    container.appendChild(sunset);
    parentElement.appendChild(container);
  }

  return { generate };
})();

const SectionMoon = (function () {
  function generate(data) {
    const parentElement = document.querySelector(".moon");
    // Clear any existing child nodes of the node to be populated.
    if (parentElement.lastChild) {
      parentElement.removeChild(parentElement.lastChild);
    }

    // Container node to hold the data and append to parent.
    const container = document.createElement("div");

    // Heading of the moon section (Icon + Heading)
    let heading = "";
    let iconSrc = undefined;
    const moonPhase = data.currentConditions.moonphase;
    if (moonPhase == 0) {
      heading = "NEW MOON";
      iconSrc = MoonNew;
    } else if (moonPhase > 0 && moonPhase < 0.25) {
      heading = "WAXING CRESCENT";
      iconSrc = MoonWaxingC;
    } else if (moonPhase == 0.25) {
      heading = "FIRST QUARTER";
      iconSrc = MoonFQ;
    } else if (moonPhase > 0.25 && moonPhase < 0.5) {
      heading = "WAXING GIBBOUS";
      iconSrc = MoonWaxingG;
    } else if (moonPhase == 0.5) {
      heading = "FULL MOON";
      iconSrc = MoonFull;
    } else if (moonPhase > 0.5 && moonPhase < 0.75) {
      heading = "WANING GIBBOUS";
      iconSrc = MoonWaningG;
    } else if (moonPhase == 0.75) {
      heading = "LAST QUARTER";
      iconSrc = MoonLQ;
    } else if (moonPhase > 0.75) {
      heading = "WANING CRESCENT";
      iconSrc = MoonWaningC;
    }
    container.appendChild(generateSectionHeading(heading, iconSrc));

    // Moon data.
    // Moonrise
    const moonrise = document.createElement("div");
    const moonriseTitle = document.createElement("div");
    moonriseTitle.className = "moonrise";
    moonriseTitle.textContent = "Moonrise";
    moonrise.appendChild(moonriseTitle);
    const moonriseTime = document.createElement("div");
    if (data.days[0].moonrise) {
      const timeObj = timeFormat(data.days[0].moonrise);
      const time = document.createElement("div");
      time.textContent = `${timeObj.hours12F}:${timeObj.minutes}`;
      moonriseTime.appendChild(time);
      const meridiem = document.createElement("div");
      meridiem.textContent = timeObj.isAM ? "AM" : "PM";
      moonriseTime.appendChild(meridiem);
    } else {
      moonriseTime.textContent = "-";
    }
    moonrise.appendChild(moonriseTime);
    container.appendChild(moonrise);
    // Horizontal line.
    const hLine = document.createElement("div");
    hLine.className = "h-line";
    container.appendChild(hLine);
    // Moonset
    const moonset = document.createElement("div");
    const moonsetTitle = document.createElement("div");
    moonsetTitle.className = "moonset";
    moonsetTitle.textContent = "Moonset";
    moonset.appendChild(moonsetTitle);
    const moonsetTime = document.createElement("div");
    if (data.days[0].moonset) {
      const timeObj = timeFormat(data.days[0].moonset);
      const time = document.createElement("div");
      time.textContent = `${timeObj.hours12F}:${timeObj.minutes}`;
      moonsetTime.appendChild(time);
      const meridiem = document.createElement("div");
      meridiem.textContent = timeObj.isAM ? "AM" : "PM";
      moonsetTime.appendChild(meridiem);
    } else {
      moonsetTime.textContent = "-";
    }
    moonset.appendChild(moonsetTime);
    container.appendChild(moonset);

    parentElement.appendChild(container);
  }

  return { generate };
})();

function generateSectionHeading(title, source) {
  const headingContainer = document.createElement("div");
  headingContainer.className = "data-heading";
  const icon = document.createElement("div");
  icon.style.maskImage = `url("${source}")`;
  headingContainer.appendChild(icon);
  const heading = document.createElement("div");
  heading.textContent = title;
  headingContainer.appendChild(heading);
  return headingContainer;
}

export { populateDisplay };
