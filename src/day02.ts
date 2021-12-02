import * as util from "./util";

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

export function solveb(cmds: Cmd[]) {
  let pos = { x: 0, y: 0 };
  let aim = 0;

  for (let cmd of cmds) {
    switch (cmd.dir) {
      case "down":
        aim += cmd.v;
        break;
      case "up":
        aim -= cmd.v;
        break;
      case "forward":
        pos = { x: pos.x + cmd.v, y: pos.y + cmd.v * aim };
        break;
      default:
        throw "boom";
    }
  }
  return pos.x * pos.y;
}

export function parse(s: string): Cmd[] {
  return util.parseWords(s).map(l => ({ dir: l[0], v: parseInt(l[1]) }));
}
