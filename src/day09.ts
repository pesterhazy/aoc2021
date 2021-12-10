interface Vec {
  x: number;
  y: number;
}

function add(v1: Vec, v2: Vec) {
  return { x: v1.x + v2.x, y: v1.y + v2.y };
}

function peek(rows: string[], vec: Vec): number | undefined {
  if (vec.x >= rows[0].length) return undefined;
  if (vec.x < 0) return undefined;
  if (vec.y >= rows.length) return undefined;
  if (vec.y < 0) return undefined;
  return parseInt(rows[vec.y][vec.x]);
}

let deltas: Vec[] = [
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: 0, y: 1 }
];

export function solvea(rows: string[]) {
  let score = 0;
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[0].length; x++) {
      let found = true;
      let h: number = peek(rows, { x, y })!;
      for (let delta of deltas) {
        let pos = add({ x, y }, delta);
        let hh = peek(rows, pos);
        if (hh === undefined) continue;
        if (h >= hh) {
          found = false;
          break;
        }
      }
      if (found) score += 1 + h;
    }
  }
  return score;
}

function size(rows: string[], init: Vec) {
  let seen: Set<string> = new Set();
  let todo: Vec[] = [init];
  while (true) {
    let pos = todo.shift();
    if (pos == undefined) break;
    let h = peek(rows, pos);

    if (h === undefined || h === 9) continue;
    seen.add(`${pos.x},${pos.y}`);
    for (let delta of deltas) {
      let pospos = add(pos, delta);

      if (!seen.has(`${pospos.x},${pospos.y}`)) todo.push(pospos);
    }
  }
  return seen.size;
}

export function solveb(rows: string[]) {
  let basins: number[] = [];
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[0].length; x++) {
      let found = true;
      let h: number = peek(rows, { x, y })!;
      for (let delta of deltas) {
        let pos = add({ x, y }, delta);
        let hh = peek(rows, pos);
        if (hh === undefined) continue;
        if (h >= hh) {
          found = false;
          break;
        }
      }
      if (found) {
        basins.push(size(rows, { x, y }));
      }
    }
  }
  basins.sort((a, b) => {
    if (a > b) return 1;
    else if (a < b) return -1;
    else return 0;
  });
  if (basins.length < 3) throw "oh no";
  return (
    basins[basins.length - 3] *
    basins[basins.length - 2] *
    basins[basins.length - 1]
  );
}
