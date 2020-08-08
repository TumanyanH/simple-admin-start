const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const csrf = require('csurf')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');

const errorController = require('./controllers/errorController')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// .env config
require('dotenv').config()

bodyParser.urlencoded({ extended: false })

const store = new MongoDBStore({
  uri : process.env.MONGO_URL,
  collection : "sessions"
})

app.use(session({
  secret : "76e5c00cb19fe179791683fabf717257",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store : store
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(csrf({ cookie: true }))

app.use((req, res, next) => {
  res.locals.errorMessage = null
  res.locals.csrfToken = req.csrfToken()

  next()
})

app.use('/', indexRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  return errorController.get404(res)
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err)
  if(err) {
    return errorController.get500(res)
  }
});

module.exports = app;
