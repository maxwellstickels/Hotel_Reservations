const specificAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
    }
    else {

        if (!req.session.user_id) {
            res.redirect('/');
        }
        else {
            next();
        }
    }
};

module.exports = specificAuth;