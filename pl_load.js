console.log('PLLOAD ID01');

//Glbl Vars
if (typeof lcl_LOADED === 'undefined') {
    var lcl_LOADED = false;
}
if (typeof utilities_LOADED === 'undefined') {
    var utilities_LOADED = false;
}
var currentUrl = window.location.href;
var url = new URL(currentUrl);
var params = new URLSearchParams(url.search);
var listID = params.get("list");

var pl_txt = document.getElementById('my_playlist').innerHTML.trim();


function sendToServer(playlist_txt, listID, nb) {

    // Créez un formulaire dynamiquement
    var form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://miala.000webhostapp.com/YT/add.php';

    // Ajoutez les champs et leurs valeurs
    var champ1 = document.createElement('input');
    champ1.type = 'hidden';
    champ1.name = 'playlist';
    champ1.value = playlist_txt;
    form.appendChild(champ1);

    var champ2 = document.createElement('input');
    champ2.type = 'hidden';
    champ2.name = 'nb';
    champ2.value = nb;
    form.appendChild(champ2);

    var champ3 = document.createElement('input');
    champ3.type = 'hidden';
    champ3.name = 'listID';
    champ3.value = listID;
    form.appendChild(champ3);

    pl_name = document.getElementById("pl_name")
    if (pl_name && pl_name != "") {

        var champ4 = document.createElement('input');
        champ4.type = 'hidden';
        champ4.name = 'name';
        champ4.value = pl_name.innerText.trim().replace(/\s*\[\d+\]$/g, "");
        form.appendChild(champ4);
    }

    // Soumettez le formulaire dans le popup
    var popup = window.open('', 'serv', 'width=100,height=100,popup');
    popup.onload = function () {
        setTimeout(() => {
            popup.close();
        }, 1000);
    };

    form.target = 'serv';
    popup.document.body.appendChild(form);
    form.submit();
}

function shuffleAsk() {
    // #ranQ?
    var reponse = confirm("Lecture de la playlist en mode aléatoire ?\nOK = Oui | Annuler = Non");

    if (reponse) {
        my_playlist = shuffleArray(my_playlist);
    }
}
