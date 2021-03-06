var env = require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser     =    require('body-parser')
var mongoose     =    require('mongoose')
// var methodOverride  =   require("method-override")

// // FIREBASE SETUP
var db = require("./database/config");

var indexRouter = require('./routes/index');
var chatsRouter = require('./routes/chats');
var friendsRouter = require('./routes/friends');

var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// for BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// CONNECT TO MONGO

// connect to the database  
mongoose.connect(process.env.mongo_uri, {     
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas!');
}).catch(err => {
    // console.log(process.env.MONGO_URI);
    console.log('ERROR:', err.message);
});
 


app.use('/', indexRouter);
app.use('/chats', chatsRouter);
app.use('/friends', friendsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// socket connection
io.on('connection', function(socket){
    console.log('a user connected');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
