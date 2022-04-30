const express = require('express')
const Router = express.Router()
const {getUser, Register, Login, updateUser, deleteUser} = require('../controllers/userControllers')
const {verifyAPI} = require('../middlewares/verifyAPI')

Router.route('/:id').get(verifyAPI, getUser).put(verifyAPI, updateUser).delete(verifyAPI, deleteUser)
Router.route('/auth').post(verifyAPI, Register).put(verifyAPI, Login)


module.exports = Router