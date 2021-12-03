import * as util from "./util";

export function count(xs: string[]) {
  let length = xs[0].length;
  let result = "";

  for (let i = 0; i < length; i++) {
    let n = 0;
    for (let x of xs) {
      if (x[i] === "1") n++;
    }
    result += n > xs.length / 2 ? "1" : "0";
  }
  return result;
}

export function comp(x: string) {
  let result = "";
  for (let c of x) {
    result += c === "0" ? "1" : "0";
  }
  return result;
}

export function solvea(xs: string[]) {
  let r = count(xs);
  return parseInt(r, 2) * parseInt(comp(r), 2);
}
