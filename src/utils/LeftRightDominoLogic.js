// src/utils/LeftRightDominoLogic.js
import { SIZES } from "../constants/DominoConstants";

const generateNonDoublePiece = (lastNumber, isLeft) => {
  const otherNumber = () => {
    let num;
    do {
      num = Math.floor(Math.random() * 7);
    } while (num === lastNumber);
    return num;
  };

  return isLeft
    ? { number1: otherNumber(), number2: lastNumber }
    : { number1: lastNumber, number2: otherNumber() };
};

const getOffsetX = (rotation, isDouble) => {
  const useShortOffset = !isDouble && rotation === 90;
  return useShortOffset
    ? SIZES.TILE_HEIGHT
    : SIZES.TILE_HEIGHT / 2 + SIZES.TILE_WIDTH / 2;
};

export const getNextPiece = (lastPiece, isDouble, isLeft) => {
  const lastNumber = isLeft ? lastPiece.number1 : lastPiece.number2;

  let rotation = isDouble ? 0 : 90;
  let { number1, number2 } = isDouble
    ? { number1: lastNumber, number2: lastNumber }
    : generateNonDoublePiece(lastNumber, isLeft);

  const offsetX = getOffsetX(lastPiece.rotation, isDouble);
  const newX = isLeft ? lastPiece.x - offsetX : lastPiece.x + offsetX;
  const newY = lastPiece.y;

  return { number1, number2, x: newX, y: newY, rotation };
};
