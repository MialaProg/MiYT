
document.addEventListener('DOMContentLoaded', function () {

    let PLinput = document.getElementById('PLinput');

    PLinput.innerHTML = `
<div class="field has-addons">
<div class="control is-expanded">
    <input class="input" type="text" id="list_url_input" placeholder="Playlist URL">
</div>
<div class="control">
    <button class="button is-danger" id="list_url_submit">Lire</button>
</div>
</div>`;

    if (window.location.href.includes('noinput')) {
        document.getElementById("PLinput").classList.add('is-hidden');
    }
    document.getElementById("list_url_submit").addEventListener("click", function () {
        // Extrait la partie "list" de l'URL 
        const enteredUrl = document.getElementById("list_url_input").value;
        const listId = enteredUrl.split("list=")[1].split("&")[0];

        // Valide que l'élément "list" est récupéré
        if (listId) {
            // Effectue la redirection
            window.location.href = "https://yt.mi.42web.io/www.php?list=" + listId;
        } else {
            // Traitement si l'élément "list" est absent de l'URL
            alert("URL invalide : L'élément list n'a pas été trouvé.");
        }
    });

});