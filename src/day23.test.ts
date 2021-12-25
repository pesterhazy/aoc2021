import * as day from "./day23";

const demo = `#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########`;

test("should parse", () => {
  let r = day.parse(demo);
  console.log(r);

  expect(r.agents.length).toBe(8);
});
