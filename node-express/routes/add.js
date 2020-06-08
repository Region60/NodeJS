const {Router} = require('express')              // либо const express.Router = require('expres')
const Course = require('../models/course')
const auth = require('../middleware/auth')
const router = Router()

router.get('/', auth, (req, res) => {
    res.render('add', {
        title: 'Добавить курс',
        isAdd: true
    })
})

router.post('/', auth, async (req, res) => {
    const course = new Course({
        title: req.body.title,
        price:req.body.price,
        img:req.body.img,
        userId: req.user        //req.user._id тоже будет правильной записью. Но монгус и так поймет что пер
    })                            //едается id, потому что используется метод .ObjectId
    try {
        await course.save()
        res.redirect('courses')
    } catch (e) {
        console.log(e)
    }
})

module.exports = router