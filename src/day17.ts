export function parse(s: string): number[] {
  let m = s.match(/([-0-9]+)/g);
  if (!m) throw "boom";
  let xs = m.map(ss => parseInt(ss));
  return [
    Math.min(xs[0], xs[1]),
    Math.max(xs[0], xs[1]),
    Math.min(xs[2], xs[3]),
    Math.max(xs[2], xs[3])
  ];
}

export function solvea(input: number[]): number {
  let max = -Infinity;
  for (let x = 0; x < 300; x++) {
    for (let y = -200; y < 200; y++) {
      let ans = simulate(input, { x, y });
      if (ans === undefined) continue;
      max = Math.max(ans, max);
    }
  }
  return max;
}

export function solveb(input: number[]): number {
  let c = 0;
  for (let x = 0; x < 300; x++) {
    for (let y = -200; y < 200; y++) {
      let ans = simulate(input, { x, y });
      if (ans === undefined) continue;
      c++;
    }
  }
  return c;
}

interface Vec {
  x: number;
  y: number;
}

function add(v1: Vec, v2: Vec) {
  return { x: v1.x + v2.x, y: v1.y + v2.y };
}

export function simulate(input: number[], vel: Vec): number | undefined {
  let pos: Vec = { x: 0, y: 0 };
  let ans = -Infinity;

  while (true) {
    pos = add(pos, vel);
    vel = {
      x: vel.x > 0 ? vel.x - 1 : vel.x < 0 ? vel.x + 1 : vel.x,
      y: vel.y - 1
    };
    if (pos.x > input[1]) {
      return undefined;
    }
    if (pos.y < input[2] && vel.y < 0) {
      return undefined;
    }
    ans = Math.max(ans, pos.y);

    if (
      pos.x >= input[0] &&
      pos.x <= input[1] &&
      pos.y >= input[2] &&
      pos.y <= input[3]
    ) {
      return ans;
    }
  }
}
