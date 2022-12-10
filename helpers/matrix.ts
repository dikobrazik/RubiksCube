export type Matrix = number[][];

export function matricesMultiplication(m1: Matrix, m2: Matrix) {
  const result: Matrix = Array(m1.length)
    .fill(undefined)
    .map(() => []);
  for (let rowIndex = 0; rowIndex < m1.length; rowIndex++) {
    const m1Row = m1[rowIndex];

    for (let columnIndex = 0; columnIndex < m2[0].length; columnIndex++) {
      const m2Column = m2.map((row) => row[columnIndex]);
      result[rowIndex][columnIndex] = m1Row.reduce(
        (acc, value, index) => acc + value * m2Column[index],
        0
      );
    }
  }

  return result;
}
