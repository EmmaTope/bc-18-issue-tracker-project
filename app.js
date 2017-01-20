var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('express-session');
var flash = require('express-flash');
var MongoStore = require('connect-mongo')(session);
var firebase = require("firebase");

var config = {
  apiKey: "AIzaSyDhCTLR7c4RdE3JKWEDHQ02gDY3T1vBwWo",
  authDomain: "issuetracker-ab67b.firebaseapp.com",
  databaseURL: "https://issuetracker-ab67b.firebaseio.com",
  storageBucket: "issuetracker-ab67b.appspot.com",
  messagingSenderId: "326728674993"
};
firebase.initializeApp(config);


var http = require('http');
var secret = require('./config/secret');

var authRoutes = require('./routes/auth');
var adminRoutes = require('./routes/admin');
var issueRoutes = require('./routes/issues');

var app = express();

// app.set('port', process.env.PORT || 3000);
// view engine setup
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(session({
//   resave: true,
//   saveUninitialized: true,
//   secret: secret.secretKey,
//   cookie: { maxAge: 60000 }
// }));
app.use(session({
  secret: secret.secretKey,
  store: new MongoStore({url : secret.url}),
  resave: true,
  saveUninitialized: false
}));
app.use(flash());

app.use(adminRoutes);
app.use(authRoutes);
app.use('/issue',issueRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

var server = http.createServer(app);
server.listen(process.env.PORT || secret.port, function () {
  console.log('app listening on port ',secret.port);
});

module.exports = app;
