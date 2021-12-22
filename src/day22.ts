interface Inst {
  on: boolean;
  ranges: number[][];
}

export function parse(s: string): Inst[] {
  return s.split(/\n/).map(l => {
    let on = l.startsWith("on");
    let m = l.match(/[-0-9]+/g);
    if (!m) throw "boom";
    let xs = m.map(v => parseInt(v));
    let ranges = [
      [xs[0], xs[1]],
      [xs[2], xs[3]],
      [xs[4], xs[5]]
    ];
    return { on, ranges };
  });
}

function isOn(insts: Inst[], vec: number[]): boolean {
  let on = false;
  for (let inst of insts) {
    let inRange = true;
    for (let i = 0; i < 3; i++)
      if (vec[i] < inst.ranges[i][0] || vec[i] > inst.ranges[i][1])
        inRange = false;
    if (!inRange) continue;
    on = inst.on;
  }
  return on;
}

export function solvea(insts: Inst[]): number {
  let count = 0;
  for (let x = -50; x <= 50; x++)
    for (let y = -50; y <= 50; y++)
      for (let z = -50; z <= 50; z++) {
        if (isOn(insts, [x, y, z])) count++;
      }
  return count;
}
