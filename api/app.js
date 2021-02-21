var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var fs = require('fs');


// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const propsRouter = require('./routes/props')

var app = express();

var update = require('./update');
// update.run().catch(console.dir);
// console.log(update.run().catch(console.dir))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

const basePathToData = path.join(__dirname, './');

const getData = async function (request, response) {
  // let data = getJsonData(basePathToData, 'data.json');
  const data = await update.fetch()
  return response.send(data)
}
const getOne = async function (request, response) {
  // let data = getJsonData(basePathToData, 'data.json');
  const data = await update.fetchOne(id)
  return response.send(data)
}


// app.get('/', getData)
// app.use('/', indexRouter)

app.get('/props', getData)
app.use('/props', propsRouter)

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
