import * as day from "./day18";
import * as util from "./util";

test("should add", () => {
  expect(day.add([1, 2], [[3, 4], 5])).toStrictEqual([
    [1, 2],
    [[3, 4], 5]
  ]);
});

test.only("should explode", () => {
  expect(day.explode([[[[[9, 8], 1], 2], 3], 4])).toStrictEqual([
    [[[0, 9], 2], 3],
    4
  ]);
  expect(day.explode([7, [6, [5, [4, [3, 2]]]]])).toStrictEqual([
    7,
    [6, [5, [7, 0]]]
  ]);
  expect(day.explode([[6, [5, [4, [3, 2]]]], 1])).toStrictEqual([
    [6, [5, [7, 0]]],
    3
  ]);
  let input = [
    [3, [2, [1, [7, 3]]]],
    [6, [5, [4, [3, 2]]]]
  ];
  let result = day.explode(input as any);
  let expected = [
    [3, [2, [8, 0]]],
    [9, [5, [4, [3, 2]]]]
  ];
  // console.log("input:", JSON.stringify(input));
  // console.log("expected:", JSON.stringify(expected));
  // console.log("actual:", JSON.stringify(result));
  expect(result).toStrictEqual(expected);
});
