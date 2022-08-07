const express = require("express");
const router = express.Router();
const {WSServer} = require("./websockets/server")
var wsServer = new WSServer();

router.get('/start', (req, res) => {
    wsServer.startWSServer();
    res.send("WS Server started.")
});

router.post('/send', (req, res) => {
    wsServer.sendMessage(JSON.stringify(req.body));
    res.send("Message posted to clients")
});

router.get('/stop', (req, res) => {
    wsServer.closeServer();
    res.send("Server stopped successfully.")
});

router.get('/', (req, res) => {
    res
      .status(200)
      .send('Hello, world!')
      .end();
  });

module.exports = router;