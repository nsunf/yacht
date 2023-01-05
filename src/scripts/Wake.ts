import { dist } from "./Utils";

class Circle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  constructor(x: number, y: number, radius: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.alpha = 0.3;
  }
  draw(ctx: CanvasRenderingContext2D) {
    
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(this.x, this.y, this.radius, Math.PI * 2, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    ctx.beginPath();
    ctx.fillStyle = '#5ec3b8';
    ctx.arc(this.x, this.y, this.radius/1.1, Math.PI * 2, 0);
    ctx.closePath();
    ctx.fill();
  }
  update(ctx: CanvasRenderingContext2D, speed: number, angle: number) {
    if (speed > 0) {
      this.radius += speed/3;
      this.y += speed;
      this.x += (-angle*(180/Math.PI)*90)/this.y;
    } else {
      this.alpha = Math.max(0, this.alpha - 0.01);
      this.radius += 1;
    }
    this.draw(ctx);
  }
}

export default class Wake {
  x: number;
  y: number;
  speed: number;
  angle: number;

  circles: Circle[];

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.speed = 0;
    this.angle = 0;
    this.circles = [];
  }
  draw(ctx: CanvasRenderingContext2D) {
    this.circles.forEach((circle, i) => circle.update(ctx, this.speed, this.angle));
  }
  update(ctx: CanvasRenderingContext2D, x: number, speed: number, angle: number) {
    this.x = x;
    if (this.speed === 0) {
      this.circles.forEach((circle, i) => {
        if (circle.alpha === 0) {
          this.circles.splice(i, 1);
        }
      })
    } else {
      if (this.circles.length === 0) {
        this.circles.push(new Circle(this.x, this.y, 30));
      } else {
        let latestCircle = this.circles[this.circles.length - 1];
        if (dist(this.x, this.y, latestCircle.x, latestCircle.y) > 10) {
          this.circles.push(new Circle(this.x, this.y, 30));
        }
        let lastCircle = this.circles[0];
        if (lastCircle.y - lastCircle.radius > ctx.canvas.height) {
          this.circles.shift();
        }
      }
    }
    this.speed = speed;
    this.angle = angle;
    this.draw(ctx);
  }
}