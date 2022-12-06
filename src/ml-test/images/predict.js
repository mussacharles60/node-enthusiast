const tf = require("@tensorflow/tfjs");
const tfnode = require("@tensorflow/tfjs-node");
const fs = require("fs");

// load the pre-trained model
const model = await tfnode.loadLayersModel("model.json");

// read the image file into a tensor
const image = tf.node.decodeImage(fs.readFileSync("image.jpg"));

// resize and normalize the image tensor
const input = tf.image.resizeBilinear(image, [224, 224]).div(255);

// predict the class of the image using the model
const prediction = model.predict(input);

// get the index of the predicted class
const classIndex = prediction.argMax(-1);

// print the predicted class
console.log(classIndex.dataSync()[0]);
