import { MinPriorityQueue } from "@datastructures-js/priority-queue";

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

  // Use a stack to implement DFS
  let jobs: MinPriorityQueue<Job> = new MinPriorityQueue<Job>({
    priority: (job: Job) => job.score
  });

  jobs.enqueue({
    path: [{ x: 0, y: 0 }],
    cost: 0,
    score: c * (width + height)
  });

  let minCost = Infinity;
  let g: Map<string, number> = new Map();

  while (!jobs.isEmpty()) {
    let job: Job = (jobs.dequeue() as any).element;

    let pos = job.path[job.path.length - 1];

    if (job.cost > minCost) continue;

    // have we reached this point before for the same cost or less?
    let prevCost = g.get(`${pos.x},${pos.y}`);
    if (prevCost !== undefined && job.cost >= prevCost) continue;
    g.set(`${pos.x},${pos.y}`, job.cost);

    // arrived at destination?
    if (pos.x === width - 1 && pos.y === height - 1) {
      if (job.cost < minCost) {
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

      jobs.enqueue({
        path: [...job.path, newPos],
        cost: newCost,
        score: newCost + c * (width - newPos.x + (height - newPos.y))
      });
    }
  }
  return minCost;
}

export function expand(cave: number[][]): number[][] {
  let width = cave[0].length;
  let height = cave.length;

  let result: number[][] = [];
  for (let y = 0; y < height * 5; y++) {
    let row: number[] = [];
    for (let x = 0; x < width * 5; x++) {
      let xx = x % width;
      let yy = y % height;

      let v = cave[yy][xx] + Math.floor(y / height) + Math.floor(x / width);
      v = ((v - 1) % 9) + 1;

      row.push(v);
    }
    result.push(row);
  }
  return result;
}
