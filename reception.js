const fs = require('fs');

class Reception {
  constructor(path) {
    this.receptionMap = JSON.parse(fs.readFileSync(path));
  }

  getReception(emoji) {
    let receptionCount = { 'p':0, 'n':0, 'm':0 }

    Object.keys(emoji).forEach(key => {
      receptionCount[this.receptionMap[key]]+=emoji[key];
    });

    if(receptionCount['p'] > receptionCount['m'] && receptionCount['p'] == receptionCount['n']) {
      return 'mixed';
    }

    let verdict = { count: 0, result: "" };
    Object.keys(receptionCount).forEach(key => {
      if(receptionCount[key] > verdict.count) {
        verdict.count = receptionCount[key];
        verdict.result = key;
      }
    });

    if(verdict.result == 'p') {
      if(receptionCount['n'] > 0) {
        return 'mostly positive'
      } else {
        return 'positive'; 
      }
    } else if(verdict.result == 'n') {
      if(receptionCount['p'] > 0) {
        return 'mostly negative';
      } else {
        return 'negative';
      }
    } else {
      return 'mixed';
    }
  }
}

module.exports  = Reception;