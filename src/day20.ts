import { strict as assert } from "assert";
import * as util from "./util";

const input = `..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..##
#..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###
.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#.
.#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#.....
.#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#..
...####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.....
..##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

#..#.
#....
##..#
..#..
..###`;

interface Game {
  dict: boolean[];
  init: Set<string>;
}

function parse(s: string): Game {
  let [p1, p2] = s.split(/\n\n/);
  let dict: boolean[] = [];

  for (let a of p1) {
    let b;
    if (a === ".") b = false;
    else if (a === "#") b = true;
    else continue;
    dict.push(b);
  }

  let init: Set<string> = new Set();
  let rows = p2.split(/\n/);
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      if (rows[y][x] === "#") init.add(JSON.stringify([x, y]));
    }
  }

  assert(dict.length === 512);
  return { init, dict };
}

function xform(
  image: Set<string>,
  flipped: boolean,
  dict: boolean[]
): [Set<string>, boolean] {
  let minx = Infinity;
  let miny = Infinity;
  let maxx = -Infinity;
  let maxy = -Infinity;

  for (let s of image) {
    let [x, y] = JSON.parse(s);

    minx = Math.min(minx, x);
    miny = Math.min(miny, y);
    maxx = Math.max(maxx, x);
    maxy = Math.max(maxy, y);
  }

  let r: Set<string> = new Set();
  for (let y = miny - 1; y <= maxy + 1; y++) {
    for (let x = minx - 1; x <= maxx + 1; x++) {
      let v = 0;
      let shift = 8;
      for (let yy = y - 1; yy <= y + 1; yy++) {
        for (let xx = x - 1; xx <= x + 1; xx++) {
          let b = image.has(JSON.stringify([xx, yy]));
          if (flipped) b = !b;

          v += (b ? 1 : 0) << shift;
          shift--;
        }
      }

      let bb = dict[v];

      if (dict[0] && !flipped) bb = !bb;

      if (bb) r.add(JSON.stringify([x, y]));
    }
  }

  if (dict[0]) flipped = !flipped;

  return [r, flipped];
}

function print(image: Set<string>) {
  let minx = Infinity;
  let miny = Infinity;
  let maxx = -Infinity;
  let maxy = -Infinity;
  for (let s of image) {
    let [x, y] = JSON.parse(s);

    minx = Math.min(minx, x);
    miny = Math.min(miny, y);
    maxx = Math.max(maxx, x);
    maxy = Math.max(maxy, y);
  }

  let s = "";
  for (let y = miny; y <= maxy; y++) {
    for (let x = minx; x <= maxx; x++) {
      s += image.has(JSON.stringify([x, y])) ? "#" : ".";
    }
    s += "\n";
  }
  console.log(s);
}

function main() {
  let s = util.slurp("data/day20.txt");
  // let s = input;
  let game = parse(s);

  let image: Set<string> = game.init;
  // print(image);
  let flipped = false;
  for (let n = 0; n < 50; n++) {
    [image, flipped] = xform(image, flipped, game.dict);
    // print(image);
  }

  let r = image.size;
  console.log(r);
}

main();
