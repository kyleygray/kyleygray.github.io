// create a canvas element
var canvas = document.createElement("canvas");
var c = getComputedStyle(document.getElementsByTagName('html')[0], '').getPropertyValue('--neutralcolor');

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutationRecord) {
        c = getComputedStyle(document.getElementsByTagName('html')[0], '').getPropertyValue('--neutralcolor');
    });
});

var target = document.getElementsByTagName('html')[0];
observer.observe(target, { attributes : true, attributeFilter : ['style'] });

// attach element to DOM
document.getElementById("canvashook").appendChild(canvas);

// get the canvas context (this is the part we draw to)
var ctx = canvas.getContext("2d");
var bugs = [];
var bugCounter = 0;

function setup() {
  // setup the canvas size to match the window
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // set the 0,0 point to the middle of the canvas
  ctx.translate(canvas.width / 2, canvas.height / 2);
}

window.setInterval(function() {
  bugs.push(new Bug(randomRange(-canvas.width/2,canvas.width/2), randomRange(-canvas.height/2, canvas.height/2)));
  // bugs.push(new Bug(0,0));
  if (bugs.length > 10) {
    // bugs.splice(0,1);
    bugs[bugCounter].isAlive = false;
    bugCounter++;
  }
}, 100);

function draw() { //Do the drawing
  ctx.clearRect(-canvas.width, -canvas.height, canvas.width*2, canvas.height*2);
  for (var i = 0; i < bugs.length; i++) {
    if (bugs[i] != null) {
      bugs[i].update();
      bugs[i].draw();
    }
  }
  window.requestAnimationFrame(function(){draw()});
}

// start enterFrame loop
window.requestAnimationFrame(draw);

// force running setup
setup();

// re-setup canvas when the size of the window changes
window.addEventListener("resize", setup);

// sin(pi) == 0
// cos(pi) == -1
// sin(2pi) == 0
// cos(2pi) == 1
// degrees to radians: {{ deg * (pi/180) = rad }}

function randomRange(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function Bug(x, y) {
  this.globalSpeed = 0.3;

  this.x = x;
  this.y = y;
  this.size = 5;
  this.opacity = 0;
  this.fade = 0.04;
  this.jitter = 20 * this.globalSpeed;
  this.speed = 1 * this.globalSpeed;
  this.deg = randomRange(0, 360);
  this.rad = 0;
  this.isAlive = true;
  this.isDead = false;
  this.update = function() {
    //update opacity
    if (this.isAlive) {
      this.opacity += this.fade;
    } else {
       this.opacity -= this.fade/4;
    }
    //update degrees
    this.deg += randomRange(this.jitter, -this.jitter);
    //convert degrees into radians
    this.rad = this.deg * (Math.PI/180);
    //update coordinates
    this.x += this.speed * (Math.cos(this.rad));
    this.y += this.speed * (Math.sin(this.rad));
  };
  this.draw = function() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.size, this.size);
    ctx.fillStyle = 'rgba(' + hexToRgb(c).r + ',' + hexToRgb(c).g + ',' + hexToRgb(c).b + ',' + this.opacity + ')';
    // ctx.fillStyle = "rgba(246,246,246," + this.opacity + ")";
    ctx.fill();
    if (!this.isAlive) {
      if (this.opacity <= 0) {
        this.isDead = true;
      }
      if (this.isDead) {
        this.die();
      }
    }
  };
  this.die = function() {
    let me = bugs.indexOf(this);
    delete bugs[me];
  };
}
