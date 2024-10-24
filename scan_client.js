console.log('ScanMiClient ID03');

let togo = 'https://mialaprog.github.io/MiYT/www.html';
let urlS = new URLSearchParams(new URL(window.location.href).search);

window.location.href = togo + '?list=' + urlS.get("list") + '&v=' + urlS.get("v") + '&title=' + document.title;

