import * as day from "./day19";

const demo = `--- scanner 0 ---
-1,-1,1
-2,-2,2
-3,-3,3
-2,-3,1
5,6,-4
8,0,7

--- scanner 0 ---
1,-1,1
2,-2,2
3,-3,3
2,-1,3
-5,4,-6
-8,-7,0

--- scanner 0 ---
-1,-1,-1
-2,-2,-2
-3,-3,-3
-1,-3,-2
4,6,5
-7,0,8

--- scanner 0 ---
1,1,-1
2,2,-2
3,3,-3
1,3,-2
-4,-6,5
7,0,8

--- scanner 0 ---
1,1,1
2,2,2
3,3,3
3,1,2
-6,-4,-5
0,7,-8`;

test("should parse", () => {
  let xs = day.parse(demo);

  // console.log(xs);
  expect(xs.length).toBe(5);
});

// test("should find overlap", () => {
//   let xs = day.parse(demo);

//   let r = day.overlap(xs[0], xs[1]);
//   expect(r).toBe(12);
// });
