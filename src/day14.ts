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

export function solvea(input: Input, n: number): number {
  let m: Record<string, number> = {};
  m[input.init[0]] = 1;
  for (let i = 1; i < input.init.length; i++) {
    let s = input.init[i - 1] + input.init[i];
    m = add(m, f(s, n, input.dict));
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
  let cache: Map<string, Record<string, number>> = new Map();
  function ff(pair: string, n: number) {
    let result;
    let cached = cache.get(pair + "," + n);
    if (cached) return cached;
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
        add(ff(pair[0] + dict[pair], n - 1), ff(dict[pair] + pair[1], n - 1)),
        cc
      );
    }
    cache.set(pair + "," + n, result);
    return result;
  }
  return ff(pair, n);
}
