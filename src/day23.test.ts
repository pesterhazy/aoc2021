import * as day from "./day23";
import * as util from "./util";

const demo = `#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########`;

test("should parse", () => {
  let r = day.parse(demo);

  expect(r.agents.length).toBe(8);
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

test("should solve demo", () => {
  let r = day.parse(demo);
  expect(day.solvea(r.agents)).toBe(12521);
});

test("should solve", () => {
  let r = day.parse(util.slurp("data/day23.txt"));
  expect(day.solvea(r.agents)).toBe(14148);
});
