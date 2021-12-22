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

function within(box: number[][], { ranges }: Inst): boolean {
  return [0, 1, 2].every(
    i => box[i][0] >= ranges[i][0] && box[i][1] <= ranges[i][1]
  );
}

function outside(box: number[][], { ranges }: Inst): boolean {
  return [0, 1, 2].some(
    i => box[i][1] < ranges[i][0] || box[i][0] > ranges[i][1]
  );
}

function size(box: number[][]): number {
  let r = 1;
  for (let i = 0; i < 3; i++) r *= box[i][1] - box[i][0] + 1;
  return r;
}

export function solvea(insts: Inst[], init: number[][]): number {
  let jobs: number[][][] = [init];
  let ans = 0;

  while (jobs.length > 0) {
    let box = jobs.pop()!;
    console.log(box);

    if (
      insts
        .filter(inst => inst.on)
        .every(inst => within(box, inst) || outside(box, inst))
    ) {
      let flag = false;
      for (let inst of insts) {
        if (!within(box, inst)) continue;
        flag = inst.on;
      }
      if (flag) ans += size(box);
      continue;
    }

    let dims = [0, 1, 2].map(i => box[i][1] - box[i][0] + 1);
    let d;
    if (dims[0] >= dims[1] && dims[0] >= dims[2]) d = 0;
    else if (dims[1] >= dims[0] && dims[1] >= dims[2]) d = 1;
    else d = 2;

    let a = [...box];
    let b = [...box];
    a[d] = [box[d][0], box[d][0] + Math.floor(dims[d] / 2)];
    b[d] = [box[d][0] + Math.floor(dims[d] / 2) + 1, box[d][1]];
    jobs.push(a);
    jobs.push(b);
  }
  return ans;
}
