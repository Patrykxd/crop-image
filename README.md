# crop-image - Patryk Pawlicki 06-09-2017

## przykład
```

<a href="/images/test.png" class="crop">kadruj png</a> 

                    <script>
                        $(document).ready(function () {

                            $('.crop').click(function (e) {
                                e.preventDefault();
                                CROP.inicialize(this.href, 200, 100, function () {
                                    console.log(CROP.result());
                                });
                            });
                        });
                        

                    </script>

```