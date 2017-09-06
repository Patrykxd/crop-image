# crop-image - Patryk Pawlicki 06-09-2017

przykład 
```

<div id="images-area" style="z-index:99;">
    <img src="images/Screenshot_2.png" alt="" id="img1">
</div>

<div id="crop-background"></div>

<script>
    $(document).ready(function () {
		// podajemy szerokosc i wysokosc wycinanego obszaru
        crop.popup('images-area', {width: 250, height: 100});
                
    });
</script>

```
