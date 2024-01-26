console.log('Loop ID01');

// Glbl Vars
var player = false;
var checkbox_nopause = document.getElementById("PauseForbidSw");
var nopause = 0;
var id_played = -1;

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

    if (lcl_LOADED && !isNaN(lcl_pl_id)) {
        lcl_save_IN_list('watch_id', id, lcl_pl_id);
    }
}

// <<| |>>

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
        window.location.href = "https://miala.000webhostapp.com/YT?todo=end&list=" + listValue;
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

        let duration = player.getDuration();
        let video_title = player.getVideoData().title;

        console.log('MiYT state: ' + currentTime + '/' + duration + ' => ' + currentState);

        if (currentTime < 10) {
            if (video_title != '') {
                document.title = video_title + ' | MialaMusic';
                document.getElementById('infos_vid').innerText = video_title + ' (ID: ' + player.getVideoData().video_id + ' #' + id + ') - Lecteur MiYT';
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

                if (currentState === -1 && video_title == '') {
                    console.log('Video Indispo, next');
                    next();
                }
                document.getElementsByClassName('ytp-button')[0].click();
            }
        } else if (currentState === 2 && nopause == 1) {
            player.playVideo();
        }

    } else {
        pageUpdate_i += 1;
    }
}