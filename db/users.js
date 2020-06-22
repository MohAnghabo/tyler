const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "available"
    }
});

module.exports = mongoose.model('user', usersSchema);