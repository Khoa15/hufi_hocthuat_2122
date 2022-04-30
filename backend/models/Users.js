const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const Schema = mongoose.Schema

const User = new Schema({
    name:{
        type: String,
        maxlength: 40,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        maxlength: 40,
        required: true,
        unique: true,
        trim: true,
    },
    password:{
        type: String,
        maxlength: 40,
        required: true,
    },
    salt:{
        type: String,
        maxlength: 10,
    },
    passport: {
        type: String,
        length: 10,
        required: false,
    },
    main_number_phone: {
        type: String,
        length: 10,
        required: true,
        trim: true,
        unique: true
    },
    sub_number_phone:[
        {
            type: String,
            length: 10,
            trim: true,
        }
    ],
    address:{
        type: Schema.Types.ObjectId,
        ref: 'Address'
    },
    token: {
        type: String,
    }
})

User.pre('save', async function(next){
    let user = this
    const salt = bcryptjs.genSaltSync(10)
    user.salt = salt
    user.password = bcryptjs.hashSync(user.password, salt)
    user.token = jwt.sign({verify: [0, 0], permission: 2, salt: salt}, process.env.APP_SECRET)
})

module.exports = mongoose.model('User', User)