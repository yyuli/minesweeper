export const createMine = (row, col, mine, currentPosition) => {
  const minePositionArr = [];
    while (minePositionArr.length < mine) {
      const minePosition = Math.floor(Math.random() * row * col);
      if (!minePositionArr.includes(minePosition)) {
        if (minePosition !== currentPosition) minePositionArr.push(minePosition);
      }
    }
    return minePositionArr;
  };
