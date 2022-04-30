const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Address = Schema({
    id: Schema.ObjectId,
    street: String,
    ward: String,
    district: String,
    city: String,
    verify: Number,
})

/*
street: duong
ward: phuong
district: quan/huyen
city: thanh pho
*/

module.exports = mongoose.model('Address', Address)