const {Router} = require('express')
const nodemailer = require('nodemailer')
const sendgrid = require('nodemailer-sendgrid-transport')
const User = require('../models/user')
const router = Router()
const bcrypt = require('bcryptjs')
const keys = require('../keys')
const regEmail = require('../email/registrations')

const transporter = nodemailer.createTransport(sendgrid({
    auth: {api_key: keys.SENDGRID_API_KEY}
}))

router.get('/login', async (req, res) => {
    res.render('auth/login', {
        title: 'Авторизация',
        isLogin: true,
        loginError: req.flash('loginError'),
        registerError: req.flash('registerError')
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
                req.flash('loginError', 'не верный пароль')
                res.redirect('/auth/login#login')

            }
        } else {
            req.flash('loginError', 'Такого пользователя не существует')
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
            req.flash('registerError', 'Пользователь с таким email уже существует')  //первый парамаметр это ключ, второй сообщение
            res.redirect('/auth/login#register')
        } else {
            const hashPassword =await bcrypt.hash(password, 10) //что кодируем, второй параметр сложность шифрования(10норм)
            const user = new User({
                email, password: hashPassword, name, cart: {items: []}
            })
            console.log(user)
            await user.save()
            res.redirect('/auth/login#login')
            await  transporter.sendMail(regEmail(email))   //рекомендуется делать после редиректа
        }
    } catch (e) {
        console.log(e)
    }
})

module.exports = router