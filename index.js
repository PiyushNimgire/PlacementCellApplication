const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const MongoStore = require('connect-mongo');
const app = express();

app.use(express.json());
app.use(express.urlencoded());

const db = require('./config/mongoose');

//passport and session cookie setup 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-stratergy');

//set up ejs
app.set('view engine', 'ejs');
app.set('views', './views');

//ejs layouts setup
app.use(expressLayouts);
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
app.use('/', express.static('assets'));

const mongoStoreOptions = {
    mongoUrl: 'mongodb://localhost/placeyou-development',
    autoRemoval: 'disabled'
}

const mongoStore = MongoStore.create(mongoStoreOptions)

app.use(session({
    name: "placeYou",
    secret: "Dn'tDoThis",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: mongoStore
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes/index'));

const port = 8000;
app.listen(port, console.log(`Server is running on port ${port}`));