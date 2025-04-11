// src/utils/LeftRightDominoLogic.js

const generateDoublePiece = (
  lastPiece,
  isDouble,
  TILE_WIDTH,
  TILE_HEIGHT,
  isLeft
) => {
  const lastNumber = isLeft ? lastPiece.number1 : lastPiece.number2; // Comparar con el número de la izquierda si vamos hacia la izquierda

  const number1 = lastNumber;
  const number2 = lastNumber; // Ficha doble: mismo número en ambos lados
  const rotation = 0; // No rotada

  let offsetX = TILE_HEIGHT / 2 + TILE_WIDTH / 2; // Usamos 90px de distancia por defecto
  if (!isDouble && lastPiece.rotation === 90) {
    offsetX = TILE_HEIGHT; // 120px en este caso
  }

  const newX = isLeft ? lastPiece.x - offsetX : lastPiece.x + offsetX; // Dirección controlada por isLeft
  const newY = lastPiece.y + 0; // El eje Y no cambia

  return { number1, number2, x: newX, y: newY, rotation };
};

const generateMixedPiece = (
  lastPiece,
  isDouble,
  TILE_WIDTH,
  TILE_HEIGHT,
  isLeft
) => {
  const lastNumber = isLeft ? lastPiece.number1 : lastPiece.number2;

  let number1, number2;

  // Generar un número diferente al de referencia
  const otherNumber = () => {
    let num;
    do {
      num = Math.floor(Math.random() * 6);
    } while (num === lastNumber);
    return num;
  };

  if (isLeft) {
    // Queremos que el lado derecho (number2) sea igual al número de la pieza a la izquierda
    number1 = otherNumber();
    number2 = lastNumber;
  } else {
    // Queremos que el lado izquierdo (number1) sea igual al número de la pieza a la derecha
    number1 = lastNumber;
    number2 = otherNumber();
  }

  // Determinar rotación (esto puede ajustarse si hay alguna orientación específica)
  let rotation = 90;
  if (isLeft && number1 === number2) {
    rotation = 0;
  }

  let offsetX =
    lastPiece.rotation === 0 ? TILE_HEIGHT / 2 + TILE_WIDTH / 2 : TILE_HEIGHT;

  const newX = isLeft ? lastPiece.x - offsetX : lastPiece.x + offsetX;
  const newY = lastPiece.y;

  return { number1, number2, x: newX, y: newY, rotation };
};

export const getNexPiece = (
  lastPiece,
  isDouble,
  TILE_WIDTH,
  TILE_HEIGHT,
  isLeft
) => {
  if (isDouble) {
    return generateDoublePiece(
      lastPiece,
      isDouble,
      TILE_WIDTH,
      TILE_HEIGHT,
      isLeft
    );
  } else {
    return generateMixedPiece(
      lastPiece,
      isDouble,
      TILE_WIDTH,
      TILE_HEIGHT,
      isLeft
    );
  }
};
