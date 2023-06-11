const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email'
    }, 
    async (email, password, done) => {
        const user = await User.findOne({email: email});
        if(!user || user.password != password){
            return done(null, false);
        }

        return done(null, user);
    }
))

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    if(user){
        return done(null, user);
    }
})

passport.checkAuthentication = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }

    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = (req, res, next) => {
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }

    return next();
}

module.exports = passport;