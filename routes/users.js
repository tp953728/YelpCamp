const express = require('express');
const router = express.Router();
const passport = require('passport')
const User = require('../models/user');

router.get('/register', (req, res) => {
    res.render('users/register');
})

router.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const newUser = new User({ email, username })
        const registerUser = await User.register(newUser, password);
        req.login(newUser, err => {
            if (err) return next(err)
            req.flash('success', 'welcome to yelp camp')
            res.redirect('/campgrounds')
        });
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }
})

router.get('/login', (req, res) => {
    res.render('users/login')
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome Back!')
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo
    res.redirect(307, redirectUrl)
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Logged out!')
    res.redirect('/campgrounds')
})

module.exports = router