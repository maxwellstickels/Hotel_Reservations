const User = require('../models/User');

const userData = [
    {
    username: "Nikola",
    email: "nikola1@gmail.com",
    password: "password1234",
    manager: 1
    },
    {
    username: "John",
    email: "john1@gmail.com",
    password: "password1234",
    manager: 0   
    },
    {
    username: "Stephen",
    email: "stephen1@gmail.com",
    password: "password1234",
    manager: 0
    },
    {
    username: "Maria",
    email: "maria1@gmail.com",
    password: "password1234",
    manager: 0
    },
    {
    username: "Anna",
    email: "anna1@gmail.com",
    password: "password1234",
    manager: 0
    },
    {
    username: "Cora",
    email: "cora1@gmail.com",
    password: "password1234",
    manager: 0  
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;