const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['admin', 'assistant'],
        required: true
    }
});

module.exports = mongoose.model('Staff', staffSchema);

