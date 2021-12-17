import * as day from "./day17";
import * as util from "./util";

test("should parse", () => {
  let result = day.parse(`target area: x=20..30, y=-10..-5`);
  expect(result.length).toBe(4);
});
