const express = require('express');
// const handlebars = require('express-handlebars');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3001;

// Default Routing Page
app.use(express.static(path.join(__dirname, 'public')));

server.listen(PORT, () => {
    console.info(`Listening on ${PORT}`);
});

// On connect
io.on('connect', (socket) => {
    console.log(`Connection into ${socket}.`);

    // if user added:
    socket.on('add user', (username) => {
        // changing socket username to new user
        socket.username = username;
        // local emit for login, not global
        socket.emit('login', {
            username: socket.username
        }),
        // global emit for user join
        socket.broadcast.emit('user joined', {
            username: socket.username
        });
        console.log(`${username} joined.`);
    });

    // if (new) chat sent:
    socket.on('chat', (data) => {
        if (!data || data === "") {
            console.log("No chat data present to send.");
        } else {
            socket.broadcast.emit('new message', {
                username: socket.username,
                message: data
            });
            console.log(`Chat data sent to ${socket}.`);
        };
    });

    // on user disconnect
    socket.on('disconnect', () => {
        // global emit that client has left
        socket.broadcast.emit('user left', {
            username: socket.username
        });
        console.log(`Disconnect from ${socket}.`);
    });
});