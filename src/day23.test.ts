import * as day from "./day23";
import * as util from "./util";

const demo = `#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########`;

test("should parse", () => {
  let r = day.parse(demo);

  console.log(r.agents);
  day.print([r.agents]);
  expect(r.agents.length).toBe(16);
});

test("should return candidates", () => {
  let r = day.parse(demo);
  let cans, arrived;
  [cans, arrived] = day.candidates(r.agents);
  expect(cans.length).toBe(7 * 4);
  r.agents[0].pos = 3;
  [cans, arrived] = day.candidates(r.agents);
  expect(cans.length).toBe(12);
});

test.only("should solve demo", () => {
  let r = day.parse(demo);
  expect(day.solvea(r.agents)).toBe(12521);
});

test("should solve", () => {
  let r = day.parse(util.slurp("data/day23.txt"));
  expect(day.solvea(r.agents)).toBe(14148);
});
