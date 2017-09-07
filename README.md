# crop-image - Patryk Pawlicki 06-09-2017

## przykład
```

<div id="images-area" style="z-index:99;">
    <img src="images/Screenshot_2.png" alt="" id="img1">
</div>

<div id="crop-background"></div>

<script>
    $(document).ready(function () {
                crop.popup('images-area', {width: 250, height: 100}, '4:3', function () {
                    $.ajax({
                        url: '/index.php',
                        method: 'POST',
                        data: d = crop.crop(),

                    }).done(function () {
                        alert('wycieto');
                    });
                });                
            });
</script>

//przykładowe wycinanie

<?php
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $report = 0;
            $output = 0;
            exec("convert -crop " . $_POST['width'] . "x" . $_POST['height'] . "+" . $_POST['x'] . "+" . $_POST['y'] . " images/Screenshot_2.png images/test.png", $output, $report);
            
            exit;
        }
        ?>

```