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

test.skip("should give demo answer", () => {
  expect(day.solvea(day.parse(demo))).toBe(40);
});