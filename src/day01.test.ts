import { solvea } from "./day01";
import { parseLinesInt } from "./util";

test("solvea", () => {
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
  console.log(parseLinesInt(inp));
  // expect([1]).toBe(2);
});
