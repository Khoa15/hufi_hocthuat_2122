require('dotenv').config()
const express = require('express')
const db = require('./config/database/connect.js')
const app = express()
const cors = require('cors')
const User = require('./routes/userRoute')
const http = require('http')
const server = http.createServer(app)
const {getDate} = require('./helper/helper')
const {Server} = require('socket.io')
const io = new Server(server,{
    cors:{
        origin: '*'
    }
})
const jwt = require('jsonwebtoken')
/*
Username: karmaisgood
Key Secret: mgH3yDgC3v41yc0U
*/
var token = jwt.sign({ permission: 1, time: Date.now() }, 'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkZpbmRNeUZhbWlseSIsImlhdCI6MTIzMzQ0fQ');
db.connect()
app.use(cors())
app.use(express.json())

app.use('/api/v1/user/', User)

app.use((err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    if(err.statusCode === 500) err.message = 'Internal server error'
    if(err.code === 11000){
        err.statusCode = 400
        for(let p in err.keyValue){
            err.message = `${p} have to be unique`
        }
    }
    if(err.errors){
        console.log(err.errors)
        err.statusCode = 400
        err.message = []
        for(let p in err.errors){
            err.message.push(err.errors[p].properties.message)
        }
    }

    if(err.kind === "ObjectId"){
        err.statusCode = 404
        err.message = `The ${req.originaUrl} is not found`
    }

    res.status(err.statusCode).json({
        success: false,
        message:err.message
    })
})

app.get('/', (req, res)=>{
    res.send("hí")
})

io.on('connection', (socket)=>{
    console.log(`A user connected ${socket.id} ${token}`)

    socket.emit("getId", socket.id)
    socket.emit("getToken", token)

    socket.on("sendDataClient", (data)=>{
        console.log(data)
        socket.emit("sendDataServer", {data})
    })

    socket.on("disconnect", ()=>{
        console.log("Client disconnected")
    })

})

server.listen(process.env.APP_PORT, ()=>{
    console.log(`Listenning on ${server.address().port}`)
})