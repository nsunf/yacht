import imgSrc from '../images/yacht.png';
import SimplexNoise from 'simplex-noise';
import { easeOut } from './Utils';
export default class Yacht {
  x: number;
  y: number;
  originX: number;
  // originY: number;
  tmpX: number;
  // tmpY: number;
  waveX: number;
  waveY: number;

  width: number;
  height: number;

  angle: number;
  tmpAngle: number;

  img: HTMLImageElement;
  noise: SimplexNoise;
  noiseOffset: number;

  constructor(x: number, y: number, width: number) {
    let img = new Image();
    img.src = imgSrc;
    this.img = img;

    this.width = width;
    this.height = img.height/img.width * width;

    this.x = x - this.width/2;
    this.y = y - this.height/2;
    this.originX = this.x;
    // this.originY = this.y;
    this.tmpX = this.x;
    // this.tmpY = this.y;
    this.waveX = this.tail.x;
    this.waveY = this.tail.y;

    this.angle = 0;
    this.tmpAngle = 0;

    this.noise = new SimplexNoise();
    this.noiseOffset = 0;
  }
  draw(ctx: CanvasRenderingContext2D) {
    let x = this.x + this.noise.noise2D(this.noiseOffset, 0) * 10;
    let y = this.y + this.noise.noise2D(this.noiseOffset + 1, 0) * 5;
    this.waveX = this.tail.x + this.noise.noise2D(this.noiseOffset, 0) * 10; 
    this.waveY = this.tail.y + this.noise.noise2D(this.noiseOffset + 1, 0) * 5; 
    ctx.save();
    ctx.translate(this.tail.x, this.tail.y);
    ctx.rotate(this.angle);
    ctx.translate(-this.tail.x, -this.tail.y);
    ctx.drawImage(this.img, x, y, this.width, this.height);
    ctx.restore();
  }
  update(ctx: CanvasRenderingContext2D, pointer: { moveX: number, moveY: number, isOn: boolean }) {
    if (pointer.isOn) {
      let { moveX } = pointer;
      this.x = this.tmpX + easeOut(moveX/ctx.canvas.width) * ctx.canvas.width/4;
    } else {
      if (Math.floor(this.originX) !== Math.floor(this.x)) {
        this.x += (this.originX - this.x) / 20;
        this.tmpX = this.x;
      } else if (this.x !== this.originX) {
        this.x = this.originX;
        this.tmpX = this.originX;
      }
    }
    this.angle = (this.x - this.originX)/(ctx.canvas.width/2) * Math.PI;
    this.noiseOffset += 0.02;
    this.draw(ctx);
  }
  get tail(): {x: number, y: number} {
    return {
      x: this.x + this.width/2,
      y: this.y + this.height
    }
  }
}