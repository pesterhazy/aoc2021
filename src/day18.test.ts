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

test("should return mag", () => {
  expect(
    day.mag([
      [
        [
          [8, 7],
          [7, 7]
        ],
        [
          [8, 6],
          [7, 7]
        ]
      ],
      [
        [
          [0, 7],
          [6, 6]
        ],
        [8, 7]
      ]
    ])
  ).toBe(3488);
});

test("should answer demo", () => {
  let input = day.parse(`[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`);

  expect(day.solvea(input)).toBe(4140);
});

test("should answer", () => {
  let input = day.parse(util.slurp("data/day18.txt"));

  expect(day.solvea(input)).toBe(2541);
});

test("should answer demo", () => {
  let input = day.parse(`[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`);

  expect(day.solveb(input)).toBe(3993);
});

test("should answer", () => {
  let input = day.parse(util.slurp("data/day18.txt"));

  expect(day.solveb(input)).toBe(4647);
});
