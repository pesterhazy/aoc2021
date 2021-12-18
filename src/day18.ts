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
            console.log(patches);
            // zero out parent
            let pair = stack[0].element;
            if (!isPair(pair)) throw "hmph";
            pair[stack[0].idx] = 0;
            let first = true;
            while (stack.length > 0) {
              let se = stack.shift()!;
              console.log(JSON.stringify(se));
              for (let idx of [0, 1]) {
                if (patches[idx] === undefined) continue;

                // FIXME: parent case
                if (se.idx === 1 - idx) {
                  console.log("HIT", idx);
                  if (!isPair(se.element)) throw "ouch";
                  if (!isNumber(se.element[idx])) throw "ouch";
                  se.element[idx] += patches[idx] as any;
                  patches[idx] = undefined;
                }
              }
              first = false;
            }
            // find left neighbor and add left
            // find right neighbor and add right
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
