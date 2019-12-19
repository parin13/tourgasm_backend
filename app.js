
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressValidator = require('express-validator');
const cors = require('cors');


var app = express();
// app.use(expressValidator());

const dotenv = require('dotenv').config({ path: path.join(__dirname, '/.env') });
if (dotenv.error) {
    console.log('=---dotenv.error---=', dotenv.error);
    throw dotenv.error;
}

app.use(cors());
app.options('*', cors());
 
const dbConnector = require('./lib/helpers/database.helper')
const logModule = require('./lib/common/logger/common-helper.logger');
const router  = require('./routes/index');

dbConnector.init(app); 
logModule.init(app);
 
  /* service middleware */
 app.use( (req, res, next) => {
   if(app.locals.db){
     req.db = app.locals.db;
   }
   if(app.locals.logger){
     req.logger = app.locals.logger;
   }
   console.log('==============service initialise done=========');
 
   next();
 });
 
app.use(logger('dev'));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  // res.header('Content-Type', 'application/json');
  next();
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.json({
  type: function (req) {
    return req.headers['content-type'] === '*/*'
  }
}))
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());]''
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

 /* map router */
 router.init(app);
 app.get('/', (req, res, next) => {
   console.log(req.env);
   res.send('Tourgasm Backend Application Running')
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
