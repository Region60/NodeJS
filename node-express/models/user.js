const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    email: {
        type: String,
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

userSchema.methods.addToCart = function (course) {     //Создаем функцию через function чтобы работало this
    const items = [...this.cart.items]

    const idx = items.findIndex(c => {
        return c.courseId.toString() === course._id.toString() //проверяем есть ли курс  (toString обязательно)
    })
    if (idx >= 0) {       //  в корзине есть уже такой курс
        items[idx].count = items[idx].count + 1      // если есть курс то увеличиваем количество на 1
    } else {
        items.push({           // добавляем курс с полями courseId, count
            courseId: course._id,
            count: 1
        })
    }
    this.cart = {items}          //this.cart = {items: items}
    return this.save()
    /*const newCart = {items: cloneItems}
    this.cart = newCart*/
}

userSchema.methods.removeFromCart = function (id) {
    let items = [...this.cart.items]                                                       //получаем массив элементов корзины
    const idx = items.findIndex(c => c.courseId.toString() === id.toString())      //получаем индекс элемента

    if (items[idx].count === 1) {                                                           //если кол-во элемента =1
        items = items.filter(c => c.courseId.toString() !== id.toString())              //переопределяем массив исключая из него элемент
    } else {
        items[idx].count--                                                             //уменьшаем кол-во на 1
    }

    this.cart = {items}                                                                   //переопределяем массив
    return this.save()

}

module.exports = model('User', userSchema)