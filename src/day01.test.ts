import { solvea, solveb, windows } from "./day01";
import { parseLinesInt, slurp } from "./util";

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

test("should return 7 increases", () => {
  expect(solvea(parseLinesInt(inp))).toBe(7);
});

test("should return result for input", () => {
  const inp = slurp("data/day01a.txt");
  expect(solvea(parseLinesInt(inp))).toBe(1791);
});

test("should return 8 windows", () => {
  let result = windows(parseLinesInt(inp));
  expect(result.length).toBe(8);
  expect(result[0]).toBe(607);
});

test("should return 5 increases", () => {
  let result = solveb(parseLinesInt(inp));
  expect(result).toBe(5);
});

test("should return result for input", () => {
  const inp = slurp("data/day01a.txt");
  expect(solveb(parseLinesInt(inp))).toBe(1822);
});
