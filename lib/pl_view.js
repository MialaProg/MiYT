// https://i.ytimg.com/vi/dvuhQEDXvN8/hqdefault.jpg
console.log('PLVIEW ID11');

var pl_view = document.getElementById("pl_view");

pl_view.innerHTML = `
<div class="card">
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
    pl_view.innerHTML += `
    <li><a id="pl_view_${i}">
        <article class="media">
            <figure class="media-left">
                <p class="image is-16by9">
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

pl_view.innerHTML += `</ol>
</div>
</div>
</div>
</div>`;

console.log(`PLVIEW: ${i}`);
console.log(playlist);