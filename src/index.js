const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const INPUT_FILE = path.join(__dirname, 'inputs.txt');
const RESULT_FILE = path.join(__dirname, 'result.txt');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/calculate') {
    // Read inputs.txt
    fs.readFile(INPUT_FILE, 'utf8', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Unable to write result');
      }

      const lines = data.trim().split('\n');

      if (lines.length < 3) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Invalid Input File Format');
      }

      const num1 = parseFloat(lines[0]);
      const num2 = parseFloat(lines[1]);
      const operator = lines[2].trim().toLowerCase();

      if (isNaN(num1) || isNaN(num2)) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Invalid Number');
      }

      let result;

      switch (operator) {
        case 'add':
          result = num1 + num2;
          break;
        case 'subtract':
          result = num1 - num2;
          break;
        case 'multiply':
          result = num1 * num2;
          break;
        case 'divide':
          if (num2 === 0) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'text/plain');
            return res.end('Division by zero');
          }
          result = num1 / num2;
          break;
        default:
          res.statusCode = 400;
          res.setHeader('Content-Type', 'text/plain');
          return res.end('Invalid Operator');
      }

      // Write result to result.txt
      fs.writeFile(RESULT_FILE, result.toString(), (err) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/plain');
          return res.end('Unable to write result');
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`Result: ${result}`);
      });
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
