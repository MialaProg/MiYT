console.log('SrvIdx ID-07');

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
            let name = playlists[i + 3];
            let id = playlists[i + 1];
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

    playlists.forEach((pl, index) => {
        if (index % 4 === 0) {
            setYouTubePlDt(playlists[index + 1], pl);
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    ListPl();
});