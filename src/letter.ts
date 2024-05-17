import Game from "./game";

class Letter {
  private game: Game;
  private font: string;
  private color: string;
  private x: number;
  private y: number;
  public text: string;

  constructor(
    game: Game,
    font: string,
    color: string,
    x: number,
    y: number,
    text: string
  ) {
    this.game = game;
    this.font = font;
    this.color = color;
    this.x = x;
    this.y = y;
    this.text = text;
  }

  draw() {
    const ctx = this.game.ctx;
    ctx.font = this.font;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;

    ctx.strokeText(this.text, this.x, this.y);

    ctx.fillStyle = this.color;

    ctx.fillText(this.text, this.x, this.y);
  }
}

export default Letter;
