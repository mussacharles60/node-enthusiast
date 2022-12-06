const spacy = require("spacy");

// load the trained model
const model = spacy.load("model");

// prompt the user for the input text
const text = input("Enter your text: ");

// process the input text using the model
const doc = model.tokenizer(text);

// print the tokens to the console
console.log(doc.text.split(" "));