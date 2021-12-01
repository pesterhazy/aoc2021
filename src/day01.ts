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

export function solveb(xs: number[]) {
  return solvea(windows(xs));
}

export function windows(xs: number[]) {
  var result: number[] = [];
  while (xs.length >= 3) {
    result.push(xs[0] + xs[1] + xs[2]);
    xs.shift();
  }
  return result;
}
