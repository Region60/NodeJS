module.exports = function(req,res,next) {
    res.locals.isAuth = req.session.isAuthenticated   // добавляем поле для респонса
    res.locals.csrf = req.csrfToken()
    next()                   //чтобы выполнение кода продолжилось
}