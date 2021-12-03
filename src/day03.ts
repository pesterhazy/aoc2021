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
