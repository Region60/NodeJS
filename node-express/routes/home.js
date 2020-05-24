const {Router} = require('express')              // либо const express.Router = require('expres')
const router = Router()

router.get('/', (req, res) => {
    res.render('index', {
        title: 'главнвя страница',
        isHome: true
    })
})

module.exports = router