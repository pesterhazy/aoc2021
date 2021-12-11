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

const M = {
  abcefg: 0,
  cf: 1,
  acdeg: 2,
  acdfg: 3,
  bcdf: 4,
  abdfg: 5,
  abdefg: 6,
  acf: 7,
  abcdefg: 8,
  abcdfg: 9
};

function permutations(s: string): string[] {
  if (s.length < 2) return [s];

  var result = [];
  for (var i = 0; i < s.length; i++) {
    var char = s[i];
    if (s.indexOf(char) != i) continue;
    var rem = s.slice(0, i) + s.slice(i + 1, s.length);
    for (var subPermutation of permutations(rem))
      result.push(char + subPermutation);
  }
  return result;
}

export function find(xs: string[]) {
  for (let permutation of permutations("abcdefg")) {
    if (!xs.some(x => !(project(x, permutation) in M))) return permutation;
  }
  throw "NOTFOUND";
}

export function project(s: string, mapping: string) {
  let a = Array.from(s).map(c =>
    String.fromCharCode(mapping.indexOf(c) + "a".charCodeAt(0))
  );
  a.sort();
  return a.join("");
}

export function solveb(lines: string[][][]) {
  let sum = 0;
  for (let line of lines) {
    let mapping = find(line[0]);
    sum += parseInt(
      line[1].map(s => "" + M[project(s, mapping) as keyof typeof M]).join("")
    );
  }
  return sum;
}
