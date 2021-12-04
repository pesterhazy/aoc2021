import * as util from "./util";

type Board = number[][];

interface Input {
  numbers: number[];
  boards: Board[];
}

export function parse(s: string): Input {
  let lines = util.parseLinesStr(s);
  let numbers = lines
    .shift()!
    .split(",")
    .map(l => parseInt(l));
  let boards: Board[] = [];

  while (lines.length > 0) {
    let board: Board = [];

    for (let i = 0; i < 5; i++) {
      let line = lines.shift();
      if (!line) throw "ouch";
      board.push(
        line
          .split(/\s+/)
          .filter(ss => ss.length > 0)
          .map(ss => parseInt(ss))
      );
    }

    boards.push(board);
  }

  return {
    numbers: numbers,
    boards: boards
  };
}

export function match(board: Board, ns: Set<number>) {
  let rows = new Set();
  let cols = new Set();

  for (let i = 0; i < 5; i++) {
    rows.add(i);
    cols.add(i);
  }

  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      if (!ns.has(board[y][x])) {
        cols.delete(x);
        rows.delete(y);
      }
    }
  }
  return cols.size > 0 || rows.size > 0;
}

export function solvea(input: Input): number {
  let ns: Set<number> = new Set();
  for (let n of input.numbers) {
    ns.add(n);
    for (let board of input.boards) {
      if (match(board, ns)) {
        return (
          n *
          board
            .flatMap(b => b)
            .filter(x => !ns.has(x))
            .reduce((a, b) => a + b)
        );
      }
    }
  }
  throw "not found";
}
