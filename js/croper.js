var CROP = {
  width: null,
  height: null,
  offsetTop: null,
  offsetLeft: null,
  top: 0,
  left: 0,
  startX: null,
  startY: null,
  src: null,
  b_element: null,
  event: null,
  crop: null,
  element: null,
  maxX: null,
  maxY: null,
  resizeX: 1,
  image: { w: 0, h: 0, type: 'width', val: 1 },
  size: { width: 0, height: 0 },
  result: function () {
    return {
      top: Math.round(CROP.top / CROP.resizeX),
      left: Math.round(CROP.left / CROP.resizeX),
      width: Math.round((CROP.width * CROP.image.val) / CROP.resizeX),
      height: Math.round((CROP.height * CROP.image.val) / CROP.resizeX),
      size: [CROP.size.width,CROP.size.height],
      image: CROP.src
    }
  },
  background: function () {
    var background = document.createElement('DIV')
    background.id = 'crop-background'

    this.b_element = background
    document.body.appendChild(background)

    background.onmousedown = function (e) {
      e.stopPropagation()
      if (e.target.id == 'crop-background') {
        this.outerHTML = ''
        CROP.crop = null
      }
    }
  },
  area: function (w, h, func) {
    this.background()
    var div_area = document.createElement('DIV')
    CROP.size.width = w
    CROP.size.height = h
    var button = document.createElement('BUTTON')
    button.innerHTML = 'kadruj'
    button.onclick = func

    var area = document.createElement('IMG')
    area.src = this.src

    div_area.appendChild(area)
    div_area.appendChild(button)

    area.onload = function () {
      var maxS = window.innerWidth + window.innerHeight
      var S = area.width + area.height

      if (maxS < S) {
        // div_area.style['max-width'] = '80vw';
        // div_area.style['max-height'] = '80vh';
        // div_area.style['overflow'] = 'auto';
        if(area.width >= area.height){
          area.style['max-width'] = '80vw'
          area.style['max-height'] = '100%'
          CROP.resizeX = area.width / area.naturalWidth
        }else{
          area.style['max-width'] = '100%'
          area.style['max-height'] = '80vh'
          CROP.resizeX = area.height / area.naturalHeight
        }



      }
      div_area.style['position'] = 'absolute'
      div_area.style['z-index'] = 1000
      div_area.style['width'] = area.width + 'px'
      div_area.style['height'] = area.height + 'px'
      CROP.maxX = area.width
      CROP.maxY = area.height
      div_area.style['top'] = 0
      div_area.style['bottom'] = 0
      div_area.style['left'] = 0
      div_area.style['right'] = 0
      div_area.style['margin'] = 'auto'
      div_area.style['box-shadow'] = '1px 1px 2px rgba(0, 0, 0, 0.54)'

      CROP.image.w = area.width
      CROP.image.h = area.height
      w = w * CROP.resizeX
      h = h * CROP.resizeX

      CROP.click(div_area, w, h)
    }

    this.b_element.insertAdjacentElement('beforeEnd', div_area)
  },
  inicialize: function (src, w, h, f) {
    CROP.src = src
    CROP.area(w, h, f)
    document.addEventListener(
      'mouseup',
      function () {
        CROP.event = false
      },
      true
    )
  },
  init: function () {
    var d = document

    CROP.crop.addEventListener(
      'mousedown',
      function (e) {
        CROP.event = 'move'
        CROP.offsetLeft = e.target.offsetLeft - e.clientX
        CROP.offsetTop = e.target.offsetTop - e.clientY

        CROP.move()
      },
      false
    )

    d.querySelector('.rb').addEventListener(
      'mousedown',
      function (e) {
        e.stopPropagation()
        CROP.event = 'resize'
        CROP.offsetLeft = e.target.offsetLeft - e.clientX
        CROP.offsetTop = e.target.offsetTop - e.clientY

        CROP.startX = e.clientX
        CROP.startY = e.clientY

        CROP.resize()
      },
      false
    )
  },
  move: function () {
    document.addEventListener(
      'mousemove',
      function (e) {
        if (CROP.event === 'move') {
          console.log(e)
          CROP.left = e.clientX + CROP.offsetLeft
          CROP.top = e.clientY + CROP.offsetTop

          CROP.left = CROP.left > 0 ? CROP.left : 0
          CROP.top = CROP.top > 0 ? CROP.top : 0

          CROP.left =
            CROP.left + (CROP.width* CROP.image.val )< CROP.maxX
              ? CROP.left
              : CROP.maxX - CROP.width* CROP.image.val
          CROP.top =
            CROP.top + (CROP.height* CROP.image.val) < CROP.maxY
              ? CROP.top
              : CROP.maxY - CROP.height* CROP.image.val

          CROP.crop.style.left = CROP.left + 'px'
          CROP.crop.style.top = CROP.top + 'px'
        }
      },
      false
    )
  },
  resize: function () {
    document.addEventListener(
      'mousemove',
      function (e) {
        if (CROP.event == 'resize') {
          var x = e.clientX - CROP.startX
          CROP.startX = e.clientX

          var y = e.clientY - CROP.startY
          CROP.startY = e.clientY

          CROP.width =
            CROP.width + x + CROP.left <= CROP.maxX
              ? CROP.width + x
              : CROP.width
          CROP.height =
            CROP.height + y + CROP.top <= CROP.maxY
              ? CROP.height + y
              : CROP.height

          CROP.crop.style.width = CROP.width + 'px'
          CROP.crop.style.height = CROP.height + 'px'
        }
      },
      false
    )
  },
  click: function (element, w, h) {
    element.querySelector('img').onclick = function (e) {
      e.stopPropagation()

      var d = document

      if (CROP.crop == null) {
        var crop_area = d.createElement('DIV')
        crop_area.id = 'crop-area'

        var lt = d.createElement('a')
        lt.className = 'crop-resize lt'
        var rt = d.createElement('a')
        rt.className = 'crop-resize rt'
        var lb = d.createElement('a')
        lb.className = 'crop-resize lb'
        var rb = d.createElement('a')
        rb.className = 'crop-resize rb'

        crop_area.insertAdjacentElement('beforeEnd', rb)
        crop_area.insertAdjacentElement('beforeEnd', lb)
        crop_area.insertAdjacentElement('beforeEnd', rt)
        crop_area.insertAdjacentElement('beforeEnd', lt)

        if (CROP.image.w >= CROP.image.h) {
          CROP.image.val = CROP.image.h / h
          if (w * CROP.image.val > CROP.image.w) {
            CROP.image.val = CROP.image.w / w
          }
        } else {
          CROP.image.val = CROP.image.w / w
          CROP.image.type = 'height'
        }
        var area_w = w * CROP.image.val,
          area_h = h * CROP.image.val

        crop_area.style['width'] = area_w + 'px'
        crop_area.style['height'] = area_h + 'px'

        crop_area.style['top'] =
          'calc(50% - ' + area_h * 0.5 + 'px)'
        crop_area.style['left'] =
          'calc(50% - ' + area_w * 0.5 + 'px)'

        CROP.crop = crop_area
        element.insertAdjacentElement('beforeEnd', crop_area)
console.log(crop_area)
        CROP.top = crop_area.offsetTop * CROP.resizeX
        CROP.left = crop_area.offsetLeft * CROP.resizeX
        CROP.width = w
        CROP.height = h

        CROP.init()
      }
    }
  },
  close: function () {
    document.querySelector('#crop-background').outerHTML = ''
    CROP.crop = null
  }
}
