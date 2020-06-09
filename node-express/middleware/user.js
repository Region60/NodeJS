const User = require('../models/user')

module.exports = async function(req, res, next) {
    if (!req.session.user) {   //проверяем если пользователь
    return next()
    }
       req.user= await User.findById(req.session.user._id)          //оператор await потому что запрос к базе
    next()
    }
