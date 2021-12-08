export function parse(s: string) {
  return s
    .replace(/\|\n/g, "|")
    .split("\n")
    .map(l => {
      let m = l.match(/[a-z]+/g);
      if (!m) throw "oops";
      if (m.length !== 14) throw "incorrect length";
      return [m.slice(0, 10), m.slice(10)];
    });
}

export function solvea(lines: string[][][]) {
  console.log(lines);
}
