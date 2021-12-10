import * as day from "./day09";
import * as util from "./util";

const demo = `2199943210
3987894921
9856789892
8767896789
9899965678`;

test("should return demo answer", () => {
  expect(day.solvea(demo.split(/\n/))).toBe(15);
});
