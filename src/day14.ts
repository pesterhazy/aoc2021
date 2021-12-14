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
