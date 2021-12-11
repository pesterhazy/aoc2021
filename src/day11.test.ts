import * as day from "./day11";
import * as util from "./util";

const demo = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

test("should parse", () => {
  expect(day.parse(demo).flatMap(x => x).length).toBe(100);
});

test("should return demo answer", () => {
  expect(day.solvea(day.parse(demo), 100)).toBe(1656);
});

test("should return demo answer", () => {
  expect(day.solvea(day.parse(util.slurp("data/day11.txt")), 100)).toBe(-999);
});
