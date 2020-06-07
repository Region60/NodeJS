module.exports = function(req,res,next) {
    res.locals.isAuth = req.session.isAuthenticated   // добавляем поле для респонса
    next()                   //чтобы выполнение кода продолжилось
}