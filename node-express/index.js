const express = require('express')
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const mongoose = require('mongoose')
const path = require('path')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const cardRoutes = require('./routes/card')
const ordersRoutes = require('./routes/orders')
const User = require('./models/user')   //подключаем компонент

const app = express()

const hbs = exphbs.create({                                //создаем движок
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('hbs', hbs.engine)                          //регистрируем в экспрессе движок
app.set('view engine', 'hbs')                                // указываем какой движок будем использовать
app.set('views', 'views')                                   // папка с шаблонами

app.use(async(req,res, next) => {            //пишем собственный миддлвеер
    try {
        const user = await User.findById('5ed6957481289c1164443283') //копируем id из базы с сайта mbd
        req.user = user
        next()           //чтобы продолжилось выполнение дальше
    }catch(e){
        console.log(e)
    }
})

app.use(express.static(path.join(__dirname, 'public')))                                // регистрируем папку public
app.use(express.urlencoded({extended: true}))                       //добавялем middleWire для обработки запросов POST
app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)


async function start() {
    try {
        const url = 'mongodb+srv://maksim:8u2upvDe0W1dp945@cluster0-mjkka.mongodb.net/shop'
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology:true
        })

        const candidate = await User.findOne() //если в базе есть пользователь то что-то вернет (это промис)
        if(!candidate) {                        //если пользователя нет, создадим его
            const user = new User({
                email: '_max_kot@mail.ru',
                name: 'Maksim',
                cart: {items:[]}
            })
            await user.save()    //сохраяем пользователя
        }
        app.listen(PORT, () => {
            console.log(`server is running ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start();

const PORT = process.env.PORT || 3000



