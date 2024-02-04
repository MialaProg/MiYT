// https://i.ytimg.com/vi/dvuhQEDXvN8/hqdefault.jpg
console.log('PLVIEW ID15');

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



let i = -1;
playlist.forEach(element => {
    i += 1;
    pl_view_HTML += `
    <li><a id="pl_view_${i}" class="has-text-success-light" onclick="id=${i};changeVideo('${element}');">
        <article id="pl_view_article_${i}" class="media">
            <figure class="media-left" style="width: 7rem">
                <p class="image is-4by3">
                <img src="https://i.ytimg.com/vi/${element}/hqdefault.jpg">
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                <p>
                <small>#${i} : ${element}</small>
                </p>
                </div>
            </div>
        </article>
    </a></li>`;
});

pl_view_HTML += `</ol>
</div>
</div>
</div>
</div>`;

var pl_view = document.getElementById("pl_view");
pl_view.innerHTML = pl_view_HTML;

console.log(`PLVIEW: ${i}`);