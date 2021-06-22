const Comment = require('../models/Comment');

const commentData = [
    {
        comment_text: "Hotel reservation comment",
        post_id: 3,
        user_id: 1,
        rating: 1
    },
    {
        comment_text: "Room reservations",
        post_id: 1,
        user_id: 4,
        rating: 1
    },
    {
        comment_text: "Not sure",
        post_id: 4,
        user_id: 2,
        rating: 1
    },
    {
        comment_text: "Room and something",
        post_id: 4,
        user_id: 3,
        rating: 1
    },
    {
        comment_text: "Something about room?",
        post_id: 5,
        user_id: 5,
        rating: 1
    },
    {
        comment_text: "Somthing",
        post_id: 5,
        user_id: 4,
        rating: 1
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;