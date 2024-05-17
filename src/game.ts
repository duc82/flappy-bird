import "./style.css";
import Bird from "./bird";
import Letter from "./letter";
import Pipe from "./pipe";
import Base from "./base";

class Game {
  public readonly canvas: HTMLCanvasElement;
  public readonly ctx: CanvasRenderingContext2D;
  public bird: Bird;
  // public pipes: Pipe;
  public letter: Letter;
  public base: Base;
  public frames = 0;
  public score = 0;
  public gameOver = false;
  public started = false;
  public width: number;
  public height: number = 0;

  constructor(width: number, height: number) {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d")!;
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;

    this.base = new Base(this);

    this.bird = new Bird(
      this,
      50,
      this.canvas.height / 2,
      50,
      40,
      "#f4eb49",
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
    this.letter = new Letter(
      this,
      "40px Arial",
      "white",
      this.canvas.width / 2,
      100,
      "0"
    );
  }

  draw() {
    if (this.gameOver) {
      this.showResult();
      return;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.base.draw();
    this.base.update();

    this.bird.draw();
    this.bird.update();

    // this.pipes.draw();
    // this.pipes.update();

    this.letter.draw();
    this.letter.text = this.score.toString();
    this.frames++;
    requestAnimationFrame(() => this.draw());
  }

  restart() {
    this.bird = new Bird(
      this,
      50,
      this.canvas.height / 2,
      50,
      40,
      "#f4eb49",
      0,
      0.5,
      -10
    );
    // this.pipes = new Pipe(this, 50, 150, "#2e7d32");
    this.score = 0;
    this.gameOver = false;
    this.frames = 0;
    this.draw();
  }

  showResult() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "Game Over",
      this.canvas.width / 2,
      this.canvas.height / 2
    );
    this.ctx.fillText(
      `Score: ${this.score}`,
      this.canvas.width / 2,
      this.canvas.height / 2 + 50
    );

    this.ctx.fillText(
      "Press space to restart",
      this.canvas.width / 2,
      this.canvas.height / 2 + 100
    );
  }
}

const game = new Game(600, 600);

window.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    if (!game.started) {
      game.started = true;
      game.draw();
      return;
    }

    if (game.gameOver) {
      game.restart();
    } else {
      game.bird.flap();
    }
  }
});

document.querySelector<HTMLDivElement>("#app")!.append(game.canvas);

export default Game;
