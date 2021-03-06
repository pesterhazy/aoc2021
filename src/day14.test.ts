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

test("should give demo answer", () => {
  let inp = demo;
  let p = day.parse(inp);
  let r = day.solve(p, 10);
  expect(r).toBe(1588);
});

test("should give answer", () => {
  let inp = util.slurp("data/day14.txt");
  let p = day.parse(inp);
  let r = day.solve(p, 10);
  expect(r).toBe(2745);
});

test("should f", () => {
  let inp = demo;
  let p = day.parse(inp);
  expect(day.f("NN", 1, p.dict)).toStrictEqual({ N: 2, C: 1 });
  expect(day.f("NN", 2, p.dict)).toStrictEqual({ N: 2, C: 2, B: 1 });
  expect(day.f("NN", 3, p.dict)).toStrictEqual({ N: 3, C: 3, B: 3 });
});

test("should give answer @40", () => {
  let inp = util.slurp("data/day14.txt");
  let p = day.parse(inp);
  let r = day.solve(p, 40);
  expect(r).toBe(3420801168962);
});
