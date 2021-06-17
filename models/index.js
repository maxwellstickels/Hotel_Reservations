const Reservation = require('./Reservation');
const Room = require('./Room');
const User = require('./User');

Reservation.hasOne(Room, {
    foreignKey: 'room_id',
});

Reservation.hasOne(User, {
    foreignKey: 'user_id',
});

Room.belongsTo(Reservation, {
    foreignKey: 'room_id',
});

User.belongsToMany(Reservation, {
    foreignKey: 'user_id',
    unique:false,
});

module.exports = { Reservation, Room, User };