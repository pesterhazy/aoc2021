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

export function digits(xs: string[]) {
  let ys = Object.keys(M);
  console.log(xs, ys);

  let source = "abcdefg";
  let permutations = permute(Array.from(source)).map(a => a.join(""));
  for (let permutation of permutations) {
    let mapping: Record<string, string> = {};
    for (let i = 0; i < 7; i++) mapping[source[i]] = permutation[i];

    let found = true;
    let hits = 0;
    for (let x of xs) {
      let xx = Array.from(x)
        .map(c => mapping[c])
        .join("");

      if (ys.includes(xx)) {
        hits++;
      }
    }
    if (hits === ys.length) {
      return mapping;
    }
  }
  throw "not found";
}
