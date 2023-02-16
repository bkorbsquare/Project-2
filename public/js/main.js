document.addEventListener('DOMContentLoaded', () => {
    // const usernameInput = document.querySelector('.username');
    const messages = require('../../views/chat.handlebars') || document.querySelector('.messages');
    const loginInfo = require('./login');

    const socket = io();

    let username
    let connected = false;

    const setUsername = () => {
        username = loginInfo.loginFormHandler;
        if (username) {
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

    // Grab user list (to be displayed in the sidebar). To be fixed.
    function outputUsernames(users) {
        userList.innerHTML = `
            ${users.map(user => `<li>${user.user.username}</li>`).join('')}
        `;
    }

    // Socket events
    socket.on('login', () => {
        connected = true;
        console.log(connected);

        socket.on('disconnect', () => {
            console.log("You have been disconnected.");
        });
    });

    socket.on('new chat', (data) => {
        addChatMessage(data);
    });
});