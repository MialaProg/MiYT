// https://i.ytimg.com/vi/dvuhQEDXvN8/hqdefault.jpg
console.log('PLVIEW ID30');

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
    <li><a id="pl_view_${i}" class="has-text-success-light" onclick="id=${i};changeVideo('${i}');">
        <article id="pl_view_article_${i}" class="media video_selection">
            <figure class="media-left" style="width: 7rem">
                <p class="image is-4by3">
                <img src="https://i.ytimg.com/vi/${element}/hqdefault.jpg">
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                <p id="pl_view_${i}">
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

console.log(`PLVIEW loaded: ${i}`);


var pl_view_load_idx = 0;

function plv_load_title(){
    if (pl_view_load_idx == playlist.length){
        return 3;
    }

    let my_id = pl_view_load_idx;
    pl_view_load_idx += 1;
    
    let url = "https://www.youtube.com/embed/" + playlist[my_id];
    
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        let response = xhr.responseText;
        let title = response.match(/<title>(.*?)<\/title>/)[1];
        document.getElementById(`pl_view_${my_id}`).innerHTML += title;
        console.log(title + " modifié avec succèes. ")
    }
    };
    xhr.send();
}

setInterval(plv_load_title, 1000);

// function plv_load_title(){
//     let iframe = document.getElementById('pl_view_iframe');
//     let to_return = "plv_load_title>> ";

//     if (pl_view_load_idx){
//         let title = iframe.contentDocument.querySelector("iframe").querySelector("title");
//         if (title){
//             let titleTXT = title.innerHTML.trim().replace(/\s*\[\d+\]$/g, "");
//             document.getElementById(`pl_view_${pl_view_load_idx}`).innerHTML += titleTXT;
//             to_return += titleTXT + " modifié avec succèes. "
//         }else{
//             to_return += pl_view_load_idx + " non trouvé. "
//         }
//     }else{
//         console.log('PLVIEW > plv_load_title >> Start')
//     }

//     if (pl_view_load_idx == playlist.length){
//         to_return += "Tous les titres ont été chargés.";
//         iframe.innerHTML = "Tout est chargé !";
//         return to_return;
//     }

//     let pl_view_iframe = document.getElementById('pl_view_iframe');
//     pl_view_iframe.innerHTML = `<iframe src="https://www.youtube.com/embed/${playlist[pl_view_load_idx]}" onload="console.log(plv_load_title());"></iframe>`;
//     pl_view_load_idx += 1;

    
//     to_return += "Chargement du titre n°" + pl_view_load_idx;
//     if (pl_view_load_idx){
//         return to_return;
//     }else{
//         console.log(to_return);
//     }
// }

// setTimeout(plv_load_title, 3000);
