import Game from "./game";
import pipeGreen from "./assets/images/pipe-green.png";

class Pipe {
  private game: Game;
  public position: number[] = [];
  public topPipeHeight: number[] = [];
  public bottomPipeHeight: number[] = [];
  public gap: number;
  public width: number;
  public img = new Image();
  public pointAudio = document.querySelector<HTMLAudioElement>("#point")!;

  constructor(game: Game, width: number, gap: number) {
    this.game = game;
    this.position = [];
    this.topPipeHeight = [];
    this.bottomPipeHeight = [];
    this.gap = gap;
    this.width = width;

    this.img.src = pipeGreen;
    this.img.width = width;
  }

  drawRotatedImage(
    image: HTMLImageElement,
    x: number,
    y: number,
    width: number,
    height: number,
    degree: number
  ) {
    const radian = (degree * Math.PI) / 180;
    this.game.ctx.save();
    this.game.ctx.translate(x + width / 2, y + height / 2);
    this.game.ctx.rotate(radian);
    this.game.ctx.drawImage(image, -width / 2, -height / 2, width, height);
    this.game.ctx.restore();
  }

  draw() {
    for (let i = 0; i < this.position.length; i++) {
      this.drawRotatedImage(
        this.img,
        this.position[i],
        0,
        this.width,
        this.topPipeHeight[i],
        180
      );
      this.game.ctx.drawImage(
        this.img,
        this.position[i],
        this.game.height - this.bottomPipeHeight[i],
        this.width,
        this.bottomPipeHeight[i]
      );
    }
  }

  randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  update() {
    if (this.game.frames % 100 === 0) {
      const minHeightPipe = 100;
      const pipeHeight = this.randomInt(
        minHeightPipe,
        this.game.height - this.gap - minHeightPipe
      );
      this.topPipeHeight.push(pipeHeight);
      this.bottomPipeHeight.push(this.game.height - pipeHeight - this.gap);
      this.position.push(this.game.width);
    }

    for (let i = 0; i < this.position.length; i++) {
      this.position[i] -= this.game.speed;
      // Check if bird hits the pipe
      if (
        this.game.bird.x < this.position[i] + this.width &&
        this.game.bird.x + this.game.bird.width > this.position[i] &&
        (this.game.bird.y < this.topPipeHeight[i] ||
          this.game.bird.y + this.game.bird.height >
            this.game.height - this.bottomPipeHeight[i])
      ) {
        this.game.gameOver = true;
        break;
      }

      // Check if bird passes the pipe
      if (this.position[i] === this.game.bird.x) {
        this.game.score++;
        this.pointAudio?.play();
      }

      // Remove pipe if it goes off screen
      if (this.position[i] + this.width < 0) {
        this.position.shift();
        this.topPipeHeight.shift();
        this.bottomPipeHeight.shift();
      }
    }
  }
}

export default Pipe;
