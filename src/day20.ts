import { strict as assert } from "assert";

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
  return { init, dict };
}

let deltas = [
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 }
];

function xform(image: Set<string>, dict: boolean[]): Set<string> {
  let pix = new Set(image);

  for (let s of image) {
    let [x, y] = JSON.parse(s);

    for (let delta of deltas) {
      pix.add(JSON.stringify([x + delta.x, y + delta.y]));
    }
  }

  let r: Set<string> = new Set();
  for (let s of pix) {
    let [x, y] = JSON.parse(s);

    let v = 0;
    let shift = 0;
    for (let yy = 0; yy < 3; yy++) {
      for (let xx = 0; xx < 3; xx++) {
        let b = image.has(JSON.stringify([xx, yy])) ? 1 : 0;
        v += b << shift;
        shift++;
      }
    }

    if (dict[v]) r.add(s);
  }
  return r;
}

function main() {
  let game = parse(input);

  let image = game.init;
  for (let n = 0; n < 2; n++) image = xform(image, game.dict);

  let r = image.size;
  console.log(r);
}

main();
