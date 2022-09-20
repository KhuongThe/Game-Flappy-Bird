canvas = document.getElementById("game");
ctx = canvas.getContext("2d");

let hinhnenchinh = new Image();
let hinhchim = new Image();
let hinhongtren = new Image();
let hinhongduoi = new Image();
let tiengvocanh = new Audio();
let gameover = new Audio();
let andiem = new Audio();
hinhnenchinh.src = "images/anhbien2.jpg";
hinhchim.src = "images/bird.png";
hinhongtren.src = "images/ongtren.png";
hinhongduoi.src = "images/ongduoi.png";
tiengvocanh.src = "./Tiengvocanh.m4a";
gameover.src = "./Gameover.mp3";
andiem.src = "./An diem.mp3";
let score = 0;

let khoangcachhaiong = 130;
let vitribatdauongduoi;
let bird = {
  x: canvas.width / 4,
  y: canvas.height / 2,
};

let ong = [];
ong[0] = {
  x: canvas.width,
  y: 0,
};

// hinhnenchinh.onload = function(){
//     ctx.drawImage(hinhnenchinh, 0, 0);
// }
// hinhchim.onload = function(){
//     ctx.drawImage(hinhchim, 50, 220);
// }

function draw() {
  ctx.drawImage(hinhnenchinh, 0, 0);
  ctx.drawImage(hinhchim, bird.x, bird.y);

  for (let i = 0; i < ong.length; i++) {
    vitribatdauongduoi = hinhongtren.height + khoangcachhaiong;
    ctx.drawImage(hinhongtren, ong[i].x, ong[i].y);
    ctx.drawImage(hinhongduoi, ong[i].x, ong[i].y + vitribatdauongduoi);
    ong[i].x -= 2;
    if (ong[i].x == canvas.width / 2) {
      ong.push({
        x: canvas.width,
        y:
          Math.floor(Math.random() * hinhongtren.height + 15) - hinhongtren.height,
      });
    }
    if (ong[i] == 0) {
      ong.splice(0, 1);
    }
    if (ong[i].x == bird.x) {
      score += 10;
      andiem.play();
    }
    if((bird.x + hinhchim.width >= ong[i].x && bird.x <= ong[i].x + hinhongtren.width && bird.y <= ong[i].y + hinhongtren.height)
  || (bird.x + hinhchim.width >= ong[i].x && bird.x <= ong[i].x + hinhongtren.width && bird.y + hinhchim.height >= ong[i].y + vitribatdauongduoi)
      || (bird.x + hinhchim.width >= ong[i].x && bird.x <= ong[i].x + hinhongduoi.width && bird.y + hinhchim.height >= ong[i].y + vitribatdauongduoi)
      || (bird.x + hinhchim.width >= ong[i].x && bird.x <= ong[i].x + hinhongduoi.width && bird.y <= ong[i].y + hinhongtren.height)
    || bird.y <= 0 || bird.y + hinhchim.height >= canvas.height
    ){
      gameover.play();
      return;
      
     
    }
    ctx.font = "20px Arial";
    ctx.strokeStyle = "#ff0000";
    ctx.strokeText("Game by Thek", 20, 40);
    ctx.font = "40px Arial";
    ctx.strokeStyle = "#000";
    ctx.strokeText("Score: " + score, 400, 60);
  }

  requestAnimationFrame(draw);
  bird.y += 2;
}
function fly(){
  bird.y -= 50;
  tiengvocanh.play();
}
document.addEventListener("keydown", fly);
draw();
function playAgian(){
  location.reload();
}
