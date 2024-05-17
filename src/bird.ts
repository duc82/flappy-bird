import yellowBirdDownFlap from "./assets/images/yellowbird-downflap.png";
import yellowBirdMidFlap from "./assets/images/yellowbird-midflap.png";
import yellowBirdUpFlap from "./assets/images/yellowbird-upflap.png";
import wing from "./assets/audios/wing.ogg";
import hit from "./assets/audios/hit.ogg";
import Game from "./game";

class Bird {
  private game: Game;
  public x: number;
  public y: number;
  public width: number = 0;
  public height: number = 0;
  public color: string;
  public velocity: number;
  public gravity: number;
  public jump: number;
  public birdImages: string[] = [
    yellowBirdDownFlap,
    yellowBirdMidFlap,
    yellowBirdUpFlap,
  ];
  public birdImg: HTMLImageElement | null = null;
  public birdIndex = 0;
  public drawCount: number = 0;
  public degree: number = 0;

  constructor(
    game: Game,
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    velocity: number,
    gravity: number,
    jump: number
  ) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.velocity = velocity;
    this.gravity = gravity;
    this.jump = jump;

    const img = new Image(width, height);
    img.src = this.birdImages[this.birdIndex];

    img.onload = () => {
      this.birdImg = img;
      this.birdIndex = (this.birdIndex + 1) % this.birdImages.length;
    };
  }

  drawRotatedImage(
    image: HTMLImageElement,
    x: number,
    y: number,
    degree: number
  ) {
    this.game.ctx.save();

    this.game.ctx.translate(x + image.width / 2, y + image.height / 2);

    this.game.ctx.rotate(
      degree * (Math.PI / 180) // Convert degree to radian
    );

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
    if (!this.birdImg) return;
    this.drawRotatedImage(this.birdImg, this.x, this.y, this.degree);
  }

  update() {
    this.drawCount++;
    if (this.drawCount >= 5 && this.birdImg) {
      this.birdImg.src = this.birdImages[this.birdIndex];
      this.birdImg.onload = () => {
        this.birdIndex = (this.birdIndex + 1) % this.birdImages.length;
      };

      this.drawCount = 0;
    }

    this.velocity += this.gravity;
    this.y += this.velocity;

    // Rotate the bird
    if (this.velocity >= 0) {
      this.degree = Math.min(90, this.degree + 3);
    } else {
      this.degree = -30;
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
      const audio = new Audio(hit);
      audio.play();
    }
  }

  flap() {
    this.velocity = this.jump;
    const audio = new Audio(wing);
    audio.play();
  }
}

export default Bird;
