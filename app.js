let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const mongoose = require('mongoose');

let indexRouter = require('./routes/index');
let testRouter = require('./routes/test');

let app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://heroku_4nlf1k9s:thg164rul3pplcla7of7utdbjk@ds035428.mlab.com:35428/heroku_4nlf1k9s',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
    console.log("connected to DB");
}, (err) => {
    console.log("mongoose err: ", err);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/test', testRouter);

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

module.exports = app;