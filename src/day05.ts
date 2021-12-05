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

export function drawLine(canvas: Canvas, line: Line) {
  if (line[0].x === line[1].x) {
    for (
      let i = Math.min(line[0].y, line[1].y);
      i <= Math.max(line[0].y, line[1].y);
      i++
    ) {
      canvas.swap({ x: line[0].x, y: i }, n => n + 1);
    }
  } else if (line[0].y === line[1].y) {
    for (
      let i = Math.min(line[0].x, line[1].x);
      i <= Math.max(line[0].x, line[1].x);
      i++
    ) {
      canvas.swap({ x: i, y: line[0].y }, n => n + 1);
    }
  } else {
    // do nothing
  }
}

export function solvea(input: Line[]) {
  let canvas = new Canvas();

  for (let line of input) {
    drawLine(canvas, line);
  }
  let count = 0;
  for (let vec of canvas.all()) {
    if (canvas.peek(vec) >= 2) count++;
  }
  return count;
}
