const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = net.createConnection({ port: 5000 }, () => {
  console.log('Connected to file server.');

  rl.question('Enter filename to request: ', (filename) => {
    client.write(filename);
    rl.close();
  });
});

client.setEncoding('utf8');

client.on('data', (data) => {
  console.log('\nServer response:\n');
  console.log(data);
  client.end();
});

client.on('end', () => {
  console.log('Disconnected from server.');
});

client.on('error', (err) => {
  console.error(`Connection error: ${err.message}`);
});