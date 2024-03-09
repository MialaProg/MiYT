console.log('PLLOAD ID43');

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
var playlist = pl_txt.split(';');

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

function rsrcLoaded_pl_load() {
    console.log('Une ressource à été chargée <= PlLoad');
}

function sendToServer(playlist_txt, listID, nb) {
    let http = new XMLHttpRequest();
    let url = 'https://yt.mi.42web.io/add.php';
    let params = `playlist=${playlist_txt}&nb=${nb}&listID=${listID}&noRedir`;

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
    var reponse = confirm("Souhaitez-vous réinitialiser les progressions pour toutes les listes de lecture et vidéos ?\nPS: Autorisez les popups pour que cela fonctionne.");
    let list_length = playlist.length;

    if (reponse) {
        lcl_rmv_all();
        sendToServer(pl_txt, listID, list_length);
        window.location.href = "https://yt.mi.42web.io/load.php?list=" + listID;
    }
};

window.addEventListener('resize', function() {
    // Code à exécuter lorsque la fenêtre est redimensionnée  
    let playerIframe = document.getElementById('player');
    let playerBox_width = document.getElementById('player-box').offsetWidth ;
    playerIframe.width = playerBox_width;
    playerIframe.height = playerBox_width * 360 / 640;

});

// Attente du chargement des bibliothèques externes: lcl, ...
function waitLib() {

    waitLibI += 1;

    console.log("WaitLib... 11\\" + waitLibI)

    var lcl_REPRISE = false;

    if (($LOCAL_STORAGE && $UTILITIES) || waitLibI == 11) {


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
    } else {

        document.getElementById('loading_progress').setAttribute("value", waitLibI * 100);
        setTimeout(waitLib, waitLibI * 100);
    }

}

waitLib();