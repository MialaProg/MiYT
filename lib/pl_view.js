// https://i.ytimg.com/vi/dvuhQEDXvN8/hqdefault.jpg
console.log('PLVIEW v>>42<');

function plv_load_pict(){
    let pl_view_HTML = `
    <div class="card has-background-info-dark has-text-primary-light list-container scroll" style="border-radius: 18px;">
    <header class="card-header">
        <p class="card-header-title">
        Vidéos de la liste de lecture 
        </p>
    </header>
    <div class="card-content">
        <div class="content">
    `;



    let i = -1;
    playlist.forEach(element => {
        i += 1;
        pl_view_HTML += `
        <a id="pl_view_${i}" class="has-text-success-light" onclick="id=${i};changeVideo('${i}');">
            <article id="pl_view_article_${i}" class="media video_selection">
                <figure class="media-left" style="width: 7rem">
                    <p class="image is-4by3">
                    <img class="is-rounded" src="https://i.ytimg.com/vi/${element}/hqdefault.jpg">
                    </p>
                </figure>
                <div class="media-content">
                    <div class="content">
                    <p id="pl_view_txt_${i}">
                    <small>#${i} : ${element}</small>
                    </p>
                    </div>
                </div>
            </article>
        </a>`;
    });

    pl_view_HTML += `
    </div>
    </div>
    </div>
    </div>`;

    var pl_view = document.getElementById("pl_view");
    pl_view.innerHTML = pl_view_HTML;
}

function setYouTubeVideoTitle(my_id, videoId) {
    let apiUrl = 'https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=' + videoId + '&format=json';

  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        let videoTitle = data.title;
        let txtElement = document.getElementById(`pl_view_txt_${my_id}`)
        txtElement.innerHTML = videoTitle + txtElement.innerHTML;
      })
      .catch(error => console.log(`SetTitleERR #${my_id} : ${error}`));
}

var pl_view_load_idx = 0;
var pl_view_loop_idx = 1;

function plv_load_title(){
    let max = (playlist.length / 10) * pl_view_loop_idx + 50;
    if (max > playlist.length){
        max = playlist.length;
    }
    console.log('Chargement des titres des vidéos: ' + pl_view_load_idx + ' => ' + max);
    while (pl_view_load_idx < max) {
        let my_id = pl_view_load_idx;
        pl_view_load_idx += 1;

        try {
            setYouTubeVideoTitle(my_id, playlist[my_id]); 
        } catch (error) {}
    } 

    pl_view_loop_idx += 1;

    if (pl_view_load_idx < playlist.length){
        setTimeout(plv_load_title, 1000);
    }
}

function plv_load() {
    pl_view_load_idx = 0;
    pl_view_loop_idx = 1;
    plv_load_pict();
    plv_load_title();
}

if ('PerformanceObserver' in window) {
// ... le reste du code ...

const observer = new PerformanceObserver((entries) => {
    // Vérifier si le type d'entrées est 'longtask' et s'il s'agit d'un tableau
    if (entries instanceof Array && entries.every((entry) => 'longtask' in entry)) {
      // Utiliser 'some' pour la recherche
      // Si aucune tâche longue ne prend plus de 100ms, le navigateur est stable
      const isStable = entries.some((entry) => entry.duration <= 100);
  
      if (isStable) {
        observer.disconnect();
        plv_load();
      }
    }
  });
  
  // Observer les entrées de performance de type 'longtask'
  observer.observe({ type: 'longtask' });
  
  
}else{
    setTimeout(plv_load, 1000);
}


var $PLAYLIST_VIEW = true;

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
