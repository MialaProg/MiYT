console.log('ScanMi ID03');

let togo = 'https://yt.mi.42web.io/www.php';
let urlS = new URLSearchParams(new URL(window.location.href).search);

window.location.href = togo + '?list=' + urlS.get("list") + '&v=' + urlS.get("v") + '&title=' + document.title;

