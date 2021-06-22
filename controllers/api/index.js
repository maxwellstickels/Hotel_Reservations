const router = require('express').Router();

const userRoutes = require('./user-routes');

const commentRoutes = require('./comment-routes');

const reservationRoutes = require('./reservation-routes');

router.use('/users', userRoutes);
router.use('/reservations', reservationRoutes);
router.use('/comments', commentRoutes);

module.exports = router;