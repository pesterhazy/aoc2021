type Vec3 = [number, number, number];
type Scanner = Vec3[];

export function parse(s: string): Scanner[] {
  let lines = s.split(/\n/);
  let n = -1;
  let r: Scanner[] = [];
  for (let line of lines) {
    if (line.startsWith("---")) {
      n++;
      r[n] = [];
    } else if (line.length === 0) continue;
    else {
      let m = line.match(/([-0-9]+)/g);
      if (!m) throw "oops";
      r[n].push(m.map(ss => parseInt(ss)) as Vec3);
    }
  }
  return r;
}

// export function overlap(a: Scanner, b: Scanner): number {}
