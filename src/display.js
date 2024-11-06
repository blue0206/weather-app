import { timeFormat } from "./time-manipulation";

function populateDisplay(data) {
    // Update display for hourly weather data.
    SectionHours.generate(data);
};

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
            temp.textContent = hour.temp + "°";
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


export { populateDisplay };