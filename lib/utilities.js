console.log("MialaUtilitiesJS V3.0");

function shuffleArray(arr) {
    // arr.sort(() => Math.random() - 0.5);

    // Copie de arr
    var arr1 = arr.slice();
    // Créer un tableau vide pour contenir les éléments mélangés
    var arr2 = [];

    let len = arr1.length;
    // Pour chaque élément du tableau d'origine
    for (let i = 0; i < len; i++) {
        // Générer un nombre aléatoire entre 0 et la longueur du tableau moins i
        const y = Math.floor(Math.random() * (len - i));

        // Ajouter l'élément i du tableau d'origine au tableau mélangé
        arr2.push(arr1[y]);

        // Supprimer l'élément i du tableau d'origine
        arr1.splice(y, 1);
    }

    // Retourner le tableau mélangé
    arr = arr2;
    return arr;
}

function removeTimeout() {
    var highestTimeoutId = setTimeout(";");
    for (var i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
    }
}

/** Initially for #24
 * Move an item from id to id+move
 * @param {int} id : from
 * @param {int} move : to id + (can be negative)
 * @param {array} arr : inside
 */
function moveItemFromList(id, move, arr){
    let item = arr[id];
    let nextId = id + move;
    arr.splice(id, 0, item);
    arr.splice(id, 1);
}


var $UTILITIES = true;