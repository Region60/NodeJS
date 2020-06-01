const {Router} = require('express')              // либо const express.Router = require('expres')
const Course = require('../models/course')
const router = Router()

router.get('/', async (req,res)=>{
    const courses = await Course.find()              //меняем с .getAll на .find
    res.render('courses', {
        title: 'Курсы',
        isCourses: true,
        courses
    })
})

router.get('/:id/edite', async (req,res)=>{
    if (!req.query.allow) {
        alert (req.query.allow)
        return res.redirect('/')  //ставимм ретерн ,чтобы функция не выполнялась дальше
    }
    const course = await Course.findById(req.params.id)       //меняем с getById на findById
    res.render('course-edite', {
        title: `Редактировать ${course.title}`,
        course
    })
})

router.post('/edite', async (req, res)=>{
    const {id} = req.body
    delete req.body.id          //удаляем id
    await  Course.findByIdAndUpdate(id, req.body)
    res.redirect('/courses')
})



router.get('/:id', async (req,res)=>{                       //для того чтобы обработать динамику путь указываем
    const course = await Course.findById(req.params.id)      //через : // req.params.id адрес хранения id
    res.render('course', {
        layout: 'empty',                                // использовать лейаут empty
        title: `Курс ${course.title}`,
        isCourses: true,
        course
    })
})

module.exports = router