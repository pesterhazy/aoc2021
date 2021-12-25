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

type Box = number[][];
type BoxSet = number[][][];

function size1(box: Box): number {
  let r = 1;
  for (let i = 0; i < 3; i++) r *= box[i][1] - box[i][0] + 1;
  return r;
}

export function size(boxes: BoxSet): number {
  return boxes.map(size1).reduce((a, b) => a + b);
}

export function sub(a: Box, b: Box): BoxSet {
  let r: Box[] = [];
  // trim

  a = JSON.parse(JSON.stringify(a));
  b = JSON.parse(JSON.stringify(b));

  // find section of b enclosed in a
  for (let i = 0; i < 3; i++) {
    b[i][0] = Math.max(b[i][0], a[i][0]);
    b[i][1] = Math.min(b[i][1], a[i][1]);
  }

  // for each dimension, cut off slices
  for (let i = 0; i < 3; i++) {
    // lower bound
    if (a[i][0] < b[i][0]) {
      let c = JSON.parse(JSON.stringify(a));
      c[i][0] = a[i][0];
      c[i][1] = b[i][0] - 1;
      r.push(c);
      a[i][0] = b[i][0];
    }
    // upper bound
    if (a[i][1] > b[i][1]) {
      let c = JSON.parse(JSON.stringify(a));
      c[i][0] = b[i][1] + 1;
      c[i][1] = a[i][1];
      r.push(c);
      a[i][1] = b[i][1];
    }
  }

  return r;
}
