interface Inst {
  on: boolean;
  box: number[][];
}

export function parse(s: string): Inst[] {
  return s.split(/\n/).map(l => {
    let on = l.startsWith("on");
    let m = l.match(/[-0-9]+/g);
    if (!m) throw "boom";
    let xs = m.map(v => parseInt(v));
    let box = [
      [xs[0], xs[1]],
      [xs[2], xs[3]],
      [xs[4], xs[5]]
    ];
    return { on, box };
  });
}

type Box = number[][];
type BoxSet = number[][][];

function size1(box: Box): number {
  let r = 1;
  for (let i = 0; i < 3; i++) r *= box[i][1] - box[i][0] + 1;
  return r;
}

export function size(boxes: BoxSet): number {
  return boxes.map(size1).reduce((a, b) => a + b, 0);
}

export function sub1(a: Box, b: Box): BoxSet {
  let r: Box[] = [];

  a = JSON.parse(JSON.stringify(a));
  b = JSON.parse(JSON.stringify(b));

  for (let j = 0; j < 3; j++) {
    if (b[j][1] < a[j][0] || b[j][0] > a[j][1]) return [a];

    b[j][0] = Math.max(b[j][0], a[j][0]);
    b[j][1] = Math.min(b[j][1], a[j][1]);
  }
  if (size1(a) < 0) throw "INIT Invariant failed: size1(a)<0";
  if (size1(b) < 0) throw "INIT Invariant failed: size1(b)<0";
  // for each dimension, cut off slices
  for (let i = 0; i < 3; i++) {
    // lower bound

    if (a[i][0] < b[i][0]) {
      let c = JSON.parse(JSON.stringify(a));
      c[i][0] = a[i][0];
      c[i][1] = b[i][0] - 1;
      r.push(c);
      a[i][0] = b[i][0];
      if (size1(a) < 0) throw "LOWER Invariant failed: size1(a)<0";
    }
    // upper bound

    if (a[i][1] > b[i][1]) {
      let c = JSON.parse(JSON.stringify(a));
      c[i][0] = b[i][1] + 1;
      c[i][1] = a[i][1];
      r.push(c);
      a[i][1] = b[i][1];
      if (size1(a) < 0) throw "UPPER Invariant failed: size1(a)<0";
    }
  }

  return r;
}

export function sub(a: BoxSet, b: Box): BoxSet {
  return a.flatMap(box => sub1(box, b));
}

export function add(boxes: BoxSet, addendum: Box): BoxSet {
  let r = [addendum];
  for (let box of boxes) {
    sub1(box, addendum).map(x => r.push(x));
  }
  return r;
}

export function solvea(insts: Inst[]): number {
  let r: BoxSet = [];

  for (let inst of insts) {
    if (inst.on) r = add(r, inst.box);
    else r = sub(r, inst.box);
  }
  console.log(r);
  return size(r);
}
