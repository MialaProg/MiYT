console.log('ScanMi ID03');


window.location.href = 'https://yt.mi.42web.io/www.php?list=' + new URLSearchParams(new URL(window.location.href).search).get("list") + '&title=' + document.title;

