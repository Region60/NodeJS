const {Schema, model} = require('mongoose')

const userSchema =new Schema ({
    email: {
        type:String,
        required: true
    },
    name: {
        type: String,
    required: true
    },
    cart: {
        items: [
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1
                },
                courseId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Course',                //связываем с моделью курсов
                    required: true
                }
            }
        ]
    }

})

model.exports = ('User', userSchema )