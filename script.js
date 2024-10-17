const token = 'cf7c01dc60d6008455c0c8715a6337e049478ae675a65ab7287e7bf76b1dd5d7'
const codePostalInput = document.getElementById("postal-code");
const menuDeroulant = document.getElementById("menuDeroulant");
const nbJours = document.getElementById("nbJours");
const regexCodePostal = /^\d{5}$/;
const validerBtn = document.getElementById("valider-btn");
const tmin = document.getElementById("temp-min");
const tmax = document.getElementById("temp-max");
const rainProba = document.getElementById("rain-probability");
const sunshine = document.getElementById("sunshine");
const nvRech = document.getElementById("nv_rech");
const checkboxes = document.querySelector('.checkboxes');
const latitude = document.getElementById("latitude");
const longitude = document.getElementById("longitude");
const cumulPluie = document.getElementById("cumul-pluie");
const vent = document.getElementById("vent");
const direcVent = document.getElementById("direction-vent");
const ville = document.getElementById("ville");
const forecastContainer = document.getElementById("forecast-container");


class WeatherCard {
    constructor(day, tmin, tmax, rainProba, weatherCode, sunshine, extraInfo = '') {
        this.day = day;
        this.tmin = tmin;
        this.tmax = tmax;
        this.rainProba = rainProba;
        this.sunshine = sunshine;
        this.weatherCode = weatherCode;
        this.extraInfo = extraInfo;
    }

    getWeatherIcon() {
        const iconFile = iconMap[this.weatherCode] || 'day.svg';  // Icône par défaut: journée ensoleillée
        return `<img src="icons/${iconFile}" alt="Weather Icon" class="weather-icon">`;
    }

    createCard() {
        const card = document.createElement('div');
        card.className = 'weather-card';

        const weatherIcon = this.getWeatherIcon();
        
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



// Fonction pour récupérer les communes en fonction d'un code postal
async function getCommunesByPostalCode(codePostal) {
    const url = `https://geo.api.gouv.fr/communes?codePostal=${codePostal}`;
    let tab = []
    try {
        const response = await fetch(url);
        const data = await response.json();
            console.log("Communes:", data); // Affiche les communes dans la console
            tab = data.map(commune => commune.nom);
        console.log("Noms des communes:", tab);
        
        return tab; // Retourne le tableau des noms)
            
        
        }
        catch{(error => console.error("Erreur lors de la récupération des communes:", error))};      
        
}

async function getCommunesByName(name) {
    const url = `https://api.meteo-concept.com/api/location/cities?token=cf7c01dc60d6008455c0c8715a6337e049478ae675a65ab7287e7bf76b1dd5d7&search=${name}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.cities[0].insee)
        return data.cities[0].insee; // Retourne le tableau des noms)
        
        }
        catch{(error => console.error("Erreur lors de la récupération des communes:", error))};      
        
}

async function getMeteoData(code, i) {
        
    const urlmeteo = `https://api.meteo-concept.com/api/forecast/daily?token=cf7c01dc60d6008455c0c8715a6337e049478ae675a65ab7287e7bf76b1dd5d7&insee=${code}`;
    try {
        const response = await fetch(urlmeteo);
        const data = await response.json();
        console.log(data)
        return data.forecast[i];
        }   
        
        catch{(error => console.error("Erreur lors de la récupération des temps:", error))}

    
}

async function afficherInformations() {
    let selectedCommune = menuDeroulant.value;
    if (!selectedCommune) {
        alert("Veuillez sélectionner une commune.");
        return;
    }
    const insee = await getCommunesByName(selectedCommune);
    forecastContainer.innerHTML = '';  // Clear previous results

    const nbJoursValue = nbJours.value;
    for (let j = 0; j < nbJoursValue; j++) {
        const meteoData = await getMeteoData(insee, j);

        // Gather extra info if checkboxes are selected
        let extraInfo = '';
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

        // Create a new WeatherCard instance and add it to the forecast container
        const date = new Date();
        date.setDate(date.getDate()+j);
        const options = { weekday: 'long', year: 'numeric', month:'long', day: 'numeric'};
        const weatherCard = new WeatherCard(date.toLocaleDateString('fr-FR',options), meteoData.tmin, meteoData.tmax, meteoData.probarain,meteoData.weather, meteoData.sun_hours, extraInfo);
        forecastContainer.appendChild(weatherCard.createCard());
    }

}



 
// Fonction pour mettre à jour les options du menu déroulant <select>
function mettreAJourMenu(valeurs) {
    // Efface les anciennes options
    menuDeroulant.innerHTML = '<option disabled selected>Choisissez une ville</option>';

    // Si le tableau est vide, ajoute une option "Aucune option"
    if (valeurs.length === 0) {
        const option = document.createElement("option");
        option.textContent = "Aucune option disponible";
        option.disabled = true; // Désactiver l'option
        menuDeroulant.appendChild(option);
    } else {
        // Ajoute chaque valeur comme une option dans le menu déroulant
        valeurs.forEach(valeur => {
            const option = document.createElement("option");
            option.textContent = valeur;
            option.value = valeur; // La valeur de l'option
            menuDeroulant.appendChild(option);
        });
    }
}

function mettreAJournbJours() {
    // Efface les anciennes options
    nbJours.innerHTML = '<option disabled selected>Choisissez un nombre de jours</option>';

    // Si le tableau est vide, ajoute une option "Aucune option"
    for( let i=1; i<8; i++){
        const option = document.createElement("option");
        option.textContent =  i;
        nbJours.appendChild(option);
    }
}

// Bloquer l'entrée des lettres et des caractères spéciaux
codePostalInput.addEventListener('keydown', function(event) {
    const key = event.key;

    // Autoriser uniquement les touches numériques, Backspace, Tab, et les flèches
    if (!/^[0-9]$/.test(key) &&
        key !== 'Backspace' &&
        key !== 'Tab' &&
        key !== 'ArrowLeft' &&
        key !== 'ArrowRight') {
        event.preventDefault(); // Empêcher l'entrée de caractères non autorisés
    }
});


codePostalInput.addEventListener("input", async function() {
    const codePostal = codePostalInput.value;
    // Si l'input correspond à un code postal valide
    if (regexCodePostal.test(codePostal)) {
        const codes = await getCommunesByPostalCode(codePostal)
        console.log(codes)
        valeursCommune = codes ;
        menuDeroulant.style.display = "block";
        nbJours.style.display = "block";
        validerBtn.style.display="block";
        checkboxes.style.display = "block";
        // Mettre à jour le menu déroulant avec les options (actuellement vide)
        mettreAJourMenu(valeursCommune);  // Utilise les données du tableau 
        mettreAJournbJours();
    } else {
        menuDeroulant.style.display = "none";
        validerBtn.style.display="none";
        nvRech.style.display="none";
        nbJours.style.display = "none";
        checkboxes.style.display = "none";
    }
});

validerBtn.addEventListener("click",async function() {
    if(menuDeroulant.selectedIndex==0){
        alert("Veuillez choisir une option");
    }
    else{
        ville.innerText = menuDeroulant.value;
        ville.style.display="block";
        nvRech.style.display="block";
        validerBtn.style.display="none";
        menuDeroulant.style.display = "none";
        nbJours.style.display = "none";
        checkboxes.style.display = "none";
        codePostalInput.style.display="none";
        forecastContainer.style.display="flex";
        await afficherInformations();
    }
})

nvRech.addEventListener("click", async function(){
    menuDeroulant.style.display = "none";
    nvRech.style.display="none";
    validerBtn.style.display="none";
    codePostalInput.value="";
    nbJours.style.display = "none";
    ville.innerText = ""; 
    ville.style.display="none";
    codePostalInput.style.display="block";
    codePostalInput.style.margin = "20px auto";
    forecastContainer.style.display="none";
})



  
    


    
