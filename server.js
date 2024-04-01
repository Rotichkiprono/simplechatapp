const io = require('socket.io')(3000);

const users = {};

io.on('connection', socket => {
  // Handle new user connection
  socket.on('new-user', name => {
    if (name) { // Check if name exists
      users[socket.id] = name;
      socket.broadcast.emit('user-connected', name);
    } else {
      console.error("User didn't provide a name");
      // Handle the case where no name is provided (optional: send an error message to the client)
    }
  });

  // Handle chat message sent by a user
  socket.on('send-chat-message', message => {
    const userName = users[socket.id];
    if (userName && message) { // Check if user and message exist
      socket.broadcast.emit('chat-message', { message, name: userName });
    } else {
      console.error("Invalid message or missing username");
      // Handle the case where message is invalid or username is missing (optional: send an error message to the client)
    }
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    const userName = users[socket.id];
    if (userName) {
      socket.broadcast.emit('user-disconnected', userName);
      delete users[socket.id];
    }
  });
});
