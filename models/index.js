const User = require("./User");
const Reservation = require("./Reservation");
const Comment = require("./Comment");
const Room = require("./Room");
User.hasMany(Reservation, {
  foreignKey: "user_id",
});
User.hasMany(Comment, {
  foreignKey: "user_id",
});
Reservation.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "cascade",
});
Reservation.hasMany(Comment, {
  foreignKey: "reservation_id",
});
Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "cascade",
});
Comment.belongsTo(Reservation, {
  foreignKey: "reservation_id",
  onDelete: "cascade",
});
Room.belongsTo(Reservation, {
  foreignKey: "reservation_id",
  onDelete: "cascade",
});
Reservation.hasMany(Room, {
  foreignKey: "reservation_id",
});
module.exports = { User, Reservation, Comment, Room };