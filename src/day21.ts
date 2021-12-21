export function parse(s: string): number[] {
  let m = s.match(/([-0-9]+)/g);
  if (!m) throw "ouch";
  let xs = m.map(ss => parseInt(ss));
  return [xs[1], xs[3]];
}

export function solvea(stapos: number[]): number {
  return -1;
}

export function roll(n: number): number {
  return (
    1 + ((n * 3) % 100) + 1 + ((n * 3 + 1) % 100) + 1 + ((n * 3 + 2) % 100)
  );
}

function mod1(a: number, b: number) {
  return ((a - 1) % b) + 1;
}

export function scoreAfter(stapos: number[], nticks: number): number[] {
  let score = [0, 0];
  let pos = [stapos[0], stapos[1]];
  for (let tick = 0; tick < nticks; tick++) {
    let player = tick % 2;
    pos[player] = mod1(pos[player] + roll(tick), 10);
    score[player] += pos[player];
  }
  return score;
}
