import "./style.css";
import Bird from "./bird";
import Pipe from "./pipe";
import Base from "./base";
import gameOver from "./assets/images/gameover.png";
import message from "./assets/images/message.png";
import Point from "./point";

class Game {
  public readonly canvas: HTMLCanvasElement;
  public readonly ctx: CanvasRenderingContext2D;
  public bird: Bird;
  public pipes: Pipe;
  public base: Base;
  public point: Point;
  public frames = 0;
  public score = 0;
  public gameOver = false;
  public started = false;
  public width: number;
  public height: number;
  public messageImg = new Image();
  public hitAudio = document.querySelector<HTMLAudioElement>("#hit")!;
  public dieAudio = document.querySelector<HTMLAudioElement>("#die")!;
  public animationFrame: number | null = null;
  public speed: number = 2.5;

  constructor(width: number, height: number) {
    this.canvas = this.createCanvas(width, height);
    this.ctx = this.canvas.getContext("2d")!;
    this.width = width;

    this.base = new Base(this, width, height - 512);

    this.height = this.canvas.height - this.base.height;

    this.bird = new Bird(
      this, // game
      100, // x
      this.height / 2 + 25, // y
      50, // width
      35, // height
      0, // velocity
      0.5, // gravity
      -8 // jump
    );

    this.pipes = new Pipe(
      this,
      50,
      125 // gap
    );

    this.point = new Point(this, this.canvas.width / 2, 25);

    this.messageImg.src = message;

    this.draw();
  }

  createCanvas(width: number, height: number) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.base.draw();
    this.base.update();

    this.bird.draw();

    if (this.started) {
      this.bird.update();
      this.pipes.draw();
      this.pipes.update();
    } else {
      if (this.messageImg) {
        this.ctx.drawImage(
          this.messageImg,
          this.canvas.width / 2 - this.messageImg.width / 2,
          this.height / 2 - this.messageImg.height / 2
        );
      }
    }

    if (this.gameOver) {
      this.stop();
      return;
    }

    // this.ctx.strokeStyle = "rgb(82,49,3)";
    // this.ctx.lineWidth = 5;
    // this.ctx.strokeRect(20, 25, 30, 30);

    // this.ctx.fillStyle = "rgb(224,97,25)";
    // this.ctx.fillRect(20, 25, 30, 30);

    this.point.draw();

    this.frames++;
    const animationFrame = requestAnimationFrame(() => this.draw());
    this.animationFrame = animationFrame;
  }

  pause() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  restart() {
    this.bird = new Bird(
      this, // game
      100, // x
      this.height / 2 + 25, // y
      50, // width
      35, // height
      0, // velocity
      0.5, // gravity
      -8 // jump
    );
    this.pipes = new Pipe(
      this,
      50,
      125 // gap
    );
    this.score = 0;
    this.gameOver = false;
    this.frames = 0;

    this.draw();
  }

  stop() {
    this.hitAudio.play();

    this.dieAudio.play();

    const gameOverImg = new Image();
    gameOverImg.src = gameOver;

    gameOverImg.onload = () => {
      this.ctx.drawImage(
        gameOverImg,
        this.canvas.width / 2 - gameOverImg.width / 2,
        this.canvas.height / 2 - gameOverImg.height / 2
      );
    };
  }
}

const game = new Game(400, 600);

window.addEventListener("keydown", (e) => {
  if (game.gameOver) return;
  if (e.key === " ") {
    if (!game.started) {
      game.started = true;
    }
    game.bird.flap();
  }
});

game.canvas.onmousedown = () => {
  if (game.gameOver) return;

  if (!game.started) {
    game.started = true;
  }
  game.bird.flap();
};

game.canvas.ontouchstart = () => {
  if (game.gameOver) return;

  if (!game.started) {
    game.started = true;
  }
  game.bird.flap();
};

const app = document.querySelector<HTMLDivElement>("#app")!;

app.append(game.canvas);

export default Game;
