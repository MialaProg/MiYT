console.log('PLLOAD ID09');

//Glbl Vars
if (typeof lcl_LOADED === 'undefined') {
    var lcl_LOADED = false;
}
if (typeof utilities_LOADED === 'undefined') {
    var utilities_LOADED = false;
}
if (typeof sV === 'undefined') {
    var sV = false;
}
var pl_view = false;
var pl_view_active = false;

var currentUrl = window.location.href;
var url = new URL(currentUrl);
var params = new URLSearchParams(url.search);
var listID = params.get("list");

var id = 0;
var pl_txt = document.getElementById('my_playlist').innerHTML.trim();
var playlist = pl_txt.split(';');

var lcl_pl_id = NaN;

var waitLibI = 0; //end if too much

function rsrcLoaded_pl_load() {
    console.log('Une ressource à été chargée <= PlLoad');
}

function sendToServer(playlist_txt, listID, nb) {

    // // Créez un formulaire dynamiquement
    // var form = document.createElement('form');
    // form.method = 'POST';
    // form.action = 'https://miala.000webhostapp.com/YT/add.php';

    // // Ajoutez les champs et leurs valeurs
    // var champ1 = document.createElement('input');
    // champ1.type = 'hidden';
    // champ1.name = 'playlist';
    // champ1.value = playlist_txt;
    // form.appendChild(champ1);

    // var champ2 = document.createElement('input');
    // champ2.type = 'hidden';
    // champ2.name = 'nb';
    // champ2.value = nb;
    // form.appendChild(champ2);

    // var champ3 = document.createElement('input');
    // champ3.type = 'hidden';
    // champ3.name = 'listID';
    // champ3.value = listID;
    // form.appendChild(champ3);

    // pl_name = document.getElementById("pl_name")
    // if (pl_name && pl_name != "") {

    //     var champ4 = document.createElement('input');
    //     champ4.type = 'hidden';
    //     champ4.name = 'name';
    //     champ4.value = pl_name.innerText.trim().replace(/\s*\[\d+\]$/g, "");
    //     form.appendChild(champ4);
    // }

    // // Soumettez le formulaire dans le popup
    // var popup = window.open('', 'serv', 'width=100,height=100,popup');
    // popup.onload = function () {
    //     setTimeout(() => {
    //         popup.close();
    //     }, 1000);
    // };



    let http = new XMLHttpRequest();
    let url = 'https://miala.000webhostapp.com/YT/add.php';
    let params = `playlist=${playlist_txt}&nb=${nb}&listID=${listID}`;

    pl_name = document.getElementById("pl_name")
    if (pl_name && pl_name != "") {
        params += '&name=' + pl_name.innerText.trim().replace(/\s*\[\d+\]$/g, "");
    }

    http.open('POST', url, true);
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = function () {//Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            console.log('Server status 200 OK');
        } else {
            console.log('Server status ' + http.status + ' ERR');
        }
    }
    http.send(params);
}

function shuffleAsk() {
    // #ranQ?
    var reponse = confirm("Lecture de la playlist en mode aléatoire ?\nOK = Oui | Annuler = Non");

    if (reponse) {
        playlist = shuffleArray(playlist);
    }
}

document.getElementById('reset_btn').onclick = function () {
    var reponse = confirm("Souhaitez-vous réinitialiser les progressions pour toutes les listes de lecture ?\nPS: Autorisez les popups pour que cela fonctionne.");
    let list_length = playlist.length;

    if (reponse) {
        lcl_rmv_all();
        sendToServer(pl_txt, listID, list_length);
        window.location.href = "https://miala.000webhostapp.com/YT/load.php?list=" + listID;
    }
};

// Attente du chargement des bibliothèques externes: lcl, ...
function waitLib() {

    waitLibI += 1;

    console.log("WaitLib... 11\\" + waitLibI)

    var lcl_REPRISE = false;

    if ((lcl_LOADED && utilities_LOADED) || waitLibI == 11) {


        if (lcl_LOADED) {
            let list_pl_id = lcl_load_list('plid');
            lcl_pl_id = list_pl_id.indexOf(listID);

            if (lcl_pl_id != -1) {
                lcl_REPRISE = confirm("Reprendre où vous en étiez ?\nOK = Oui | Annuler = Non");
            } else {
                lcl_pl_id = list_pl_id.length;
            }
            if (lcl_REPRISE) {
                try {
                    let watch_id = lcl_load_list('watch_id')[lcl_pl_id];
                    id = parseInt(watch_id) ? watch_id : 0;
                    let pl_ctn = lcl_load_LIST_IN_list('pl_ctn', lcl_pl_id);
                    playlist = pl_ctn ? pl_ctn : playlist;
                } catch (error) { }
            } else {
                shuffleAsk();
                lcl_save_IN_list('plid', listID, lcl_pl_id);
                lcl_save_LIST_IN_list('pl_ctn', playlist, lcl_pl_id);
                lcl_save_IN_list('watch_id', 0, lcl_pl_id);
            }

        }

        let list_length = playlist.length;
        if (list_length > 1) {
            if (!lcl_LOADED) { shuffleAsk(); }

            sendToServer(pl_txt, listID, list_length);
            let pl_link = document.getElementById('pllink');
            if (pl_link) {
                pl_link.setAttribute("href", "https://www.youtube.com/playlist?list=" + listID);
            }
        }

        // => pl_load
        let js = document.createElement("script");
        js.type = "text/javascript";
        js.src = "https://mialaprog.github.io/MiYT/loop.js";
        js.onreadystatechange = rsrcLoaded_pl_load;
        js.onload = rsrcLoaded_pl_load;
        js.id = "MiYTloop";
        //Ajout de la balise dans la page
        document.body.appendChild(js);

        js2 = document.createElement("script");
        js2.type = "text/javascript";
        js2.src = "https://mialaprog.github.io/MiYT/lib/pl_view.js";
        js2.onreadystatechange = rsrcLoaded_pl_load;
        js2.onload = rsrcLoaded_pl_load;
        js2.id = "MiPlViewer";
        //Ajout de la balise dans la page
        document.body.appendChild(js2);

        document.getElementById('inProgress').remove();
    } else {

        document.getElementById('loading_progress').setAttribute("value", waitLibI * 100);
        setTimeout(waitLib, waitLibI * 100);
    }

}

waitLib();