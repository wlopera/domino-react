/**
 * Constantes que definen el tamaño de una ficha de dominó en píxeles.
 * Estas dimensiones se utilizan para calcular posiciones y renderizado en la interfaz gráfica.
 *
 * @constant
 * @type {{ TILE_WIDTH: number, TILE_HEIGHT: number }}
 *
 * @property {number} TILE_WIDTH - Ancho de la ficha de dominó en píxeles (horizontal).
 * @property {number} TILE_HEIGHT - Alto de la ficha de dominó en píxeles (vertical).
 */
export const SIZES = {
  TILE_WIDTH: 60, // Ancho original de la ficha
  TILE_HEIGHT: 120, // Alto original de la ficha
  SCALE: 1, // Factor de escala, puedes ajustarlo
};

/**
 * Constantes de configuración visual y de animación.
 *
 * @constant
 * @type {{ TRANSITION_DURATION: number, TILE_IMAGE_PATH: string, CENTER_TRANSFORM: string }}
 */
export const CONFIG = {
  TRANSITION_DURATION: 0.5,
  TILE_IMAGE_PATH: "/tiles",
  CENTER_TRANSFORM: "translate(-50%, -50%)",
};

export const INITIAL_POSITION = { x: 750, y: 400 };
export const BOARD_HEIGHT = 400;
export const BOARD_WIDTH = "100%";
