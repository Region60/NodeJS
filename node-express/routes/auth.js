const {Router} = require('express')
const User = require('../models/user')
const router = Router()

router.get('/login', async (req, res) => {
    res.render('auth/login', {
        title: 'Авторизация',
        isLogin: true
    })
})

router.get('/logout', async (req, res) => {
    req.session.destroy(() => { //колбек будет вызван тогда когда будут уничтожены все данные сессии
        res.redirect('/auth/login#login')
    })
})

router.post('/login', async (req, res) => {
    const user = await User.findById('5edabb16d65e480840856f1c')
    req.session.user = user     //добавляем пользователя
    req.session.isAuthenticated = true        //.session добавилось помле установки express-session. TRUE если залогиненв
    req.session.save(err =>{     // метод позволяет подождать пока выполнятся предыдущие два действия и потом выполнить
        if(err){                     //редирект
            throw err
        }
        res.redirect('/')
    })
})

router.post('/register', async (req, res) => {
    try {
        const {email, password, repeat, name} = req.body
        const candidate = await User.findOne ({email})

        if (candidate) {
            res.redirect('/auth/login#register')
        } else {
            const user = new User({
                email,password,name, cart: {items:[]}
            })
            console.log(user)
            await user.save()
            res.redirect('/auth/login#login')
        }
    } catch (e) {
        console.log (e)
    }
})

module.exports = router