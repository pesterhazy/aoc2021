import * as day from "./day23";

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
  let cans = day.candidates(r.agents);

  expect(cans.length).toBe(7 * 4);
});
