import Game from "./game";

class Pipe {
  private game: Game;
  public position: number[] = [];
  public topPipeHeight: number[] = [];
  public bottomPipeHeight: number[] = [];
  public gap: number;
  public width: number;
  public color: string;

  constructor(game: Game, width: number, gap: number, color: string) {
    this.game = game;
    this.position = [];
    this.topPipeHeight = [];
    this.bottomPipeHeight = [];
    this.gap = gap;
    this.width = width;
    this.color = color;
  }

  draw() {
    for (let i = 0; i < this.position.length; i++) {
      this.game.ctx.fillStyle = this.color;
      this.game.ctx.fillRect(
        this.position[i],
        0,
        this.width,
        this.topPipeHeight[i]
      );
      this.game.ctx.fillRect(
        this.position[i],
        this.game.canvas.height - this.bottomPipeHeight[i],
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
        this.game.canvas.height - this.gap - minHeightPipe
      );
      this.topPipeHeight.push(pipeHeight);
      this.bottomPipeHeight.push(
        this.game.canvas.height - pipeHeight - this.gap
      );
      this.position.push(this.game.canvas.width);
    }

    for (let i = 0; i < this.position.length; i++) {
      this.position[i] -= 5;
      // Check if bird hits the pipe
      if (
        this.game.bird.x + this.game.bird.width > this.position[i] &&
        this.game.bird.x - this.game.bird.width <
          this.position[i] + this.width &&
        (this.game.bird.y - this.game.bird.height < this.topPipeHeight[i] ||
          this.game.bird.y + this.game.bird.height >
            this.game.canvas.height - this.bottomPipeHeight[i])
      ) {
        this.game.gameOver = true;
        break;
      }

      // Check if bird passes the pipe
      if (this.position[i] === this.game.bird.x) {
        this.game.score++;
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
