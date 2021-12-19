type Element = number | Pair;
type Pair = [Element, Element];

export function add(a: Element, b: Element): Element {
  if ((isPair(a) && isPair(b)) || (isNumber(a) && isNumber(b))) return [a, b];
  else throw "Unknown combination";
}

export function todoItemIsPair(e: TodoItem): e is StackElement {
  return Array.isArray(e);
}

export function isPair(e: Element): e is Pair {
  return Array.isArray(e);
}

export function isNumber(e: Element): e is number {
  return typeof e === "number";
}

interface TodoExplore {
  name: "explore";
  stackElement: StackElement;
}
interface TodoUp {
  name: "up";
}

type Todo = TodoExplore | TodoUp;

interface StackElement {
  element: Element;
  idx: 0 | 1;
}

export function explode(ee: Element): Element {
  let xs: any = [];
  let n = 0;
  let depth = 0;
  function walk(e: Element) {
    if (isPair(e)) {
      depth++;
      xs.push({ name: "[", depth, n });
      walk(e[0]);
      xs.push({ name: "," });
      walk(e[1]);
      xs.push({ name: "]" });
      depth--;
    } else {
      xs.push({ name: "literal", v: e, n });
      n++;
    }
  }
  function build(cmds: any): Element {
    let s = "";
    for (let cmd of cmds) {
      if (cmd.name === "literal") s += cmd.v;
      else s += cmd.name;
    }
    return JSON.parse(s);
  }
  walk(ee);
  let winner = xs.findIndex(x => x.name === "[" && x.depth === 5);
  if (winner === -1) throw "no winner";

  let lleft = xs[winner + 1].v;
  let rright = xs[winner + 3].v;

  // zero out winner

  xs[winner] = { name: "literal", v: 0, n: xs[winner].n };
  xs[winner + 1] = undefined;
  xs[winner + 2] = undefined;
  xs[winner + 3] = undefined;
  xs[winner + 4] = undefined;

  xs = xs.filter(x => x !== undefined);

  let right: number | undefined;
  for (let i = winner + 1; i < xs.length; i++) {
    if (xs[i].name === "literal") {
      right = i;
      break;
    }
  }
  let left: number | undefined;
  for (let i = winner - 1; i >= 0; i--) {
    if (xs[i].name === "literal") {
      left = i;
      break;
    }
  }

  if (left !== undefined) xs[left].v += lleft;
  if (right !== undefined) xs[right].v += rright;

  return build(xs);
}
