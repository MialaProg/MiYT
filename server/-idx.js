console.log('SrvIdx v>>43<');

function setYouTubePlDt(PlID, time) {
    let apiUrl = 'https://www.youtube.com/oembed?url=https://www.youtube.com/playlist?list=' + PlID + '&format=json';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            let title = data.title;
            let txtElement = document.getElementById(`pl-txt-${PlID}`);
            txtElement.innerHTML = title;
            let a = document.getElementById(`pl_view_${PlID}`);
            a.href = `https://yt.mi.42web.io/www.php?list=${PlID}&title=${title}&time=${time}`;


            let img = data.thumbnail_url;
            let imgElement = document.getElementById(`pl-img-${PlID}`);
            imgElement.src = img;
        })
        .catch(error => console.log(`SetDataERR #${PlID} : ${error}`));
}

function ListPl() {


    let playlists = document.getElementById("listoflist").innerHTML.split("¤*¤").reverse();

    let pl_view_HTML = `
    <div class="card has-background-info-dark has-text-primary-light list-container scroll">
    <header class="card-header">
        <p class="card-header-title">
            Listes de lecture récemments jouées
        </p>
    </header>
    <div class="card-content">
        <div class="content">
    `;

    playlists.forEach((pl, i) => {
        // Tps, ID, Nb, TITRE
        if (i % 4 === 0) {
            let name = playlists[i + 3].trim();
            if (name === 'TITRE') {
                return;
            }
            let id = playlists[i + 1].trim();
            let link = 'https://yt.mi.42web.io/www.php?list=' + id + '&title=' + name + '&time=' + pl;
            // pl_view_HTML += '<li><a href="' + link + '">' + name + '</a></li>';

            pl_view_HTML += `
            <a id="pl_view_${id}" class="has-text-success-light" href="${link}">
                <article id="pl_view_article_${i}" class="media video_selection">
                    <figure class="media-left" style="width: 7rem">
                        <p class="image is-4by3">
                        <img id="pl-img-${id}" src="https://i.ytimg.com/">
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                        <p><div id="pl-txt-${id}">
                        ${name}</div><br>
                        <small>${playlists[i + 2]} vidéos. #ID{${id}}</small>
                        </p>
                        </div>
                    </div>
                </article>
            </a><br>`;
        }
    });


    pl_view_HTML += `
    </div>
    </div>
    </div>
    </div>`;

    var pl_view = document.getElementById("playlists");
    pl_view.innerHTML = pl_view_HTML;

    playlists.forEach((pl, i) => {
        if (i % 4 === 0) {
            let name = playlists[i + 3].trim();
            if (name === 'TITRE') {
                return;
            }
            setYouTubePlDt(playlists[i + 1], pl);
        }
    });
}


function getGitIdx() {
    // Créer une nouvelle requête XMLHttpRequest
    var xhr = new XMLHttpRequest();

    let gitIframe = document.getElementById('MiYT-git-iframe');
    let gitURL = gitIframe.src.split('?')[0];

    // Ouvrir la requête en GET
    xhr.open("GET", gitURL, true);

    // Définir le type de contenu attendu
    xhr.responseType = "text";

    // Ecouter l'événement "load" de la requête
    xhr.onload = function () {
        // Si la requête a réussi
        if (xhr.status === 200) {
            // Obtenir le contenu de la réponse
            let content = xhr.responseText;

            // Insérer le contenu dans la div
            document.getElementById('MiYT-git-idx').innerHTML = content;
        } else {
            // Afficher une erreur
            console.error("Erreur lors de la requête : " + xhr.status);
        }
    };

    // Envoyer la requête
    xhr.send();
}

document.addEventListener('DOMContentLoaded', function () {
    // getGitIdx();
    ListPl();
});