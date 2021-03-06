const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session) //с боль-й буквы, название класса, после session
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const mongoose = require('mongoose')
const helmet = require('helmet')
const compression = require('compression')
const csrf = require('csurf')
const flash = require('connect-flash')
const path = require('path')
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const cardRoutes = require('./routes/card')
const ordersRoutes = require('./routes/orders')
const authRoutes = require('./routes/auth')
const User = require('./models/user')   //подключаем компонент
const varMiddleware = require('./middleware/variables')
const userMiddleware = require('./middleware/user')
const keys = require('./keys/')



const app = express()

const hbs = exphbs.create({                                //создаем движок
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

const store = new MongoStore({
    collection:'session',
    uri: keys.MONGODB_URI,


})

app.engine('hbs', hbs.engine)                          //регистрируем в экспрессе движок
app.set('view engine', 'hbs')                                // указываем какой движок будем использовать
app.set('views', 'views')                                   // папка с шаблонами
/*
app.use(async(req,res, next) => {            //пишем собственный миддлвеер
    try {
        const user = await User.findById('5edabb16d65e480840856f1c') //копируем id из базы с сайта mbd
        req.user = user
        next()           //чтобы продолжилось выполнение дальше
    }catch(e){
        console.log(e)
    }
})
*/
app.use(express.static(path.join(__dirname, 'public')))                                // регистрируем папку public
app.use(express.urlencoded({extended: true}))                       //добавялем middleWire для обработки запросов POST
app.use(session({
    secret: keys.SESION_SECRET,
    resave: false,
    store,
    saveUninitialized:false
}))
app.use(csrf())
app.use(flash())
app.use(helmet())
app.use(compression())
app.use(varMiddleware)
app.use(userMiddleware)
app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)


async function start() {
    try {
        await mongoose.connect(keys.MONGODB_URI, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology:true
        })

        /*const candidate = await User.findOne() //если в базе есть пользователь то что-то вернет (это промис)
        if(!candidate) {                        //если пользователя нет, создадим его
            const user = new User({
                email: '_max_kot@mail.ru',
                name: 'Maksim',
                cart: {items:[]}
            })
            await user.save()    //сохраяем пользователя
        }*/
        app.listen(PORT, () => {
            console.log(`server is running ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start();

const PORT = process.env.PORT || 3000



