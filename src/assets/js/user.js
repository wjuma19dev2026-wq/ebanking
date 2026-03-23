// @ts-check

/**
 * @typedef { Object } User
 * @property {string} owner
 * @property {number[]} movements
 * @property {number} interestRate
 * @property {number} pin
 * @property {string} [username]
 */

/** @type {User[]}  */
export const users = [
  {
    owner: "Jonas Schmedtmann",
    movements: [
      1563, 600, -900, -300, -1000, 5600, 800, 200, 450, -450, 3000, -650, -130,
      70,
    ],
    interestRate: 1.2,
    pin: 1111,
  },
  {
    owner: "Pedro Martinez",
    movements: [5600, 6321, -569, -365, -896, 2000, 6000, -8900],
    interestRate: 1.5,
    pin: 2222,
  },
];
