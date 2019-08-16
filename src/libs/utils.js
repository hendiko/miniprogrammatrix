const chalk = require("chalk");

const erroring = msg => console.error(chalk.red(msg));

const warning = msg => console.warn(chalk.yellow(msg));

const logging = msg => console.log(chalk.green(msg));

module.exports = {
  erroring,
  warning,
  logging
};
