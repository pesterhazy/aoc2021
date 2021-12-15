import { readFileSync } from "fs";
import { performance } from "perf_hooks";

export function slurp(fname: string): string {
  return readFileSync(fname, "utf-8");
}

export function time(fun: any) {
  let start = performance.now();
  let result = fun();
  let end = performance.now();

  console.log("Elapsed:", end - start);
  return result;
}

export function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export function parseLinesStr(s: string) {
  var xs = s.split("\n").filter(l => l.length > 0);
  return xs;
}

export function parseLinesInt(s: string) {
  var xs = s
    .split("\n")
    .filter(l => l.length > 0)
    .map(l => parseInt(l));
  return xs;
}

export function parseWords(s: string): string[][] {
  return s
    .split("\n")
    .filter(l => l.length > 0)
    .map(l => {
      return l.split(" ");
    });
}
