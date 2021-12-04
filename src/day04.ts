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
