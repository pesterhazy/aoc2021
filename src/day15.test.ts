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

test("should give demo answer", () => {
  expect(day.solvea(day.parse(demo))).toBe(40);
});

test("should expand", () => {
  let cave = day.expand(day.parse(demo));
  expect(cave[0].length).toBe(50);
  expect(cave[0][0]).toBe(1);
  expect(cave[0][cave[0].length - 1]).toBe(6);
});
