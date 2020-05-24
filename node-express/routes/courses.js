const {Router} = require('express')              // либо const express.Router = require('expres')
const router = Router()

router.get('/', (req,res)=>{
    res.render('courses', {
        title: 'Курсы',
        isCourses: true
    })
})

module.exports = router