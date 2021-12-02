import * as day from "./day02";
import { slurp } from "./util";

const inp = `
forward 5
down 5
forward 8
up 3
down 8
forward 2
`;

test("should return 150", () => {
  expect(day.solvea(day.parse(inp))).toBe(150);
});

test("should return result", () => {
  expect(day.solvea(day.parse(slurp("data/day02.txt")))).toBe(2019945);
});

test("should return result", () => {
  expect(day.solveb(day.parse(inp))).toBe(900);
});

test("should return result", () => {
  expect(day.solveb(day.parse(slurp("data/day02.txt")))).toBe(1599311480);
});
