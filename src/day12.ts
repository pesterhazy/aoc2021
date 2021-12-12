export function parse(s: string): string[][] {
  return s.split(/\n/).map(l => l.split(/-/));
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
          if (candidate === candidate.toLowerCase() && path.includes(candidate))
            continue;

          todo.push([...path, candidate]);
        }
    }
  }
  return ans;
}
