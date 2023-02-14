const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const PORT = process.env.PORT || 3001;
const handlebars = require('express-handlebars');
const chat = [];
const socket = io.connect("https://localhost:3001");
const field = document.getElementById("field");
const sendButton = document.getElementById("send");
const content = document.getElementById("content");
const name = document.getElementById("name");


app.use(express.static(path.join(__dirname, 'public')));

app.get('/chat', (req, res) => {
    res.send('<h1>Chat Page!</h1>');
    console.log(`Connection to /chat success`);
});

server.listen(PORT, () => {
    console.info(`Listening on ${PORT}`);
});



//chat listner socket
socket.on('chat', function (data) {

 if(data.chat){
        const https = '';
        for(var i=0; i<chat.length; i++) {
            https += '<b>' + (chat[i].username ? chat[i].username : 'Server' + ': </b>');
            https += chat[i].message + '</b>';
        }
        content.innerHTML = https;
        content.scrollTop = content.scrollHeight;
    }
    else
    {
        console.log("There is a problem in the imput data:", data);
    }
});
    // button to send message to socket
    sendButton.onclick = function() {
    	if(name.value == "") {
            alert("Please type your name!");
        } else {
        var text = field.value;
        socket.emit('send', { message: text, username: name.value });
        field.value = '';
        }
    };
    // set enter key listener 
    field.addEventListener('keypress', function (e) {
	    var key = e.which || e.keyCode;
	    if (key === 13) { 
	    	sendButton.onclick();
    	}
	});