const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');

// Currently just rendering main.handlebars.
router.get('/', async (req, res) => {
    try {
        res.render('homepage', { 
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

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('signup');
});

router.get('/reservations', async (req, res) => {
    try {
        // const userData = await Reservation.findByPk(req.session.user_id, {
        //     attributes: { where: {user_id: req.session.user_id} },
        //     include: [{ model: Project }],
        // });
        // const user = userData.get({ plain: true });
        res.render('partials/reservations');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;