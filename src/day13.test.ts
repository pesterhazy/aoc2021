import * as day from "./day13";
import * as util from "./util";

const demo = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;

test("should parse", () => {
  let inp = demo;

  let result = day.parse(inp);
  expect(result.points.length).toBe(18);
  expect(result.instructions.length).toBe(2);
});

test("should give demo answer", () => {
  let inp = demo;

  let result = day.parse(inp);
  expect(day.solvea(result)).toBe(17);
});
