class Moov {
  constructor() {
    //Repeat Element

    //Set Canvas
    var container = container;
    var canvas = canvas;

    // Animate
    var motion = motion;
    var direction = direction;
  }

  // Moov.js Methods

  // RepeatElement(repeatElementId, containerElementId, reps, pxBetween) {
  //   var vp = document.getElementById(containerElementId);
  //   var line = document.getElementById(repeatElementId);
  //   var newLine = line.cloneNode(true);
  //   console.log(line);
  //   var x1 = -350;
  //   var x2 = 400;

  //   var i = 0;
  //   while (i < reps) {
  //     newLine.setAttribute('id', 'draw');

  //     var distance = Math.floor(Math.random() * pxBetween);
  //     x1 += distance;
  //     x2 += distance;
  //     var d = 'M'+ x1 + ',0 L' + x2 + ',1000';
  //     newLine.setAttribute('d', d);
  //     console.log(d);

  //     // newLine.setAttribute('x1', Number(newLine.attributes.x1.nodeValue) + distance);
  //     // newLine.setAttribute('x2', Number(newLine.attributes.x2.nodeValue) + distance + 30);

  //     vp.appendChild(newLine);

  //     newLine = newLine.cloneNode(true);
  //     i++;
  //   }
  // }






// SWIPE

  // Swipe optional values
  // var optional = {
  //   swipe_distance: {
  //     min_x: undefined,
  //     max_x: undefined,
  //     min_y: undefined,
  //     max_y: undefined
  //   },
  //   sticky: false,
  // }


  Swipe(elementId, swipeDirection, callbackFn, optional) {
    var swipe_line = {
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0
    }

    // let min_x = optional.swipe_distance.min_x !== undefined ? optional.swipe_distance.min_x : 30;  //min x swipe for horizontal swipe
    // let max_x = optional.swipe_distance.max_x !== undefined ? optional.swipe_distance.max_x : 30;  //max x difference for vertical swipe
    // let min_y = optional.swipe_distance.min_y !== undefined ? optional.swipe_distance.min_y : 50;  //min y swipe for vertical swipe
    // let max_y = optional.swipe_distance.max_y !== undefined ? optional.swipe_distance.max_y : 60;  //max y difference for horizontal swipe
    var direction = '';
    let deltaMin = 90;
    let element = document.getElementById(elementId);

    // touch events for most browsers
    function _touchEvents() {
      element.addEventListener('touchstart',function(e){
        var t = e.touches[0];
        swipe_line.startX = t.screenX; 
        swipe_line.startY = t.screenY;
      },false);

      element.addEventListener('touchmove',function(e){
        e.preventDefault();
        var t = e.touches[0];
        swipe_line.endX = t.screenX;
        swipe_line.endY = t.screenY;
        if (optional.sticky) {
          element.style.top = (Number(element.style.top) + (swipe_line.endY - swipe_line.startY)).toString();
          element.style.left = (Number(element.style.top) + (swipe_line.endY - swipe_line.startY)).toString();
        }
      },false);

      element.addEventListener('touchend',function(e){
        let deltaX = swipe_line.endX - swipe_line.startX;
        let deltaY = swipe_line.endY - swipe_line.startY;

        // Minimum swipe distance
        if (deltaX ** 2 + deltaY ** 2 < deltaMin ** 2) {
          return
        }
        // detect horizontal
        if (deltaY === 0 || Math.abs(deltaX / deltaY) > 1) {
          direction = deltaX > 0 ? 'r' : 'l';
        }
        else {
          direction = deltaY > 0 ? 'u' : 'd';
        }

        if (direction && typeof callback === 'function') {
          callbackFn(elementId, direction);
        }

        direction = null;
      },false);  

      // touch events for Firefox
      function _mozTouchEvents() {
        element.addEventListener('MozTouchDown',function(e){
          var t = e.touches[0];
          swipe_line.startX = t.screenX; 
          swipe_line.startY = t.screenY;
        },false);
        element.addEventListener('MozTouchMove',function(e){
          e.preventDefault();
          var t = e.touches[0];
          swipe_line.endX = t.screenX;
          swipe_line.endY = t.screenY;
          if (optional.sticky) {
            element.style.top = (Number(element.style.top) + (swipe_line.endY - swipe_line.startY)).toString();
            element.style.left = (Number(element.style.top) + (swipe_line.endY - swipe_line.startY)).toString();
          }
        },false);
        element.addEventListener('MozTouchUp',function(e){
          let deltaX = swipe_line.endX - swipe_line.startX;
          let deltaY = swipe_line.endY - swipe_line.startY;

          // Minimum swipe distance
          if (deltaX ** 2 + deltaY ** 2 < deltaMin ** 2) {
            return
          }
          // detect horizontal
          if (deltaY === 0 || Math.abs(deltaX / deltaY) > 1) {
            direction = deltaX > 0 ? 'r' : 'l';
          }
          else {
            direction = deltaY > 0 ? 'u' : 'd';
          }

          if (direction && typeof callback === 'function') {
            if (direction == swipeDirection) {
              callbackFn(elementId, direction);
            }
          }

          direction = null;
        },false);  
      }

      _touchEvents();
      _mozTouchEvents();
    }
  }






  ////////////////////////////////////////////////////////////////
  //////////// TODO: FURTHER DEVELOP MOOV.js /////////////////////

  SetCanvas(width, height, containerId) {
    this.container = document.getElementById(containerId);
    this.canvas = document.createElementNS('http://www.w3.org/1999/xhtml.org/2000/svg', 'svg');
    this.canvas.setAttribute('width', width);
    this.canvas.setAttribute('height', height);
    this.container.appendChild(canvas);
  }

  Animate(motion, direction) {
    motion = undefined;
    direction = undefined;
  }
}

//var m = new Moov();

//m.RepeatElement('one', 'vp', 25, 100);