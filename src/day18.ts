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
            console.log(JSON.stringify(todo));
            console.log(JSON.stringify(stack));
            // zero out parent
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
