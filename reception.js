const fs = require('fs');

const reception = {
  getJSONFile: (path) => {
    return JSON.parse(fs.readFileSync(path));
  }
}

module.exports  = reception;