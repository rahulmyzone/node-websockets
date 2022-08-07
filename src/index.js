const express = require("express");
const ws = require('ws');
const router = express.Router();
const app = express();
//const routes = require("./routes");
app.use(express.json());
app.use(router);

const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', socket => {
  socket.on('message', (message) => {
    console.log(message.toString())
  });
  socket.send("Hello from server");
});

// Start the server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});

router.post('/send', (req, res) => {
  wsServer.clients.forEach(function(client) {
    client.send(JSON.stringify(req.body));
  })
});

router.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello, world!')
    .end();
});