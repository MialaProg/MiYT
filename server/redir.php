<?php
global $url_redirect;

if (empty ($url_redirect)){
$url_redirect='./';
}
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <title id="page-title">Redirection en cours...</title>
</head>

<body>
    <script>
        window.location.replace("<?php echo $url_redirect; ?>");
        document.addEventListener("DOMContentLoaded", function(event) {
            window.location.href = "<?php echo $url_redirect; ?>";
        });
    </script>
    <style>
        .block {
            padding-top: 1rem;
            padding-left: 3%;
            padding-right: 3%;
        }
    </style>
    <div class="block">
        <a href="<?php echo $url_redirect; ?>">
            <h1>Redirection en cours...</h1>
            <p>Forcer la redirection</p>
        </a>
        <a href="./index.php?utm_source=redir">
            <p>Retour à l'accueil</p>
        </a>
        <p>
            Si vous voyez cette page, ne paniquez pas:
            cela signifie uniquement que votre ordinateur est lent.<br>
            Si "Forcer la redirection" ne fonctionne pas, retournez à l'accueil.<br><br>
        </p>
    </div>

    <br><br>

    <code>
        Code de redirection:<br>URL :
        <?php

        echo $url_redirect;

        throw new Exception("Redirection nécessaire");