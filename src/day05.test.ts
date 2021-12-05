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
});

test("should peek and poke", () => {
  let canvas = new day.Canvas();
  expect(canvas.peek({ x: 3, y: 2 })).toBe(0);
  canvas.poke({ x: 3, y: 2 }, 1);
  expect(canvas.peek({ x: 3, y: 2 })).toBe(1);
  canvas.swap({ x: 3, y: 2 }, n => n + 1);
  expect(canvas.peek({ x: 3, y: 2 })).toBe(2);
});

test("should draw", () => {
  let canvas = new day.Canvas();
  day.drawLine(canvas, [
    { x: 2, y: 1 },
    { x: 2, y: 2 }
  ]);
  expect(canvas.peek({ x: 2, y: 1 })).toBe(1);
  day.drawLine(canvas, [
    { x: 1, y: 2 },
    { x: 2, y: 2 }
  ]);
  expect(canvas.peek({ x: 1, y: 2 })).toBe(1);
  expect(canvas.peek({ x: 2, y: 2 })).toBe(2);
});
