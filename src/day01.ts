import { slurp } from "./util";

export function solvea(xs: number[]) {}

function solveb(xs: number[]) {}

export async function run() {
  var text: string = await slurp("data/day01a.txt");
  var xs = text.split(/\n/).map(n => parseInt(n));

  console.log(xs);

  solvea(xs);
  solveb(xs);
}
