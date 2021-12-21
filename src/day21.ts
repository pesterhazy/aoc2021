export function parse(s: string): number[] {
  let m = s.match(/([-0-9]+)/g);
  if (!m) throw "ouch";
  let xs = m.map(ss => parseInt(ss));
  return [xs[1], xs[3]];
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

export function solvea(stapos: number[]): number {
  let score = [0, 0];
  let pos = [stapos[0], stapos[1]];
  let tick = 0;
  while (true) {
    let player = tick % 2;
    pos[player] = mod1(pos[player] + roll(tick), 10);
    score[player] += pos[player];
    if (score[player] >= 1000) return score[1 - player] * (tick + 1) * 3;
    tick++;
  }
}

export function solveb(stapos: number[]): number {
  let rolls: number[] = [];
  for (let a = 1; a <= 3; a++)
    for (let b = 1; b <= 3; b++)
      for (let c = 1; c <= 3; c++) rolls.push(a + b + c);

  let M: Map<string, number[]> = new Map();

  function find(
    pos: number[],
    score: number[],
    player: 0 | 1,
    nextRoll: number
  ): number[] {
    let key = JSON.stringify([pos, score, player, nextRoll]);
    if (M.has(key)) return M.get(key)!;

    let newPos = [];
    newPos[1 - player] = pos[1 - player];
    newPos[player] = mod1(pos[player] + nextRoll, 10);

    let newScore = [];
    newScore[1 - player] = score[1 - player];
    newScore[player] = score[player] + pos[player];

    if (newScore[player] >= 21) {
      // console.log(newPos, newScore, player);
      let result = player === 0 ? [1, 0] : [0, 1];
      M.set(key, result);
      return result;
    } else {
      let r = [0, 0];
      for (let roll of rolls) {
        let [a, b] = find(newPos, newScore, player === 0 ? 1 : 0, roll);
        r[0] += a;
        r[1] += b;
      }
      return r;
    }
  }

  let r = [0, 0];
  for (let roll of rolls) {
    let [a, b] = find(stapos, [0, 0], 0, roll);
    r[0] += a;
    r[1] += b;
  }
  return Math.max(...r);
}
