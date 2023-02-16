// main.js equivalent for socket chat stuff

const userList = document.querySelector('#users');

const createUserList = (users) => {
    userList.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
};

document.addEventListener((e) => {
    e.preventDefault();

    const messageBox = document.querySelector('.chat-messages');
    const messageList = document.querySelector('#chat-msg-list');
    const inputMessage = document.querySelector('#chat-btn');
    const chatBox = document.querySelector('#msg').value.trim();

    const socket = io();

    let connected = false;

    const sendMessage = () => {
        let message = inputMessage.value();
        if (message && connected) {
            addChatMessage(username, message)
            socket.emit('new message', message);
        }
    };

    const addChatMessage = (username, message) => {
        const usernameSpan = `<span class="username">${username}</span>`;
        const messageSpan = `<span class="messageBody">${message}</span>`;
        const chatLiEl = `<li>
        <strong>${usernameSpan}:</strong> ${messageSpan}
        </li>`
    };

    socket.on('new message', (data) => {
        addChatMessage(data);
    });

    socket.on('disconnect', () => {
        console.log("You have disconnected.");
    });
});