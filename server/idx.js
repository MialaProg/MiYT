console.log('SrvIdx ID-07');

function setYouTubePlDt(PlID) {
    let apiUrl = 'https://www.youtube.com/oembed?url=https://www.youtube.com/playlist?list=' + PlID + '&format=json';

  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        let title = data.title;
        let txtElement = document.getElementById(`pl-txt-${PlID}`);
        txtElement.innerHTML = title;
        let a = document.getElementById(`pl_view_${PlID}`);
        a.href = 'https://yt.mi.42web.io/www.php?list=' + PlID + '&title=' + title;


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
        if (i % 2 === 0) {
            let name = playlists[i + 1];
            let link = 'https://yt.mi.42web.io/www.php?list=' + pl + '&title=' + name;
            // pl_view_HTML += '<li><a href="' + link + '">' + name + '</a></li>';
            
            pl_view_HTML += `
            <a id="pl_view_${pl}" class="has-text-success-light" href="${link}">
                <article id="pl_view_article_${i}" class="media video_selection">
                    <figure class="media-left" style="width: 7rem">
                        <p class="image is-4by3">
                        <img id="pl-img-${pl}" src="https://i.ytimg.com/">
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                        <p><div id="pl-txt-${pl}">
                        ${name}</div>
                        <small>#${i} : ${pl}</small>
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
        if (index % 2 === 0) {
            setYouTubePlDt(pl);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    ListPl();
});