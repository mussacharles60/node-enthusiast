const spacy = require("spacy");

// load the spaCy model
const model = spacy.load("en_core_web_md");

// define the training data
const text = "Hello, how are you? I'm doing well, thank you. How about you?";

// train the model on the training data
model.pipe([text], { "tagger": True, "parser": True, "ner": True });

// save the trained model
model.to_disk("model");