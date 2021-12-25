import * as day from "./day22";
import * as util from "./util";

let demo = `on x=-20..26,y=-36..17,z=-47..7
on x=-20..33,y=-21..23,z=-26..28
on x=-22..28,y=-29..23,z=-38..16
on x=-46..7,y=-6..46,z=-50..-1
on x=-49..1,y=-3..46,z=-24..28
on x=2..47,y=-22..22,z=-23..27
on x=-27..23,y=-28..26,z=-21..29
on x=-39..5,y=-6..47,z=-3..44
on x=-30..21,y=-8..43,z=-13..34
on x=-22..26,y=-27..20,z=-29..19
off x=-48..-32,y=26..41,z=-47..-37
on x=-12..35,y=6..50,z=-50..-2
off x=-48..-32,y=-32..-16,z=-15..-5
on x=-18..26,y=-33..15,z=-7..46
off x=-40..-22,y=-38..-28,z=23..41
on x=-16..35,y=-41..10,z=-47..6
off x=-32..-23,y=11..30,z=-14..3
on x=-49..-5,y=-3..45,z=-29..18
off x=18..30,y=-20..-8,z=-3..13
on x=-41..9,y=-7..43,z=-33..15
on x=-54112..-39298,y=-85059..-49293,z=-27449..7877
on x=967..23432,y=45373..81175,z=27513..53682`;

test("should parse", () => {
  let xs = day.parse(demo);

  expect(xs[xs.length - 1]).toStrictEqual({
    on: true,
    ranges: [
      [967, 23432],
      [45373, 81175],
      [27513, 53682]
    ]
  });
});

test("should give demo answer", () => {
  let xs = day.parse(demo);

  expect(day.solvea(xs.slice(0, xs.length - 2))).toBe(590784);
});

// test("should give answer", () => {
//   let xs = day.parse(util.slurp("data/day22.txt"));

//   expect(day.solvea(xs)).toBe(602574);
// });

test("should sub", () => {
  let a, b;

  a = [
    [0, 2],
    [0, 2],
    [0, 2]
  ];
  b = [
    [1, 1],
    [1, 1],
    [1, 1]
  ];

  expect(day.size(day.sub1(a, b))).toBe(26);

  a = [
    [0, 2],
    [0, 2],
    [0, 2]
  ];
  b = [
    [1, 3],
    [1, 3],
    [1, 3]
  ];

  expect(day.size(day.sub1(a, b))).toBe(3 * 3 * 3 - 2 * 2 * 2);

  a = [
    [0, 2],
    [0, 2],
    [0, 2]
  ];
  b = a;

  expect(day.size(day.sub1(a, b))).toBe(0);
});

test("should add", () => {
  let a, b;

  a = [
    [0, 2],
    [0, 2],
    [0, 2]
  ];
  b = a;

  expect(day.size(day.add1(a, b))).toBe(3 * 3 * 3);
});

test("should sub many", () => {
  let a, b;

  a = [
    [
      [0, 2],
      [0, 2],
      [0, 2]
    ],
    [
      [3, 5],
      [0, 2],
      [0, 2]
    ]
  ];
  b = [
    [1, 4],
    [1, 1],
    [1, 1]
  ];

  expect(day.size(day.sub(a, b))).toBe(27 * 2 - 4);
});

test("should add many", () => {
  let a, b;

  a = [
    [
      [0, 2],
      [0, 2],
      [0, 2]
    ],
    [
      [3, 5],
      [0, 2],
      [0, 2]
    ]
  ];
  b = [
    [1, 4],
    [1, 1],
    [1, 1]
  ];

  expect(day.size(day.add(a, b))).toBe(27 * 2);
});

test("should add many more", () => {
  let a, b;

  a = [
    [
      [0, 2],
      [0, 2],
      [0, 2]
    ],
    [
      [3, 5],
      [0, 2],
      [0, 2]
    ]
  ];
  b = [
    [1, 4],
    [1, 1],
    [1, 1]
  ];

  expect(day.size(day.add(a, b))).toBe(27 * 2);
});
