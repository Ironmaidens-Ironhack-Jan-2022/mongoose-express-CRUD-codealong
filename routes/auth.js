const router = require("express").Router();
const bcryptjs = require('bcryptjs');
const User = require("../models/User.model");
const saltRounds = 10;

router.get("/signup", (req, res, next) => {
    res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {

    const {password, email} = req.body;

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
        .catch( e => console.log("error generating hash", e));
});

module.exports = router;
