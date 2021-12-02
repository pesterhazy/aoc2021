import { slurp } from "./util";

interface Vec {
  x: number;
  y: number;
}

function add(v1: Vec, v2: Vec) {
  return { x: v1.x + v2.x, y: v1.y + v2.y };
}

function mul(v1: Vec, n: number) {
  return { x: v1.x * n, y: v1.y * n };
}

interface Cmd {
  dir: string;
  v: number;
}

const delta: Record<string, Vec> = {
  forward: { x: 1, y: 0 },
  down: { x: 0, y: 1 },
  up: { x: 0, y: -1 }
};

export function solvea(cmds: Cmd[]) {
  let pos = { x: 0, y: 0 };

  for (let cmd of cmds) {
    let vec: Vec = delta[cmd.dir];
    pos = add(pos, mul(vec, cmd.v));
  }
  return pos.x * pos.y;
}

export function solveb(xs: number[]) {}

export function parse(s: string): Cmd[] {
  return s
    .split("\n")
    .filter(l => l.length > 0)
    .map(l => {
      let words = l.split(" ");
      return { dir: words[0], v: parseInt(words[1]) };
    });
}
