export function parse(s: string): number[][] {
  return s.split(/\n/).map(l => Array.from(l).map(c => parseInt(c)));
}

interface Vec {
  x: number;
  y: number;
}

function add(v1: Vec, v2: Vec) {
  return { x: v1.x + v2.x, y: v1.y + v2.y };
}

let deltas: Vec[] = [
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 }
];

export function solvea(board: number[][], n: number) {
  let count = 0;
  for (let i = 0; i < n; i++) {
    let toFlash: Vec[] = [];
    let flashed: Set<string> = new Set();
    let toZero: Vec[] = [];
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        board[y][x] += 1;
        if (board[y][x] > 9) {
          toFlash.push({ x, y });
        }
      }
    }
    while (toFlash.length > 0) {
      let p: Vec = toFlash.pop()!;
      if (flashed.has(`${p.x},${p.y}`)) continue;
      count++;
      flashed.add(`${p.x},${p.y}`);
      toZero.push(p);

      for (let delta of deltas) {
        let pos = add(p, delta);

        if (pos.x < 0) continue;
        if (pos.x >= 10) continue;
        if (pos.y < 0) continue;
        if (pos.y >= 10) continue;

        board[pos.y][pos.x] += 1;
        if (board[pos.y][pos.x] > 9) {
          toFlash.push(pos);
        }
      }
    }
    for (let pos of toZero) {
      board[pos.y][pos.x] = 0;
    }
  }
  return count;
}

export function solveb(board: number[][]) {
  let count = 0;
  let i = 1;
  while (true) {
    let toFlash: Vec[] = [];
    let flashed: Set<string> = new Set();
    let toZero: Vec[] = [];
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        board[y][x] += 1;
        if (board[y][x] > 9) {
          toFlash.push({ x, y });
        }
      }
    }
    while (toFlash.length > 0) {
      let p: Vec = toFlash.pop()!;
      if (flashed.has(`${p.x},${p.y}`)) continue;
      count++;
      flashed.add(`${p.x},${p.y}`);
      toZero.push(p);

      for (let delta of deltas) {
        let pos = add(p, delta);

        if (pos.x < 0) continue;
        if (pos.x >= 10) continue;
        if (pos.y < 0) continue;
        if (pos.y >= 10) continue;

        board[pos.y][pos.x] += 1;
        if (board[pos.y][pos.x] > 9) {
          toFlash.push(pos);
        }
      }
    }
    if (toZero.length === 100) return i;

    for (let pos of toZero) {
      board[pos.y][pos.x] = 0;
    }
    i++;
  }
  return count;
}
