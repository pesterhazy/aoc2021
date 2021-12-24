import { strict as assert } from "assert";

export function compile(s: string): string {
  let n = 0;
  let out = "";
  for (let line of s.split(/\n/)) {
    let tokens = line.split(/ /);

    switch (tokens[0]) {
      case "inp":
        out += `w = inp[${n}];\n`;
        n++;
        break;
      case "add":
        out += `${tokens[1]} = ${tokens[1]} + ${tokens[2]};\n`;
        break;
      case "mod":
        out += `${tokens[1]} = ${tokens[1]} % ${tokens[2]};\n`;
        break;
      case "div":
        out += `${tokens[1]} = Math.floor(${tokens[1]} / ${tokens[2]});\n`;
        break;
      case "mul":
        out += `${tokens[1]} = ${tokens[1]} * ${tokens[2]};\n`;
        break;
      case "eql":
        out += `${tokens[1]} = (${tokens[1]} === ${tokens[2]} ? 1 : 0);\n`;
        break;
      default:
        throw "Unknown token: " + tokens[0];
    }
  }
  return out;
}
