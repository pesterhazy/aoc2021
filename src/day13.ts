interface Vec {
  x: number;
  y: number;
}

function add(v1: Vec, v2: Vec) {
  return { x: v1.x + v2.x, y: v1.y + v2.y };
}
interface Input {
  points: Vec[];
  instructions: [string, number][];
}

export function parse(s: string): Input {
  let lines = s.split(/\n/);
  return {
    points: lines
      .filter(l => l.includes(","))
      .map(l => {
        let parts = l.split(/,/);
        return { x: parseInt(parts[0]), y: parseInt(parts[1]) };
      }),
    instructions: lines
      .filter(l => l.includes("="))
      .map(l => {
        let m = l.match(/([xy])=(\d+)/);
        if (!m) throw "boom";
        return [m[1], parseInt(m[2])];
      })
  };
}

export function solvea(input: Input): number {
  let points: Vec[] = input.points;
  let instruction = input.instructions[0];

  points = points.map(point => {
    let newPoint = { x: point.x, y: point.y };
    if (instruction[0] === "x") {
      let delta = point.x - instruction[1];
      if (delta > 0) newPoint.x -= 2 * delta;
    } else if (instruction[0] === "y") {
      let delta = point.y - instruction[1];
      if (delta > 0) newPoint.y -= 2 * delta;
    } else throw "boom";
    return newPoint;
  });

  let s: Set<string> = new Set();

  for (let point of points) {
    s.add(`${point.x},${point.y}`);
  }
  return s.size;
}

export function solveb(input: Input): string {
  let points: Vec[] = input.points;
  let instruction = input.instructions[0];

  for (let instruction of input.instructions) {
    points = points.map(point => {
      let newPoint = { x: point.x, y: point.y };
      if (instruction[0] === "x") {
        let delta = point.x - instruction[1];
        if (delta > 0) newPoint.x -= 2 * delta;
      } else if (instruction[0] === "y") {
        let delta = point.y - instruction[1];
        if (delta > 0) newPoint.y -= 2 * delta;
      } else throw "boom";
      return newPoint;
    });
  }

  let mx = points.reduce((a, b) => (a > b.x ? a : b.x), -Infinity);
  let my = points.reduce((a, b) => (a > b.y ? a : b.y), -Infinity);

  var a: string[][] = [];
  for (var y = 0; y <= my; y++) {
    a[y] = [];
    for (var x = 0; x <= mx; x++) {
      a[y][x] = ".";
    }
  }

  for (let point of points) {
    a[point.y][point.x] = "*";
  }

  let ans = a.map(v => v.join("")).join("\n");
  return ans;
}
