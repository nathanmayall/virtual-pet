const boxen = require("boxen");
const chalk = require("chalk");
const console = require("better-console");
const figlet = require("figlet");
const clear = require("clear");
const setTimeoutSync = require("./setTimeoutSync");

const boxenOptions = {
  padding: 1,
  margin: 1,
  borderStyle: "double",
  borderColor: "red",
};

const introBox = (string) => {
  let animatedString = "";
  const completeString = string;

  for (let i = 0; i < completeString.length; i++) {
    setTimeoutSync(() => {
      animatedString += completeString[i];
      clear();

      console.info(
        chalk.yellow(
          figlet.textSync(animatedString, {
            horizontalLayout: "full",
            font: "Epic",
          })
        )
      );
    }, 75);
  }
};

const outroBox = (string) => {
  let animatedString = "";
  const completeString = string;

  for (let i = 0; i < completeString.length; i++) {
    setTimeoutSync(() => {
      animatedString += completeString[i];
      clear();

      const ending = chalk.whiteBright(
        figlet.textSync(animatedString, {
          horizontalLayout: "full",
          font: "Poison",
        })
      );
      const msgBox = boxen(ending, boxenOptions);
      console.info(msgBox);
    }, 400);
  }
};

module.exports = { introBox, outroBox };
