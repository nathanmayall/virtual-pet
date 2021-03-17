// const boxen = require("boxen");
const chalk = require("chalk");
const console = require("better-console");
const figlet = require("figlet");
const clear = require("clear");

const introBox = (string) => {
  let animatedString = "";
  const completeString = string;

  for (let i = 0; i < completeString.length; i++) {
    setTimeoutSync(() => {
      animatedString += completeString[i];
      clear();

      console.info(
        chalk.yellow(
          figlet.textSync(animatedString, { horizontalLayout: "full" })
        )
      );
    }, 150);
  }
};

function setTimeoutSync(callback, ms) {
  const start = Date.now();
  let now = start;

  while (now - start < ms) {
    now = Date.now();
  }

  if (typeof callback === "function") {
    callback();
  }
}
module.exports = introBox;
