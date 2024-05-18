import Game from "./game";
import zero from "./assets/images/0.png";
import one from "./assets/images/1.png";
import two from "./assets/images/2.png";
import three from "./assets/images/3.png";
import four from "./assets/images/4.png";
import five from "./assets/images/5.png";
import six from "./assets/images/6.png";
import seven from "./assets/images/7.png";
import eight from "./assets/images/8.png";
import nine from "./assets/images/9.png";

class Point {
  private game: Game;
  public x: number;
  public y: number;
  public pointImages: HTMLImageElement[] = [];

  constructor(game: Game, x: number, y: number) {
    this.game = game;
    this.x = x;
    this.y = y;

    const zeroImage = new Image();
    zeroImage.src = zero;
    this.pointImages.push(zeroImage);
    const oneImage = new Image();
    oneImage.src = one;
    this.pointImages.push(oneImage);
    const twoImage = new Image();
    twoImage.src = two;
    this.pointImages.push(twoImage);
    const threeImage = new Image();
    threeImage.src = three;
    this.pointImages.push(threeImage);
    const fourImage = new Image();
    fourImage.src = four;
    this.pointImages.push(fourImage);
    const fiveImage = new Image();
    fiveImage.src = five;
    this.pointImages.push(fiveImage);
    const sixImage = new Image();
    sixImage.src = six;
    this.pointImages.push(sixImage);
    const sevenImage = new Image();
    sevenImage.src = seven;
    this.pointImages.push(sevenImage);
    const eightImage = new Image();
    eightImage.src = eight;
    this.pointImages.push(eightImage);
    const nineImage = new Image();
    nineImage.src = nine;
    this.pointImages.push(nineImage);
  }

  draw() {
    const score = this.game.score;

    const scoreString = score.toString();
    const scoreArray = scoreString.split("");

    const scoreWidth = scoreArray.length * 24;

    for (let i = 0; i < scoreArray.length; i++) {
      const x = this.x - scoreWidth / 2 + i * 24;

      this.game.ctx.drawImage(
        this.pointImages[parseInt(scoreArray[i])],
        x,
        this.y
      );
    }
  }
}

export default Point;
