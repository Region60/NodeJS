const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const path = require('path')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const cardRoutes = require('./routes/card')

const app = express()

const hbs = exphbs.create({                                //создаем движок
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)                          //регистрируем в экспрессе движок
app.set('view engine', 'hbs')                                // указываем какой движок будем использовать
app.set('views', 'views')                                   // папка с шаблонами

app.use(express.static(path.join(__dirname, 'public')))                                // регистрируем папку public
app.use(express.urlencoded({extended: true}))                       //добавялем middleWire для обработки запросов POST
app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)



async function start() {
    try {
        const url = 'mongodb+srv://maksim:8u2upvDe0W1dp945@cluster0-mjkka.mongodb.net/shop'
        await mongoose.connect(url, {useNewUrlParser: true})
        app.listen(PORT, () => {
            console.log(`server is running ${PORT}`)
        })
    }
    catch (e) {
        console.log(e)
    }
}
start()

const PORT = process.env.PORT || 3000



