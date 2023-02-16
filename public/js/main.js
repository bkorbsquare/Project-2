console.log("Main loaded.");

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (!loginInfo) {
        console.log("this isnt working");
    };

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

});