/**
 * croper.js
 * 
 */


var ciach = {
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
        ciach.name = name;
        ciach.element = document.getElementById(ciach.name);
        ciach.element.onclick = function () {
            if (document.getElementById('crop-area') === null) {
                ciach.set(param);
                ciach.init();


                ciach.element.insertAdjacentHTML('beforeend', '<button id="cro">kadruj</button>');
                document.getElementById('crop-background').className = 'max';
                document.getElementById('crop-background').appendChild(ciach.element);
            }



        }
    },
    crop: function () {
        var post_data = {
            x: ciach.left,
            y: ciach.top,
            width: ciach.width,
            height: ciach.height,
        }

        return post_data;
    },
    makecrop: function () {
        document.getElementById('new').innerHTML = "";
        document.getElementById('new').appendChild(ciach.canvascut('img', ciach.left, ciach.top, ciach.width, ciach.height));
    },
    canvascut: function (img, x, y, w, h) {
        var image = document.querySelector('#' + ciach.name + ' > img');
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

        ciach.el.addEventListener('mousedown', function (e) {
            ciach.event = 'move';

            ciach.offsetLeft = ciach.el.offsetLeft - e.clientX;
            ciach.offsetTop = ciach.el.offsetTop - e.clientY;
            ciach.move();

        }, true);

        ciach.res.addEventListener('mousedown', function (e) {
            ciach.event = 'resize';

            ciach.offsetLeft = ciach.el.offsetLeft - e.clientX;
            ciach.offsetTop = ciach.el.offsetTop - e.clientY;
            ciach.resize();

        }, true);

        document.addEventListener('mouseup', function () {
            ciach.event = false;
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
            if (ciach.event == 'resize') {

                var x = e.clientX;
                var y = e.clientY;

                ciach.y = (y + ciach.offsetTop) - ciach.height * 0.5;
                ciach.x = (x + ciach.offsetLeft) - ciach.width * 0.5;

                ciach.top = (ciach.top == null) ? ciach.y : ciach.top;
                ciach.left = (ciach.left == null) ? ciach.x : ciach.left;

                ciach.width += e.movementX;
                ciach.height += e.movementY;
                document.getElementById('size').innerHTML = ciach.width + 'x' + ciach.height;
                ciach.el.style.width = ciach.width + 'px';
                ciach.el.style.height = ciach.height + 'px';
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
        ciach.el.addEventListener('mousemove', function (e) {
            e.preventDefault();
            if (ciach.event == 'move') {

                var x = e.clientX;
                var y = e.clientY;

                ciach.y = (y + ciach.offsetTop);
                ciach.x = (x + ciach.offsetLeft);

                ciach.left = ciach.x - (ciach.width * 0.5);
                ciach.top = ciach.y - (ciach.height * 0.5);

                ciach.el.style.left = ciach.x + 'px';
                ciach.el.style.top = ciach.y + 'px';

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
        ciach.element.style.width = document.querySelector('#images-area > img').naturalWidth + 'px';
        ciach.element.style.height = document.querySelector('#images-area > img').naturalHeight + 'px';
        ciach.element.insertAdjacentHTML('beforeend', select_area);

        ciach.el = document.getElementById('crop-area');

        for (i in mystyle) {
            ciach[i] = mystyle[i];
            ciach.el.style[i] = (i == 'width' || i == 'height') ? mystyle[i] + 'px' : mystyle[i];
        }

        ciach.el.style.top = '50%';
        ciach.el.style.left = '50%';

        ciach.res = document.getElementById('rb');
        document.getElementById('size').innerHTML = ciach.width + 'x' + ciach.height;

        ciach.top = ciach.el.offsetTop - (ciach.height * 0.5);
        ciach.left = ciach.el.offsetLeft - (ciach.width * 0.5);
    },
}