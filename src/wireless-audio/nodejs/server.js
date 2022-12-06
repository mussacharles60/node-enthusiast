// Import the required libraries and modules
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const record = require('node-record-lpcm16');

// Set up the express app to serve static files from the 'public' directory
app.use(express.static('public'));

// Set up the socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected!');

  // Set up the socket to receive messages with the 'audio' event
  socket.on('audio', (data) => {
    // When an audio message is received, broadcast it to all connected clients
    io.emit('audio', data);
  });

  // Set up the socket to handle disconnections
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Set up the record stream to capture audio from the microphone
const mic = record.start({
  threshold: 0,
  verbose: true
});

// Set up the stream to send the captured audio to the socket
mic.pipe(socket);

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Listening on port 3000');
});
