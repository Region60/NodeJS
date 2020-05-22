const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
        if (req.method === 'GET') {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})  //возвращает код 200 и устанавливает контент тайп "html"
            if (req.url ==='/') {      //если reqest url равяется '/' то воспользуйся модулем фс чтение файла и указать путь через модуль path
                fs.readFile(
                    path.join(__dirname, 'views', 'index.html'),
                    'utf-8',   // указываем кодировку чтобы получить определенный контент и делаем проверку на ошибки
                    (err, content) => {
                        if(err){
                             throw err       //если ошибка выполняем throw
                        }
                        res.end(content)
                    }
                )
            }else if (req.url === '/About') {     //если равняется '/about'
                fs.readFile(
                    path.join(__dirname, 'views', 'about.html'),
                    'utf-8',
                    (err, content) => {
                        if(err){
                            throw err
                        }
                        res.end(content)
                    }
                )

            }else  if (req.url === "/api/users"){
                res.writeHead(200, {
                    'Content-Type': 'text/json'
                })

                const users =[
                    {name: 'Maksim', age: 33},
                    {name: 'Alina', age: 28}
                ]
                res.end(JSON.stringify(users))  // преобразование объекта в JSON
            }
        } else if (req.method === 'POST') {
            const body = []
            res.writeHead(200, {
                'Content-Type':'text/html; charset=utf-8'
            })
            req.on('data', data => {
                body.push(Buffer.from(data))
            })

            req.on('end', () => {
                const message = body.toString().split('=')[1]
                res.end(`<h1>Ваше сообщение ${message}</h1>`)
            })

        }
    }
)
server.listen(3000, () => {
    console.log('Server is running...')
})