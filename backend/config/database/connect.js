const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect("mongodb://localhost:27017/findMyFamily_dev",{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connect successfully!')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {connect}