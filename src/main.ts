import * as day from "./day21";
import * as util from "./util";

let input = day.parse(util.slurp("data/day21.txt"));
// let input = day.parse(`Player 1 starting position: 4
// Player 2 starting position: 8`);

console.log("calc...");
let result = util.time(() => day.solveb(input, 15));
console.log(result);
