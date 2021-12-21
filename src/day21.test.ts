import * as day from "./day21";

let demo = `Player 1 starting position: 4
Player 2 starting position: 8`;

test("should parse", () => {
  let xs = day.parse(demo);

  expect(xs).toStrictEqual([4, 8]);
});
