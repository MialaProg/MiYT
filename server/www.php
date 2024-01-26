<?php



if (empty($_GET['list'])):

    header('Location: ./index.php?loaderr=nolist');
else:

    $listID = $_GET['list'];
    $path = './db/' . $listID . '.Mpl';

    if (!file_exists($path)):
        header('Location: ./index.php?loaderr=nofile');
    else:


        $handle = fopen($path, "r");
        $my_playlist = fread($handle, filesize($path));
        fclose($handle);



        ?>

        <html>

            <head>
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
endif;