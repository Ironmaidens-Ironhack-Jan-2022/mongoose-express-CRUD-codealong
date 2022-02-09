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

module.exports = router;
