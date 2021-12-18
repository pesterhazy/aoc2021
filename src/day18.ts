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

export function explode(ee: Element): Element {
  function visit(e: Element, depth: number) {
    if (isPair(e)) {
      let newDepth = depth + 1;
      let [left, right] = e;
      if (newDepth === 4) {
        console.log("<=", e);
        // [[9,8],1] => [0,9]
        // [4,[3,2]] => [7,0]
        if (isPair(left)) {
          if (!isNumber(left[0]) || !isNumber(left[1])) throw "confused";
          if (!isNumber(right)) throw "confused 2";
          e[0] = 0;
          e[1] = right + left[1];
          console.log("=>", e);
          return true;
        }
        if (isPair(right)) {
          if (!isNumber(right[0]) || !isNumber(right[1])) throw "confused";
          if (!isNumber(left)) throw "confused 2";
          e[0] = left + right[0];
          e[1] = 0;
          console.log("=>", e);
          return true;
        }
      }
      if (visit(left, newDepth)) return true;
      if (visit(right, newDepth)) return true;
    } else {
    }
  }

  let copy = JSON.parse(JSON.stringify(ee));
  visit(copy, 0);
  return copy;
}
