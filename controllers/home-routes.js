const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');

// Currently just rendering main.handlebars.
router.get('/', async (req, res) => {
    try {
        res.render('main', { 
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Project }],
        });
        const user = userData.get({ plain: true });
        res.render('dashboard', { ...user, logged_in: true});
    } catch (err) {
        res.status(500).json(err);
    }
});

// Will render login page if not already logged in.
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

module.exports = router;