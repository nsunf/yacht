function easeOut(x: number) {
  // 0 <= x <= 1;
  return Math.sin((x * Math.PI)/2);
}

function dist(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function random(max: number, min: number = 0) {
  return Math.random() * (max - min) + min;
}

export { easeOut, dist, random };