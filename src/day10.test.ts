import * as day from "./day10";
import * as util from "./util";

test("should return demo answer", () => {
  let inp = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;

  expect(day.solvea(inp.split(/\n/))).toBe(26397);
});

test("should return answer", () => {
  let inp = util.slurp("data/day10.txt");

  expect(day.solvea(inp.split(/\n/))).toBe(462693);
});

test("should return demo answer", () => {
  let inp = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;

  expect(day.solveb(inp.split(/\n/))).toBe(288957);
});

test("should return answer", () => {
  let inp = util.slurp("data/day10.txt");

  expect(day.solveb(inp.split(/\n/))).toBe(-999);
});
