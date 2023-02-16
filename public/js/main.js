document.addEventListener('DOMContentLoaded', () => {
    // const usernameInput = document.querySelector('.username');
    const messages = require('../../views/chat.handlebars') || document.querySelector('.messages');
    const loginInfo = require('./login');

    const socket = io();

    let username
    let connected = false;

    const setUsername = () => {
        username = loginInfo.loginFormHandler;
        if (username) { // if username is valid
            // switch to chat page somehow?
            socket.emit('add user', username);
        };
    };

    const sendMessage = (data) => {
        let message = data;
        if (message && connected) {
            addChatMessage(username, message);
            socket.emit('new message', message);
        };
    };

    const addChatMessage = (data) => {
        const usernameDiv = `<span class="username">${data.username}</span>`;
        const messageDiv = `<span class="messageBody">${data.message}</span>`;
        
        if (!usernameDiv || !messageDiv) {
            console.log("There is a problem in the input data.");
        } else {
            const chatDiv = `<li class="chatItem"><strong>${usernameDiv}:</strong> ${messageDiv}</li>`;
        };
    };

    // Socket events
    socket.on('login', () => {
        connected = true;
        console.log(connected);
    });

    socket.on('new chat', (data) => {
        addChatMessage(data);
    });

    socket.on('disconnect', () => {
        console.log("You have been disconnected.");
    });

    socket.io.on('reconnect_error', () => {
        console.log('Reconnect attempt failed.');
    });
});