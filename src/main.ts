import * as day from "./day15";
import * as util from "./util";

const demo = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;

let result = day.solvea(day.parse(util.slurp("data/day15.txt")));
// let result = day.solvea(day.parse(demo));

console.log(result);
