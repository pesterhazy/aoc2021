export function calc(days: number, cache: Map<number, number>) {
  let gen = [0];
  let sum = 0;

  for (let day = 0; day < days; day++) {
    let newGen = [];
    for (let g of gen) {
      if (g === 0) {
        if (cache.has(days)) sum = sum + cache.get(days)!;
        else newGen.push(6);
        if (cache.has(days - 2)) sum = sum + cache.get(days - 2)!;
        else newGen.push(8);
      } else {
        newGen.push(g - 1);
      }
    }
    gen = newGen;
  }

  let result = sum + gen.length;
  cache.set(days, result);
  return result;
}

export function fish(init: number[], days: number) {
  let answer = 0;
  for (let g of init) {
    answer += calc(days - g, new Map());
  }
  return answer;
}
