import * as day from "./day07";
import * as util from "./util";

test("should return demo answer", () => {
  const inp = `16,1,2,0,4,2,7,1,2,14`;
  expect(day.solvea(inp.split(",").map(s => parseInt(s)))).toBe(37);
});

test("should return answer", () => {
  const inp = util.slurp("data/day07.txt");
  expect(day.solvea(inp.split(",").map(s => parseInt(s)))).toBe(352707);
});

test("should return demo answer", () => {
  const inp = `16,1,2,0,4,2,7,1,2,14`;
  expect(day.solveb(inp.split(",").map(s => parseInt(s)))).toBe(168);
});

test("should return answer", () => {
  const inp = util.slurp("data/day07.txt");
  expect(day.solveb(inp.split(",").map(s => parseInt(s)))).toBe(95519693);
});
