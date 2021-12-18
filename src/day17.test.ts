import * as day from "./day17";
import * as util from "./util";

test("should parse", () => {
  let result = day.parse(`target area: x=20..30, y=-10..-5`);
  expect(result.length).toBe(4);
});

test("should simulate", () => {
  let result = day.parse(`target area: x=20..30, y=-10..-5`);
  expect(day.simulate(result, { x: 7, y: 2 })).toBeDefined();
  expect(day.simulate(result, { x: 6, y: 3 })).toBeDefined();
  expect(day.simulate(result, { x: 6, y: 9 })).toBe(45);
  expect(day.simulate(result, { x: 9, y: 0 })).toBeDefined();
  expect(day.simulate(result, { x: 17, y: -4 })).toBeUndefined();
});

test("should give demo answer", () => {
  let result = day.parse(`target area: x=20..30, y=-10..-5`);
  expect(day.solvea(result)).toBe(45);
});

test("should give answer", () => {
  let result = day.parse(util.slurp("data/day17.txt"));
  expect(day.solvea(result)).toBe(-999);
});
