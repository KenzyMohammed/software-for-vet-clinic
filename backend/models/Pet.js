const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema({
    owner_id: {
        type: Schema.Types.ObjectId,
        ref: 'Owner',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    body_temperature: {
        type: Number,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'archived'],
        required: true
    }
});

module.exports = mongoose.model('Pet', petSchema);
