
const router = require('express').Router();
const sequelize = require('../config/connection');
const {Reservation, Comment, User} = require('../models');
// const Comment = require('../models/Comment');
// const User = require('../models/User');
const withAuth = require('../utils/auth')

router.get('/', withAuth, (req, res) => {
  if (!req.session.manager) {
    
    Reservation.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'start_date',
        'end_date',
        'user_id',
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'user_id', 'created_at'],
          include: {
              model: User,
              attributes: ['username'],
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbReservationData => {
        const reservations = dbReservationData.map(reservation => reservation.get({ plain: true }));
        res.render('dashboard', { reservations, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    } else {
      Reservation.findAll({
        
        attributes: [
          'id',
          'start_date',
          'end_date',
          'user_id',
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username'],
              }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      })
        .then(dbReservationData => {
          const reservations = dbReservationData.map(reservation => reservation.get({ plain: true }));
          res.render('dashboard', { reservations, loggedIn: true });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
      }
  });
      


router.get('/edit/:id', withAuth, (req, res) => {
  Reservation.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'reservation_text',
      'title',
      'created_at',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'reservation_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbReservationData => {
      if (!dbReservationData) {
        res.status(404).json({ message: 'No reservation found with this id' });
        return;
      }

      const reservation = dbReservationData.get({ plain: true });
      res.render('edit-reservation', { reservation, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



router.get('/edituser', withAuth, (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.session.user_id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }

      const user = dbUserData.get({ plain: true });
      res.render('edit-user', {user, loggedIn: true});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  });

module.exports = router;