import { random } from "./Utils";

interface CloudElement {
  x: number;
  y: number;
  width: number;
  height: number;
}
export default class Cloud {
  x: number;
  y: number;
  color: string;

  depth: number;

  rects: CloudElement[];
  links: CloudElement[];

  constructor(x: number, y: number) {
    this.x = Math.floor(x);
    this.y = Math.floor(y);
    this.color = 'rgba(255, 255, 255, 0.5)';

    this.depth = Math.floor(random(7, 1));

    this.rects = [];
    this.links = [];
    let numOfRect = Math.floor(random(6, 2));
    for (let i = 0; i < numOfRect; i++) {
      let width = random(400, 200);
      let x = random(50, -50);
      let y = i * (32 + 24);
      this.rects.push({ x, y, width, height: 32 });
    }
    for (let i = 0; i < numOfRect - 1; i++) {
      let rect1 = this.rects[i];
      let rect2 = this.rects[i + 1];
      let minX = Math.max(rect1.x + rect1.height/2, rect2.x + rect2.height/2);
      let maxX = Math.min(rect1.x + rect1.width - rect1.height/2, rect2.x + rect2.width - rect2.height/2);
      let width = random(maxX - minX, 40);
      let x = random(Math.min(maxX - width, 160), minX);
      let y = 32 + i * (32 + 24);
      this.links.push({ x, y, width, height: 24 });
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    this.rects.forEach(rect => {
      let x = this.x + rect.x;
      let y = this.y + rect.y;
      let { width, height } = rect;
      let radius = height/2;
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fill();
    })
    this.links.forEach(link => {
      let x = this.x + link.x;
      let y = this.y + link.y;
      let { width, height } = link;
      let radius = height/2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + width, y);
      ctx.quadraticCurveTo(x + width - radius, y, x + width - radius, y + radius);
      ctx.quadraticCurveTo(x + width - radius, y + height, x + width, y + height);
      ctx.lineTo(x, y + height);
      ctx.quadraticCurveTo(x + radius, y + height, x + radius, y + radius);
      ctx.quadraticCurveTo(x + radius, y, x, y);
      ctx.closePath();
      ctx.fill();
    })
  }
  update(ctx: CanvasRenderingContext2D, speed: number, angle: number) {
    this.x += -Math.sin(angle) * speed;
    this.y += (speed + 1) * (this.depth/10);
    this.draw(ctx);
  }
  get minX() {
    let sort = this.rects.sort((lhs, rhs) => lhs.x < rhs.x ? -1 : 1);
    return this.x + sort[0].x;
  }
  get minY() {
    let sort = this.rects.sort((lhs, rhs) => lhs.y < rhs.y ? -1 : 1);
    return this.y + sort[0].y;
  }
  get maxX() {
    let sort = this.rects.sort((lhs, rhs) => lhs.x < rhs.x ? 1 : -1);
    return this.x + sort[0].x;
  }
  get maxY() {
    let sort = this.rects.sort((lhs, rhs) => lhs.y < rhs.y ? 1 : -1);
    return this.y + sort[0].y;
  }
}