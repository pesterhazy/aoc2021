export function parse(s: string): string[][] {
  return s.split(/\n/).map(l => l.split(/-/));
}

export function admissiblea(path: string[]) {
  let last = path[path.length - 1];

  if (
    last === last.toLowerCase() &&
    path.reduce((a, b) => (b === last ? a + 1 : a), 0) > 1
  )
    return false;
  else return true;
}

export function admissibleb(path: string[]): boolean {
  let m: Record<string, number> = {};
  for (let x of path) {
    if (x === x.toLowerCase()) {
      m[x] = m[x] || 0;
      m[x]++;
    }
  }

  if (m["start"] > 1 || m["end"] > 1) return false;

  let count = 0;
  for (let e of Object.values(m)) {
    if (e > 2) return false;
    if (e === 2) count++;
  }
  if (count > 1) return false;

  return true;
}

export function solve(xs: string[][], admissible: (path: string[]) => boolean) {
  let m: Record<string, string[]> = {};

  for (let [x, y] of xs) {
    m[x] = m[x] || [];
    m[x].push(y);
    m[y] = m[y] || [];
    m[y].push(x);
  }

  let ans = 0;
  let todo: string[][] = [["start"]];
  while (true) {
    let path = todo.pop()!;
    if (!path) break;

    let pos = path[path.length - 1];

    if (pos === "end") {
      ans++;
    } else {
      let candidates: string[] = m[pos];

      if (candidates)
        for (let candidate of candidates) {
          let newPath = [...path, candidate];

          if (admissible(newPath)) todo.push(newPath);
        }
    }
  }
  return ans;
}
