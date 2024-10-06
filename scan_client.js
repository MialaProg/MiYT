console.log('ScanMi ID03');


window.location.href = 'https://mialaprog.github.io/MiYT/www.html?list=' + new URLSearchParams(new URL(window.location.href).search).get("list") + '&title=' + document.title;

