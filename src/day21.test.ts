import * as day from "./day21";

let demo = `Player 1 starting position: 4
Player 2 starting position: 8`;

test("should parse", () => {
  let xs = day.parse(demo);

  expect(xs).toStrictEqual([4, 8]);
});

test.skip("should give demo answer", () => {
  let stapos = day.parse(demo);
  let result = day.solvea(stapos);
  expect(result).toBe(739785);
});

test("should roll", () => {
  expect(day.roll(0)).toBe(1 + 2 + 3);
});
