console.log('inFileSvg.js >> V0.03.2.01');

actual_ver = "V0.03.2.0";

function obtenirTempsFormatte() {
    let date = new Date();
  
    let mois = ("0" + (date.getMonth() + 1)).slice(-2);
    let jour = ("0" + date.getDate()).slice(-2);
    let heures = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);
  
    let tempsFormatte = mois + "/" + jour + "-" + heures + ":" + minutes;
  
    return tempsFormatte;
} 

//Sauvegarde dans les fichiers
function svg_and_download() {
    let time = obtenirTempsFormatte();

    let donnees = {
        DT: "MiYT-inFile_Svg",
        saver_version: actual_ver,
        watch_id: id,
        plid: listID,
        pl_ctn: playlist,
        date: time
    };
  
    let donneesJSON = JSON.stringify(donnees);
  
    let blob = new Blob([donneesJSON], { type: "application/json" });
  
    let lienTelechargement = document.createElement("a");
    lienTelechargement.href = URL.createObjectURL(blob);
    lienTelechargement.download = "MiYT_save-" + time + ".φMi";
    lienTelechargement.classList.add('is-hidden');
    lienTelechargement.click();
}

// function setVarIfExist(val, var) {
    
// }

//Traiter selon les ver
function RestaureFromInFile(data) {
    if (data["saver_version"] == "V0.03.2.0") {
        if ("watch_id" in data){
            id = data["watch_id"];
        }
        if ("plid" in data){
            listID = data["plid"];
        }
        if ("pl_ctn" in data){
            playlist = data["pl_ctn"];
        }
    }

    if ($PLAYLIST_VIEW){
        plv_load_pict();
        plv_load_title();
    }
}

// Réstauration à partir des fichiers
function upload_and_rest(event) {
    
    let fichier = event.target.files[0];

    let lecteur = new FileReader();
    lecteur.onload = function(e) {
        let contenuFichier = e.target.result;
        let data_rest = JSON.parse(contenuFichier);

        if ("date" in data_rest && "saver_version" in data_rest) {
            let reponse = confirm("Souhaitez-vous la progression du " + data_rest["date"] + " ?");
            if (reponse) {
                RestaureFromInFile(data_rest);
            }
        }else{
            alert("Oops ! Votre fichier est invalide...");
        }

        
        // Effectuer les opérations de restauration avec les données
    };

    lecteur.readAsText(fichier);
}

// Écouter les changements de l'élément d'entrée de type "file"
let elementFichier = document.getElementById("RestFile");
elementFichier.addEventListener("change", upload_and_rest);

document.getElementById("SaveButton").onclick = () => {svg_and_download()};