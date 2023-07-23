export const createMine = (row, col, mine, currentPosition) => {
  console.log(row);  
  const minePositionArr = [];
    while (minePositionArr.length < mine) {
      const minePosition = Math.floor(Math.random() * row * col);
      if (!minePositionArr.includes(minePosition)) {
        if (minePosition !== currentPosition) minePositionArr.push(minePosition);
      }
    }
    console.log(minePositionArr);
    return minePositionArr;
  };