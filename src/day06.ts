// Stolen from
// https://old.reddit.com/r/adventofcode/comments/r9z49j/2021_day_6_solutions/hng2l63/

export function fish(init: number[], days: number) {
  let ages = [];
  for (let i = 0; i < 9; i++) {
    ages[i] = 0;
  }
  for (let i of init) ages[i]++;

  for (let day = 0; day < days; day++) {
    ages[(day + 7) % 9] += ages[day % 9];
  }
  return ages.reduce((a, b) => a + b, 0);
}
