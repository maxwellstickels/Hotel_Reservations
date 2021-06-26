const managerAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    }
    else if (!req.session.manager) {
        res.redirect('/');
    }
    else {
        next();
    }
};

module.exports = managerAuth;