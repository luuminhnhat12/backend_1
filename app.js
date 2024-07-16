const express = require('express');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require('path');
const bodyParser = require("body-parser");
var createError = require('http-errors');
require('dotenv').config();
const userRouter = require('./route/route_user');
const port = process.env.PORT || 3000;

const app = express()

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(userRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
const dbConfig = process.env.DATABASE_URL ;
  
mongoose.connect(dbConfig, { useNewUrlParser: true}).then(() => {console.log("Successfully connected to the database");}).catch(err => {
      console.log('Could not connect to the database. Exiting now...', err);
      process.exit();
});
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
  
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})