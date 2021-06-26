const User = require('./User');
const Reservation = require('./Reservation');
const Comment = require('./Comment');
const Room = require('./Room');

User.hasMany(Reservation, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

Reservation.belongsTo(User, {
    foreignKey: 'user_id' 
});

Reservation.hasMany(Comment, {
    foreignKey: 'reservation_id',
    onDelete: 'cascade'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

Comment.belongsTo(Reservation, {
    foreignKey: 'reservation_id'
});

Room.belongsTo(Reservation, {
    foreignKey: 'reservation_id'
});

Reservation.hasMany(Room, {
    foreignKey: 'reservation_id'
});

// Comment.hasOne(Reservation, {
//     foreignKey: 'comment_id'
// });

// Room.belongsTo(User, {
//     foreignKey: 'user_id'
// });

// User.hasMany(Room, {
//     foreignKey: 'user_id'
// });


module.exports = { User, Reservation, Comment, Room };