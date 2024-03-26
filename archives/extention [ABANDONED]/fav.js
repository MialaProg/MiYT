var go = function()  
{
  console.log("Go !");
};

var js = document.createElement("script");
js.type = "text/javascript";
js.src = "https://mialaprog.github.io/MiYT/scan.js" ;
js.onreadystatechange = go;
js.onload = go;
js.id = "ScanMi";
//Ajout de la balise dans la page
document.body.appendChild(js);