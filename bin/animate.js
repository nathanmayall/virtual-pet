// const boxen = require("boxen");
const chalk = require("chalk");
const console = require("better-console");
const setTimeoutSync = require("./titles");

const animate = (arr) => {
  arr.forEach((element) => {
    setTimeoutSync(() => {
      console.clear();

      console.log(chalk.whiteBright(element));
    }, 200);
  });
};

module.exports = animate;
