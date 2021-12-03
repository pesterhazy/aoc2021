import * as day from "./day03";
import * as util from "./util";

const inp = `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`;

test("should return binary number", () => {
  expect(day.count(util.parseLinesStr(inp))).toBe("10110");
});

test("should return complement", () => {
  expect(day.comp("1011")).toBe("0100");
});

test("should return demo solution", () => {
  expect(day.solvea(util.parseLinesStr(inp))).toBe(198);
});

test("should return result", () => {
  expect(day.solvea(util.parseLinesStr(util.slurp("data/day03.txt")))).toBe(
    3895776
  );
});

test("should return oxygen generator rating", () => {
  expect(
    day.find(util.parseLinesStr(inp), "1", (a: number, b: number) => a >= b)
  ).toBe(23);
});

test("should return co2 scrubber rating", () => {
  expect(
    day.find(util.parseLinesStr(inp), "0", (a: number, b: number) => a <= b)
  ).toBe(10);
});

test("should return demo solution", () => {
  expect(
    day.find(util.parseLinesStr(inp), "1", (a: number, b: number) => a >= b) *
      day.find(util.parseLinesStr(inp), "0", (a: number, b: number) => a <= b)
  ).toBe(230);
});

test("should return solution", () => {
  expect(
    day.find(
      util.parseLinesStr(util.slurp("data/day03.txt")),
      "1",
      (a: number, b: number) => a >= b
    ) *
      day.find(
        util.parseLinesStr(util.slurp("data/day03.txt")),
        "0",
        (a: number, b: number) => a <= b
      )
  ).toBe(7928162);
});
