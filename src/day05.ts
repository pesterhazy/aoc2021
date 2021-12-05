import * as util from "./util";

interface Vec {
  x: number;
  y: number;
}

type Line = [Vec, Vec];

export function parse(s: string): Line[] {
  return util.parseLinesStr(s).map(l => {
    let m = l.match(/(\d+),(\d+) -> (\d+),(\d+)/);
    if (!m) throw "ouch";
    return [
      { x: parseInt(m[1]), y: parseInt(m[2]) },
      { x: parseInt(m[3]), y: parseInt(m[4]) }
    ];
  });
}

export class Canvas {
  m: Map<number, Map<number, number>>;

  constructor() {
    this.m = new Map();
  }

  peek(vec: Vec): number {
    let mm = this.m.get(vec.x);
    if (!mm) return 0;
    return mm.get(vec.y) || 0;
  }

  poke(vec: Vec, n: number) {
    let mm = this.m.get(vec.x);
    if (!mm) {
      mm = new Map();
      this.m.set(vec.x, mm);
    }
    mm.set(vec.y, n);
  }

  swap(vec: Vec, f: (n: number) => number) {
    this.poke(vec, f(this.peek(vec)));
  }

  all(): Vec[] {
    let result: Vec[] = [];

    for (let [x, mm] of this.m.entries()) {
      for (let [y, _] of mm.entries()) {
        result.push({ x, y });
      }
    }
    return result;
  }
}

function add(v1: Vec, v2: Vec) {
  return { x: v1.x + v2.x, y: v1.y + v2.y };
}

export function drawLine(canvas: Canvas, line: Line, skipDiagonal: boolean) {
  if (line[0].x !== line[1].x && line[0].y !== line[1].y && skipDiagonal) {
    return;
  }

  let delta = {
    x: Math.sign(line[1].x - line[0].x),
    y: Math.sign(line[1].y - line[0].y)
  };

  let pos = line[0];
  canvas.swap(pos, n => n + 1);
  while (!(pos.x === line[1].x && pos.y === line[1].y)) {
    pos = add(pos, delta);
    canvas.swap(pos, n => n + 1);
  }
}

export function solve(input: Line[], skipDiagonal: boolean) {
  let canvas = new Canvas();

  for (let line of input) {
    drawLine(canvas, line, skipDiagonal);
  }
  let count = 0;
  for (let vec of canvas.all()) {
    if (canvas.peek(vec) >= 2) count++;
  }
  return count;
}
