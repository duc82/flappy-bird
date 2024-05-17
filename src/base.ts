import base from "./assets/images/base.png";
import Game from "./game";

class Base {
  private game: Game;
  private img: HTMLImageElement | null = null;
  public x: number = 0;
  public x2: number;
  public y: number = 0;
  public height: number = 0;

  constructor(game: Game) {
    this.game = game;

    const img = new Image();
    img.src = base;

    img.onload = () => {
      this.img = img;
      this.y = this.game.canvas.height - img.height;
      this.height = img.height;
      this.game.height = this.game.canvas.height - this.height;
    };

    this.x2 = this.game.width;
  }

  draw() {
    if (this.img) {
      this.game.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.game.width,
        this.height
      );
      this.game.ctx.drawImage(
        this.img,
        this.x2,
        this.y,
        this.game.width,
        this.height
      );
    }
  }

  update() {
    this.x -= 5;
    this.x2 -= 5;
    if (this.x <= -this.game.width) {
      this.x = this.game.width;
    }

    if (this.x2 <= -this.game.width) {
      this.x2 = this.game.width;
    }
  }
}

export default Base;
