import * as day from "./day05";
import * as util from "./util";

const inp = `
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`;

test("should parse into 10 lines", () => {
  expect(day.parse(inp).length).toBe(10);
  expect(day.parse(inp)[0]).toStrictEqual([
    { x: 0, y: 9 },
    { x: 5, y: 9 }
  ]);
});

test("should peek and poke", () => {
  let canvas = new day.Canvas();
  expect(canvas.peek({ x: 3, y: 2 })).toBe(0);
  canvas.poke({ x: 3, y: 2 }, 1);
  expect(canvas.peek({ x: 3, y: 2 })).toBe(1);
  canvas.swap({ x: 3, y: 2 }, n => n + 1);
  expect(canvas.peek({ x: 3, y: 2 })).toBe(2);
  canvas.poke({ x: 4, y: 4 }, 1);
  expect(canvas.all()).toStrictEqual([
    { x: 3, y: 2 },
    { x: 4, y: 4 }
  ]);
});

test("should draw", () => {
  let canvas = new day.Canvas();
  day.drawLine(
    canvas,
    [
      { x: 2, y: 1 },
      { x: 2, y: 2 }
    ],
    true
  );
  expect(canvas.peek({ x: 2, y: 1 })).toBe(1);
  expect(canvas.peek({ x: 2, y: 2 })).toBe(1);
  day.drawLine(
    canvas,
    [
      { x: 1, y: 2 },
      { x: 2, y: 2 }
    ],
    true
  );
  expect(canvas.peek({ x: 1, y: 2 })).toBe(1);
  expect(canvas.peek({ x: 2, y: 2 })).toBe(2);
  day.drawLine(
    canvas,
    [
      { x: 5, y: 5 },
      { x: 3, y: 5 }
    ],
    true
  );
  expect(canvas.peek({ x: 4, y: 5 })).toBe(1);
});

test("should answer demo", () => {
  expect(day.solve(day.parse(inp), true)).toBe(5);
});

test("should answer puzzle a", () => {
  expect(day.solve(day.parse(util.slurp("data/day05.txt")), true)).toBe(6841);
});

test("should answer puzzle b", () => {
  expect(day.solve(day.parse(util.slurp("data/day05.txt")), false)).toBe(19258);
});
