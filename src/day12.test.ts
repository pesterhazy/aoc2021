import * as day from "./day12";
import * as util from "./util";

const demo = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

test("should return demo answer", () => {
  let inp = demo;

  expect(day.solvea(day.parse(inp))).toBe(10);
});

test("should return answer", () => {
  let inp = util.slurp("data/day12.txt");

  expect(day.solvea(day.parse(inp))).toBe(4186);
});
