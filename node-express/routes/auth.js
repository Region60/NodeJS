const {Router} = require('express')
const router = Router()

router.get('/login',async (req, res) => {
    res.render('auth/login', {
        title: 'Авторизация',
        isLogin: true
    })
})

router.get('/logout',async (req, res) => {
    req.session.destroy(()=> { //колбек будет вызван тогда когда будут уничтожены все данные сессии
        res.redirect('/auth/login#login')
    })
})

router.post('/login', async (req,res) => {
    req.session.isAuthenticated = true        //.session добавилось помле установки express-session. TRUE если залогиненв
    res.redirect('/')
})

module.exports = router