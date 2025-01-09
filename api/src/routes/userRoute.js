const express = require('express')
const { getUser, getUsers, createUser, modifyUser, deleteUser } = require('../controllers/user')

const router = express.Router()

router.get('/', getUsers)

router.get('/:id', getUser)

router.post('/', createUser)

router.put('/:id', modifyUser)

router.delete('/:id', deleteUser)

module.exports = router