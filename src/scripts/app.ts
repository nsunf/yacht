import Canvas from './Canvas';
import Cloud from './Cloud';
import { random } from './Utils';
import Wake from './Wake';
import Yacht from './Yacht';


export default class App {
  canvas: Canvas;
  pointer: { x: number, y: number, moveX: number, moveY: number, isOn: boolean };

  speed: number;

  yacht: Yacht;
  wake: Wake;
  clouds: Cloud[];

  lastTimestamp: number;
  frameRate: number;
  frameTimer: number;

  constructor() {
    this.canvas = new Canvas();
    this.pointer = { x: this.canvas.width/2, y: this.canvas.height/5, moveX: 0, moveY: 0, isOn: false };

    this.speed = 0;

    this.yacht = new Yacht(this.canvas.width/2, this.canvas.height/5, 72);
    this.wake = new Wake(this.yacht.tail.x, this.yacht.tail.y);
    this.clouds = [];

    this.lastTimestamp = 0;
    this.frameRate = 30;
    this.frameTimer = 0;
  }
  init() {
    addEventListener('pointermove', e => this.pointer = { ...this.pointer, moveX: e.offsetX - this.pointer.x, moveY: e.offsetY - this.pointer.y })
    addEventListener('pointerdown', e => this.pointer = { x: e.offsetX, y: e.offsetY, moveX: 0, moveY: 0, isOn: true });
    addEventListener('pointerup', () => this.pointer = { ...this.pointer, moveX: 0, moveY: 0, isOn: false});
    addEventListener('pointerleave', () => this.pointer = { ...this.pointer, moveX: 0, moveY: 0, isOn: false});
  }
  render() {
    // console.log(this.angle);
    // if (this.pointer.isOn && Math.abs(this.angle) < Math.PI / 4) {
    //   if (this.pointer.moveX > 0) {
    //     this.angle += Math.PI/180;
    //   } else if (this.pointer.moveX < 0) {
    //     this.angle -= Math.PI/180;
    //   }
    // } else if (!this.pointer.isOn && this.angle !== 0) {
    //   if (Math.abs(this.angle) < 0.01) {
    //     this.angle = 0;
    //   } else if (this.angle > 0) {
    //     this.angle -= Math.PI / 180;
    //   } else {
    //     this.angle += Math.PI / 180;
    //   }
    // }

    if (this.pointer.isOn) {
      this.speed = Math.min(this.speed + 1, 10);
    } else {
      this.speed = Math.max(0, this.speed - 1);
    }

    this.canvas.clear();


    if (this.clouds.length < 10 && Math.random() > 0.98) {
      this.clouds.push(new Cloud(random(innerWidth - 200, -200), random(-(32 * 5 + 24 * 4), -(32 * 6 + 24 * 5))))
    }

    this.wake.update(this.canvas.ctx, this.yacht.waveX, this.speed, this.yacht.angle);
    this.yacht.update(this.canvas.ctx, this.pointer)
    this.clouds.forEach((cloud, i) => {
      cloud.update(this.canvas.ctx, this.speed, this.yacht.angle)
      if (cloud.y > innerHeight) {
        let tmp: Cloud[] = [];
        tmp = tmp.concat(this.clouds);
        tmp.splice(i, 1);
        this.clouds = tmp;
      };
    });
  }
  animate(timestamp: number = 0) {
    let deltaTime = timestamp - this.lastTimestamp;
    if (this.frameTimer > 1000/this.frameRate) {
      this.render();
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    this.lastTimestamp = timestamp;
    requestAnimationFrame((timestamp) => this.animate(timestamp));
  }
  launch() {
    this.init();
    this.animate();
  }
}

