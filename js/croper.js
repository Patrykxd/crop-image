/**
 * croper.js
 * 
 */


var crop = {
    top: null,
    left: null,
    width: 100,
    height: 50,
    offsetTop: null,
    offsetLeft: null,
    x: 0,
    y: 0,
    startX: 0,
    startY: 0,
    event: false,
    element: false,
    name: null,
    popup: function (name, param, method) {
        crop.name = name;
        crop.element = document.getElementById(crop.name);
        crop.element.onclick = function () {
            if (document.getElementById('crop-area') === null) {
                crop.set(param);
                crop.init();


                crop.element.insertAdjacentHTML('beforeend', '<button id="cro">kadruj</button>');
                document.getElementById('crop-background').className = 'max';
                document.getElementById('crop-background').appendChild(crop.element);
            }



        }
    },
    crop: function () {
        var post_data = {
            x: crop.left,
            y: crop.top,
            width: crop.width,
            height: crop.height,
        }

        return post_data;
    },
    makecrop: function () {
        document.getElementById('new').innerHTML = "";
        document.getElementById('new').appendChild(crop.canvascut('img', crop.left, crop.top, crop.width, crop.height));
    },
    canvascut: function (img, x, y, w, h) {
        var image = document.querySelector('#' + crop.name + ' > img');
        var element = document.createElement("canvas");
        var newimage = document.createElement("img");
        var convert = element.getContext("2d");

        element.width = w;
        element.height = h;

        convert.drawImage(image, x, y, w, h, 0, 0, w, h);
        newimage.src = element.toDataURL("image/png");
        document.getElementById("new").href = element.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
        document.getElementById("new").download = 'crop_test.png';
        return newimage;
        ;
    },
    init: function () {

        crop.el.addEventListener('mousedown', function (e) {
            crop.event = 'move';

            crop.offsetLeft = crop.el.offsetLeft - e.clientX;
            crop.offsetTop = crop.el.offsetTop - e.clientY;
            crop.move();

        }, true);

        crop.res.addEventListener('mousedown', function (e) {
            crop.event = 'resize';

            crop.offsetLeft = crop.el.offsetLeft - e.clientX;
            crop.offsetTop = crop.el.offsetTop - e.clientY;
            crop.resize();

        }, true);

        document.addEventListener('mouseup', function () {
            crop.event = false;
        }, true);

    },
    resize: function (e) {
        /**
         * 
         * @param {type} e
         * @returns {undefined}
         * zmiana rozmiaru select area
         */
        document.addEventListener('mousemove', function (e) {
            e.preventDefault();
            if (crop.event == 'resize') {

                var x = e.clientX;
                var y = e.clientY;

                crop.y = (y + crop.offsetTop) - crop.height * 0.5;
                crop.x = (x + crop.offsetLeft) - crop.width * 0.5;

                crop.top = (crop.top == null) ? crop.y : crop.top;
                crop.left = (crop.left == null) ? crop.x : crop.left;

                crop.width += e.movementX;
                crop.height += e.movementY;
                document.getElementById('size').innerHTML = crop.width + 'x' + crop.height;
                crop.el.style.width = crop.width + 'px';
                crop.el.style.height = crop.height + 'px';
                console.log(e);
            }
        }, false);
    },
    move: function () {
        /**
         * 
         * @param {type} event
         * @returns {undefined}
         * poruszanie select_area
         */
        crop.el.addEventListener('mousemove', function (e) {
            e.preventDefault();
            if (crop.event == 'move') {

                var x = e.clientX;
                var y = e.clientY;

                crop.y = (y + crop.offsetTop);
                crop.x = (x + crop.offsetLeft);

                crop.left = crop.x - (crop.width * 0.5);
                crop.top = crop.y - (crop.height * 0.5);

                crop.el.style.left = crop.x + 'px';
                crop.el.style.top = crop.y + 'px';

                console.log(e);

            }
        }, false);

    },
    set: function (mystyle) {
        /**
         * 
         * @type Array tablica styli
         * select_area obszar wycięcia 
         */


        var select_area = '<div id="crop-area" draggable="true">' +
                '<a class="crop-resize lt" ></a>' +
                '<a class="crop-resize rt" ></a>' +
                '<a class="crop-resize lb" ></a>' +
                '<a class="crop-resize rb" id="rb"></a>' +
                '<div id="size"></div>' +
                '<span class="crop-height"></span>' +
                '<span class="crop-width"></span>' +
                '</div>';
        crop.element.style.width = document.querySelector('#images-area > img').naturalWidth + 'px';
        crop.element.style.height = document.querySelector('#images-area > img').naturalHeight + 'px';
        crop.element.insertAdjacentHTML('beforeend', select_area);

        crop.el = document.getElementById('crop-area');

        for (i in mystyle) {
            crop[i] = mystyle[i];
            crop.el.style[i] = (i == 'width' || i == 'height') ? mystyle[i] + 'px' : mystyle[i];
        }

        crop.el.style.top = '50%';
        crop.el.style.left = '50%';

        crop.res = document.getElementById('rb');
        document.getElementById('size').innerHTML = crop.width + 'x' + crop.height;

        crop.top = crop.el.offsetTop - (crop.height * 0.5);
        crop.left = crop.el.offsetLeft - (crop.width * 0.5);
    },
}