const net = require('net');
const fs = require('fs');
const path = require('path');

const PORT = 5000;

const server = net.createServer((socket) => {
  console.log('Client connected.');

  socket.setEncoding('utf8');

  socket.on('data', (filename) => {
    const filePath = path.join(__dirname, 'files', filename.trim());

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        socket.write(`ERROR: File "${filename.trim()}" not found or cannot be read.`);
      } else {
        socket.write(`SUCCESS:\n${data}`);
      }
    });
  });

  socket.on('end', () => {
    console.log('Client disconnected.');
  });
});

server.listen(PORT, () => {
  console.log(`TCP file server running on port ${PORT}`);
});