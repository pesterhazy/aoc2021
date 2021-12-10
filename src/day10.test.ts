import * as day from "./day10";
import * as util from "./util";

const demo = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;

test("should return demo answer", () => {
  expect(day.solvea(demo.split(/\n/))).toBe(26397);
});

test("should return answer", () => {
  let inp = util.slurp("data/day10.txt");

  expect(day.solvea(inp.split(/\n/))).toBe(462693);
});

test("should return demo answer", () => {
  expect(day.solveb(demo.split(/\n/))).toBe(288957);
});

test("should return answer", () => {
  let inp = util.slurp("data/day10.txt");

  expect(day.solveb(inp.split(/\n/))).toBe(3094671161);
});
