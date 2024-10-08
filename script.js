const token = 'cf7c01dc60d6008455c0c8715a6337e049478ae675a65ab7287e7bf76b1dd5d7'

// Fonction pour récupérer les communes en fonction d'un code postal
async function getCommunesByPostalCode(codePostal) {
    let code_return = 0 ;
    const url = `https://geo.api.gouv.fr/communes?codePostal=${codePostal}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
            console.log("Communes:", data); // Affiche les communes dans la console
            
            return data[0].code;
        
        }
        catch{(error => console.error("Erreur lors de la récupération des communes:", error))};      
        
}

async function getTemp(code) {
        
    const urlmeteo = `https://api.meteo-concept.com/api/forecast/daily/0?token=cf7c01dc60d6008455c0c8715a6337e049478ae675a65ab7287e7bf76b1dd5d7&insee=${code}`;
    try {
        const response = await fetch(urlmeteo);
        const data = await response.json();
        console.log('______________________________________')
            console.log("Temps:", data); // Affiche les communes dans la console
            let tab = [ data.forecast.tmin , data.forecast.tmax ]

            return tab
        }
        
        catch{(error => console.error("Erreur lors de la récupération des temps:", error))}

    
}
 

async function main(){
    const code =  await getCommunesByPostalCode('14610')

    let tab = await getTemp(code)
    console.log(tab)

}

main()

const codePostalInput = document.getElementById("postal-code");
const menuDeroulant = document.getElementById("menuDeroulant");
const regexCodePostal = /^\d{5}$/;


// Tableau vide pour les valeurs (remplis plus tard avec des valeurs)
let valeursCommune = ["Commune 1", "Commune 2", "Commune 3"]; // Exemples fictifs
// Fonction pour mettre à jour les options du menu déroulant <select>
function mettreAJourMenu(valeurs) {
    // Efface les anciennes options
    menuDeroulant.innerHTML = '<option disabled selected>Choisissez une option</option>';

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


codePostalInput.addEventListener("input", function() {
    const codePostal = codePostalInput.value;
    // Si l'input correspond à un code postal valide
    if (regexCodePostal.test(codePostal)) {
        menuDeroulant.style.display = "block";
        // Mettre à jour le menu déroulant avec les options (actuellement vide)
        mettreAJourMenu(valeursCommune);  // Utilise les données du tableau
    } else {
        menuDeroulant.style.display = "none";
    }
});



  
    


    
