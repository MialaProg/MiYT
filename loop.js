console.log('Loop v¤>44<');

// Glbl Vars
var player = false;
var checkbox_nopause = document.getElementById("PauseForbidSw");
var nopause = 0;
var id_played = -1;
var inChg = false;

function onPlayerReady(event) {
    console.log('MiYT Player Ready');
    event.target.playVideo();
    player.playVideo();

    var playerElement = document.querySelector("#player");
    playerElement.style.borderRadius = "18px";

    var spanElement = document.querySelector("#infos_vid");
    var smallElement = document.createElement("small");
    smallElement.innerText = spanElement.innerText;
    spanElement.replaceWith(smallElement);
    smallElement.classList.remove("tag");
    smallElement.id = "infos_vid";

    var playerWidth = playerElement.offsetWidth;
    smallElement.style.width = playerWidth + "px";
}

function changeVideo(nid, pgs_rest = true) {
    inChg = true;
    id_played = id = parseInt(nid);
    console.log("VidChg: " + id);
    // player.pauseVideo();

    let vid_id = playlist[id]
    try {
        player.loadVideoById(vid_id);
        player.playVideo();
    } catch (error) {
        console.log(error);
    }
    document.title = 'Lecteur MiYT - Miala';
    document.getElementById('infos_vid').innerText = 'Chargement... (ID: ' + vid_id + ' #' + id + ') - Lecteur MiYT';
    // window.history.pushState(null, '', '/YT/watch.php?idx=' + id);

    if ($LOCAL_STORAGE) {
        try {
            if (!isNaN(lcl_pl_id)) {
                lcl_save_IN_list('watch_id', id, lcl_pl_id);
            }
        } catch (error) { }
        try {
            let list_vid_id = lcl_load_list('vidid');
            lcl_vid_id = list_vid_id.indexOf(vid_id);
            if (lcl_vid_id == -1) {
                lcl_vid_id = list_vid_id.length;
                list_vid_id.push(vid_id);
                lcl_save_list('vidid', list_vid_id);
            } else if (pgs_rest) {
                let progression = lcl_load_LIST_IN_list('vid_pgs', lcl_vid_id);
                var pgs_time = parseInt(progression[0]);
                if ((parseInt(progression[1]) > 440) && (parseInt(progression[1]) - pgs_time > 130)) {
                    setTimeout(() => { player.seekTo(pgs_time); }, 1000);
                }
            }

        } catch (error) { }
    }

    try {
        if ($PLAYLIST_VIEW !== false) {
            try {
                if (pl_view_active !== false) {
                    document.getElementById('pl_view_article_' + pl_view_active).classList.remove('has-background-grey-dark');
                }
            } catch (error) { }
            pl_view_active = id;
            document.getElementById('pl_view_article_' + id).classList.add('has-background-grey-dark');
        }

    } catch (error) { console.log(error) }

    outro_skip_time = 1;
    if (outro_skip) {
        try {
            let apiUrl = 'https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=' + vid_id + '&format=json';

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    let author_url = data.author_url;
                    if (author_url in ytb_outro_pass) {
                        outro_skip_time = ytb_outro_pass[author_url];
                        console.log('Set Outro Skipper to ' + outro_skip_time);
                    }
                })
                .catch(error => console.log(`Set Outro SkipperERR #${id} : ${error}`));

        } catch (error) { console.log(error) }
    }
    inChg = false;
}


function data_update() {
    inChg = true;
    if ($PLAYLIST_VIEW) {
        plv_load();
    }

    //pl_load#151-2857
    let pl_link = document.getElementById('pllink');
    if (pl_link) {
        pl_link.setAttribute("href", "https://www.youtube.com/playlist?list=" + listID);
    }

    if ($LOCAL_STORAGE) {

        try {
            let list_vid_id = lcl_load_list('vidid');
            lcl_vid_id = list_vid_id.indexOf(vid_id);
            if (lcl_vid_id == -1) {
                lcl_vid_id = list_vid_id.length;
                list_vid_id.push(vid_id);
                lcl_save_list('vidid', list_vid_id);
            }

            lcl_save_IN_list('vid_pgs', vid_pgs, lcl_vid_id);

        } catch (error) { }
    }

    changeVideo(id);

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
        if (LoopPlay) {
            id = 0;
            changeVideo(id);
        } else {
            window.stop();
            alert("Fin de la playlist.");
            window.location.href = "https://miala.000webhostapp.com/YT?todo=end&list=" + listID;
        }
    } else {
        changeVideo(id);
    }
}

document.getElementById('prev_btn').onclick = function () { prev() };
document.getElementById('next_btn').onclick = function () { next() };

var pageUpdate_i = 0;
var next_wait = false;

function pageUpdate(act = false) {
    //currentState : 
    //-1: Non initialisé
    // 0: Terminé
    // 1: En lecture
    // 2: En pause
    // 3: En file d’attente
    // 5: Vidéo en file d’attente interrompue
    if (player && !inChg) {

        if (id_played != id) {
            changeVideo(id);
        }

        let currentTime = Math.floor(player.getCurrentTime());
        let currentState = player.getPlayerState();

        // En lecture, toutes les 5s. Sinon: ttes les secondes
        if (pageUpdate_i == 4 || currentState != 1 || currentTime < 5) {
            pageUpdate_i = 0;

            let duration = player.getDuration();
            let video_title = player.getVideoData().title;

            console.log('MiYT state: ' + currentTime + '/' + duration + ' => ' + currentState);

            // try {
            //     if ('setPositionState' in navigator.mediaSession) {
            //         navigator.mediaSession.setPositionState({
            //             duration: duration,
            //             position: currentTime,
            //         });
            //     }
            // } catch (error) { console.log('mediaSess set Pos impossible: ERR'); }

            if (currentTime < 10) {
                if (video_title != '') {
                    document.title = video_title + ' | MialaMusic';
                    document.getElementById('infos_vid').innerText = video_title + ' (ID: ' + player.getVideoData().video_id + ' #' + id + ') - Lecteur MiYT';
                    if ($PLAYLIST_VIEW && !$plv_loaded){
                        plv_load();
                    }
                }
            }

            if (currentState === 0) {
                next();
            } else if (currentState === 1 && duration > 30) {
                if (currentTime > (duration - outro_skip_time)) {
                    console.log('Outro Skip');
                    next();
                }
                if ($LOCAL_STORAGE && lcl_vid_id) {
                    if (duration - currentTime > 130) {
                        let currentPercent = Math.round(currentTime / duration * 100);
                        vid_pgs = lcl_save_LIST_IN_list('vid_pgs', [currentTime, duration, currentPercent], lcl_vid_id);
                    } else {
                        lcl_del_IN_list('vid_pgs', lcl_vid_id);
                        lcl_del_IN_list('vidid', lcl_vid_id);
                        lcl_vid_id = false;
                        vid_pgs = false;
                    }
                }
            } else if (currentTime < 2) {
                console.log('Try play');
                player.playVideo();

                currentState = player.getPlayerState();

                // if (currentState !== 1) {
                //     console.log('Clicked');

                if (currentState === -1 && video_title == '') {
                    console.log('Video Indispo, next');
                    if (act) {
                        next_wait = false;
                        next();
                    }else{
                        if (indispo_skip && !next_wait) {
                            next_wait = true;
                            setTimeout(() => {
                                pageUpdate(true);
                            }, 3000);
                        }
                    }
                }
                // document.getElementsByClassName('ytp-button')[0].click();
                // }
            } else if (currentState === 2 && nopause == 1) {
                player.playVideo();
            }

        } else {
            pageUpdate_i += 1;
        }
    }
}


function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        next();
    } else {
        pageUpdate();
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

    if (player) {
        return 'Already created';
    }

    let playerDivWidth = document.getElementById('player').clientWidth;
    player = new YT.Player('player', {
        videoId: playlist[id],
        playerVars: { 'autoplay': 1, 'picture-in-picture': 1 },
        width: playerDivWidth,
        height: playerDivWidth * 360 / 640,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onERR
        },
        controlslist: ["previous", "playpause", "next", "mute", "volume", "fullscreen", "pip"]
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
            console.log('YTiframe API ready ! Wait 1s...');
            setTimeout(onYouTubeIframeAPIReady, 1000);
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


