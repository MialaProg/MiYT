console.log('SrvIdx ID-01');

function setYouTubePlDt(PlID) {
    let apiUrl = 'https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=' + PlID + '&format=json';

  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        let title = data.title;
        let txtElement = document.getElementById(`pl-txt-${PlID}`)
        txtElement.innerHTML = title;

        let img = data.thumbnail_url;
        let imgElement = document.getElementById(`pl-img-${PlID}`)
        imgElement.innerHTML = img;
      })
      .catch(error => console.log(`SetDataERR #${PlID} : ${error}`));
}

function ListPl() {
   
    
let playlists = document.getElementById("listoflist").innerHTML.split("¤*¤");

let pl_view_HTML = `
<div class="card has-background-info-dark has-text-primary-light">
<header class="card-header">
    <p class="card-header-title">
    Vidéos de la liste de lecture (Beta)  
    </p>
</header>
<div class="card-content">
    <div class="content"><ol>
`;

let i = 0;
playlists.forEach((pl, index) => {
    if (index % 2 === 1) {
        let name = playlists[index - 1];
        let link = 'https://miala.000webhostapp.com/YT/www.php?list=' + pl + '&title=' + name;
        // pl_view_HTML += '<li><a href="' + link + '">' + name + '</a></li>';
        
        pl_view_HTML += `
        <li><a id="pl_view_${i}" class="has-text-success-light" href="${link}">
            <article id="pl_view_article_${i}" class="media video_selection">
                <figure class="media-left" style="width: 7rem">
                    <p class="image is-4by3">
                    <img id="pl-img-${pl}" src="https://i.ytimg.com/vi/${pl}/hqdefault.jpg">
                    </p>
                </figure>
                <div class="media-content">
                    <div class="content">
                    <p id=pl-txt-${pl}">
                    ${name}
                    <small>#${i} : ${pl}</small>
                    </p>
                    </div>
                </div>
            </article>
        </a></li>`;
    }
    i += 1;
});


pl_view_HTML += `</ol>
</div>
</div>
</div>
</div>`;

var pl_view = document.getElementById("playlists");
pl_view.innerHTML = pl_view_HTML;

}

document.addEventListener('DOMContentLoaded', function() {
    ListPl();
});