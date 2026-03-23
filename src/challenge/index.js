// @ts-check

/**
 * @typedef { Object } Dog
 * @property {string} name
 * @property {number} weight - Peso en kg
 * @property {number} age
 * @property {string[]} owners
 * @property {number[]} foodPortions - Gramos por comida
 * @property {number} [humanAge]
 * @property {number} [average]
 */

/** @type {Dog[]} */
export const dogs = [
  {
    name: "Rex",
    weight: 22,
    age: 5,
    owners: ["Alice", "Bob"],
    foodPortions: [100, 150, 100],
  },
  {
    name: "Luna",
    weight: 8,
    age: 2,
    owners: ["Matilda"],
    foodPortions: [50, 60],
  },
  {
    name: "Pipo",
    weight: 15,
    age: 8,
    owners: ["Jonas"],
    foodPortions: [80, 80, 90],
  },
  {
    name: "Thor",
    weight: 45,
    age: 4,
    owners: ["Sarah", "Javier"],
    foodPortions: [250, 300, 250],
  },
];

/**
  Let's go back to Julia and Katg's study about dogs.
  This time, they want to conver dog ages to human
  ages and calculate the average age of the dogs in
  their study.

  Create a function 'calcAverageHumanAge', which
  accepts an arrays of dog's ages ('ages'), and does
  the following things in order:

  1. Calculate the dog age in human years using the
  following formula: if the dog is <= 2 years old,
  humanAge = 2 * dogAge. If the dog is > 2 years old,
  humanAge = 16 + dogAge * 4.

  2. Exclude all dogs that are less than 18 human years
  old (which is the same as keeping dogs that are at
  least 18 years old)

  3. Calculate the average human age of all adult dogs
  (you should already know from other challenges how we
  calculate averages 😏)

  4. Run the function for both test datasets
  TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
  TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

  GOOD LUCK 🤗
 */

/**
 * Calculate the dog age in human years using the
  following formula: if the dog is <= 2 years old,
  humanAge = 2 * dogAge. If the dog is > 2 years old,
  humanAge = 16 + dogAge * 4.
 * @param  {Dog[]} dgs
 * @return {Dog[]} Dogs
 */
const calcAverageHumanAge = (dgs) => {
  let dogs = dgs;
  dogs = dogs.map((dog) => {
    if (dog.age <= 2) {
      dog.humanAge = 2 * dog.age;
    } else if (dog.age > 2) {
      dog.humanAge = 16 + dog.age * 4;
    }
    return dog;
  });
  return dogs;
};

const humanDogsAge = calcAverageHumanAge(dogs);

const allDogsThan18 = calcAverageHumanAge(dogs).filter((dog) => dog.humanAge && dog.humanAge <= 18);

const allDogsLeast18 = calcAverageHumanAge(dogs).filter((dog) => dog.humanAge && dog.humanAge > 18);

const averageAllDogsLeast18 = allDogsLeast18.map((dog) => {
  dog.average = dog.age + (dog.humanAge || 0) / 2;
  return dog;
});

console.log(averageAllDogsLeast18);
