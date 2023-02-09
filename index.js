const express = require('express');
const app = express();
const server = require('http').createServer(app);
const PORT = 3001;

app.get('/', (req, res) => {
    res.send('<h1>Test</h2>');
});

server.listen(PORT, () => {
    console.info(`Listening on ${PORT}`);
});