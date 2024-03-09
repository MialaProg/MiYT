chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.url.startsWith('https://www.youtube.com/')) {
        chrome.tabs.sendMessage(tabId, "MiYT-page_ready");
    }
});

chrome.runtime.onMessage.addListener(function (message) {
    if (message === "MiYT_ready") {
        // Your page loaded logic here (e.g., execute fav.js)
        chrome.tabs.executeScript(null, { file: "fav.js" });
    }

    chrome.storage.sync.get("maCle", function (result) {
        console.log(result.maCle); // "maValeur"
    });

});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "MiYT-storage") {
        // Traiter la demande et envoyer une réponse
        var resultat = maFonction(request.data.monArgument);

        chrome.storage.sync.set({
            maCle: "maValeur"
        });
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

