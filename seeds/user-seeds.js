const User = require('../models/User');
const bcrypt = require('bcrypt');
async function seedWithEncryption() {
    const freePass = await bcrypt.hash("password1234", 10);

    const userData = [
        {
        username: "Nikola",
        email: "nikola1@gmail.com",
        password: freePass,
        manager: 1
        },
        {
        username: "John",
        email: "john1@gmail.com",
        password: freePass,
        manager: 0   
        },
        {
        username: "Stephen",
        email: "stephen1@gmail.com",
        password: freePass,
        manager: 0
        },
        {
        username: "Maria",
        email: "maria1@gmail.com",
        password: freePass,
        manager: 0
        },
        {
        username: "Anna",
        email: "anna1@gmail.com",
        password: freePass,
        manager: 0
        },
        {
        username: "Cora",
        email: "cora1@gmail.com",
        password: freePass,
        manager: 0  
        }
    ];
    return userData;
};

const seedUsers = async () => {
    const userData = await seedWithEncryption();
    User.bulkCreate(userData);
}

module.exports = seedUsers;