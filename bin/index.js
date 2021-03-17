#!/usr/bin/env node

const prompt = require("prompt-sync")({ sigint: true });
const fs = require("fs");
const console = require("better-console");
const chalk = require("chalk");
const clear = require("clear");

const Pet = require("../src/pet");
const { introBox } = require("./titles");
const endScreen = require("./endScreen");
const animate = require("./animate");
const { walkFrames, feedFrames, checkUpFrames } = require("./frames");

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

introBox("VirtuaPet");

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
  if (!alive) break;

  if (status) console.info(chalk.blue(status));
  console.error(`${petName} says what's your action?:`);

  choices.forEach((c) => console.info(c));

  let response = prompt(`❓: `).toLowerCase().trim();

  switch (response) {
    case "f":
    case "feed": {
      userPet.feed();
      animate(feedFrames);
      status = `${petName} was fed and their hunger is now ${userPet.hunger}`;
      break;
    }
    case "w":
    case "walk": {
      userPet.walk();
      animate(walkFrames);
      status = `${petName} has been walked and their fitness is now ${userPet.fitness}`;
      break;
    }
    case "c":
    case "check up": {
      animate(checkUpFrames);
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

endScreen(userPet);
