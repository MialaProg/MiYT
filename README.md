# MiYT
YT Viewer : No Ads, Random Playlist &amp; more... The new version of MiYT Player

Plus d'informations sur le projet ainsi que la mise en place / installation (même si aucune installation de logiciel n'est requise): 
    https://yt.mi.42web.io/ (Version complète)
        ou
    https://mialaprog.github.io/MiYT/ (Version client uniquement)

## Codes de version:
<br>α : Ne fonctionne pas
<br>β : Certaines fonctionnalités ne fonctionnent pas 
<br>U : Unstable => Manque de tests 
<br>S : Stable => Fonctionne correctement (sauf bugs mineurs)
<br>F : Finale => Releases disponible, point de sauvegarde

## Ordre d'execution et rôle:
( 1- index.html (js) => code min à mettre en favoris <br>
2- scan.js => scanner de playlist )<br>
<br>
3- watcher.js => mise en page du lecteur<br>
4- pl_load.js => traitement de la playlist<br>
5- loop.js => Code s'executant en arrière plan<br>

## Infos sur les variables:
Forme de la variable (xxx: nom) | Signification / Valeur
 --- | --- 
$XXX | True si Xxx est chargé.e.