const jsonfile = require('jsonfile');
const simpleGit = require('simple-git');
const random = require('random');
const moment = require('moment');

const File_Path = './data.json';

// Helper function to get a random integer between min and max
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const makeCommit = n => { 
    if (n === 0) return simpleGit().push();

    // Generate random weeks and days
    const x = randomInt(0, 54);  // Random number of weeks (from October 2023)
    const y = randomInt(0, 6);   // Random number of days within a week
    
    // Generate a random date within the valid range (till October 2024)
    const DATE = moment()
      .subtract(1, "y")               // Start from one year ago (October 2023)
      .add(x, "w")                    // Add random weeks
      .add(y, "d")                    // Add random days within that week
      .min(moment("2024-10-27"))      // Ensure it doesn't go beyond October 2024
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
      
      // Add and commit the changes using the generated date
      simpleGit()
        .add([File_Path])
        .commit(DATE, { '--date': DATE }, makeCommit.bind(this, n - 1));
    });
};

// Start making commits, capped till October 2024
makeCommit(50);
