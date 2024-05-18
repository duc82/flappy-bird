import yellowBirdDownFlap from "./assets/images/yellowbird-downflap.png";
import yellowBirdMidFlap from "./assets/images/yellowbird-midflap.png";
import yellowBirdUpFlap from "./assets/images/yellowbird-upflap.png";
import Game from "./game";

class Bird {
  private game: Game;
  public x: number;
  public y: number;
  public width: number = 0;
  public height: number = 0;
  public velocity: number;
  public gravity: number;
  public jump: number;
  public birdImages: HTMLImageElement[] = [];
  public birdIndex = 0;
  public drawCount: number = 0;
  public degree: number = 0;
  public wingAudio = document.querySelector<HTMLAudioElement>("#wing")!;

  constructor(
    game: Game,
    x: number,
    y: number,
    width: number,
    height: number,
    velocity: number,
    gravity: number,
    jump: number
  ) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocity = velocity;
    this.gravity = gravity;
    this.jump = jump;

    const birdDownFlap = new Image(width, height);
    birdDownFlap.src = yellowBirdDownFlap;
    this.birdImages.push(birdDownFlap);
    const birdMidFlap = new Image(width, height);
    birdMidFlap.src = yellowBirdMidFlap;
    this.birdImages.push(birdMidFlap);
    const birdUpFlap = new Image(width, height);
    birdUpFlap.src = yellowBirdUpFlap;
    this.birdImages.push(birdUpFlap);
  }

  drawRotatedImage(
    image: HTMLImageElement,
    x: number,
    y: number,
    degree: number
  ) {
    const radian = (degree * Math.PI) / 180; // Convert degree to radian
    this.game.ctx.save();

    this.game.ctx.translate(x + image.width / 2, y + image.height / 2);

    this.game.ctx.rotate(radian);

    this.game.ctx.drawImage(
      image,
      -image.width / 2,
      -image.height / 2,
      image.width,
      image.height
    );

    this.game.ctx.restore();
  }

  draw() {
    this.drawRotatedImage(
      this.birdImages[this.birdIndex],
      this.x,
      this.y,
      this.degree
    );
    this.drawCount++;
    if (this.drawCount >= 5) {
      this.birdIndex = (this.birdIndex + 1) % this.birdImages.length;
      this.drawCount = 0;
    }
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    // Rotate the bird
    if (this.velocity >= 0) {
      this.degree = Math.min(90, this.degree + 5);
    } else {
      this.degree = -25;
    }

    // Check if bird hits the top of the canvas
    if (this.y >= this.game.height - this.height) {
      this.y = this.game.height - this.height;
      this.velocity = 0;
    }

    // Check if bird hits the bottom of the canvas
    if (this.y + this.height >= this.game.height) {
      this.y = this.height;
      this.velocity = 0;
      this.game.gameOver = true;
    }
  }

  flap() {
    this.velocity = this.jump;
    this.wingAudio.play();
  }
}

export default Bird;
