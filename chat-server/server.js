// chat-server/server.js
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('sendMessage', (data) => { // ✅ match client's emit
    io.emit('receiveMessage', {
      ...data,
      time: new Date().toLocaleTimeString(), // ✅ match time key
    });
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});


server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});
