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

    socket.on('disconnect', () => {
        console.log('Client disconnected: ' + socket.id);
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
