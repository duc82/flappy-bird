import base from "./assets/images/base.png";
import Game from "./game";

class Base {
  private game: Game;
  private img: HTMLImageElement | null = null;
  public x: number = 0;
  public x2: number;
  public y: number;
  public width: number;
  public height: number;

  constructor(game: Game, width: number, height: number) {
    this.game = game;
    this.width = width;
    this.height = height;

    const img = new Image(width, height);
    img.src = base;

    img.onload = () => {
      this.img = img;
    };

    this.y = this.game.canvas.height - this.height;

    this.x2 = this.width;
  }

  draw() {
    if (this.img) {
      this.game.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.width,
        this.height
      );
      this.game.ctx.drawImage(
        this.img,
        this.x2,
        this.y,
        this.width,
        this.height
      );
    }
  }

  update() {
    this.x -= this.game.speed;
    this.x2 -= this.game.speed;
    if (this.x <= -this.width) {
      this.x = this.width;
    }

    if (this.x2 <= -this.width) {
      this.x2 = this.width;
    }
  }
}

export default Base;
