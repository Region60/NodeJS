const keys = require('../keys')

module.exports = function (email) {
    return{                 //отправить сообщение
        to:email,
        from: keys.EMAIL_FROM,    //откуда было отправленно сообщение
        subject: 'Аккаунт создан',       //название
        html: `
        <h1>Добро пожаловать в наш магазин</h1>
        <p>Вы успешно создали аккаунт c email - ${email}</p>
        <hr />
        <a href="${keys.BASE_URL}"
        `
    }
}