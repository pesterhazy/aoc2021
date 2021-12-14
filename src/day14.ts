interface Input {
  dict: Record<string, string>;
  init: string;
}

export function parse(s: string): Input {
  let lines = s.split(/\n/);
  return {
    dict: Object.fromEntries(
      lines
        .filter(l => l.includes("->"))
        .map(l => {
          let m = l.match(/([A-Z]+)/g);
          if (!m) throw "FREAK";
          return m;
        })
    ),
    init: lines[0]
  };
}

export function xform(s: string, r: Record<string, string>): string {
  let ss = s[0];
  for (let i = 1; i < s.length; i++) {
    let c = r[s[i - 1] + s[i]];
    if (!c) throw "oops";
    ss += c + s[i];
  }
  return ss;
}

export function solvea(input: Input): number {
  let s = input.init;
  for (let i = 0; i < 10; i++) {
    s = xform(s, input.dict);
  }

  let m: Record<string, number> = {};
  for (let i = 0; i < s.length; i++) {
    if (!m[s[i]]) m[s[i]] = 0;
    m[s[i]]++;
  }
  let xs = Object.values(m);
  xs.sort((a, b) => a - b);
  return xs[xs.length - 1] - xs[0];
}

function add(
  a: Record<string, number>,
  b: Record<string, number>
): Record<string, number> {
  let r = { ...a };

  for (let [k, v] of Object.entries(b)) {
    r[k] = (r[k] || 0) + v;
  }
  return r;
}

export function f(
  pair: string,
  n: number,
  dict: Record<string, string>
): Record<string, number> {
  let result;
  if (n === 1) {
    let r: Record<string, number> = {};

    r[pair[0]] = (r[pair[0]] || 0) + 1;
    r[pair[1]] = (r[pair[1]] || 0) + 1;
    r[dict[pair]] = (r[dict[pair]] || 0) + 1;
    result = r;
  } else {
    let cc: Record<string, number> = {};
    cc[dict[pair]] = -1;
    result = add(
      add(
        f(pair[0] + dict[pair], n - 1, dict),
        f(dict[pair] + pair[1], n - 1, dict)
      ),
      cc
    );
  }
  return result;
}
