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

test("should return demo solution", () => {
  expect(day.count(util.parseLinesStr(inp))).toBe("10110");
});

test("should return complement", () => {
  expect(day.comp("1011")).toBe("0100");
});
