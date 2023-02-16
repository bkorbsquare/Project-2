const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const session = require('express-session');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');
const clog = require('clog');

const app = express();
const PORT = process.env.PORT || 3001;

//socket.io stuff
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// creating session for sequelize
const sess = {
    secret: 'Super secret secret',
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
};
app.use(session(sess));

// Create handlebars engine object, no helper functions passed in
const hbs = handlebars.create({});

// Tell express to use handlebars template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

// Socket.io
io.on('connection', (socket) => {
    clog.info(`Connecting into ${socket}.`);
    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });
});


sequelize.sync({force: false}) // UNDO THIS LATER
.then(() => {
    app.listen(PORT, () => {
        clog.info(`Now listening on ${PORT}!`);
    });

    http.listen(3000, () => {
        clog.info(`Testing at 3000`);
    });
});