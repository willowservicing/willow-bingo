var fs = require("fs");

export const bingo = () => {
  /*
    You can use the string provided below in the "data" constant to parse the information as necessary to complete the challenge.
    You also have the option to ignore this data and edit the bingo.txt file however you see fit.
    There is no one way to approach the challenge, so feel free to approach it in the way that best serves you.

    There is also a bingo-simple.txt file available for simplified debugging or testing. Feel free to use or not use this file.
  */
  const data = fs.readFileSync("bingo.txt", "utf8");
  console.log("Let's play bingo!");
};

bingo();
