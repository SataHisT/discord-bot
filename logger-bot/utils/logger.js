const fs = require("fs");

const logToFile = (message) => {
  fs.appendFile(
    "logs.txt",
    `${new Date().toISOString()} - ${message}\n`,
    (err) => {
      if (err) throw err;
    },
  );
};

module.exports = { logToFile };
