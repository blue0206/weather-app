function populateDisplay(data) {
    // Update display for hourly weather data.
    hourlyForecastDisplay(data);
};

function hourlyForecastDisplay(data) {
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
}

export { populateDisplay };