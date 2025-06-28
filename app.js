const express = require('express');
const http = require('http');
const compression = require('compression');
const fs = require('fs');

const app = express();
const server = http.createServer(app);


app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public', {
  setHeaders: (res, path) => {
    if (path.endsWith('.js') || path.endsWith('.css')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else {
      res.setHeader('Cache-Control', 'public, max-age=0, no-cache');
    }
  }
}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});



server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});