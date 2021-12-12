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

export function solvea(xs: string[][]) {
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

          if (admissiblea(newPath)) todo.push(newPath);
        }
    }
  }
  return ans;
}
