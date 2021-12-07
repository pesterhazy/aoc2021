import * as day from "./day06";
import * as util from "./util";

test("should return demo answer", () => {
  const inp = `3,4,3,1,2`;
  expect(
    day.fish(
      inp.split(",").map(s => parseInt(s)),
      80
    )
  ).toBe(5934);
});

test("should return answer a", () => {
  const inp = util.slurp("data/day06.txt");
  expect(
    day.fish(
      inp.split(",").map(s => parseInt(s)),
      80
    )
  ).toBe(353274);
});

test("should return answer b", () => {
  const inp = util.slurp("data/day06.txt");
  expect(
    day.fish(
      inp.split(",").map(s => parseInt(s)),
      256
    )
  ).toBe(-999);
});
