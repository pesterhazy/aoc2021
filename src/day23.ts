import { strict as assert } from "assert";

interface Agent {
  pos: number;
  slot: number;
  id: number;
  mult: number;
}

interface Game {
  agents: Agent[];
}

export function parse(s: string): Game {
  let lines = s.split(/\n/);
  let agents: Agent[] = [];
  let n = 0;

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (["A", "B", "C", "D"].includes(lines[y][x])) {
        let pos = (x - 1) * 10 + y - 2;
        let kind = lines[y][x];
        let slot = (kind.charCodeAt(0) - "A".charCodeAt(0)) * 2 + 2;
        let mult = Math.pow(10, kind.charCodeAt(0) - "A".charCodeAt(0));
        agents.push({ id: n++, slot, pos, mult });
      }
    }
  }
  return { agents };
}

const HALLWAY = [0, 1, 3, 5, 7, 9, 10];

let neighbors: Map<number, number[]> = makeNeighbors();

function makeNeighbors() {
  let m: Map<number, number[]> = new Map();

  function add(a: number, b: number) {
    let mm;

    mm = m.get(a) || [];
    mm.push(b);
    m.set(a, mm);

    mm = m.get(b) || [];
    mm.push(a);
    m.set(b, mm);
  }

  for (let i = 0; i < 4; i++) {
    let n = 2 * (i + 1);
    add(n, n * 10);
    add(n * 10, n * 10 + 1);
  }

  for (let i = 0; i < 10; i++) {
    add(i, i + 1);
  }
  return m;
}

interface Candidate {
  id: number;
  pos: number;
  cost: number;
}

function findPath(frm: number, to: number): number[] {
  function find(path: number[]): number[] | undefined {
    let pos = path[path.length - 1];
    if (pos === to) return path;

    let options = neighbors.get(pos);
    if (!options) throw "oops";
    for (let neighbor of options) {
      if (neighbor === path[path.length - 2]) continue;
      let newPath = find([...path, neighbor]);
      if (newPath) return newPath;
    }
    return undefined;
  }

  let r = find([frm]);
  if (!r) throw "not found";
  return r.slice(1);
}

export function candidates(agents: Agent[]): [Candidate[], boolean] {
  let cans: Candidate[] = [];
  let M: Map<number, number> = new Map();

  for (let agent of agents) {
    M.set(agent.pos, agent.id);
  }

  let arrived = 0;
  for (let agent of agents) {
    assert([2, 4, 6, 8].includes(agent.slot));

    let parked;
    let vv = M.get(agent.slot * 10 + 1);
    if (vv !== undefined && agents[vv].slot === agent.slot) parked = true;
    else parked = false;

    // already in the right slot?
    if (agent.pos === agent.slot * 10 + 1) {
      arrived++;
      continue;
    }
    if (agent.pos === agent.slot * 10) {
      let vv = M.get(agent.slot * 10 + 1);
      if (vv !== undefined && agents[vv].slot === agent.slot) {
        arrived++;
        continue;
      }
    }

    let dests: number[] = [];

    dests.push(agent.slot * 10 + 1);
    if (parked) dests.push(agent.slot * 10);

    if (Math.floor(agent.pos / 20) > 0) {
      dests.push(...HALLWAY);
    }

    for (let dest of dests) {
      let path = findPath(agent.pos, dest);

      // blocked?
      if (path.some((pp: number) => M.has(pp))) continue;

      let cost = agent.mult * path.length;
      cans.push({ id: agent.id, pos: dest, cost });
    }
  }
  if (arrived === agents.length) return [[], true];
  else return [cans, false];
}

interface Job {
  agents: Agent[];
  cost: number;
}

export function solvea(agents: Agent[]): number {
  let jobs: Job[] = [{ agents: agents, cost: 0 }];
  let best = Infinity;
  let seen: Map<string, number> = new Map();

  while (true) {
    let job = jobs.pop();
    if (!job) break;

    let key = JSON.stringify(job.agents);
    if (seen.has(key) && seen.get(key)! >= job.cost) continue;

    seen.set(key, job.cost);

    let [cans, arrived] = candidates(job.agents);
    if (arrived) {
      best = Math.min(best, job.cost);
      continue;
    }
    for (let can of cans) {
      let newAgents: Agent[] = JSON.parse(JSON.stringify(job.agents));

      newAgents[can.id].pos = can.pos;
      jobs.push({ agents: newAgents, cost: job.cost + can.cost });
    }
  }
  return best;
}
