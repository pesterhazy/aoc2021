import * as day from "./day21";

let demo = `Player 1 starting position: 4
Player 2 starting position: 8`;

test("should parse", () => {
  let xs = day.parse(demo);

  expect(xs).toStrictEqual([4, 8]);
});

test("should give demo answer", () => {
  let stapos = day.parse(demo);
  let result = day.solvea(stapos);
  expect(result).toBe(739785);
});

test("should roll", () => {
  expect(day.roll(0)).toBe(1 + 2 + 3);
  expect(day.roll(1)).toBe(4 + 5 + 6);
  expect(day.roll(33)).toBe(100 + 1 + 2);
  expect(day.roll(34)).toBe(3 + 4 + 5);
});

test("should simulate", () => {
  let stapos = day.parse(demo);
  expect(day.scoreAfter(stapos, 0)).toStrictEqual([0, 0]);
  expect(day.scoreAfter(stapos, 1)).toStrictEqual([10, 0]);
  expect(day.scoreAfter(stapos, 2)).toStrictEqual([10, 3]);
  expect(day.scoreAfter(stapos, 8)).toStrictEqual([26, 22]);
  expect(day.scoreAfter(stapos, 993 / 3)).toStrictEqual([1000, 745]);
});
