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
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: 0, y: 1 }
];

interface Job {
  path: Vec[];
}

export function solvea(cave: number[][]): number {
  function score(path: Vec[]) {
    let r = 0;
    for (let i = 1; i < path.length - 1; i++) {
      r += cave[path[i].y][path[i].x];
    }
    return r;
  }

  let jobs: Job[] = [{ path: [{ x: 0, y: 0 }] }];
  let minScore = Infinity;

  while (true) {
    if (jobs.length === 0) return minScore;

    let job: Job = jobs.pop()!;
    let pos = job.path[job.path.length - 1];

    if (pos.x === cave[0].length - 1 && pos.y === cave.length - 1) {
      let sc = score(job.path);
      if (sc < minScore) minScore = sc;
      continue;
    }
    for (let delta of deltas) {
      let newPos = add(pos, delta);
      if (job.path.some(pp => pp.x === newPos.x && pp.y === newPos.y)) continue;
      if (
        newPos.x < 0 ||
        newPos.x >= cave[0].length ||
        newPos.y < 0 ||
        newPos.y >= cave.length
      )
        continue;
      jobs.push({ path: [...job.path, newPos] });
    }
  }
}
