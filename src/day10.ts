type Opening = "(" | "[" | "{" | "<";
type Closing = ")" | "]" | "}" | ">";

const PAIRS: Record<Opening, Closing> = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">"
} as const;
const SCORE = { ")": 3, "]": 57, "}": 1197, ">": 25137 };

function isClosing(c: string): c is Closing {
  return [")", "]", "}", ">"].includes(c);
}

function isOpening(c: string): c is Opening {
  return c in PAIRS;
}

export function solvea(lines: string[]) {
  let score = 0;
  for (let line of lines) {
    function pa(line: string) {
      let i = 0;
      let stack: Closing[] = [];
      while (true) {
        if (i >= line.length) {
          if (stack.length > 0) return 0;
          else throw "NOERR";
        }
        let c = line[i++];
        if (isClosing(c)) {
          let r = stack.pop();
          if (c !== r) return SCORE[c];
        } else if (isOpening(c)) {
          stack.push(PAIRS[c]);
        } else throw "Unexpected";
      }
    }

    score += pa(line);
  }
  return score;
}

const SCORE2: Record<Closing, number> = { ")": 1, "]": 2, "}": 3, ">": 4 };

export function solveb(lines: string[]) {
  let scores = [];
  for (let line of lines) {
    function pa(line: string) {
      let i = 0;
      let stack: Closing[] = [];
      while (true) {
        if (i >= line.length) {
          if (stack.length > 0) {
            let result = 0;
            while (stack.length > 0) {
              let c = stack.pop()!;
              result = result * 5 + SCORE2[c];
            }
            return result;
          } else throw "NOERR";
        }
        let c = line[i++];
        if (isClosing(c)) {
          let r = stack.pop();
          if (c !== r) return 0;
        } else if (isOpening(c)) {
          stack.push(PAIRS[c]);
        } else throw "Unexpected";
      }
    }
    let score = pa(line);
    if (score > 0) {
      scores.push(score);
    }
  }
  scores.sort((a, b) => a - b);
  return scores[Math.floor(scores.length / 2)];
}
