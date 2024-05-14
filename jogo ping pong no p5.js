let leftPaddle;
let rightPaddle;
let ball;

function setup() {
  createCanvas(600, 400);
  
  // Inicializa as paletas e a bola
  leftPaddle = new Paddle(true);
  rightPaddle = new Paddle(false);
  ball = new Ball();
}

function draw() {
  background(0);
  
  // Desenha as paletas e a bola
  leftPaddle.show();
  rightPaddle.show();
  ball.show();
  
  // Move as paletas
  leftPaddle.move();
  rightPaddle.move();
  
  // Move a bola e verifica colisões
  ball.move();
  ball.checkPaddleCollision(leftPaddle);
  ball.checkPaddleCollision(rightPaddle);
  ball.checkWallCollision();
  ball.updateScore();
}

class Paddle {
  constructor(isLeft) {
    this.w = 10;
    this.h = 80;
    this.y = height / 2 - this.h / 2;
    this.isLeft = isLeft;
    this.x = isLeft ? 0 : width - this.w;
    this.speed = 5;
  }
  
  show() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }
  
  move() {
    if (this.isLeft) {
      if (keyIsDown(87) && this.y > 0) {
        this.y -= this.speed;
      }
      if (keyIsDown(83) && this.y < height - this.h) {
        this.y += this.speed;
      }
    } else {
      if (keyIsDown(UP_ARROW) && this.y > 0) {
        this.y -= this.speed;
      }
      if (keyIsDown(DOWN_ARROW) && this.y < height - this.h) {
        this.y += this.speed;
      }
    }
  }
}

class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.radius = 10;
    this.xSpeed = 5;
    this.ySpeed = 5;
    this.scoreLeft = 0;
    this.scoreRight = 0;
  }
  
  show() {
    fill(255);
    ellipse(this.x, this.y, this.radius * 2);
    textSize(32);
    text(this.scoreLeft, 50, 50);
    text(this.scoreRight, width - 50, 50);
  }
  
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  
  checkPaddleCollision(paddle) {
    if (this.x - this.radius < paddle.x + paddle.w && 
        this.x + this.radius > paddle.x &&
        this.y - this.radius < paddle.y + paddle.h &&
        this.y + this.radius > paddle.y) {
      this.xSpeed *= -1;
    }
  }
  
  checkWallCollision() {
    if (this.y - this.radius < 0 || this.y + this.radius > height) {
      this.ySpeed *= -1;
    }
    if (this.x - this.radius < 0) {
      this.scoreRight++;
      this.reset();
    }
    if (this.x + this.radius > width) {
      this.scoreLeft++;
      this.reset();
    }
  }
  
  updateScore() {
    textSize(32);
    text(this.scoreLeft, 50, 50);
    text(this.scoreRight, width - 50, 50);
  }
  
  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = random([-5, 5]);
    this.ySpeed = random([-5, 5]);
  }
}
