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
