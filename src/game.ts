import "./style.css";
import Bird from "./bird";
// import Pipe from "./pipe";
import Base from "./base";
import gameOverImg from "./assets/images/gameover.png";
import message from "./assets/images/message.png";
import Point from "./point";

class Game {
  public readonly canvas: HTMLCanvasElement;
  public readonly ctx: CanvasRenderingContext2D;
  public bird: Bird;
  // public pipes: Pipe;
  public base: Base;
  public point: Point;
  public frames = 0;
  public score = 0;
  public gameOver = false;
  public started = false;
  public width: number;
  public height: number = 0;
  public messageImg: HTMLImageElement | null = null;
  public hitAudio = document.querySelector<HTMLAudioElement>("#hit")!;

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
      -10 // jump
    );

    // this.pipes = new Pipe(
    //   this,
    //   50,
    //   150, //gap
    //   "#2e7d32"
    // );

    this.point = new Point(this, this.canvas.width / 2, 25);

    const messageImg = new Image();
    messageImg.src = message;
    this.messageImg = messageImg;

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
    } else {
      if (this.messageImg) {
        this.ctx.drawImage(
          this.messageImg,
          this.canvas.width / 2 - this.messageImg.width / 2,
          this.height / 2 - this.messageImg.height / 2
        );
      }
    }

    // this.pipes.draw();
    // this.pipes.update();

    if (this.gameOver) {
      this.stop();
      return;
    }

    this.point.draw();

    this.frames++;
    requestAnimationFrame(() => this.draw());
  }

  pause() {}

  restart() {
    this.bird = new Bird(
      this, // game
      this.width / 2, // x
      this.height / 2, // y
      50, // width
      35, // height
      0, // velocity
      0.5, // gravity
      -15 // jump
    );
    // this.pipes = new Pipe(this, 50, 150, "#2e7d32");
    this.score = 0;
    this.gameOver = false;
    this.frames = 0;
    this.draw();
  }

  stop() {
    this.hitAudio.play();

    const img = new Image();
    img.src = gameOverImg;

    img.onload = () => {
      this.ctx.drawImage(
        img,
        this.canvas.width / 2 - img.width / 2,
        this.canvas.height / 2 - img.height / 2
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

game.canvas.onclick = () => {
  if (game.gameOver) return;

  if (!game.started) {
    game.started = true;
  }
  game.bird.flap();
};

const app = document.querySelector<HTMLDivElement>("#app")!;

app.append(game.canvas);

export default Game;
