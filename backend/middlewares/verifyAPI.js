const jwt = require('jsonwebtoken')

const Unauthorization = () =>{
    const err = new Error('Unauthorization')
    err.statusCode = 401
    return err
}

exports.verifyAPI = (req, res, next) =>{
    const Authorization = req.header('authorization')
    if(!Authorization){
        return next(Unauthorization())
    }
    
    const token = Authorization.replace('Bearer ', '')
    try {
        const user = jwt.verify(token, process.env.APP_SECRET)
        if(user.permission === 0){
            const err = new Error("You don't have permission.")
            err.statusCode = 401
            return next(err)
        }
        req.user = user
        next()
    } catch (error) {
        if(user === null){
            return next(Unauthorization())
        }
    }
}