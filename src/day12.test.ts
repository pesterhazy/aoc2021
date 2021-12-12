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

  expect(day.solve(day.parse(inp), day.admissiblea)).toBe(10);
});

test("should return answer", () => {
  let inp = util.slurp("data/day12.txt");

  expect(day.solve(day.parse(inp), day.admissiblea)).toBe(4186);
});

test("should return demo answer", () => {
  let inp = demo;

  expect(day.solve(day.parse(inp), day.admissibleb)).toBe(36);
});

test("should return answer", () => {
  let inp = util.slurp("data/day12.txt");

  expect(day.solve(day.parse(inp), day.admissibleb)).toBe(92111);
});
