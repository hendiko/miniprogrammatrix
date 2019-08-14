#!/usr/bin/env node
const { main } = require("../src/index");

if (require.main === module) {
  main();
}
