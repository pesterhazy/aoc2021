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
