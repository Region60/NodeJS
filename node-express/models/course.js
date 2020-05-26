const {v4: uuidv4} = require('uuid');            // версия v4
const fs = require('fs')
const path = require('path')


class Course {
    constructor(title, price, img) {
        this.title = title
        this.price = price
        this.img = img
        this.id = uuidv4()                    // задает уникальный id
    }

    toJSON() {
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        }
    }

   static async update(course) {
       const courses = await Course.getAll()

       const idx = courses.findIndex(c=> c.id === course.id)
       courses[idx] = course

       return new Promise((resolve, reject) => {
           fs.writeFile(
               path.join(__dirname, '..', 'data', 'courses.json'),            // записывает изменненый
               JSON.stringify(courses),                                          // объект в формате json
               (err) => {
                   if (err) {
                       reject(err)
                   } else {
                       resolve()
                   }
               }
           )
       })

   }

    async save() {
        const courses = await Course.getAll()                           // присваивает массив
        courses.push(this.toJSON())                                      // добавляет в конец объект из формы

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),            // записывает изменненый
                JSON.stringify(courses),                                          // объект в формате json
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })

    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(                                                          // читает файл courses.json
                path.join(__dirname, '..', 'data', 'courses.json'),              //расположение файла
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(content))                        //берет содержимое файла в массив
                    }
                }
            )
        })

    }

    static async getById(id) {
 const courses = await Course.getAll()
        return courses.find(c=> c.id === id)
    }
}

module.exports = Course