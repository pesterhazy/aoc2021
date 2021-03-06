import * as day from "./day24";
import * as util from "./util";

let demo = `inp w
add z w
mod z 2
div w 2
add y w
mod y 2
div w 2
add x w
mod x 2
div w 2
mod w 2`;

test("should compile", () => {
  let result = day.compile(demo);
  // console.log(result);
  expect(result.length).toBeGreaterThan(0);
  expect(result.split(/\n/).filter(l => l.length > 0).length).toBe(
    demo.split(/\n/).length
  );
});

test("should compile data", () => {
  let input = util.slurp("data/day24.txt");
  let result = day.compile(input);
  // console.log(result);
  expect(result.length).toBeGreaterThan(0);
  expect(result.split(/\n/).filter(l => l.length > 0).length).toBe(
    input.split(/\n/).length
  );
});
