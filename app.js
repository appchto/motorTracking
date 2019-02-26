const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
var http = require("http");
var routes = require("./routes/routes"); //File that contains our endpoints

require('./config/passport')(passport);
const app = express();

// Passport Config

// DB Config
const  db = require('./config/keys');

// Connect to MongoDB
mongoose
  .connect(
    db.mongoURI,
    { useNewUrlParser: true }
  )  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static("./public")); //setting the folder name (public) where all the static files like css, js, images etc are made available

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.flash('user');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/clients', require('./routes/clients.js'));

const PORT = process.env.PORT || 5001;

// app.listen(PORT, console.log(`Server started on port ${PORT}`));

var server = http.Server(app);
var io = require("socket.io")(server); //Creating a new socket.io instance by passing the HTTP server object
server.listen(PORT, function() {
  io.on("connection", function(socket) {
    //Listen on the 'connection' event for incoming sockets
    console.log("A user just connected");

    socket.on("join", function(data) {
      //Listen to any join event from connected users
      socket.join(data.user); //User joins a unique room/channel that's named after the userId
      console.log("User joined room: " + data.user);
    });

    routes.initialize(app, db, socket, io); //Pass socket and io objects that we could use at different parts of our app
  });
});