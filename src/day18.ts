type Element = number | Pair;
type Pair = [Element, Element];

export function add(a: Pair, b: Pair): Pair {
  return [a, b];
}
