import mongoose from 'mongoose';

module.exports = function() {
    var schema = mongoose.Schema({
        client: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: 'Client'
        },
        consumerKey: {
            type: String,
            required: true
        },
        initialDate: {
            type: Date,
            required: true
        },
        finalDate: {
            type: Date,
            required: false
        }
    })

    return mongoose.model('MonitorCheckoutFlex', schema);
}