export function parse(s: string): number[] {
  let m = s.match(/([0-9]+)/g);
  if (!m) throw "boom";
  return m.map(ss => parseInt(ss));
}
