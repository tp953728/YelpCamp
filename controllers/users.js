const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res) => {
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
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login')
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome Back!')
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo
    res.redirect(redirectUrl)
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Logged out!')
    res.redirect('/campgrounds')
}