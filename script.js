const token = 'cf7c01dc60d6008455c0c8715a6337e049478ae675a65ab7287e7bf76b1dd5d7'

// Fonction pour récupérer les communes en fonction d'un code postal
async function getCommunesByPostalCode(codePostal) {
    let code_return = 0 ;
    const url = `https://geo.api.gouv.fr/communes?codePostal=${codePostal}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
            console.log("Communes:", data); // Affiche les communes dans la console
        
            code_return  = data[0].code;
            return code_return
        
        }
        catch{(error => console.error("Erreur lors de la récupération des communes:", error))};      
        
}


async function getcodeByCommune(code) {
    
    const urlmeteo = `https://api.meteo-concept.com/api/location/city?token=cf7c01dc60d6008455c0c8715a6337e049478ae675a65ab7287e7bf76b1dd5d7&insee=${code}`;
    try {
        const response = await fetch(urlmeteo);
        const data = await response.json();
        console.log('______________________________________')
            console.log("Temps:", data); // Affiche les communes dans la console
        
        }
        catch{(error => console.error("Erreur lors de la récupération des temps:", error))}

}

async function main(){
    const code =  await getCommunesByPostalCode('14610')
    getcodeByCommune(code); // Appel de la fonction météo avec le code INSEE
}

main()

  
    


    



