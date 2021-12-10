const PAIRS = { ")": "(", "]": "[", "}": "{", ">": "<" };
const SCORE = { ")": 3, "]": 57, "}": 1197, ">": 25137 };

function isClosing(c: string): c is keyof typeof PAIRS {
  return c in PAIRS;
}

export function solvea(lines: string[]) {
  let score = 0;
  for (let line of lines) {
    function pa(line: string) {
      let i = 0;
      let stack: string[] = [];
      while (true) {
        if (i >= line.length) {
          if (stack.length > 0) return 0;
          else throw "NOERR";
        }
        let c = line[i++];
        if (isClosing(c)) {
          let r = stack.pop();
          if (PAIRS[c] !== r) return SCORE[c];
        } else {
          stack.push(c);
        }
      }
    }

    score += pa(line);
  }
  return score;
}
