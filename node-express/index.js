const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const hbs = exphbs.create({                                //создаем движок
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs',hbs.engine)                          //регистрируем в экспрессе движок
app.set('view engine','hbs')                                // указываем какой движок будем использовать
app.set('views','views')                                   // папка с шаблонами

app.get('/', (req,res)=>{
res.render('index')
})
app.get('/about', (req,res)=>{
    res.render('about')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`server is running ${PORT}`)
})