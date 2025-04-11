// src/utils/dominoLogic.js
const generateDoublePiece = (lastPiece, isDouble, TILE_WIDTH, TILE_HEIGHT) => {
  const lastNumber = lastPiece.number2;

  const number1 = lastNumber;
  const number2 = lastNumber; // Ficha doble: mismo número en ambos lados
  const rotation = 0; // No rotada

  let offsetX = TILE_HEIGHT / 2 + TILE_WIDTH / 2; // Usamos 90px de distancia por defecto
  if (!isDouble && lastPiece.rotation === 90) {
    // Si la ficha anterior también es mixta (rotación 90 grados), sumamos 120px
    offsetX = TILE_HEIGHT; // 120px en este caso
  }

  const newX = lastPiece.x + offsetX;
  const newY = lastPiece.y + 0; // El eje Y no cambia

  return { number1, number2, x: newX, y: newY, rotation };
};

const generateMixedPiece = (lastPiece, isDouble, TILE_WIDTH, TILE_HEIGHT) => {
  const lastNumber = lastPiece.number2; // Aquí tomamos el número de la parte derecha de la ficha anterior

  let number1, number2;

  // Si la ficha anterior es doble o está en rotación 0 (horizontal)
  if (isDouble || lastPiece.rotation === 0) {
    number1 = lastNumber;
    number2 = Math.floor(Math.random() * 5) + 1; // Escoge un número entre 1 y 5 para la parte mixta
    if (number2 === lastNumber) {
      number2 = Math.floor(Math.random() * 5) + 1; // Aseguramos que el número no sea igual al anterior
    }
  } else {
    // Si la ficha anterior es mixta, no puede repetir el número
    number1 = lastNumber;
    number2 = Math.floor(Math.random() * 5) + 1; // Escoge un número entre 1 y 5 para la parte mixta
    if (number2 === lastNumber) {
      number2 = Math.floor(Math.random() * 5) + 1; // Aseguramos que el número no sea igual al anterior
    }
  }

  // **Rotación para las fichas mixtas**:
  let rotation = 90; // Si el número más grande está a la derecha, rota 90
  if (lastNumber !== number1) {
    rotation = 270; // Si el número a la derecha es menor, rotamos 270°
  }

  // **Cálculo de offsetX basado en el tipo de ficha anterior**:
  let offsetX;
  if (lastPiece.rotation === 0) {
    // Si la ficha anterior es doble o está en posición horizontal (sin rotación)
    offsetX = TILE_HEIGHT / 2 + TILE_WIDTH / 2; // Usamos la distancia por defecto
  } else {
    // Si la ficha anterior es mixta y está rotada (posiblemente 90° o 270°)
    offsetX = TILE_HEIGHT; // Usamos el ancho de la ficha cuando la ficha anterior está rotada
  }

  // **Ajuste del eje X para las nuevas coordenadas**:
  const newX = lastPiece.x + offsetX;
  const newY = lastPiece.y; // El eje Y no cambia

  return { number1, number2, x: newX, y: newY, rotation };
};

export const getNexPiece = (lastPiece, isDouble, TILE_WIDTH, TILE_HEIGHT) => {
  if (isDouble) {
    return generateDoublePiece(lastPiece, isDouble, TILE_WIDTH, TILE_HEIGHT);
  } else {
    return generateMixedPiece(lastPiece, isDouble, TILE_WIDTH, TILE_HEIGHT);
  }
};
