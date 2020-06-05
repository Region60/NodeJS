const {Schema, model} = require('mongoose')

const orderSchema = new Schema({
    courses: [
        {
            course: {
                type: Object,
                required: true
            },
            count: {
                type: Number,
                required: true
            }
        }
    ],
    user: {
        name:String,
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    date: Date,
    default: Date
})


module.exports = model('Order', orderSchema)