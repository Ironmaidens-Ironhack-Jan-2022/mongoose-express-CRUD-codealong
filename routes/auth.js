const router = require("express").Router();
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const User = require("../models/User.model");
const saltRounds = 10;

router.get("/signup", (req, res, next) => {
    res.render("auth/signup");
});


router.post("/signup", (req, res, next) => {

    const {password, email} = req.body;

    if( !password || !email ){
        res.render('auth/signup', { errorMessage: 'All fields are mandatory. Please provide email and password.' });
        return;
    }

    bcryptjs
        .genSalt(saltRounds)
        .then( salt => {
            return bcryptjs.hash(password, salt)
        })
        .then( (hash) => {
            const userDetails = {
                email,
                passwordHash: hash
            }
            return User.create(userDetails);
        })
        .then( userFromDB => {
            res.redirect("/");
        })
        .catch( error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(500).render('auth/signup', { errorMessage: error.message });
            } else {
                next(error);
            }
        });
});


router.get('/login', (req, res) => res.render('auth/login'));


router.post("/login", (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) {
        res.render('auth/login', { errorMessage: 'Please enter both, email and password to login.' });
        return;
    }

    // Task: make query to DB to get details of the user
    User.findOne({email: email})
        .then( userFromDB => {
            if(!userFromDB){
                res.render('auth/login', { errorMessage: 'Email is not registered. Try with other email.' });
                return;
            } else if (bcryptjs.compareSync(password, userFromDB.passwordHash)) {
                //login sucessful
                res.render('users/user-profile', {user: userFromDB} );
            } else {
                //login failed
                res.render('auth/login', { errorMessage: 'Incorrect credentials.' });
            }
        })
        .catch(error => console.log("Error getting user details from DB", error));
});


router.get('/user-profile', (req, res) => {
    res.render('users/user-profile');
    // res.render('users/user-profile', { userInSession: req.session.currentUser });
});

module.exports = router;
