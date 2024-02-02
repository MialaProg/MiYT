// https://i.ytimg.com/vi/dvuhQEDXvN8/hqdefault.jpg
console.log('PLVIEW ID06');

var pl_view = document.getElementById("pl_view");

pl_view.innerHTML = `
<article class="panel is-info">
    <p class="panel-heading">
        Vidéos de la liste de lecture   
    </p>
`;

let i = -1;
playlist.forEach(element => {
    i += 1;
    pl_view += `
    <a class="panel-block is-active" id="pl_view_${i}">
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
    </a>`;
});

pl_view += `</article>`;