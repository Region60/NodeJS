const {Router} = require('express')
const router = Router()
const Order = require('../models/order')

router.get('/', async (req, res) => {
    res.render('orders', {
        isOrder: true,
        title: 'Заказы'
    })
})

router.post('/', async (req, res) => {
    try {
        const user =await req.user
            .populate('cart.items.coursedId')        //чтобы id курсов превратить в объекты
            .execPopulate()
        const courses = user.cart.items.map(i => ({
            count: i.count,
            course: {...i.courseId._doc}

        }))

        const order = new Order({
            user: {
                name: req.user.name,
                userId: req.user
            },
            courses: courses
        })

        await order.save()
        await req.user.clearCart()

        res.redirect('/orders')
    } catch (e) {
        console.log(e)
    }

})

module.exports = router