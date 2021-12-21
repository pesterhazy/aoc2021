import * as day from "./day21";
import * as util from "./util";

// let result = day.solveb(day.parse(util.slurp("data/day21.txt")));
// expected: 444356092776315
// actual:   37107702442602
let result = day.solveb(
  day.parse(`Player 1 starting position: 4
Player 2 starting position: 8`)
);

console.log(result);
