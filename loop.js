console.log('Loop ID24');

// Glbl Vars
var player = false;
var checkbox_nopause = document.getElementById("PauseForbidSw");
var nopause = 0;
var id_played = -1;

function onPlayerReady(event) {
    console.log(event, ': Player Ready => ', player);
    event.target.playVideo();
    player.playVideo();
}

// function changeVideo_hist(vid_id) {
//     console.log("VidChg: " + vid_id);
//     player.pauseVideo();
//     id_played = id;
//     player.loadVideoById(vid_id);
//     player.playVideo();
//     document.title = 'Lecteur MiYT - Miala';
//     document.getElementById('infos_vid').innerText = 'Chargement... (ID: ' + vid_id + ' #' + id + ') - MialaMusic Playlist Randomer';
//     // window.history.pushState(null, '', '/YT/watch.php?idx=' + id);

//     if (lcl_LOADED && !isNaN(lcl_pl_id)) {
//         lcl_save_IN_list('watch_id', id, lcl_pl_id);
//     }

//     if (pl_view !== false){
//         if (pl_view_active !== false){
//             document.getElementById('pl_view_article_' + pl_view_active).classList.remove('has-background-grey-dark');
//         }
//         pl_view_active = id;
//         document.getElementById('pl_view_article_' + id).classList.add('has-background-grey-dark');
//     }
// }

function changeVideo(nid) {
    id_played = id = parseInt(nid);
    console.log("VidChg: " + id);
    player.pauseVideo();

    let vid_id = playlist[id]
    player.loadVideoById(vid_id);
    player.playVideo();
    document.title = 'Lecteur MiYT - Miala';
    document.getElementById('infos_vid').innerText = 'Chargement... (ID: ' + vid_id + ' #' + id + ') - MialaMusic Playlist Randomer';
    // window.history.pushState(null, '', '/YT/watch.php?idx=' + id);

    if (lcl_LOADED && !isNaN(lcl_pl_id)) {
        lcl_save_IN_list('watch_id', id, lcl_pl_id);
    }

    if (pl_view !== false){
        try {
            if (pl_view_active !== false){
                document.getElementById('pl_view_article_' + pl_view_active).classList.remove('has-background-grey-dark');
            }
        } catch (error) {}
        pl_view_active = id;
        document.getElementById('pl_view_article_' + id).classList.add('has-background-grey-dark');
    }
}

// <<| |>>

function prev() {
    id -= 1;
    if (id < 0) {
        alert("Début de la playlist.");
        id = 0;
    }
    changeVideo(id);
}

function next() {
    id += 1;
    if (id >= playlist.length) {
        // window.location.href = "end.php?v=js";
        window.stop();
        alert("Fin de la playlist.");
        window.location.href = "https://miala.000webhostapp.com/YT?todo=end&list=" + listID;
    } else {
        changeVideo(id);
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
    if (player) {

        if (id_played != id) {
            changeVideo(id);
        }

        let currentTime = player.getCurrentTime();
        let currentState = player.getPlayerState();

        // En lecture, toutes les 5s. Sinon: ttes les secondes
        if (pageUpdate_i == 4 || currentState != 1 || currentTime < 5) {
            pageUpdate_i = 0;

            let duration = player.getDuration();
            let video_title = player.getVideoData().title;

            console.log('MiYT state: ' + currentTime + '/' + duration + ' => ' + currentState);

            try {
                if ('setPositionState' in navigator.mediaSession) {
                    navigator.mediaSession.setPositionState({
                        duration: duration,
                        position: currentTime,
                    });
                }
            } catch (error) { console.log('mediaSess set Pos impossible: ERR'); }

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
                    // document.getElementsByClassName('ytp-button')[0].click();
                }
            } else if (currentState === 2 && nopause == 1) {
                player.playVideo();
            }

        } else {
            pageUpdate_i += 1;
        }
    }
}

function onERR() {
    let currentState = player.getPlayerState();
    let video_title = player.getVideoData().title;
    if (currentState === -1 && video_title != '') {
        console.log('Video ERR, next');
        next();
    }
}

/// Arrière plan [FAIL]
// function setBackgroundAction() {
//     const actionHandlers = [
//         ['play', () => {
//             console.log("MediaSeSS>>PLAY");
//             nopause = 1;
//             player.playVideo();
//         }],
//         ['pause', () => {
//             console.log("MediaSeSS>>PAUSE");
//             nopause = 0;
//             player.pauseVideo();
//         }],
//         ['previoustrack', () => {
//             prev();
//             console.log("MediaSeSS>>PREV");
//         }],
//         ['nexttrack', () => {
//             next();
//             console.log("MediaSeSS>>NEXT");
//         }],
//         ['stop', () => {
//             nopause = 0;
//             console.log("MediaSeSS>>STOP");
//         }]
//     ];

//     var not_supported = '';
//     for (const [action, handler] of actionHandlers) {
//         try {
//             navigator.mediaSession.setActionHandler(action, handler);
//         } catch (error) {
//             not_supported += action;
//         }
//     }

//     console.log('setBackgroundAction OK (Not Supported: ' + not_supported);

//     // document.addEventListener('visibilitychange', function () {
//     //     if (document.hidden && nopause) {
//     //         player.playVideo();
//     //     }
//     // });
// }

// setInterval(setBackgroundAction, 2000);

function onYouTubeIframeAPIReady() {
    console.log("onYouTubeIframeAPIReady run...");

    player = new YT.Player('player', {
        videoId: playlist[id],
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

    // setBackgroundAction();
}

function waitPlayer() {
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
            setTimeout(waitPlayer, 1000);
        }

    } catch (error) {
        console.log('Wait for iframe_api.js run...');
        setTimeout(waitPlayer, 2000);
    }
}

checkbox_nopause.addEventListener("change", function () {
    nopause = checkbox_nopause.checked;
    // setBackgroundAction();
});

waitPlayer();


