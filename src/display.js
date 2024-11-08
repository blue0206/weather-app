import { format } from "date-fns";
import { timeFormat } from "./utility";
import { LinearGradient } from "./utility";

function populateDisplay(data) {
    // Update the header display.
    SectionHeader.generate(data);
    // Update display for hourly weather data.
    SectionHours.generate(data);
    // Update display for daily forecast data.
    SectionDays.generate(data);
};

const SectionHeader = function() {
    function generate(data) {
        // Location
        const locationArr = data.resolvedAddress.split(",");
        const location = `${locationArr[0]}, ${locationArr[2]}`;
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
}();

const SectionHours = function() {

    function generate(data) {
        const parentElement = document.querySelector('.hours');
        // Clear any existing child nodes of the node to be populated.
        if (parentElement.lastChild) {
            parentElement.removeChild(parentElement.lastChild);
        }
    
        // Container node to hold the data and append to parent.
        const container = document.createElement('div');
    
        // Heading of the hourly weather data section (Icon + Heading)
        const headingContainer = document.createElement('div');
        headingContainer.className = "data-heading";
        const icon = new Image();
        icon.src = "";
        headingContainer.appendChild(icon);
        const heading = document.createElement('div');
        heading.textContent = "HOURLY FORECAST";
        headingContainer.appendChild(heading);
        container.appendChild(headingContainer);
    
        // Actual hourly data to be displayed in display section.
        const dataList = document.createElement('div');
        dataList.className = "hourly-data-container";
    
        // Generate forecast data for each hour starting from current one.
        const currentHourObj = timeFormat(data.currentConditions.datetime);
        generate24HourForecast(data, dataList, currentHourObj, 0, 0);
    
        container.appendChild(dataList);
        parentElement.appendChild(container);
    }
    
    function generate24HourForecast(data, dataList, currentHourObj, currentDay, forecastCounter) {
        let day = currentDay;
        for (let i=0; i<24 && forecastCounter <= 24; i++) {
            const hour = data.days[day].hours[i];
            const hourObj = timeFormat(hour.datetime);

            // Skip if the hour is prior to current hour.
            if (day == 0 && hourObj.hours < currentHourObj.hours) {
                continue;
            }
    
            const container = document.createElement('div');
            container.className = "hour-data";
            
            const time = document.createElement('div');
            time.className = "hour-time";
            const hourTime = document.createElement('div');
            const suffix = document.createElement('div');
    
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
    
            const conditionIcon = new Image();
            conditionIcon.classList.add("hour-icon");
            conditionIcon.classList.add(hour.icon);
            container.appendChild(conditionIcon);
    
            const temp = document.createElement('div');
            temp.className = "hour-temp";
            temp.textContent = Math.round(hour.temp) + "°";
            container.appendChild(temp);
    
            dataList.appendChild(container);
            forecastCounter++;
        }
    
        if (forecastCounter < 24) {
            generate24HourForecast(data, dataList, currentHourObj, ++day, forecastCounter);
        }
    }

    return { generate };

}();

const SectionDays = function() {

    function generate(data) {
        const parentElement = document.querySelector(".days");
        // Clear any existing child nodes of the node to be populated.
        if (parentElement.lastChild) {
            parentElement.removeChild(parentElement.lastChild);
        }

        // Container node to hold the data and append to parent.
        const container = document.createElement('div');

        // Heading of the daily weather forecast section (Icon + Heading)
        const headingContainer = document.createElement('div');
        headingContainer.className = "data-heading";
        const icon = new Image();
        icon.src = "";
        headingContainer.appendChild(icon);
        const heading = document.createElement('div');
        heading.textContent = "15-DAY FORECAST";
        headingContainer.appendChild(heading);
        container.appendChild(headingContainer);

        // Actual daily data to be displayed in display section.
        const dataList = document.createElement('div');
        dataList.className = "daily-data-container";

        data.days.forEach((day) => {
            const container = document.createElement('div');
            container.className = "day-data";

            // The day of the week.
            const dayOfWeek = document.createElement('div');
            dayOfWeek.className = '.day';
            if (day === data.days[0]) {
                dayOfWeek.textContent = "Today";
            } else {
                dayOfWeek.textContent = format(day.datetime, "E");
            }
            container.appendChild(dayOfWeek);

            // Weather icon for the day.
            const icon = new Image();
            icon.classList.add("day-icon");
            icon.classList.add(day.icon);
            container.appendChild(icon);

            // Temperatures for the day.
            const tempContainer = document.createElement('div');
            tempContainer.className = "temp-container";

            const temp = document.createElement('div');
            temp.className = "day-temp";
            // Max temperature for the day.
            const hi = document.createElement('div');
            hi.className = "day-hi";
            hi.textContent = `${Math.round(day.tempmax)}°`;
            temp.appendChild(hi);
            // Average temperature for the day.
            const avg = document.createElement('div');
            avg.className = "day-avg";
            avg.textContent = `${Math.round(day.temp)}°`;
            temp.appendChild(avg);
            // Min temperature for the day.
            const low = document.createElement('div');
            low.className = "day-low";
            low.textContent = `${Math.round(day.tempmin)}°`;
            temp.appendChild(low);
            
            // Temperature Gradient
            const tempGradient = document.createElement('div');
            tempGradient.className = "temp-gradient";
            const gradientCSS = LinearGradient.generateGradient(Math.round(day.tempmax), Math.round(day.tempmin), data.units);
            tempGradient.style.cssText = `${gradientCSS.background1} ${gradientCSS.background2}`;
            console.log(`${gradientCSS.background1} ${gradientCSS.background2}`);

            tempContainer.appendChild(tempGradient);
            tempContainer.appendChild(temp);
            container.appendChild(tempContainer);

            dataList.appendChild(container);
        });
        container.appendChild(dataList);
        parentElement.appendChild(container);
    }

    return {generate}; 

}();

export { populateDisplay };