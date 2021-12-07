function cost(
  xs: number[],
  pos: number,
  dist: (a: number, b: number) => number
) {
  let cost = 0;

  for (let x of xs) {
    cost += dist(pos, x);
  }
  return cost;
}

export function solve(xs: number[], dist: (a: number, b: number) => number) {
  let minCost = Infinity;
  for (let i = Math.min(...xs); i <= Math.max(...xs); i++) {
    minCost = Math.min(minCost, cost(xs, i, dist));
  }
  return minCost;
}

export function solvea(xs: number[]) {
  return solve(xs, (a, b) => Math.abs(a - b));
}

const partialSum = (n: number) => (n * (n + 1)) / 2;

export function solveb(xs: number[]) {
  return solve(xs, (a, b) => partialSum(Math.abs(a - b)));
}
