<?php



if (empty($_GET['list'])):

    header('Location: ./index.php?loaderr=nolist');
else:

    $listID = $_GET['list'];
    $path = './db/' . $listID . '.Mpl';

    
    if (!empty($_GET['noreload'])){
        $reload = False;
    }else if (empty($_GET['time']) || !empty($_GET['reload'])){
        $reload = True;
    }else{
        $reload = ((time() - $_GET['time']) > 3888000);
    }

    clearstatcache();
    
    if ($reload && file_exists($path)){
        $handle = fopen($path, "r");
        $my_playlist = fread($handle, filesize($path));
        fclose($handle);
    }else{
        $my_playlist = 'toBEloaded';
    }



        ?>

        <html>

            <head>
                <link rel="icon" href="https://mialaprog.github.io/MiYT/lib/icon.png" type="image/png">
            </head>

            <body>
                <p class="is-hidden" id="my_playlist">
                    <?php echo $my_playlist; ?>
                </p>
                <?php
                if (!empty($_GET['title'])){
                    echo '
                    <p class="is-hidden" id="pl_name">
                        '.$_GET['title'].'
                    </p>';
                }
                
                ?>
                
                
                
                
                <script type="text/javascript" id="WatcherMi" src="https://mialaprog.github.io/MiYT/watcher.js"></script>  
            </body>
                
        </html>

        <?php



endif;