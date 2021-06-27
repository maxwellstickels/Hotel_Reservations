const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Reservation extends Model {}

Reservation.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        startDate: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        // room_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'room',
        //         key: 'id',
        //     },
        // }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'reservation',
    }
);

module.exports = Reservation;