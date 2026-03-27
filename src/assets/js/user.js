// @ts-check

/**
 * @typedef {Object} User
 * @property {string} owner - Nombre del titular de la cuenta
 * @property {number[]} movements - Lista de movimientos (positivos y negativos)
 * @property {string[]} movementsDates - Fechas ISO de cada movimiento
 * @property {number} interestRate - Tasa de interés en porcentaje
 * @property {string} currency - Moneda de la cuenta (ej: "EUR", "USD")
 * @property {string} locale - Configuración regional (ej: "pt-PT", "en-US")
 * @property {number} pin - Código PIN de acceso
 * @property {string} [username] - Alias opcional para el usuario
 */

/** @type {User[]}  */
export const accounts = [
  {
    owner: "Jonas Schmedtmann",
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    movementsDates: [
      "2019-11-18T21:31:17.178Z",
      "2019-12-23T07:42:02.383Z",
      "2020-01-28T09:15:04.904Z",
      "2020-04-01T10:17:24.185Z",
      "2020-05-08T14:11:59.604Z",
      "2020-07-26T17:01:17.194Z",
      "2020-08-28T23:36:17.929Z",
      "2020-09-01T10:51:36.790Z",
    ],
    interestRate: 1.2, // %
    currency: "EUR",
    locale: "pt-PT", // Portuguese (Portugal)
    pin: 1111,
  },
  {
    owner: "Jessica Davis",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    movementsDates: [
      "2019-11-01T13:15:33.035Z",
      "2019-11-30T09:48:16.867Z",
      "2019-12-25T06:04:23.907Z",
      "2020-01-25T14:18:46.235Z",
      "2020-02-05T16:33:06.386Z",
      "2020-04-10T14:43:26.374Z",
      "2020-06-25T18:49:59.371Z",
      "2020-07-26T12:01:20.894Z",
    ],
    interestRate: 1.5,
    currency: "USD",
    locale: "en-US",
    pin: 2222,
  },
  {
    owner: "Steven Thomas Williams",
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    movementsDates: [
      "2019-11-18T21:31:17.178Z",
      "2019-12-23T07:42:02.383Z",
      "2020-01-28T09:15:04.904Z",
      "2020-04-01T10:17:24.185Z",
      "2020-05-08T14:11:59.604Z",
      "2020-07-26T17:01:17.194Z",
      "2020-08-28T23:36:17.929Z",
      "2020-09-01T10:51:36.790Z",
    ],
    interestRate: 0.7,
    currency: "GBP",
    locale: "en-GB",
    pin: 3333,
  },
  {
    owner: "Sarah Smith",
    movements: [430, 1000, 700, 50, 90],
    movementsDates: [
      "2019-11-01T13:15:33.035Z",
      "2019-11-30T09:48:16.867Z",
      "2019-12-25T06:04:23.907Z",
      "2020-01-25T14:18:46.235Z",
      "2020-02-05T16:33:06.386Z",
    ],
    interestRate: 1,
    currency: "USD",
    locale: "en-US",
    pin: 4444,
  },
];
