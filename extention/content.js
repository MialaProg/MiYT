function sendToServer(playlist_txt, listID, nb) {
    // Créez un formulaire dynamiquement
    var form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://yt.mi.42web.io/add.php?i=1';

    // Ajoutez les champs et leurs valeurs
    var champ1 = document.createElement('input');
    champ1.type = 'hidden';
    champ1.name = 'playlist';
    champ1.value = playlist_txt;
    form.appendChild(champ1);

    var champ2 = document.createElement('input');
    champ2.type = 'hidden';
    champ2.name = 'nb';
    champ2.value = nb;
    form.appendChild(champ2);

    var champ3 = document.createElement('input');
    champ3.type = 'hidden';
    champ3.name = 'listID';
    champ3.value = listID;
    form.appendChild(champ3);


    var champ4 = document.createElement('input');
    champ4.type = 'hidden';
    champ4.name = 'name';
    champ4.value = document.title;
    form.appendChild(champ4);

    document.body.appendChild(form);
    form.submit();
}

chrome.webNavigation.onCommitted.addListener(function (details) {
    if (details.frameUrl.includes("youtube.com")) {
        chrome.tabs.sendMessage(tabId, "MiYT-page_ready");
    } else if (details.frameUrl.includes('yt.mi.42web.io/empty')) {
        chrome.storage.local.get(["pl", "id", "len"], function (result) {
            sendToServer(result.pl, result.id, result.len);
        });
    }
});


// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//     if (changeInfo.status === 'complete') {
//         if (tab.url.startsWith('https://www.youtube.com/')) {

//     }
// });


chrome.runtime.onMessage.addListener(function (message) {
    if (message === "MiYT_ready") {
        // Your page loaded logic here (e.g., execute fav.js)
        chrome.tabs.executeScript(null, { file: "fav.js" });
    }



});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "MiYT-storage") {
        chrome.storage.sync.set(request.data);
    }
});

chrome.action.onClicked.addListener(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs[0]) {
            chrome.tabs.reload(tabs[0].id, function () {
                chrome.tabs.sendMessage(tabId, "MiYT_ready");
            });
        }
    });
});

