const {Router} = require('express')              // либо const express.Router = require('expres')
const router = Router()
const Course = require('../models/course')

router.post('/add', async (req, res) => {
    const course = await Course.findById(req.body.id)
    await req.user.addToCart(course)
    res.redirect('/card')
})

router.get('/', async (req, res) => {
    /*const card = await Card.fetch()
    res.render('card', {
        title: 'Корзина',
        isCard: true,
        courses: card.courses,
        price: card.price

    })*/
req.json({test:true})
})


module.exports = router