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

    <link rel="stylesheet" href="https://mialaprog.github.io/MiYT/ext/bulma.min.css">

    <link rel="stylesheet" href="https://mialaprog.github.io/MiYT/lib/style.css">
    <link rel="stylesheet" href="https://mialaprog.github.io/MiYT/ext/fonts.css">
    <!-- Copyright Google - All right reserved -->
    <!-- <script type="text/javascript" src="_lib/script.js?v=321"></script> -->


    <title>Accueil || Lecteur MiYT</title>
    <link rel="icon" href="https://mialaprog.github.io/MiYT/lib/icon.png" type="image/png">

    <script type="text/javascript" src="https://mialaprog.github.io/MiYT/server/idx.js"></script>

    <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
</head>

<body>
    <h4>Ce site est prévu pour un usage privé et educatif uniquement. Si le développeur ne vous a donné l'autorisation
        de le consulter, veuillez le
        quitter immediatement.</h4>
    <div class="content">
        <div id="listoflist" class="is-hidden"><?php echo implode("¤*¤", $pllist); ?></div>
        <div class="block">
            <div class="columns is-desktop is-variable is-8">
                <div class="column has-text-danger-light has-background-dark list-container scroll" id="playlists">
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
                            //         echo '<li><a href="https://miala.000webhostapp.com/YT/www.php?list=' . $pl . '&title=' . $name . '">' . $name . '</a></li>';
                            //     }
                            //     $i += 1;
                            // }
                            ?>
                        </ul>
                    </div> -->
                </div>
                
                <div class="column has-text-danger-light has-background-dark">
                    <iframe width="100%" height="100%" src="https://mialaprog.github.io/MiYT/"></iframe>
                </div>
            </div>
        </div>
    </div>

</body>

</html>
