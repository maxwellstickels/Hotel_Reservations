const Reservation = require('../models/Reservation');

const reservationData = [
    {
        room: 'something',
        reservation: 'something about reservation',
        user_id: 1,
        startDate: 0,
        endDate: 0
    },
    {
        room: 'something2',
        reservation: 'something about reservation',
        user_id: 2,
        startDate: 0,
        endDate: 0
    },
    {
        room: 'something3',
        reservation: 'something about reservation',
        user_id: 3,
        startDate: 0,
        endDate: 0
    },
    {
        room: 'something4',
        reservation: 'something about reservation',
        user_id: 4,
        startDate: 0,
        endDate: 0
    },
    {
        room: 'something5',
        reservation: 'something about reservation',
        user_id: 5,
        startDate: 0,
        endDate: 0
    },
    {
        room: 'something6',
        reservation: 'something about reservation',
        user_id: 6,
        startDate: 0,
        endDate: 0
    }
];

const seedReservations = () => Reservation.bulkCreate(reservationData);

module.exports = seedReservations;