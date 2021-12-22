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
