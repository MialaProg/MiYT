<?php


// Activer l'affichage des erreurs
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// header("Access-Control-Allow-Origin: https://www.youtube.com, https://www.google.com");
// header("Access-Control-Allow-Origin: *");

// echo "<!DOCTYPE html>
<html>
Si une erreur apparaît, veuillez la signaler, fermer cette fenetre puis continuer votre route.";

function nomFichierConforme(string $nomFichier): string
{
    // Étape 1: Échapper les caractères spéciaux
    $nomFichier = str_replace(["'", "\"", "\\"], " ", $nomFichier);

    // Étape 2: Supprimer les caractères non autorisés
    $nomFichier = preg_replace("/[^\w\d\.-]/", " ", $nomFichier);

    // Étape 3: Vérifier la longueur du nom de fichier
    if (strlen($nomFichier) > 45) {
        $nomFichier = substr($nomFichier, 0, 45);
    }

    // Étape 4: Normaliser l'encodage
    $nomFichier = iconv("UTF-8", "ASCII//TRANSLIT", $nomFichier);

    $nomFichier = trim($nomFichier);

    return $nomFichier;
}

try {

    if (empty($_POST['playlist']) || empty($_POST['nb']) || empty($_POST['listID'])){
        $errorMsg = "Data Missing.";
        trigger_error($errorMsg, E_USER_ERROR);
        exit;
    }

    $playlist = trim($_POST['playlist']);
    $pllist_length = $_POST['nb'];
    $listID = trim($_POST['listID']);

    if (empty($_POST['name'])){
        $name = "Liste de lecture de longueur:";
    }else{
        $name = str_replace(" - YouTube", "", $_POST['name']);
    }

    $name = trim($name) . ' [' . $pllist_length . ']';

    $dir = './db/';
    $path = $dir . 'index.list';

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

        $list[] = $name;
        $list[] = $listID;
        $del_path = $dir . trim($list[1]) . '.Mpl';
        if (file_exists($del_path)) {
            unlink($del_path);
        }
        unset($list[1]);
        unset($list[0]);

        $content = implode("\n", $list);

        $handle = fopen($path, "w");
        fwrite($handle, $content);
        fclose($handle);
    } else {
        $name_idx = $id_idx - 1;
        $list[] = $name;
        $list[] = $listID;
        $del_path = $dir . trim($list[$id_idx]) . '.Mpl';
        if (file_exists($del_path)) {
            unlink($del_path);
        }
        unset($list[$id_idx]);
        unset($list[$name_idx]);

        $content = implode("\n", $list);

        $handle = fopen($path, "w");
        fwrite($handle, $content);
        fclose($handle);

        $path_myfile = $dir . $listID . '.Mpl';

        $handle = fopen($path_myfile, "w");
        fwrite($handle, $playlist);
        fclose($handle);


    }

    $url_redirect = './www.php?'
    require './redir.php';
    // echo "
    <head>
    <script>
    window.close();
    </script>
    </head>
    <body>
    </body>
    </html>";
} catch (\Throwable $th) {
    var_dump($th);
}