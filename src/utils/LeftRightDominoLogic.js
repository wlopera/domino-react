// src/utils/LeftRightDominoLogic.js
import { SIZES } from "../constants/DominoConstants";

/**
 * Genera una pieza no doble para el dominó, donde uno de los números es el `lastNumber`
 * y el otro es un número aleatorio diferente.
 *
 * @param {number} lastNumber - El número de la última pieza en el tablero, utilizado para evitar duplicados.
 * @param {boolean} isLeft - Determina si la pieza se agrega a la izquierda o derecha del tablero.
 * @returns {object} Objeto que representa la nueva pieza con dos números.
 */
const generateNonDoublePiece = (lastNumber, isLeft) => {
  /**
   * Genera un número aleatorio diferente de `lastNumber`.
   *
   * @returns {number} Un número aleatorio entre 0 y 6, que no es igual a `lastNumber`.
   */
  const otherNumber = () => {
    let num;
    do {
      num = Math.floor(Math.random() * 7); // Genera un número aleatorio entre 0 y 6.
    } while (num === lastNumber); // Asegura que el número no sea igual al `lastNumber`.
    return num;
  };

  // Devuelve la pieza con números en el orden adecuado según si es a la izquierda o derecha
  return isLeft
    ? { number1: otherNumber(), number2: lastNumber }
    : { number1: lastNumber, number2: otherNumber() };
};

/**
 * Calcula el desplazamiento en el eje X de la pieza basada en su rotación y si es doble o no.
 *
 * @param {number} rotation - La rotación de la pieza (0, 90, 180, 270).
 * @param {boolean} isDouble - Determina si la pieza es doble.
 * @returns {number} El valor del desplazamiento en el eje X.
 */
const getOffsetX = (rotation, isDouble) => {
  const useShortOffset = !isDouble && rotation === 90;
  return useShortOffset
    ? SIZES.TILE_HEIGHT // Si la pieza no es doble y está rotada 90 grados, usa la altura como desplazamiento.
    : SIZES.TILE_HEIGHT / 2 + SIZES.TILE_WIDTH / 2; // En otro caso, usa el promedio de la altura y el ancho.
};

/**
 * Obtiene la siguiente pieza que se va a agregar al tablero, basada en la última pieza,
 * si es doble o mixta, y si se agrega a la izquierda o derecha.
 *
 * @param {object} lastPiece - La última pieza agregada al tablero.
 * @param {boolean} isDouble - Si la nueva pieza será doble.
 * @param {boolean} isLeft - Si la pieza se agregará a la izquierda o derecha.
 * @returns {object} El objeto que representa la nueva pieza con los números, la posición y la rotación.
 */
export const getNextPiece = (lastPiece, isDouble, isLeft) => {
  const lastNumber = isLeft ? lastPiece.number1 : lastPiece.number2;

  let rotation = isDouble ? 0 : 90; // Si es doble, no se rota; si es mixta, se rota 90 grados.
  let { number1, number2 } = isDouble
    ? { number1: lastNumber, number2: lastNumber } // Si es doble, ambos números son iguales.
    : generateNonDoublePiece(lastNumber, isLeft); // Si es mixta, se genera una pieza no doble.

  const offsetX = getOffsetX(lastPiece.rotation, isDouble); // Calcula el desplazamiento horizontal basado en la rotación.
  const newX = isLeft ? lastPiece.x - offsetX : lastPiece.x + offsetX; // Ajusta la posición X según si es izquierda o derecha.
  const newY = lastPiece.y; // La posición Y permanece igual.

  return { number1, number2, x: newX, y: newY, rotation }; // Devuelve la nueva pieza con los datos calculados.
};
