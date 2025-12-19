function readFromTerminal() {
  const stdin = process.stdin;
  //   stdin.setEncoding("utf-8");

  console.log("Type something and press Enter (ctrl + d to end): ");

  stdin.on("data", (chunk) => {
    // console.log("you typed : ", chunk.trim());
    console.log("You typed store in buffer", chunk);
  });

  stdin.on("end", () => {
    console.log("Input ended");
  });
}

// readFromTerminal();



