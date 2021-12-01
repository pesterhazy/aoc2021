import { slurp } from "./util";

export function solvea(xs: number[]) {
  let prev: number | undefined;
  let count = 0;
  for (let x of xs) {
    if (prev === undefined) {
      prev = x;
      continue;
    }
    if (x > prev) count++;
    prev = x;
  }
  return count;
}

function solveb(xs: number[]) {}

export async function run() {}
