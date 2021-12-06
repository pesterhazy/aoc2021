export function fish(init: number[], days: number) {
  let gen = [...init];

  for (let day = 0; day < days; day++) {
    let newGen = [];
    let born = 0;
    for (let g of gen) {
      if (g === 0) {
        newGen.push(6);
        born++;
      } else {
        newGen.push(g - 1);
      }
    }
    for (let i = 0; i < born; i++) newGen.push(8);
    gen = newGen;
  }
  return gen;
}
