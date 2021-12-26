import { strict as assert } from "assert";
interface Agent {
  pos: number;
  slot: number;
  id: number;
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
        agents.push({ id: n++, slot, pos });
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

interface Candidate {}

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

export function candidates(agents: Agent[]): Candidate[] {
  let cans: Candidate[] = [];
  let M: Map<number, number> = new Map();

  for (let agent of agents) {
    M.set(agent.pos, agent.id);
  }

  for (let agent of agents) {
    assert([2, 4, 6, 8].includes(agent.slot));

    let parked;
    let vv = M.get(agent.slot * 10 + 1);
    if (vv !== undefined && agents[vv].slot === agent.slot) parked = true;
    else parked = false;

    // already in the right slot?
    if (agent.pos === agent.slot * 10 + 1) continue;
    if (agent.pos === agent.slot * 10) {
      let vv = M.get(agent.slot * 10 + 1);
      if (vv !== undefined && agents[vv].slot === agent.slot) continue;
    }

    let dests: number[] = [];

    dests.push(agent.slot * 10 + 1);
    if (parked) dests.push(agent.slot * 10);

    if (Math.floor(agent.pos / 20) > 0) {
      dests.push(...HALLWAY);
    } else {
      throw "Not Implemented";
    }

    for (let dest of HALLWAY) {
      let path = findPath(agent.pos, dest);

      // blocked?
      if (path.some((pp: number) => M.has(pp))) continue;

      cans.push({ id: agent.id, pos: dest });
    }
  }
  return cans;
}
