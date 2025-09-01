const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // TODO: Implement your code here
});

// Do not modify this
server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

// Export for testing
module.exports = server;
