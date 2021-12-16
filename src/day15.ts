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
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
  { x: -1, y: 0 }
];

interface Job {
  path: Vec[];
  cost: number;
  score: number;
}

export function solvea(cave: number[][]): number {
  let width = cave[0].length;
  let height = cave.length;
  let jobs: Job[] = [
    {
      path: [{ x: 0, y: 0 }],
      cost: 0,
      score: 5 * (width + height)
    }
  ];
  let minCost = Infinity;
  let count = 0;
  let g: Map<string, number> = new Map();

  while (true) {
    count++;
    if (jobs.length === 0) break;

    let job: Job = jobs.pop()!;
    let pos = job.path[job.path.length - 1];

    let prevCost = g.get(`${pos.x},${pos.y}`);
    if (prevCost !== undefined && job.cost >= prevCost) continue;
    g.set(`${pos.x},${pos.y}`, job.cost);

    if (pos.x === width - 1 && pos.y === height - 1) {
      if (job.cost < minCost) {
        console.log("FOUND:", job.cost);
        minCost = job.cost;
      }
      continue;
    }
    let newJobs: Job[] = [];
    for (let delta of deltas) {
      let newPos = add(pos, delta);
      if (job.path.some(pp => pp.x === newPos.x && pp.y === newPos.y)) continue;
      if (
        newPos.x < 0 ||
        newPos.x >= width ||
        newPos.y < 0 ||
        newPos.y >= height
      )
        continue;
      let newCost = job.cost + cave[newPos.y][newPos.x];

      if (newCost > minCost) continue;

      newJobs.push({
        path: [...job.path, newPos],
        cost: newCost,
        score: newCost + 5 * (width - newPos.x + (height - newPos.y))
      });
    }
    newJobs.sort((a: Job, b: Job) => b.score - a.score);
    jobs = [...jobs, ...newJobs];
  }
  console.log("Nodes visisted:", count);
  return minCost;
}
