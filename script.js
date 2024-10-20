// API token for authentication
const token = 'cf7c01dc60d6008455c0c8715a6337e049478ae675a65ab7287e7bf76b1dd5d7';

// HTML element references
const codePostalInput = document.getElementById("postal-code");
const menuDeroulant = document.getElementById("menuDeroulant");
const regexCodePostal = /^\d{5}$/; // Regular expression to validate postal codes
const validerBtn = document.getElementById("valider-btn");
const tmin = document.getElementById("temp-min");
const tmax = document.getElementById("temp-max");
const rainProba = document.getElementById("rain-probability");
const sunshine = document.getElementById("sunshine");
const nvRech = document.getElementById("nv_rech");
const checkboxes = document.getElementById('checkboxes');
const latitude = document.getElementById("latitude");
const longitude = document.getElementById("longitude");
const cumulPluie = document.getElementById("cumul-pluie");
const vent = document.getElementById("vent");
const direcVent = document.getElementById("direction-vent");
const ville = document.getElementById("ville");
const forecastContainer = document.getElementById("forecast-container");
const modal = document.getElementById("myModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementsByClassName("close")[0];
const nbJoursSlider = document.getElementById("nbJoursSlider"); // Slider to choose the number of forecast days
const sliderValueDisplay = document.getElementById("sliderValue"); // Display the selected number of days

// Class representing a weather card
class WeatherCard {
    constructor(day, tmin, tmax, rainProba, weatherCode, sunshine, extraInfo = '') {
        this.day = day; // Day of forecast
        this.tmin = tmin; // Minimum temperature
        this.tmax = tmax; // Maximum temperature
        this.rainProba = rainProba; // Rain probability
        this.sunshine = sunshine; // Hours of sunshine
        this.weatherCode = weatherCode; // Weather code (used to select an icon)
        this.extraInfo = extraInfo; // Additional info (e.g., latitude, wind)
    }

    // Get the corresponding weather icon based on the weather code
    getWeatherIcon() {
        const iconFile = iconMap[this.weatherCode] || 'day.svg';  // Default icon is sunny
        return `<img src="icons/${iconFile}" alt="Weather Icon" class="weather-icon">`;
    }

    // Create and return the HTML structure for the weather card
    createCard() {
        const card = document.createElement('div');
        card.className = 'weather-card';

        const weatherIcon = this.getWeatherIcon();
        
        // Set the content of the weather card
        card.innerHTML = `
            <h3>${this.day}</h3>
            <div>${weatherIcon}</div> 
            <p><strong>Température minimale :</strong> ${this.tmin}°C</p>
            <p><strong>Température maximale :</strong> ${this.tmax}°C</p>
            <p><strong>Probabilité de pluie :</strong> ${this.rainProba}%</p>
            <p><strong>Ensoleillement :</strong> ${this.sunshine}h</p>
            ${this.extraInfo}
        `;
        return card;
    }
}

// Fetch the list of communes based on the postal code
async function getCommunesByPostalCode(codePostal) {
    const url = `https://geo.api.gouv.fr/communes?codePostal=${codePostal}`;
    let tab = []
    try {
        const response = await fetch(url); // Fetch data from the API
        const data = await response.json(); // Convert the response to JSON
        tab = data.map(commune => commune.nom); // Extract the names of the communes
        return tab; // Return the array of commune names
    }
    catch(error) {
        console.error("Erreur lors de la récupération des communes:", error); // Handle errors
    }
}

// Fetch the INSEE code of a commune by its name
async function getCommunesByName(name) {
    const url = `https://api.meteo-concept.com/api/location/cities?token=${token}&search=${name}`;
    try {
        const response = await fetch(url); // Fetch data
        const data = await response.json(); // Convert response to JSON
        return data.cities[0].insee; // Return the INSEE code
    }
    catch(error) {
        console.error("Erreur lors de la récupération des communes:", error); // Handle errors
    }
}

// Fetch weather data for a city using its INSEE code
async function getMeteoData(code, i) {
    const urlmeteo = `https://api.meteo-concept.com/api/forecast/daily?token=${token}&insee=${code}`;
    try {
        const response = await fetch(urlmeteo); // Fetch weather data
        const data = await response.json(); // Convert response to JSON
        return data.forecast[i]; // Return the forecast for the specified day
    }
    catch(error) {
        console.error("Erreur lors de la récupération des temps:", error); // Handle errors
    }
}

// Update the displayed slider value
function updateSliderValue(value) {
    sliderValueDisplay.innerText = `Nombre de jours sélectionnés : ${value}`;
}

// Display weather information based on the selected city and number of days
async function afficherInformations() {
    let selectedCommune = menuDeroulant.value;
    if (!selectedCommune) {
        alert("Veuillez sélectionner une commune.");
        return;
    }

    const insee = await getCommunesByName(selectedCommune);
    forecastContainer.innerHTML = '';  // Clear previous results

    const nbJoursValue = parseInt(nbJoursSlider.value, 10); // Get the number of forecast days

    for (let j = 0; j < nbJoursValue; j++) {
        const meteoData = await getMeteoData(insee, j); // Get weather data for each day

        let extraInfo = ''; // Collect additional information if checkboxes are checked
        if (latitude.checked) {
            extraInfo += `<p><strong>Latitude :</strong> ${meteoData.latitude}</p>`;
        }
        if (longitude.checked) {
            extraInfo += `<p><strong>Longitude :</strong> ${meteoData.longitude}</p>`;
        }
        if (cumulPluie.checked) {
            extraInfo += `<p><strong>Cumul de pluie :</strong> ${meteoData.rr10} mm</p>`;
        }
        if (vent.checked) {
            extraInfo += `<p><strong>Vent moyen :</strong> ${meteoData.wind10m} km/h</p>`;
        }
        if (direcVent.checked) {
            extraInfo += `<p><strong>Direction du vent :</strong> ${meteoData.dirwind10m}°</p>`;
        }

        // Create and display the weather card
        const date = new Date();
        date.setDate(date.getDate() + j);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const weatherCard = new WeatherCard(date.toLocaleDateString('fr-FR', options), meteoData.tmin, meteoData.tmax, meteoData.probarain, meteoData.weather, meteoData.sun_hours, extraInfo);
        forecastContainer.appendChild(weatherCard.createCard());
    }
}

// Update the drop-down menu with city options
function mettreAJourMenu(valeurs) {
    menuDeroulant.innerHTML = '<option disabled selected>Choisissez une ville</option>'; // Reset menu

    if (valeurs.length === 0) { // If no cities are available, show a placeholder
        const option = document.createElement("option");
        option.textContent = "Aucune option disponible";
        option.disabled = true; // Disable the option
        menuDeroulant.appendChild(option);
    } else {
        valeurs.forEach(valeur => { // Add each city as an option
            const option = document.createElement("option");
            option.textContent = valeur;
            option.value = valeur;
            menuDeroulant.appendChild(option);
        });
    }
}

// Prevent non-numeric input in the postal code field
codePostalInput.addEventListener('keydown', function(event) {
    const key = event.key;

    // Allow only numeric input, backspace, tab, and arrow keys
    if (!/^[0-9]$/.test(key) &&
        key !== 'Backspace' &&
        key !== 'Tab' &&
        key !== 'ArrowLeft' &&
        key !== 'ArrowRight') {
        event.preventDefault(); // Block other inputs
    }
});

// Fetch and display city options when a valid postal code is entered
codePostalInput.addEventListener("input", async function() {
    const codePostal = codePostalInput.value;

    if (regexCodePostal.test(codePostal)) { // Validate the postal code
        const codes = await getCommunesByPostalCode(codePostal);

        valeursCommune = codes;
        menuDeroulant.style.display = "block";
        validerBtn.style.display = "block";
        checkboxes.style.display = "block";
        openModalBtn.style.display = "block";
        openModalBtn.style.margin = "20px auto";
        mettreAJourMenu(valeursCommune);  // Update the drop-down menu with city options
    } else {
        menuDeroulant.style.display = "none"; // Hide elements if the postal code is invalid
        openModalBtn.style.display = "none";
        validerBtn.style.display = "none";
        nvRech.style.display = "none";
        checkboxes.style.display = "none";
    }
});

// Handle the "Validate" button click and display the forecast
validerBtn.addEventListener("click", async function() {
    if (menuDeroulant.selectedIndex == 0) {
        alert("Veuillez choisir une option");
    } else {
        ville.innerText = menuDeroulant.value; // Display the selected city
        ville.style.display = "block";
        nvRech.style.display = "block";
        validerBtn.style.display = "none";
        menuDeroulant.style.display = "none";
        checkboxes.style.display = "none";
        openModalBtn.style.display = "none";
        codePostalInput.style.display = "none";
        forecastContainer.style.display = "flex";
        await afficherInformations(); // Display the weather forecast
    }
});

// Handle the "New Search" button click and reset the form
nvRech.addEventListener("click", function() {
    menuDeroulant.style.display = "none";
    nvRech.style.display = "none";
    validerBtn.style.display = "none";
    codePostalInput.value = "";
    ville.innerText = "";
    ville.style.display = "none";
    codePostalInput.style.display = "block";
    forecastContainer.style.display = "none";
});

// Show the modal when the settings button is clicked
openModalBtn.addEventListener("click", function() {
    modal.style.display = "block";
});

// Close the modal when the close button is clicked
closeModalBtn.addEventListener("click", function() {
    modal.style.display = "none";
});

// Close the modal if the user clicks outside of it
window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Prevent page reload on form submission
checkboxes.addEventListener("submit", function(event) {
    event.preventDefault(); // Stop the form from reloading the page
    modal.style.display = "none"; // Optionally close the modal after form submission
});
