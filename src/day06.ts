export function calc(days: number) {
  let gen = [0];

  for (let day = 0; day < days; day++) {
    let newGen = [];
    for (let g of gen) {
      if (g === 0) {
        newGen.push(6);
        newGen.push(8);
      } else {
        newGen.push(g - 1);
      }
    }
    gen = newGen;
  }
  return gen.length;
}

export function fish(init: number[], days: number) {
  let answer = 0;
  for (let g of init) {
    answer += calc(days - g);
  }
  return answer;
}
