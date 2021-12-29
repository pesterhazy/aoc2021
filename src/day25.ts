import { strict as assert } from "assert";
import * as util from "./util";

const input = `v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>`;

interface Vec {
  x: number;
  y: number;
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

interface Game {
  canvas: Canvas;
  width: number;
  height: number;
}

function parse(s: string): Game {
  let canvas = new Canvas();
  let rows = s.split(/\n/);
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      switch (rows[y][x]) {
        case "v":
          canvas.poke({ x, y }, 1);
          break;
        case ">":
          canvas.poke({ x, y }, 2);
          break;
        case ".":
          canvas.poke({ x, y }, 0);
          break;
        default:
          throw "oops";
      }
    }
  }

  return { canvas, height: rows.length, width: rows[0].length };
}

function xform(game: Game): Game | undefined {
  let newCanvas;
  let moved = false;
  let canvas = game.canvas;

  newCanvas = new Canvas();
  for (let y = 0; y < game.height; y++) {
    for (let x = 0; x < game.width; x++) {
      let v = canvas.peek({ x, y });

      if (v === 2) {
        let pos = { x: (x + 1) % game.width, y };
        if (canvas.peek(pos) === 0) {
          newCanvas.poke(pos, v);
          moved = true;
        } else {
          newCanvas.poke({ x: x, y }, v);
        }
      } else {
        newCanvas.poke({ x: x, y }, v);
      }
    }
  }
  canvas = newCanvas;
  newCanvas = new Canvas();
  for (let y = 0; y < game.height; y++) {
    for (let x = 0; x < game.width; x++) {
      let v = canvas.peek({ x, y });

      if (v === 1) {
        let pos = { x, y: (y + 1) % game.height };
        if (canvas.peek(pos) === 0) {
          newCanvas.poke(pos, v);
          moved = true;
        } else {
          newCanvas.poke({ x: x, y }, v);
        }
      } else {
        newCanvas.poke({ x: x, y }, v);
      }
    }
  }
  canvas = newCanvas;
  if (moved) return { width: game.width, height: game.height, canvas };
  else return undefined;
}

function main() {
  // let s = util.slurp("data/day20.txt");
  let s = input;
  let game: Game | undefined = parse(s);

  let count = 0;
  while (true) {
    count++;
    game = xform(game);
    if (!game) break;
  }
  console.log(count);
}

main();
