const ghpages = require("gh-pages");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("What is your commit message?\n", (msg) => {
  ghpages.publish(
    "build",
    {
      message: msg,
    },
    () => {
      console.log(
        `\nSuccessfully pushed into remote gh-pages branch!\nCommit message: ${msg}`
      );
      readline.close();
    }
  );
});
