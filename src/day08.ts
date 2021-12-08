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

function isSimple(w: string) {
  return [2, 3, 4, 7].includes(w.length);
}

export function solvea(lines: string[][][]) {
  let ans = 0;
  for (let xs of lines.map(line => line[1])) {
    ans += xs.filter(isSimple).length;
  }
  return ans;
}
