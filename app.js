const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
var http = require("http");
var routes = require("./routes/routes"); //File that contains our endpoints
var coords = require("./routes/coords"); 
var cache = require('memory-cache');
const path = require('path')

require('./config/passport')(passport);
const app = express();

    // configure cache middleware
    let memCache = new cache.Cache();
    let cacheMiddleware = (duration) => {
        return (req, res, next) => {
            let key =  '__express__' + req.originalUrl || req.url
            let cacheContent = memCache.get(key);
            if(cacheContent){
                res.send( cacheContent );
                return
            }else{
                res.sendResponse = res.send
                res.send = (body) => {
                    memCache.put(key,body,duration*1000);
                    res.sendResponse(body)
                }
                next()
            }
        }
    }

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


app.use(express.static(path.join(__dirname, 'public')));

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
app.use('/coords',cacheMiddleware(30), coords );

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