import * as day from "./day18";
import * as util from "./util";

test("should add", () => {
  expect(day.add([1, 2], [[3, 4], 5])).toStrictEqual([
    [1, 2],
    [[3, 4], 5]
  ]);
});
