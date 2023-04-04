let cnvs = document.getElementById("canvas");
let ctx = cnvs.getContext("2d");


let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

let fly = new Audio();
let score_audio = new Audio();

fly.src = "js_game_audio/fly.mp3";
score_audio.src = "js_game_audio/score.mp3";

document.addEventListener("keydown", moveUp);

function moveUp() {
  yPos -= 25;
  fly.play();
}

let pipe = [];

pipe[0] = {
  x: cnvs.width,
  y: 0,
};

let gap = 90;
let xPos = 10;
let yPos = 150;
let grav = 1.5;
let score = 0;

function draw() {
  ctx.drawImage(bg, 0, 0);

  for (let i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

    pipe[i].x--;

    if (pipe[i].x == 125) {
      pipe.push({
        x: cnvs.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
      });
    }

    if (
      (xPos + bird.width >= pipe[i].x &&
        xPos <= pipe[i].x + pipeUp.width &&
        (yPos <= pipe[i].y + pipeUp.height ||
          yPos + bird.height >= pipe[i].y + pipe.height + gap)) ||
      yPos + bird.height >= cnvs.height - fg.height
    ) {
      location.reload();
    }

    if (pipe[i].x == 5) {
      score++;
      score_audio.play();
    }
  }

  ctx.drawImage(fg, 0, cnvs.height - fg.height);
  ctx.drawImage(bird, xPos, yPos);

  yPos += grav;

  ctx.fillStyle = "#000";
  ctx.font = "24px Verdana";
  ctx.fillText("Score:" + score, 10, cnvs.height - 20);

  requestAnimationFrame(draw);
}

pipeBottom.onload = draw;
