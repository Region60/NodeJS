const {Router} = require('express')              // либо const express.Router = require('expres')
const router = Router()
const Course = require('../models/course')

function mapCartItems(cart) {
    return cart.items.map(c=> ({
        ...c.courseId._doc, count: c.count
    }))
}

router.post('/add', async (req, res) => {
    const course = await Course.findById(req.body.id)
    await req.user.addToCart(course)
    res.redirect('/card')
})

router.get('/', async (req, res) => {
const user =await req.user              // берем юзера, потому что корзина является частью юзера ( у каждого юзера она своя)
    .populate('cart.items.courseId')
    .execPopulate()
    const courses = mapCartItems(user.cart)
console.log (courses)
    res.render('card', {
        title: 'Корзина',
        isCard: true,
        courses: courses,
        price: 0

    })
})


module.exports = router