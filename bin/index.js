#!/usr/bin/env node

const prompt = require("prompt-sync")({ sigint: true });
const fs = require("fs");
const console = require("better-console");
const chalk = require("chalk");
const boxen = require("boxen");
const figlet = require("figlet");
const clear = require("clear");

const Pet = require("../src/pet");

const saveData = () => {
  if (fs.existsSync(`${process.cwd()}/data/`)) {
    fs.writeFileSync(
      `${process.cwd()}/data/petData.json`,
      JSON.stringify(userPet)
    );
    return;
  }
  fs.mkdirSync(`${process.cwd()}/data/`, 0744);
  fs.writeFileSync(
    `${process.cwd()}/data/petData.json`,
    JSON.stringify(userPet)
  );
};

clear();
console.info(
  chalk.yellow(figlet.textSync("VirtuaPet", { horizontalLayout: "full" }))
);
console.info("Welcome to Virtual Pet Simulator.");
let petName = prompt("Enter the name of the pet: ");

while (!petName) {
  console.warn("Pet name can't be blank!");
  petName = prompt("Enter the name of the pet: ");
}

let status = "";

const userPet = new Pet(petName);

status = `Pet ${petName} created 🐕`;

const choices = [
  `🍕 ${chalk.bold.whiteBright("F")}eed`,
  `🚶 ${chalk.bold.whiteBright("W")}alk`,
  `🩺 ${chalk.bold.whiteBright("C")}heck up`,
  `🌱 ${chalk.bold.whiteBright("G")}row up`,
  `❌ E${chalk.bold.whiteBright("x")}it`,
];

let alive = userPet.isAlive();

while (alive) {
  clear();
  alive = userPet.isAlive();
  if (status) console.info(chalk.blue(status));
  if (!alive) break;
  console.error(`${petName} says what's your action?:`);

  choices.forEach((c) => console.info(c));

  let response = prompt(`❓: `);

  switch (response.toLowerCase().trim()) {
    case "f":
    case "feed": {
      userPet.feed();
      status = `${petName} was fed and their hunger is now ${userPet.hunger}`;
      break;
    }
    case "w":
    case "walk": {
      userPet.walk();
      status = `${petName} has been walked and their fitness is now ${userPet.fitness}`;
      break;
    }
    case "c":
    case "check up": {
      status = `${petName} says ${userPet.checkUp()}`;
      break;
    }
    case "g":
    case "grow up": {
      userPet.growUp();
      status = `${petName}'s age is now ${userPet.age}`;
      break;
    }
    case "x":
    case "exit": {
      console.warn("Thanks for playing!");
      saveData();
      process.exit();
    }
    default: {
      status = chalk.yellow("Please tell me something to do!");
      break;
    }
  }
}

saveData();

const boxenOptions = {
  padding: 1,
  margin: 1,
  borderStyle: "double",
  borderColor: "red",
};

const ending = chalk.whiteBright(
  figlet.textSync("RIP", { horizontalLayout: "full", font: "Ghost" })
);
const msgBox = boxen(ending, boxenOptions);

const finalScore = `Age: ${userPet.age}, Fitness: ${userPet.fitness}, Hunger: ${userPet.hunger}`;

clear();
console.info(msgBox);
console.error(`⚰️  Sorry, ${petName} has passed away 😿`);
console.info(`Final stats were: ${finalScore}`);
console.warn("Thanks for playing!");
process.exit();
