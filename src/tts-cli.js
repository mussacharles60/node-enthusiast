// const readline = require("readline");
// // const { speak } = require("node-tts-api");

// // create a readline interface for the terminal
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// // prompt the user for the text to convert to speech
// rl.question("Enter the text to convert to speech: ", (text) => {
//   // convert the text to speech using the node-tts-api
// //   speak(text)
// //     .then(() => {
// //       // close the readline interface when the speech is finished
// //       rl.close();
// //     })
// //     .catch((err) => {
// //       // print any errors to the console
// //       console.error(err);
// //     });
// });

const readline = require("readline");

// create a readline interface for the terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// define a function to handle the conversation with the user
function handleConversation(message) {
  // check if the message is a greeting
  if (message.match(/hi|hello|hey/i)) {
    // if it is a greeting, return a greeting response
    return "Hello, how are you?";
  }

  // check if the message is a question
  if (message.match(/how are you/i)) {
    // if it is a question, return a response
    return "I'm doing well, thank you. How are you?";
  }

  // if the message is none of the above, return a default response
  return "I'm sorry, I don't understand. Can you please rephrase your question?";
}

// prompt the user for the initial message
rl.question("Enter your message: ", (message) => {
  // handle the conversation with the user
  const response = handleConversation(message);

  // print the response to the console
  console.log(response);

  // prompt the user for the next message
  rl.question("Enter your next message: ", (message) => {
    // handle the conversation with the user
    const response = handleConversation(message);

    // print the response to the console
    console.log(response);

    // close the readline interface when the conversation is finished
    rl.close();
  });
});
