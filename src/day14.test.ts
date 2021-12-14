import * as day from "./day14";
import * as util from "./util";

const demo = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

test("should parse", () => {
  let inp = demo;

  let result = day.parse(inp);
  expect(Object.keys(result.dict).length).toBe(16);
  expect(result.init.length).toBe(4);
});
