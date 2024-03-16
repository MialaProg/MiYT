console.log('PLLOAD v¤>44<');

//Perma data
var ytb_outro_pass = {
    //url : secondes d'outro
    "https://www.youtube.com/@originalsoundtrack4548": 30
};

//Glbl Vars
if (typeof $SCANNED === 'undefined') {
    var $SCANNED = false;
}
if (typeof $LOCAL_STORAGE === 'undefined') {
    var $LOCAL_STORAGE = false;
}
if (typeof $UTILITIES === 'undefined') {
    var $UTILITIES = false;
}
if (typeof $PLAYLIST_VIEW === 'undefined') {
    var $PLAYLIST_VIEW = false;
}
var pl_view_active = false;
var lcl_vid_id = false;
var vid_pgs = false;

var currentUrl = window.location.href;
var url = new URL(currentUrl);
var params = new URLSearchParams(url.search);
var listID = params.get("list");

var id = 0;
var pl_txt = document.getElementById('my_playlist').innerHTML.trim();

var pl_name = document.getElementById("pl_name");
var playlist = false;

var outro_skip = true;
var outro_skip_time = 1;
var checkbox_skip = document.getElementById("SkipOutroSw");
checkbox_skip.addEventListener("change", function () {
    outro_skip = checkbox_skip.checked;
    outro_skip_time = 1;
});

var LoopPlay = false;
var checkbox_loop = document.getElementById("LoopPlaySw");
checkbox_loop.addEventListener("change", function () {
    LoopPlay = checkbox_loop.checked;
});

var lcl_pl_id = NaN;


var waitLibI = 0; //end if too much

function checkJSONerror(data) {
    if (data.error) {
        return [data.error.code, data.error.message, data.error.status]
    }
    return false;
}

function rsrcLoaded_pl_load() {
    console.log('Une ressource à été chargée <= PlLoad');
}

function sendToServer(playlist_txt, listID, nb) {

    // Fonction pour obtenir la date de la dernière modification d'une playlist YouTube
    fetch(`https://yt.lemnoslife.com/noKey/playlists?part=snippet&id=${listID}`)
        .then((response) => response.json())
        .then((data) => {
            let error = checkJSONerror(data);
            if (error){
                alert(`Sauvergarde serveur impossible. Code erreur 75-${error[0]} : ${error[1]}`);
                return error[2];
            }
            // Extraire la date de la dernière modification
            let publishedAt = data.items[0].snippet.publishedAt;
            // Convertir la date en temps Unix
            let unixTime = Date.parse(publishedAt) / 1000;

            let http = new XMLHttpRequest();
            let url = 'https://yt.mi.42web.io/add.php';
            let params = `playlist=${playlist_txt}&nb=${nb}&listID=${listID}&time=` + unixTime;

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
        });
}

function shuffleAsk() {
    // #ranQ?
    var reponse = confirm("Lecture de la playlist en mode aléatoire ?\nOK = Oui | Annuler = Non");

    if (reponse) {
        playlist = shuffleArray(playlist);
    }
}

document.getElementById('reset_btn').onclick = function () {
    var reponse = confirm("Souhaitez-vous réinitialiser les progressions pour toutes les listes de lecture et vidéos ?\nPS: Autorisez les popups pour que cela fonctionne.");
    let list_length = playlist.length;

    if (reponse) {
        lcl_rmv_all();
        sendToServer(pl_txt, listID, list_length);
        window.location.href = "https://yt.mi.42web.io/www.php?list=" + listID;
    }
};

window.addEventListener('resize', function () {
    // Code à exécuter lorsque la fenêtre est redimensionnée  
    let playerIframe = document.getElementById('player');
    let playerBox_width = document.getElementById('player-box').offsetWidth;
    playerIframe.width = playerBox_width;
    playerIframe.height = playerBox_width * 360 / 640;

});

// Attente du chargement des bibliothèques externes: lcl, ...
function waitLib() {

    waitLibI += 1;

    console.log("WaitLib... 11\\" + waitLibI)

    var lcl_REPRISE = false;

    if (($LOCAL_STORAGE && $UTILITIES) || waitLibI == 11) {
        //setTimeout(plv_load, 5);

        if ($LOCAL_STORAGE) {
            let list_pl_id = lcl_load_list('plid');
            lcl_pl_id = list_pl_id.indexOf(listID);

            if (lcl_pl_id != -1) {
                lcl_REPRISE = $SCANNED ? confirm("Reprendre où vous en étiez ?\nOK = Oui | Annuler = Non") : false;
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
            if (!$LOCAL_STORAGE) { shuffleAsk(); }

            sendToServer(pl_txt, listID, list_length);
            //pl_load#151-2857
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
        document.getElementById('pageContent').classList.remove('is-hidden');
    } else {

        document.getElementById('loading_progress').setAttribute("value", (90 + waitLibI).toString());
        setTimeout(waitLib, waitLibI * 100);
    }

}




if (pl_txt == 'toBEloaded') {
    async function getPlaylistItems(playlistId) {
        let MAX_RESULTS = 50;
        let baseUrl = "https://yt.lemnoslife.com/noKey/playlistItems";
        let params = {
            part: "contentDetails",
            playlistId: playlistId,
            maxResults: MAX_RESULTS,
        };

        let allItems = [];
        let nextPageToken;
        let req_i = 0;


        do {
            let plgeturl = `${baseUrl}?${new URLSearchParams(params)}`;
            // console.log(plgeturl);
            let response = await fetch(plgeturl);
            let data = await response.json();

            if (response.ok) {
                // console.log(data);
                allItems = allItems.concat(data.items.map((item) => item.contentDetails.videoId));
                nextPageToken = data.nextPageToken;

                // Mettre à jour les paramètres pour la prochaine requête
                params.pageToken = nextPageToken;

                document.getElementById('loading_progress').setAttribute("value", parseInt((req_i / data.pageInfo.totalResults) * 100).toString());
            } else {
                // Gérer l'erreur
                console.error("Une erreur est survenue: ", data.error);
                return;
            }
        } while (nextPageToken);

        return allItems;
    }

    getPlaylistItems(listID).then((items) => {
        playlist = items;
        pl_txt = items.join(';');
        waitLib();
    });

    //   Explication du code:
    // La fonction getPlaylistItems prend en paramètre l'ID de la playlist YouTube.
    // On définit une letante MAX_RESULTS pour limiter le nombre de résultats par requête.
    // On letruit l'URL de base de l'API avec les paramètres part, playlistId et maxResults.
    // On utilise une boucle do...while pour itérer sur les pages de résultats.
    // Dans la boucle, on fait une requête à l'API et on récupère les ID des vidéos (items.etag).
    // Si la requête est un succès, on stocke les ID des vidéos et on récupère le nextPageToken pour la prochaine page.
    // Si la requête échoue, on affiche un message d'erreur.
    // On retourne la liste des ID des vidéos une fois la boucle terminée.
} else {
    // take playlist from the server return
    playlist = pl_txt.split(';');
    waitLib();
}


// toBEloaded
