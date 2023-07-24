export const createMine = (
  row: number,
  col: number,
  mine: number,
  currentPosition: number
) => {
  const minePositionArr: number[] = [];
  while (minePositionArr.length < mine) {
    const minePosition = Math.floor(Math.random() * row * col);
    if (!minePositionArr.includes(minePosition)) {
      if (minePosition !== currentPosition) minePositionArr.push(minePosition);
    }
  }
  return minePositionArr;
};
