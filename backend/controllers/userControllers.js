const User = require('../models/Users')
const jwt = require('jsonwebtoken')
const unVerifyAPI = () => {
    const error = new Error(`You don't have permission.`)
    error.statusCode = 401
    return error
}

exports.getUser = async(req, res, next)=>{
    try {
        const verifyAPI = req.user
        if(verifyAPI.permission !== 3){
            return next(unVerifyAPI())
        }
        const {id} = req.params
        const data = await User.findOne({id: id})
        res.json({
            success: true,
            message:{
                user: data
            }
        })
    } catch (error) {
        next(error)
    }
}

exports.Register = async(req, res, next)=>{
    try {
        const verifyAPI = req.user
        console.log(req.body, '123')
        if(verifyAPI.permission !== 1){
            return next(unVerifyAPI())
        }
        const userData = req.body
        const data = await User.create(userData)
        const token = jwt.verify(data.token, process.env.APP_SECRET)
        const accessToken = jwt.sign({userId: data._id, permission: token.permission, token: data.token}, process.env.APP_SECRET)

        res.json({
            success: true,
            message:{
                accessToken: accessToken
            }
        })
    } catch (error) {
        next(error)
    }
}

exports.Login = async(req, res, next)=>{
    try {
        const verifyAPI = req.user
        if(verifyAPI.permission !== 1){
            return next(unVerifyAPI())
        }
        const user = req.body
        const data = await User.findOne(user).select('_id token name email main_number_phone')
        const token = jwt.verify(data.token, proccess.env.APP_SECRET)
        const accessToken = jwt.sign({userId: data._id, permission: token.permission, token: data.token}, process.env.APP_SECRET)

        res.json({
            success: true,
            message:{
                user: user.name,
                accessToken: accessToken
            }
        })
    } catch (error) {
        next(error)
    }
}

exports.updateUser = async(req, res, next)=>{
    try {
        const verifyAPI = req.user
        const data = req.body
        const id = req.params
        if(verifyAPI.permission !== 3){
            const err = new Error('Unauthorization')
            err.statusCode = 401
            return next(err)
        }

        const user = User.updateOne(id, data).select('name email main_number_phone')

        res.json({
            success: true,
            message:[
                {user: user}
            ]
        })

    } catch (error) {
        next(error)
    }
}

exports.deleteUser = async(req, res, next)=>{
    try {
        const verifyAPI = req.user
        if(verifyAPI !== 3){
            return next(unVerifyAPI())
        }
        const id = req.params
        const user = User.deleteOne(id)
        res.json({
            success: true,
            message: [
                user
            ]
        })
    } catch (error) {
        next(error)
    }
}
