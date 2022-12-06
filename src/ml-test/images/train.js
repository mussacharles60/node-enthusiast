const tf = require("@tensorflow/tfjs");
const tfnode = require("@tensorflow/tfjs-node");
const fs = require("fs");

// define the training data
const images = fs.readdirSync("images/train").map((filename) => {
  return tf.node.decodeImage(fs.readFileSync(`images/train/${filename}`));
});
const labels = fs.readFileSync("images/train.txt", "utf8").split("\n");

// create the data pipeline
const pipeline = tf.data.zip({
  xs: tf.data.array(images).map((image) => {
    return tf.image.resizeBilinear(image, [224, 224]).div(255);
  }),
  ys: tf.data.array(labels).map((label) => {
    return tf.oneHot(tf.tensor1d([label], "int32"), 10);
  }),
});

// shuffle and batch the data
const dataset = pipeline.batch(32);

// define the model
const model = tf.sequential();
model.add(
  tf.layers.conv2d({
    filters: 32,
    kernelSize: [5, 5],
    strides: [1, 1],
    padding: "same",
    activation: "relu",
    inputShape: [224, 224, 3],
  })
);
model.add(tf.layers.maxPooling2d({ poolSize: [2, 2], strides: [2, 2] }));
model.add(
  tf.layers.conv2d({
    filters: 64,
    kernelSize: [5, 5],
    padding: "same",
    activation: "relu",
  })
);
model.add(tf.layers.maxPooling2d({ poolSize: [2, 2], strides: [2, 2] }));
model.add(tf.layers.flatten());
model.add(tf.layers.dense({ units: 1024, activation: "relu" }));
model.add(tf.layers.dense({ units: 10, activation: "softmax" }));

// compile the model
model.compile({
  optimizer: tf.train.adam(),
  loss: tf.losses.softmaxCrossEntropy,
  metrics: ["accuracy"],
});

// train the model
await model.fitDataset(dataset, { epochs: 10 });

// save the trained model
await model.save("model.json");
