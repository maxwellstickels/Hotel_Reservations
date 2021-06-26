const router = require('express').Router();

const User = require('../../models/User');
const Reservation = require('../../models/Reservation');
const Comment = require('../../models/Comment');

const session = require('express-session');

const withAuth = require('../../utils/auth');

const SequilizeStore = require('connect-session-sequelize')(session.Store);


router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password']}
    })
    .then(dbUserData => res.json(dbUserData))

    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [{
            model: Reservation,
            attributes: ['id', 'room', 'created_at'],
            include: {
                model: Comment,
                attributes: ['id', 'comment_text', 'reservation_id', 'user_id', 'created_at'],
            }
        },
    ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      manager: 0
    })
      
      .then(dbUserData => {
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;
          req.session.manager = false;
          res.json(dbUserData);
        });
      })
      
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.post('/login',  (req, res) => {
    User.findOne({
        where: {
        email: req.body.email
        }
    }).then(dbUserData => {
        
        if (!dbUserData) {
        res.status(400).json({ message: 'Incorrect email or password!' });
        return;
        }
        
        const validPassword = dbUserData.checkPassword(req.body.password);
        
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password!' });
            return;
        }
        
        req.session.save(() => {
          
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;
          req.session.manager = Boolean(dbUserData.manager);

          res.json({ user: dbUserData, message: 'You are now logged in!' });
      
        });
        // res.redirect("../../");
    });  
  });

//   router.post('/login', withAuth, (req, res) => {
//     if(req.session.loggedIn) {
//         req.session.destroy(() => {
//             res.status(202).end(); 
//         });
//     }
//     else {
//         res.status(404).end();
//     }
// });

router.put('/:id', withAuth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;