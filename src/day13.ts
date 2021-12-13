interface Vec {
  x: number;
  y: number;
}

function add(v1: Vec, v2: Vec) {
  return { x: v1.x + v2.x, y: v1.y + v2.y };
}
interface Input {
  points: Vec[];
  instructions: [string, number][];
}

export function parse(s: string): Input {
  let lines = s.split(/\n/);
  return {
    points: lines
      .filter(l => l.includes(","))
      .map(l => {
        let parts = l.split(/,/);
        return { x: parseInt(parts[0]), y: parseInt(parts[1]) };
      }),
    instructions: lines
      .filter(l => l.includes("="))
      .map(l => {
        let m = l.match(/([xy])=(\d+)/);
        if (!m) throw "boom";
        return [m[1], parseInt(m[2])];
      })
  };
}
