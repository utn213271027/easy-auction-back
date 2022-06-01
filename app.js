var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var session = require('express-session')
const bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var middlewareAuth = require('./middleware/auth');
const mongoose = require('mongoose');
var middlewareAuthClass = new middlewareAuth();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false
    }
  })
);
//app.use(middlewareAuthClass.validateLogin());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const URI = 'mongodb+srv://easyauction:easysoft@cluster0.tuva4.mongodb.net/Easy?retryWrites=true&w=majority';

mongoose.connect(URI, {useNewUrlParser: true, dbName: "Easy"})
  .then(db => console.log('BD Conectada'))
  .catch(error => console.error(error));

module.exports = mongoose;



app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(8080, () => {
  console.log("Server running in port 8080");
});

module.exports = app;
