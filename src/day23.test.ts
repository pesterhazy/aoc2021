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

test("should solve demo", () => {
  let r = day.parse(demo);
  expect(day.solvea(r.agents)).toBe(44169);
});

test("should solve", () => {
  let r = day.parse(util.slurp("data/day23.txt"));
  expect(day.solvea(r.agents)).toBe(43814);
});
