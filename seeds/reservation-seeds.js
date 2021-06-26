const Reservation = require('../models/Reservation');

const reservationData = [
    {
        
        user_id: 1,
        startDate: 65415,
        endDate: 0
    },
    {
        
        user_id: 1,
        startDate: 0,
        endDate: 0
    },
    {
        
        user_id: 3,
        startDate: 0,
        endDate: 0
    },
    {
        
        user_id: 4,
        startDate: 0,
        endDate: 0
    },
    {
        
        user_id: 5,
        startDate: 0,
        endDate: 0
    },
    {
        
        user_id: 6,
        startDate: 0,
        endDate: 0
    }
];

const seedReservations = () => Reservation.bulkCreate(reservationData);

module.exports = seedReservations;