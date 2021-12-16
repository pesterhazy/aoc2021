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
  const c = 5; // multiplier for manhattan distance

  let width = cave[0].length;
  let height = cave.length;
  console.log("dimensions:", width, height);

  // Use a stack to implement DFS
  let jobs: Job[] = [
    {
      path: [{ x: 0, y: 0 }],
      cost: 0,
      score: c * (width + height)
    }
  ];
  let minCost = Infinity;
  let count = 0;
  let g: Map<string, number> = new Map();

  while (jobs.length > 0) {
    count++;
    // sort in reverse order (because we're using a stack)
    jobs.sort((a: Job, b: Job) => b.score - a.score);
    let job: Job = jobs.pop()!;
    let pos = job.path[job.path.length - 1];

    if (job.cost > minCost) continue;

    // have we been here before and for the same cost (or less)?
    let prevCost = g.get(`${pos.x},${pos.y}`);
    if (prevCost !== undefined && job.cost >= prevCost) continue;
    g.set(`${pos.x},${pos.y}`, job.cost);

    // arrived at destination?
    if (pos.x === width - 1 && pos.y === height - 1) {
      if (job.cost < minCost) {
        console.log("FOUND:", job.cost);
        minCost = job.cost;
      }
      continue;
    }
    for (let delta of deltas) {
      let newPos = add(pos, delta);

      // out of bounds?
      if (
        newPos.x < 0 ||
        newPos.x >= width ||
        newPos.y < 0 ||
        newPos.y >= height
      )
        continue;

      let newCost = job.cost + cave[newPos.y][newPos.x];

      jobs.push({
        path: [...job.path, newPos],
        cost: newCost,
        score: newCost + c * (width - newPos.x + (height - newPos.y))
      });
    }
  }
  console.log("Nodes visisted:", count);
  return minCost;
}
