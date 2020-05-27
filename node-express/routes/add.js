const {Router} = require('express')              // либо const express.Router = require('expres')
const router = Router()
const Course = require('../models/course')

router.get('/', (req, res) => {
    res.render('add', {
        title: 'Добавить курс',
        isAdd: true
    })
})

router.post('/', async (req, res) => {
    const course = new Course({
        title: req.body.title,                  //указываем те поля, которые мы написади в Схеме
        price: req.body.price,
        img: req.body.img
    })
    try {
        await course.save()
        res.redirect('courses')
    } catch (e) {
        console.log(e)
    }
})

module.exports = router