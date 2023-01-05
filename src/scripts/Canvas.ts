export default class Canvas {
  element: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;


  constructor() {
    this.element = document.createElement('canvas');
    this.ctx = this.element.getContext('2d')!;

    this.setSize();
    addEventListener('resize', () => this.setSize);
    document.getElementById('root')?.appendChild(this.element);
  }

  setSize() {
    this.element.width = innerWidth;
    this.element.height = innerHeight;
  }

  clear(trailing: boolean = false) {
    if (trailing) {
      this.ctx.fillStyle = 'rgba(94, 195, 184, 0.5)'
      this.ctx.fillRect(0, 0, this.width, this.height);
    } else {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  }

  get width() {
    return this.element.width;
  }
  get height() {
    return this.element.height;
  }
}