type Element = number | Pair;
type Pair = [Element, Element];

export function add(a: Element, b: Element): Element {
  if ((isPair(a) && isPair(b)) || (isNumber(a) && isNumber(b))) return [a, b];
  else throw "Unknown combination";
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

function toCmds(e: Element): any {
  let n = 0;
  let depth = 0;
  let xs: any = [];
  function step(e: Element) {
    if (isPair(e)) {
      depth++;
      xs.push({ name: "[", depth, n });
      step(e[0]);
      xs.push({ name: "," });
      step(e[1]);
      xs.push({ name: "]" });
      depth--;
    } else {
      xs.push({ name: "literal", v: e, n });
      n++;
    }
  }
  step(e);
  return xs;
}

function fromCmds(cmds: any): Element {
  let s = "";
  for (let cmd of cmds) {
    if (cmd.name === "literal") s += cmd.v;
    else s += cmd.name;
  }
  return JSON.parse(s);
}

export function explode(ee: Element): Element | undefined {
  let xs = toCmds(ee);
  let winner = xs.findIndex(x => x.name === "[" && x.depth === 5);
  if (winner === -1) return undefined;

  let lleft = xs[winner + 1].v;
  let rright = xs[winner + 3].v;

  // zero out winner

  xs = [
    ...xs.slice(0, winner),
    { name: "literal", v: 0, n: xs[winner].n },
    ...xs.slice(winner + 5)
  ];

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

  return fromCmds(xs);
}

function ssplit(n: number): [number, number] {
  return [Math.floor(n / 2), Math.ceil(n / 2)];
}

export function split(ee: Element): Element | undefined {
  let xs = toCmds(ee);

  let winner = xs.findIndex(x => x.name === "literal" && x.v >= 10);
  if (winner === -1) return undefined;

  let [a, b] = ssplit(xs[winner].v);

  xs = [
    ...xs.slice(0, winner),
    { name: "[" },
    { name: "literal", v: a },
    { name: "," },
    { name: "literal", v: b },
    { name: "]" },
    ...xs.slice(winner + 1)
  ];

  return fromCmds(xs);
}

export function xform(e: Element): Element {
  while (true) {
    let ee;

    ee = explode(e);
    if (ee !== undefined) {
      e = ee;
    } else {
      ee = split(e);

      if (ee !== undefined) {
        e = ee;
      } else break;
    }
  }
  return e;
}
