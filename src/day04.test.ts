import * as day from "./day04";
import * as util from "./util";

const inp = `
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
`;

test("should parse into 3 boards", () => {
  expect(day.parse(inp).boards.length).toBe(3);
});

test("should not match", () => {
  const demoBoard = day.parse(inp).boards[0];
  expect(day.match(demoBoard, new Set())).toBe(false);
  expect(day.match(demoBoard, new Set([17, 23, 14]))).toBe(false);
  expect(day.match(demoBoard, new Set([17, 23, 14, 3, 20]))).toBe(true);
  expect(day.match(demoBoard, new Set([8, 2, 23]))).toBe(false);
  expect(day.match(demoBoard, new Set([8, 2, 23, 4, 24]))).toBe(true);
});

test("should return demo answer", () => {
  expect(day.solvea(day.parse(inp))).toBe(4512);
});

test("should return answer", () => {
  expect(day.solvea(day.parse(util.slurp("data/day04.txt")))).toBe(82440);
});

test("should return demo answer", () => {
  expect(day.solveb(day.parse(inp))).toBe(1924);
});
