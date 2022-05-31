const express = require('express');
const app = express();
const session = require('express-session');
const exphbs = require('express-handlebars');
const configRoutes = require('./routes');

app.use(express.json());

app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}));

app.get('/private', async (req, res, next) => {
  if (!req.session.username) res.status(403).render('partials/login', {error: 'User is not logged in'});
  next();
});

app.use(async (req, res, next) => {
  const message = req.session.username ? 'Authenticated User' : 'Non-Authenticated User';
  console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} (${message})`);
  next();
});

app.use(express.urlencoded({ extended: false }));

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});