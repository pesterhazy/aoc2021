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

function walk(root: Element) {
  let q: Todo[] = [
    { name: "explore", stackElement: { element: root, idx: 0 } }
  ];
  let stack: StackElement[] = [{ element: root, idx: 0 }];

  while (q.length > 0) {
    let todo = q.shift()!;

    switch (todo.name) {
      case "explore":
        let e = todo.stackElement.element;
        if (isPair(e)) {
          if (stack.length === 5) {
            if (!isNumber(e[0])) throw "boom";
            if (!isNumber(e[1])) throw "boom";
            let patches: [number | undefined, number | undefined] = [
              e[0],
              e[1]
            ];
            let pair = stack[0].element;
            while (stack.length > 0) {
              let se = stack.shift()!;
              for (let idx of [0, 1]) {
                if (patches[idx] === undefined) continue;

                if (se.idx === 1 - idx) {
                  if (!isPair(se.element)) throw "no way";
                  if (!isNumber(se.element[idx])) continue;
                  se.element[idx] += patches[idx] as any;
                  patches[idx] = undefined;
                }
              }
            }
            if (!isPair(pair)) throw "not a pair";
            pair[todo.stackElement.idx] = 0;
          } else {
            stack.unshift(todo.stackElement);
            q.unshift({ name: "up" });
            q.unshift({
              name: "explore",
              stackElement: { element: e[1], idx: 1 }
            });
            q.unshift({
              name: "explore",
              stackElement: { element: e[0], idx: 0 }
            });
          }
        }
        break;
      case "up":
        stack.shift();
        break;
      default:
        throw "unknown";
    }
  }
}
export function explode(ee: Element): Element {
  let copy = JSON.parse(JSON.stringify(ee));
  walk(copy);
  return copy;
}
