const chalk = require("chalk");
const clui = require("clui");
const clear = require("clear");
const console = require("better-console");

const { outroBox } = require("./titles");

const endScreen = ({ name: petName, age, fitness, hunger }) => {
  const ageGuage = clui.Gauge(age, 30, 10, 25, `${age} years old`);
  const fitnessGuage = clui.Gauge(
    fitness,
    10,
    10,
    4,
    `${fitness} fitness level`
  );

  const hungerGuage = clui.Gauge(hunger, 10, 10, 3, `${hunger} hunger`);

  clear();
  outroBox("RIP");
  console.error(`⚰️  Sorry, ${petName} has passed away 😿`);
  console.info(chalk.blue("Stats were:"));
  console.info(ageGuage);
  console.info(fitnessGuage);
  console.info(hungerGuage);
  console.warn("Thanks for playing!");
  process.exit();
};

module.exports = endScreen;
