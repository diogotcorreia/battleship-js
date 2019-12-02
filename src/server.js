const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const connectionHandler = require('./connectionHandler');

const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server, { wsEngine: 'ws' });
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(_, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

io.on('connection', connectionHandler);

server.listen(port, () => console.log(`Listening on port ${port}`));
