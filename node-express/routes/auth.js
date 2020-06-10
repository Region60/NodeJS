const {Router} = require('express')
const User = require('../models/user')
const router = Router()
const bcrypt = require('bcryptjs')

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
    try {
        const {email, password} = req.body

        const candidate = await User.findOne({email})  //ищем юзера по email

        if (candidate) {
/*            const areSame = password === candidate.password  //заносим переменную password со значением candidate.password*/
            const areSame = await  bcrypt.compare(password, candidate.password) //сравниваем пароли
            if (areSame) {
                req.session.user = candidate     //добавляем пользователя
                req.session.isAuthenticated = true        //.session добавилось помле установки express-session. TRUE если залогиненв
                req.session.save(err => {     // метод позволяет подождать пока выполнятся предыдущие два действия и потом выполнить
                    if (err) {                     //редирект
                        throw err
                    }
                    res.redirect('/')
                })
            }else {
                res.redirect('/auth/login#login')

            }
        } else {
            res.redirect('/auth/login#login')

        }
    } catch (e) {
        console.log(e)
    }

})

router.post('/register', async (req, res) => {
    try {
        const {email, password, repeat, name} = req.body
        const candidate = await User.findOne({email})

        if (candidate) {
            res.redirect('/auth/login#register')
        } else {
            const hashPassword =await bcrypt.hash(password, 10) //что кодируем, второй параметр сложность шифрования(10норм)
            const user = new User({
                email, password: hashPassword, name, cart: {items: []}
            })
            console.log(user)
            await user.save()
            res.redirect('/auth/login#login')
        }
    } catch (e) {
        console.log(e)
    }
})

module.exports = router