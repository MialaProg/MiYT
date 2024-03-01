console.log('YT.js >> V2.02.27');

var player = false;
if (typeof $LOCAL_STORAGE === 'undefined') {
    var $LOCAL_STORAGE = false;
}
var lcl_pl_id = NaN;

var id = 0; ///-
var id_played = 0;

var currentUrl = window.location.href;
var url = new URL(currentUrl);
var params = new URLSearchParams(url.search);
var listID = params.get("list");

var my_playlist_txt = document.getElementById('my_playlist').innerHTML.trim();
var my_playlist = my_playlist_txt.split(';');

var checkbox_nopause = document.getElementById("PauseForbidSw");
var nopause = 0;

function sendToServer(playlist_txt, listID, nb) {



    // Créez un formulaire dynamiquement
    var form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://yt.mi.42web.io/add.php';

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

    try {
        pl_name = document.getElementById("pl_name").innerText
        if (pl_name != "") {

            var champ4 = document.createElement('input');
            champ4.type = 'hidden';
            champ4.name = 'name';
            champ4.value = pl_name.trim().replace(/\s*\[\d+\]$/g, "");
            form.appendChild(champ4);
        }

    } catch (error) {

    }

    // Soumettez le formulaire dans le popup
    var popup = window.open('', 'Lecteur MiYT | Connexion au serveur...', 'width=7,height=7');
    form.target = 'Lecteur MiYT | Connexion au serveur...';
    popup.document.body.appendChild(form);
    form.submit();

    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', 'https://yt.mi.42web.io/add.php');
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // const data = `playlist=${playlist_txt}&nb=${nb}&listID=${listID}&name=${document.querySelector("title").innerHTML}`;
    // xhr.send(data);

    // xhr.onload = function () {
    //     if (xhr.status === 200) {
    //         console.log(xhr.responseText);
    //     } else {
    //         console.error('Error:', xhr.statusText);
    //     }
    // };

    // xhr.onerror = function () {
    //     console.error('Network error');
    // };

}

function shuffleArray(arr) {
    // arr.sort(() => Math.random() - 0.5);

    // Copie de arr
    var arr1 = arr.slice();
    // Créer un tableau vide pour contenir les éléments mélangés
    var arr2 = [];

    let len = arr1.length;
    // Pour chaque élément du tableau d'origine
    for (let i = 0; i < len; i++) {
        // Générer un nombre aléatoire entre 0 et la longueur du tableau moins i
        const y = Math.floor(Math.random() * (len - i));

        // Ajouter l'élément i du tableau d'origine au tableau mélangé
        arr2.push(arr1[y]);

        // Supprimer l'élément i du tableau d'origine
        arr1.splice(y, 1);
    }

    // Retourner le tableau mélangé
    arr = arr2;
    return arr;
}

function shuffleAsk() {
    // #ranQ?
    var reponse = confirm("Lecture de la playlist en mode aléatoire ?\nOK = Oui | Annuler = Non");

    if (reponse) {
        my_playlist = shuffleArray(my_playlist);
    }
}

checkbox_nopause.addEventListener("change", function () {
    nopause = checkbox_nopause.checked;
});

function onPlayerReady(event) {
    console.log(event, ': Player Ready => ', player);
    event.target.playVideo();
    player.playVideo();
}

function changeVideo(vid_id) {
    console.log("VidChg: " + vid_id);
    player.pauseVideo();
    id_played = id;
    player.loadVideoById(vid_id);
    player.playVideo();
    document.title = 'MialaMusic Playlist Randomer';
    document.getElementById('infos_vid').innerText = 'Chargement... (ID: ' + vid_id + ' #' + id + ') - MialaMusic Playlist Randomer';
    // window.history.pushState(null, '', '/YT/watch.php?idx=' + id);

    if ($LOCAL_STORAGE && !isNaN(lcl_pl_id)) {
        lcl_save_IN_list('watch_id', id, lcl_pl_id);
    }
}

function prev() {
    id -= 1;
    if (id < 0) {
        alert("Début de la playlist.");
        id = 0;
    }
    changeVideo(my_playlist[id]);
}

function next() {
    id += 1;
    if (id >= my_playlist.length) {
        // window.location.href = "end.php?v=js";
        window.stop();
        alert("Fin de la playlist.");
        window.location.href = "https://miala.000webhostapp.com/YT?todo=end&list=" + listID;
    } else {
        changeVideo(my_playlist[id]);
    }
}

document.getElementById('prev_btn').onclick = function () { prev() };
document.getElementById('next_btn').onclick = function () { next() };


// 2. Écoutez l'événement onStateChange
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        next();
    } else {
        clear_pubs();
    }
}

var pageUpdate_i = 0;

function pageUpdate() {
    //currentState : 
    //-1: Non initialisé
    // 0: Terminé
    // 1: En lecture
    // 2: En pause
    // 3: En file d’attente
    // 5: Vidéo en file d’attente interrompue

    if (id_played != id) {
        changeVideo(my_playlist[id]);
    }

    let currentTime = player.getCurrentTime();
    let currentState = player.getPlayerState();

    // En lecture, toutes les 5s. Sinon: ttes les secondes
    if (pageUpdate_i == 4 || currentState != 1 || currentTime < 5) {
        pageUpdate_i = 0;

        var duration = player.getDuration();

        console.log('Page update: ' + currentTime + '/' + duration + ' => ' + currentState);

        var video_title = player.getVideoData().title;

        if (currentTime < 10) {
            if (video_title != '') {
                document.title = video_title + ' | MialaMusic';
                document.getElementById('infos_vid').innerText = video_title + ' (ID: ' + player.getVideoData().video_id + ' #' + id + ') - MialaMusic';
            }
        }

        if (currentState === 0) {
            next();
        } else if (currentState === 1 && duration > 30) {
            if (currentTime > (duration - 2)) {
                next();
            }
        } else if (currentTime < 2) {

            console.log('Try play');
            player.playVideo();


            currentState = player.getPlayerState();

            if (currentState !== 1) {
                console.log('Clicked');

                // console.log(currentState === -1 && video_title == '');
                if (currentState === -1 && video_title == '') {
                    console.log('Video Indispo, next');
                    next();
                }

                // console.log(document.getElementsByClassName('ytp-button')[0]);
                document.getElementsByClassName('ytp-button')[0].click();
                // document.getElementsByClassName('ytp-play-button')[0].click();
            }


        } else if (currentState === 2 && nopause == 1) {
            player.playVideo();
        }

    } else {
        pageUpdate_i += 1;
    }
}
// <iframe id="player" frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" title="Chargement en cours..." width="640" height="360" 
// src=https://www.youtube.com/embed/IkMx-PY6XZY?enablejsapi=1&amp;origin=https%3A%2F%2Fmiala.000webhostapp.com&amp;widgetid=1"></iframe>

function onERR() {
    let currentState = player.getPlayerState();
    let video_title = player.getVideoData().title;
    if (currentState === -1 && video_title != '') {
        console.log('Video ERR, next');
        next();
    }
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: my_playlist[id],
        playerVars: { 'autoplay': 1, 'picture-in-picture': 1 },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onERR
        },
        controlslist: ["previous", "playpause", "next", "mute", "volume", "fullscreen", "pip"],
    });



    player.addEventListener("controls", () => {
        if (player.controls.playButton.classList.contains("active")) {
            nopause = 0;
            checkbox_nopause.checked = 0;
        } else if (player.controls.nextButton.classList.contains("active")) {
            // L'utilisateur a cliqué sur le bouton suivant.
            next();
        } else if (player.controls.previousButton.classList.contains("active")) {
            prev()
        }
    });

    console.log(player);

    setInterval(pageUpdate, 1000);

}

// $host_msg = document.querySelector('[title="Hosted on free web hosting 000webhost.com. Host your own website for FREE."]')
// if ($host_msg != null) {
//     $host_msg.parentNode.removeChild($host_msg);
// }

function waitLoad() {
    if (player) {
        return 'Player already created';
    }
    try {

        if (YT.loaded === 1) {
            console.log('YTiframe API ready !');
            onYouTubeIframeAPIReady();
            return 'Player created';
        } else {
            console.log('Wait for YTiframe API...');
            // Appel récursif avec un délai d'attente de 1 seconde
            setTimeout(function () {
                waitLoad();
            }, 1000);
        }

    } catch (error) {
        console.log('Wait for iframe_api.js run...');
        setTimeout(function () {
            waitLoad();
        }, 2000);
    }
}

// Show a play/pause button in the Picture-in-Picture window
navigator.mediaSession.setActionHandler('play', function () {
    nopause = 1;
    checkbox_nopause.checked = 1;
    player.playVideo();
});
navigator.mediaSession.setActionHandler('pause', function () {
    nopause = 0;
    checkbox_nopause.checked = 0;
    player.pauseVideo();
});
navigator.mediaSession.setActionHandler('previoustrack', function () {
    prev();
});

navigator.mediaSession.setActionHandler('nexttrack', function () {
    next();
});

console.log(waitLoad());


document.getElementById('reset_btn').onclick = function () {
    var reponse = confirm("Souhaitez-vous réinitialiser les progressions pour toutes les listes de lecture ?\nPS: Autorisez les popups pour que cela fonctionne.");
    let list_length = my_playlist.length;

    if (reponse) {
        lcl_rmv_all();
        sendToServer(my_playlist_txt, listID, list_length);
        window.location.href = "https://yt.mi.42web.io/load.php?list=" + listID;
    }
};



var waitLibI = 0; //end if too much

// Attente du chargement des bibliothèques externes: lcl, ...
function waitLib() {

    waitLibI += 1;

    console.log("WaitLib... 11/" + waitLibI)

    var lcl_REPRISE = false;


    if ($LOCAL_STORAGE || waitLibI == 11) {

        if ($LOCAL_STORAGE) {
            let list_pl_id = lcl_load_list('plid');
            let lcl_pl_id = list_pl_id.indexOf(listID);

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
                    my_playlist = pl_ctn ? pl_ctn : my_playlist;
                } catch (error) { }
            } else {
                shuffleAsk();
                lcl_save_IN_list('plid', listID, lcl_pl_id);
                lcl_save_LIST_IN_list('pl_ctn', my_playlist, lcl_pl_id);
                lcl_save_IN_list('watch_id', 0, lcl_pl_id);
            }

        }

        let list_length = my_playlist.length;
        if (list_length > 1) {
            if (!$LOCAL_STORAGE) { shuffleAsk(); }

            sendToServer(my_playlist_txt, listID, list_length);
            try {
                document.getElementById('pllink').setAttribute("href", "https://www.youtube.com/playlist?list=" + listID);
            } catch (error) { }
        }

        id_played = id + 1;

        document.getElementById('inProgress').remove();
    } else {

        document.getElementById('loading_progress').setAttribute("value", waitLibI * 100);
        setTimeout(waitLib, waitLibI * 100);
    }

}

waitLib();