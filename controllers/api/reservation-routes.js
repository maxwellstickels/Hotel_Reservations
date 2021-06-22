const router = require('express').Router();

const User = require('../../models/User');
const Reservation = require('../../models/Reservation');
const Comment = require('../../models/Comment');

const sequelize = require('../../config/connection');

const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Reservation.findAll({

        attributes: [
            'id',
            'reservation_text',
            'title',
            'created_at',
          ],
        
        order: [[ 'created_at', 'DESC']],

        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'reservation_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    
    .then(dbReservationData => res.json(dbReservationData ))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


router.get('/:id', (req, res) => {
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
          model: User,
          attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'reservation_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
      ]
    })
      .then(dbReservationData => {
        if (!dbReservationData) {
          res.status(404).json({ message: 'No reservation found with this id' });
          return;
        }
        res.json(dbReservationData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


  router.post('/', withAuth, (req, res) => {
    Reservation.create({
        title: req.body.title,
        reservation_text: req.body.reservation_text,
        user_id: req.session.user_id
    })
    .then(dbReservationData => res.json(dbReservationData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


router.put('/:id', withAuth, (req, res) => {
    Reservation.update(req.body,
        {
        where: {
            id: req.params.id
            }
        }
    )
    .then(dbReservationData => {
        if (!dbReservationDataa) {
            res.status(404).json({ message: 'No reservation found with this id' });
            return;
        }
        res.json(dbReservationData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});


router.delete('/:id', withAuth, (req, res) => {
    Reservation.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbReservationData => {
        if (!dbReservationData) {
          res.status(404).json({ message: 'No reservation found with this id' });
          return;
        }
        res.json(dbReservationData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;