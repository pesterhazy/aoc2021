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

test("should return answer", () => {
  expect(day.solvea(util.slurp("data/day09.txt").split(/\n/))).toBe(603);
});

test("should return demo answer", () => {
  expect(day.solveb(demo.split(/\n/))).toBe(1134);
});

test("should return answer", () => {
  expect(day.solveb(util.slurp("data/day09.txt").split(/\n/))).toBe(786780);
});
