import * as day from "./day18";
import * as util from "./util";

test("should add", () => {
  expect(day.add([1, 2], [[3, 4], 5])).toStrictEqual([
    [1, 2],
    [[3, 4], 5]
  ]);
});

test("should explode", () => {
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
  expect(
    day.explode([
      [3, [2, [1, [7, 3]]]],
      [6, [5, [4, [3, 2]]]]
    ])
  ).toStrictEqual([
    [3, [2, [8, 0]]],
    [9, [5, [4, [3, 2]]]]
  ]);

  expect(
    day.explode([
      [
        [[[4, 3], 4], 4],
        [7, [[8, 4], 9]]
      ],
      [1, 1]
    ])
  ).toStrictEqual([
    [
      [[0, 7], 4],
      [7, [[8, 4], 9]]
    ],
    [1, 1]
  ]);
});

test("should split", () => {
  expect(
    day.split([
      [
        [[0, 7], 4],
        [15, [0, 13]]
      ],
      [1, 1]
    ])
  ).toStrictEqual([
    [
      [[0, 7], 4],
      [
        [7, 8],
        [0, 13]
      ]
    ],
    [1, 1]
  ]);
});

test("should xform", () => {
  let e: any = [
    [
      [[[4, 3], 4], 4],
      [7, [[8, 4], 9]]
    ],
    [1, 1]
  ];

  e = day.xform(e);
  expect(e).toStrictEqual([
    [
      [[0, 7], 4],
      [
        [7, 8],
        [6, 0]
      ]
    ],
    [8, 1]
  ]);
});
