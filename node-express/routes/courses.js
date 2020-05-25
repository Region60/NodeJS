const {Router} = require('express')              // либо const express.Router = require('expres')
const Course = require('../models/course')
const router = Router()

router.get('/', async (req,res)=>{
    const courses = await Course.getAll()
    res.render('courses', {
        title: 'Курсы',
        isCourses: true,
        courses
    })
})

module.exports = router