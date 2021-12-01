import { solvea } from "./day01";
import { parseLinesInt, slurp } from "./util";

test("should return 7 increases", () => {
  const inp = `
199 (N/A - no previous measurement)
200 (increased)
208 (increased)
210 (increased)
200 (decreased)
207 (increased)
240 (increased)
269 (increased)
260 (decreased)
263 (increased)
`;
  expect(solvea(parseLinesInt(inp))).toBe(7);
});

test("should return result for input", () => {
  const inp = slurp("data/day01a.txt");
  expect(solvea(parseLinesInt(inp))).toBe(1791);
});
