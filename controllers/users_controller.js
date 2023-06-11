const User = require('../models/user');
module.exports.profile = (req, res) => {
    res.render('users_profile', {
        title: "Profile Page"
    })
}

module.exports.signUp = (req, res) => {
    if(req.isAuthenticated()){
        res.redirect('/users/profile')
    }
    res.render('users_sign_up', {
        title: "Sign Up"
    })
}

module.exports.signIn = (req, res) => {
    if(req.isAuthenticated()){
        res.redirect('/users/profile')
    }
    res.render('users_sign_in', {
        title: "Sign In"
    })
}

module.exports.createUser = async (req, res) => {
    if(req.body.password != req.body.confirmPassword){
        res.redirect('/users/sign-up');
    }

    const user = await User.findOne({email: req.body.email});
    if(!user){
        await User.create(req.body);
    }
    res.redirect('/users/sign-in');
}

module.exports.createSession = (req, res) => {
    res.redirect('/users/profile');
}

module.exports.destroySession = (req, res) => {
    req.logout((err)=> {
        if(err){
            console.log("error while logging out");
        }
    })
    res.redirect('/users/sign-in');
}