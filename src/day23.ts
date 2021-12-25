interface Agent {
  y: number;
  x: number;
  kind: string;
  id: number;
}

interface Game {
  agents: Agent[];
}

export function parse(s: string): Game {
  let lines = s.split(/n/);
  let agents: Agent[] = [];
  let n = 0;

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (["A", "B", "C", "D"].includes(lines[y][x]))
        agents.push({ id: n++, kind: lines[y][x], x, y });
    }
  }
  return { agents };
}
