import * as day from "./day08";
import * as util from "./util";

test("should return demo answer", () => {
  let inp = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb |
fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec |
fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef |
cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega |
efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga |
gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf |
gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf |
cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd |
ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg |
gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc |
fgae cfgab fg bagce`;

  expect(day.solvea(day.parse(inp))).toBe(26);
});

test("should return answer", () => {
  let inp = util.slurp("data/day08.txt");

  expect(day.solvea(day.parse(inp))).toBe(330);
});

test.skip("should return digits", () => {
  let inp = `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab |
cdfeb fcadb cdfeb cdbaf`;

  expect(day.find(day.parse(inp)[0][0])).toStrictEqual("deafgbc");
});

test("demo projection", () => {
  let inp = `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab |
cdfeb fcadb cdfeb cdbaf`;

  expect(day.project("ab", "deafgbc")).toBe("cf");
  expect(day.project("dab", "deafgbc")).toBe("acf");
  expect(day.project("eafb", "deafgbc")).toBe("bcdf");
  expect(day.project("cefabd", "deafgbc")).toBe("abcdfg");
  expect(day.project("acedgfb", "deafgbc")).toBe("abcdefg");
});
