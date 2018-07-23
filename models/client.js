import mongoose from 'mongoose';

module.exports = function() {
    let schema = mongoose.Schema({
        consumerKey: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    });

    return mongoose.model('Client', schema);
}