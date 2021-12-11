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

function permute(permutation: string[]) {
  var length = permutation.length,
    result = [permutation.slice()],
    c = new Array(length).fill(0),
    i = 1,
    k,
    p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}

export function find(xs: string[]) {
  for (let permutation of permute(Array.from("abcdefg")).map(a => a.join(""))) {
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
