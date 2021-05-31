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
const setTimeoutSync = require("./setTimeoutSync");

const activeWindow = require("active-win");

const windowTitle = activeWindow.sync().owner.name;

const isCmd = !windowTitle.includes("WindowsTerminal");

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

status = isCmd ? `Pet ${petName} created` : `Pet ${petName} created 🐕`;

let choices;

const highlightChar = (string, index) => {
  return string.replace(string[index], chalk.bold.whiteBright(string[index]));
};

const emojiChoices = [
  `🍕 ${highlightChar("Feed", 0)}`,
  `🚶 ${highlightChar("Walk", 0)}`,
  `🩺 ${highlightChar("Check Up", 0)}`,
  `🌱 ${highlightChar("Grow Up", 0)}`,
  `❌ ${highlightChar("Exit", 1)}`,
];

const consoleChoices = [
  `${highlightChar("Feed", 0)}`,
  `${highlightChar("Walk", 0)}`,
  `${highlightChar("Check Up", 0)}`,
  `${highlightChar("Grow Up", 0)}`,
  `${highlightChar("Exit", 1)}`,
];

choices = isCmd ? consoleChoices : emojiChoices;

let alive = userPet.isAlive();

while (alive) {
  clear();
  alive = userPet.isAlive();
  if (!alive) break;

  if (status) console.info(chalk.blue(status));
  console.error(`${petName} says what's your action?:`);

  choices.forEach((c) => console.info(c));

  const questionprompt = isCmd ? "?: " : `❓: `;

  let response = prompt(questionprompt).toLowerCase().trim();

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
      setTimeoutSync(console.warn("Thanks for playing!"), 1000);
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
