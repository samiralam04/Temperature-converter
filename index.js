const jsonfile = require('jsonfile');
const simpleGit = require('simple-git');
const random = require('random');
const moment = require('moment');

const File_Path = './data.json';

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const makeCommit = n => { 
    if (n === 0) return simpleGit().push();
    
    const x = randomInt(0, 54);  
    const y = randomInt(0, 6);   
    
    const DATE = moment()
      .subtract(1, "y")
      .add(1, "d")
      .add(x, "w")
      .add(y, "d")
      .format();
  
    const data = {
      date: DATE
    };

    console.log(DATE);  

    jsonfile.writeFile(File_Path, data, { spaces: 2 }, (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        return;
      }
      
      
      simpleGit()
        .add([File_Path])
        .commit(DATE, { '--date': DATE }, makeCommit.bind(this, n - 1));
    });
};

makeCommit(100);
