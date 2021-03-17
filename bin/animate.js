// const boxen = require("boxen");
const chalk = require("chalk");
const console = require("better-console");

const animate = (arr) => {
  arr.forEach((element) => {
    setTimeoutSync(() => {
      console.clear();

      console.log(chalk.whiteBright(element));
    }, 200);
  });
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
module.exports = animate;
