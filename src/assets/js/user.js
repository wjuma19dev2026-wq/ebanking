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
  {
    owner: "Ana Garcia",
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 0.7,
    pin: 3333,
  },
  {
    owner: "Carlos Sanchez",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.1,
    pin: 4444,
  },
  {
    owner: "Maria Rodriguez",
    movements: [1000, 2000, 3000, -500, -200, -100, 50, 20],
    interestRate: 1.3,
    pin: 5555,
  },
  {
    owner: "Luisa Fernandez",
    movements: [600, -200, 300, 400, 500, -150, 1200, -400],
    interestRate: 0.9,
    pin: 6666,
  },
  {
    owner: "Jorge Lopez",
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 7777,
  },
  {
    owner: "Elena Gomez",
    movements: [2500, -400, -100, 8000, -2500, -430, 60],
    interestRate: 1.4,
    pin: 8888,
  },
  {
    owner: "Roberto Diaz",
    movements: [150, 200, 250, 300, -100, -50, 400, 500],
    interestRate: 0.8,
    pin: 9999,
  },
  {
    owner: "Lucia Ruiz",
    movements: [500, 600, 700, 800, 900, 1000, -2000],
    interestRate: 1.2,
    pin: 1010,
  },
  {
    owner: "Miguel Torres",
    movements: [1200, -200, 4500, -3000, 1500, -500, 200],
    interestRate: 1.5,
    pin: 2020,
  },
  {
    owner: "Sofia Jimenez",
    movements: [300, 400, 500, -200, 100, 600, 700, -1000],
    interestRate: 0.6,
    pin: 3030,
  },
];
