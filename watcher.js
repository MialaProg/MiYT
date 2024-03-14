console.log('MiWatcher ID02');

// File: Create Watcher Page

// Globals Vars
var htmlElement = document.querySelector('html');
var head = document.querySelector('head');
var body = document.querySelector('body');
var scr_list = [
    "https://www.youtube.com/iframe_api",
    "https://mialaprog.github.io/MiYT/lib/lcl_svg.js", // +  Math.random(), //MàJ auto
    "https://mialaprog.github.io/MiYT/lib/utilities.js",
    "https://mialaprog.github.io/MiYT/lib/inFile_svg.js",
    "https://mialaprog.github.io/MiYT/ext/jquery.js",
    "https://mialaprog.github.io/MiYT/lib/stop_pub.js"
];

function rsrcLoaded_watcher() {
    console.log('Une ressource à été chargée <= MiWatcher');
}

// Dark Theme
htmlElement.removeAttribute('style');
htmlElement.setAttribute('class', 'has-background-dark has-text-danger-light');
body.setAttribute('class', 'has-background-dark has-text-danger-light');

// reset
window.stop();

// Head Set
// <link rel="icon" href="https://mialaprog.github.io/MiYT/lib/icon.png" type="image/png"></link>
head.innerHTML = `
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<link rel="manifest" href="https://mialaprog.github.io/MiYT/lib/MiYT.webmanifest">

<link rel="stylesheet" href="https://mialaprog.github.io/MiYT/ext/bulma.min.css">
<link rel="stylesheet" href="https://mialaprog.github.io/MiYT/ext/bulma-switch.min.css">

<title>Chargement en cours... | MialaMusic</title>
<link rel="stylesheet" href="https://mialaprog.github.io/MiYT/lib/style.css">
<link rel="stylesheet" href="https://mialaprog.github.io/MiYT/lib/loading.css">
<link rel="stylesheet" href="https://mialaprog.github.io/MiYT/ext/fonts.css">`

scr_list.forEach(element => {
    let js = document.createElement("script");
    js.type = "text/javascript";
    js.src = element;
    body.appendChild(js);
});

let link_icon = document.querySelector("link[rel~='icon']");
if (!link_icon) {
    link_icon = document.createElement('link');
    link_icon.rel = 'icon';
    document.head.appendChild(link_icon);
}
link_icon.href = 'https://mialaprog.github.io/MiYT/lib/icon.png';

// Body set
body.innerHTML = 
`
<div id='inProgress' class='block'>
<div class="loaderPlay"></div><div class="loaderFactory"></div><div class="loaderSlash"></div><div class="loaderFilm top"></div><div class="loaderFilm down"></div>
<div class='content'>
    <progress id="loading_progress" class="progress is-large is-link" value="50" max="100">Attente de votre réponse...</progress><br><br>
    <h1 class="txtop">Veuillez répondre à la question: OK = Oui , Annuler = Non</h1><br>
    
    <p class="image is-128x128 is-centered">
        <img class="is-rounded" src="https://mialaprog.github.io/MiYT/lib/icon.png" alt="Lecteur MiYT">
    </p><br><br>
</div></div>
`
+ body.innerHTML +
`

<div class="block">
<div class="columns is-desktop is-variable is-8">
    <div class="column has-text-danger-light has-background-dark">
    <div class="tags are-medium">
    <span class="tag is-primary"><a href="https://yt.mi.42web.io/" class="has-text-warning-light">Lecteur MiYT</a></span>
    <span class="tag is-danger"><a id="pllink" href="#" class="has-text-warning-light">Playlist</a></span>
    <span class="tag is-danger"><a href="https://www.youtube.com/?Mi=Music" class="has-text-warning-light">YouTube</a></span>
    </div>
    <br><br>
    <div id="player-box"><div id="player"></div></div>
    <br>
    <span id="infos_vid" class="tag">Chargement en cours... - MialaMusic</span><br><br>
    <br>
    <div class="buttons">
        <button id="prev_btn" class="button is-danger">
            <span class="material-symbols-outlined gfonticon_button icon is-small">
                skip_previous
            </span>
        </button>
        <button id="next_btn" class="button is-success">
            <span class="material-symbols-outlined gfonticon_button icon is-small">
                skip_next
            </span></button>
        <!--
        <button id="PiP_btn" class="button is-info" onclick="if (document.pictureInPictureElement) {
            document.exitPictureInPicture();
        } else if (document.pictureInPictureEnabled) {
            video.requestPictureInPicture();
        }">
            PiP</button> -->
            
        <span style="display:inline-block;width: 4vw;"></span>
        <button id="reset_btn" class="button is-danger">
            <span class="material-symbols-outlined gfonticon_button icon is-small">
                playlist_remove
            </span>
        </button>
    </div>

    <div class="box" style="
        background-color: #005b42;
        border-radius: 18px;
        box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10), 0 0 0 1px rgb(10 10 10);
        color: #fff;
    ">
        <div class="field">
            <label for="SkipOutroSw">Skipper les outro:</label><br><span style="display:inline-block;width: 2vw;"></span>
            <label for="SkipOutroSw">Désactivé</label>
            <input id="SkipOutroSw" type="checkbox" name="SkipOutroSw" class="switch is-success" checked>
            <label for="SkipOutroSw" style="height: 0.5em; padding-left: 3.5rem;">Activé</label>
        </div>

        <div class="field">
            <label for="PauseForbidSw">Lecture automatique (pause interdite):</label><br><span style="display:inline-block;width: 2vw;"></span>
            <label for="PauseForbidSw">Au début uniquement</label>
            <input id="PauseForbidSw" type="checkbox" name="PauseForbidSw" class="switch is-danger">
            <label for="PauseForbidSw" style="height: 0.5em; padding-left: 3.5rem;">Pendant toute la video</label>
        </div>
        
        
        <div class="field">
            <label for="LoopPlaySw">Lecture de la playlist en boucle:</label><br><span style="display:inline-block;width: 2vw;"></span>
            <label for="LoopPlaySw">Désactivée</label>
            <input id="LoopPlaySw" type="checkbox" name="LoopPlaySw" class="switch is-link">
            <label for="LoopPlaySw" style="height: 0.5em; padding-left: 3.5rem;">Activée</label>
        </div>

        <div class="field is-grouped">
            <p class="control"> 
                <button id="SaveButton" class="button is-success">
                    <span class="material-symbols-outlined gfonticon_button icon is-small">
                    download_for_offline
                    </span>
                </button>
            </p>
            <p class="control"> 
                <div class="file is-warning">
                <label class="file-label">
                    <input class="file-input" type="file" name="resume" id="RestFile">
                    <span class="file-cta">
                        <span class="file-icon">
                            <span class="material-symbols-outlined gfonticon_button icon is-small">
                                backup
                            </span>
                        </span>
                        <span class="file-label">
                            Choose a file…
                        </span>
                    </span>
                </label>
                </div>
            </p>
        </div>
    </div>
    <br>

    </div>
<div class="column has-text-danger-light has-background-dark" id="pl_view">
</div>
<div id="pl_view_iframe" class="is-hidden"></div>
</div>
`;

// => pl_load
var js = document.createElement("script");
js.type = "text/javascript";
js.src = "https://mialaprog.github.io/MiYT/pl_load.js";
js.onreadystatechange = rsrcLoaded_watcher;
js.onload = rsrcLoaded_watcher;
js.id = "PlLoad";
//Ajout de la balise dans la page
document.body.appendChild(js);