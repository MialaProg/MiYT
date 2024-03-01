<?php

$dir = './db/';
$path = $dir . 'index.list';

$handle = fopen($path, "r");
$content = fread($handle, filesize($path));
fclose($handle);

$pllist = explode("\n", $content);
?>


<html lang="fr" class="has-text-danger-light has-background-dark">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta property="og:title" content="Lecteur MiYT - Client YouTube alternatif">
    <meta property="od:description" content="Objectif: permettre la lecture d'une vidéo / playliste YT (en mode aléatoire quelque soit
    sa taille) directement depuis la barre de favoris sans installation requise.">
    <meta name="description" content="Objectif: permettre la lecture d'une vidéo / playliste YT (en mode aléatoire quelque soit
    sa taille) directement depuis la barre de favoris sans installation requise.">
    
    <link rel="manifest" href="https://mialaprog.github.io/MiYT/lib/MiYT.webmanifest">

    <link rel="stylesheet" href="https://mialaprog.github.io/MiYT/ext/bulma.min.css">

    <link rel="stylesheet" href="https://mialaprog.github.io/MiYT/lib/style.css">
    <link rel="stylesheet" href="https://mialaprog.github.io/MiYT/ext/fonts.css">
    <!-- Copyright Google - All right reserved -->
    <!-- <script type="text/javascript" src="_lib/script.js?v=321"></script> -->


    <title>Accueil || Lecteur MiYT</title>
    <link rel="icon" href="https://mialaprog.github.io/MiYT/lib/logo%20MiYT%20192x192.png" type="image/png">

    <script type="text/javascript" src="https://mialaprog.github.io/MiYT/server/idx.js"></script>
    <script type="text/javascript" src="https://mialaprog.github.io/MiYT/lib/stop_pub.js"></script>

    <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
</head>

<body>
    <h4>Ce site est prévu pour un usage educatif uniquement.</h4>
    <div class="content">
        <div id="listoflist" class="is-hidden"><?php echo implode("¤*¤", $pllist); ?></div>
        <div class="block">
            <div class="columns is-desktop is-variable is-8">
                <div class="column has-text-danger-light has-background-dark" id="playlists">
                    <!-- <div class="box loading">
                        <progress class="progress is-small is-info" max="100">15%</progress>
                        <h1>Lecteur multimédia MialaYT</h1>
                        <h2>Dernières playlist jouées (veuillez activer les popups depuis ce site: miala.000webhostapp.com): </h2>
                        <ul>
                            <?php
                            // $i = 0;
                            // foreach ($pllist as $pl) {
                            //     if ($i % 2 === 1) {
                            //         $name = $pllist[$i - 1];
                            //         echo '<li><a href="https://yt.mi.42web.io/www.php?list=' . $pl . '&title=' . $name . '">' . $name . '</a></li>';
                            //     }
                            //     $i += 1;
                            // }
                            ?>
                        </ul>
                    </div> -->
                </div>
                
                <div class="column has-text-danger-light has-background-dark">
                    <iframe width="100%" height="100%" src="https://mialaprog.github.io/MiYT/" style="border-radius: 0.25rem;"></iframe>
                </div>
            </div>
        </div>
    </div>

</body>

</html>
