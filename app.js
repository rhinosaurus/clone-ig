const express = require('express');
const ws = require('ws');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

const websock = new ws.Server({ noServer: true });
websock.on('connection', socket => {
  socket.on('message', message => {
    websock.clients.forEach(client => {
      if (client.readyState === ws.OPEN) {
        client.send(message);
      }
    });
  });
});

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

server.on('upgrade', (request, socket, head) => {
  websock.handleUpgrade(request, socket, head, socket => {
    websock.emit('connection', socket, request);
  });
});
