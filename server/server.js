const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('New client connected: ' + socket.id);

  socket.on('vote', (data) => {
      console.log(`Vote received: ${data} from ${socket.id}`);
      
      // Broadcast the vote to all clients
      io.emit('voteReceived', data); 
  });

  users.push(socket.id)

  socket.on('retrieveUsers', () => {
      io.emit('users', users)
  })

  socket.on('disconnect', () => {
      console.log('Client disconnected: ' + socket.id);

      users.filter((id) => socket.id !== id);
      console.log(users)
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
