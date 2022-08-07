const ws = require('ws');
const express = require("express");

const WSServer = function () {
    var self = this;
    self.wss = "";
    self.ws = "";

    self.startWSServer = () => {
        self.wss = new ws.Server({ noServer: true });
        self.wss.on('connection', ws => {
            self.ws = ws;
            self.ws.on('message', message => {
              console.log(`Received message => ${message}`)
            })
            self.ws.send('Hello! Message From Server!!')
          });
    }

    self.sendMessage = (msg) => {
        self.wss.clients.forEach(function(client) {
            client.send(msg);
        })
    }

    self.closeServer = () => {
        self.wss.close();
    }
}

module.exports = {WSServer: WSServer};

