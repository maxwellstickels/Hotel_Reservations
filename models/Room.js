const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Room extends Model {}

Room.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        room_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        room_type: {
            type: DataTypes.STRING,
        },

        reservation_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'reservation',
                key: 'id',
            },
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'room',
    }
);

module.exports = Room;