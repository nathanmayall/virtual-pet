const boxen = require("boxen");
const chalk = require("chalk");
const console = require("better-console");
const figlet = require("figlet");
const clear = require("clear");

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

      const ending = chalk.whiteBright(
        figlet.textSync(animatedString, {
          horizontalLayout: "full",
          font: "Ghost",
        })
      );
      const msgBox = boxen(ending, boxenOptions);
      console.info(msgBox);
    }, 400);
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
