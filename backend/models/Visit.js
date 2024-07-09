const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitSchema = new Schema({
    staff_id: {
        type: Schema.Types.ObjectId,
        ref: 'Staff',
        required: true
    },
    pet_id: {
        type: Schema.Types.ObjectId,
        ref: 'Pet',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["Regular", "Check-up"],
        required: true
    }
});

module.exports = mongoose.model('Visit', visitSchema);
