import * as day from "./day06";
import * as util from "./util";

test("should return answer", () => {
  expect(day.fish([1], 1)).toStrictEqual([0]);
  expect(day.fish([1], 2)).toStrictEqual([6, 8]);
});

test("should return demo answer", () => {
  const inp = `3,4,3,1,2`;
  expect(
    day.fish(
      inp.split(",").map(s => parseInt(s)),
      80
    ).length
  ).toBe(5934);
});

test("should return answer a", () => {
  const inp = util.slurp("data/day06.txt");
  expect(
    day.fish(
      inp.split(",").map(s => parseInt(s)),
      80
    ).length
  ).toBe(-999);
});
