<?php


// Activer l'affichage des erreurs
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// header("Access-Control-Allow-Origin: https://www.youtube.com, https://www.google.com");
// header("Access-Control-Allow-Origin: *");



// function nomFichierConforme(string $nomFichier): string
// {
//     // Étape 1: Échapper les caractères spéciaux
//     $nomFichier = str_replace(["'", "\"", "\\"], " ", $nomFichier);

//     // Étape 2: Supprimer les caractères non autorisés
//     $nomFichier = preg_replace("/[^\w\d\.-]/", " ", $nomFichier);

//     // Étape 3: Vérifier la longueur du nom de fichier
//     if (strlen($nomFichier) > 45) {
//         $nomFichier = substr($nomFichier, 0, 45);
//     }

//     // Étape 4: Normaliser l'encodage
//     $nomFichier = iconv("UTF-8", "ASCII//TRANSLIT", $nomFichier);

//     $nomFichier = trim($nomFichier);

//     return $nomFichier;
// }

try {

    if (empty($_POST['playlist']) || empty($_POST['nb']) || empty($_POST['listID']) || empty($_POST['time'])) {
        $errorMsg = "Data Missing.";
        trigger_error($errorMsg, E_USER_ERROR);
        exit;
    }

    $playlist = trim($_POST['playlist']);
    $pllist_length = $_POST['nb'];
    $listID = trim($_POST['listID']);
    $time = (int) trim($_POST['time']);

    if (empty($_POST['name'])) {
        $name = "Liste de lecture inconnue";
    } else {
        $name = str_replace(" - YouTube", "", $_POST['name']);
    }

    // $name = trim($name) . ' [' . $pllist_length . ']';

    $dir = './db/';
    $path = $dir . 'index.list';

    clearstatcache();

    $handle = fopen($path, "r");
    $content = fread($handle, filesize($path));
    fclose($handle);

    $list = explode("\n", $content);

    $id_idx = false;
    foreach ($list as $key => $value) {
        if (trim($value) === $listID) {
            $id_idx = $key;
            break;
        }
    }

    if ($id_idx === false) {
        $path_myfile = $dir . $listID . '.Mpl';

        $handle = fopen($path_myfile, "w");
        fwrite($handle, $playlist);
        fclose($handle);

        $del_path = $dir . trim($list[2]) . '.Mpl'; //ID
        if (file_exists($del_path)) {
            unlink($del_path);
        }

        for ($i = 0; $i < 4; $i++) {
            array_shift($list); // Supprime le premier élément de la liste
        }

        $list = array_merge($list, [$name, $pllist_length, $listID, $time]);
        $content = implode("\n", $list);

        $handle = fopen($path, "w");
        fwrite($handle, $content);
        fclose($handle);
    } else {
        $list = array_merge($list, [$name, $pllist_length, $listID, $time]);
        $del_path = $dir . trim($list[$id_idx]) . '.Mpl';
        if (file_exists($del_path)) {
            unlink($del_path);
        }

        for ($i = 0; $i < 4; $i++) {
            unset($list[$id_idx + 1 - $i]);
        }

        $content = implode("\n", $list);

        $handle = fopen($path, "w");
        fwrite($handle, $content);
        fclose($handle);

        $path_myfile = $dir . $listID . '.Mpl';

        $handle = fopen($path_myfile, "w");
        fwrite($handle, $playlist);
        fclose($handle);
    }

    echo "
    <head>
    <script>
    window.close();
    </script>
    </head>
    <body>";
    // var_dump($list);
} catch (\Throwable $th) {
    echo "<!DOCTYPE html>
<html>
Si une erreur apparaît, veuillez la signaler, puis <a href='./'>continuer votre route.</a>";
    var_dump($th);
}
