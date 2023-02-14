const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const PORT = process.env.PORT || 3001;
const handlebars = require('express-handlebars');


app.use(express.static(path.join(__dirname, 'public')));

app.get('/chat', (req, res) => {
    res.send('<h1>Chat Page!</h1>');
    console.log(`Connection to /chat success`);
});

server.listen(PORT, () => {
    console.info(`Listening on ${PORT}`);
});