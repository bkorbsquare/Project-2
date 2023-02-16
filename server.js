const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const session = require('express-session');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');

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

// the following line gets complaints from the terminal for some reason
// app.use(routes);

sequelize.sync({ force: false }).then(() => {
    server.listen(PORT, () => {
        console.info(`Listening on ${PORT}`);
    });
});

// // On connect
// io.on('connect', (socket) => {
//     console.log(`Connection into ${socket}.`);

//     // if user added:
//     socket.on('add user', (username) => {
//         // changing socket username to new user
//         socket.username = username;
//         // local emit for login, not global
//         socket.emit('login', {
//             username: socket.username
//         }),
//         // global emit for user join
//         socket.broadcast.emit('user joined', {
//             username: socket.username
//         });
//         console.log(`${username} joined.`);
//     });

//     // if (new) chat sent:
//     socket.on('chat', (data) => {
//         if (!data || data === "") {
//             console.log("No chat data present to send.");
//         } else {
//             socket.broadcast.emit('new message', {
//                 username: socket.username,
//                 message: data
//             });
//             console.log(`Chat data sent to ${socket}.`);
//         };
//     });

//     // on user disconnect
//     socket.on('disconnect', () => {
//         // global emit that client has left
//         socket.broadcast.emit('user left', {
//             username: socket.username
//         });
//         console.log(`Disconnect from ${socket}.`);
//     });
// });