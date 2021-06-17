const User = require('./User');
const Reservation = require('./Reservation');
const Comment = require('./Comment');
const Rating = require('./Rating');

User.hasMany(Reservation, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'reservation_id',
    onDelete: 'cascade',
    hooks: true
});

User.hasMany(Rating, {
    foreignKey: 'reservation_id',
    onDelete: 'cascade',
    hooks: true
});

Reservation.belongsTo(User, {
    foreignKey: 'user_id' 
});

Reservation.hasMany(Comment, {
    foreignKey: 'reservation_id',
    onDelete: 'cascade',
    hooks:true
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    hooks:true 
});

Comment.belongsTo(Reservation, {
    foreignKey: 'reservation_id',
    onDelete: 'cascade',
    hooks:true 
});

Rating.belongsTo(User, {
    foreignKey: 'user_id' 
});

Rating.belongsTo(Reservation, {
    foreignKey: 'reservation_id',
    onDelete: 'cascade',
    hooks:true
});



module.export = { User, Reservation, Comment, Rating };