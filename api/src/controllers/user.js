const UserModel = require('../models/userModel')
const mongoose = require('mongoose')

const getUsers = async (req, res)=>{
    try {
        const users = await UserModel.find()

        return res.status(200).json({users})
    } catch(error) {
        return res.status(400).json({error: error.message})
    }
}

const searchUsersByUsername = async (req, res)=>{
    try {
        const { username } = req.query

        if(!username) throw new Error("Falta el dato username");
        if(typeof username !== 'string') throw new Error("El dato username debe ser un string");

        const users = await UserModel.find({username: {$regex: `^(?i)${username}(?-i)`}})

        if(!users) throw new Error("No existen usuarios con esa descripcion");
        
        return res.status(200).json({users})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const getUser = async (req, res)=>{
    try {
        const {id} = req.params

        if(!id) throw new Error("Falta el dato id");
        if(typeof id !== 'string') throw new Error("El dato id debe ser un string");

        const objectId = new mongoose.Types.ObjectId(id) 
        const user = await UserModel.findById(objectId)

        if(!user) throw new Error("Usuario no encontrado");

        return res.status(200).json({user})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const createUser = async (req, res)=>{
    try {
        const {username, email} = req.body

        if(!username || !email) throw new Error("Faltan datos importantes");
        if(typeof username !== 'string') throw new Error("El dato username debe ser un string");
        if(typeof email !== 'string') throw new Error("El dato email debe ser un string");
        
        const newUser = new UserModel({ username, email })
        await newUser.save()

        return res.status(200).json({newUser})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const modifyUser = async (req, res)=>{
    try {
        const { id } = req.params
        const { username } = req.body

        if(!id) throw new Error("Falta el dato id");
        if(!username) throw new Error("Falta el dato username");
        if(typeof id !== 'string') throw new Error("El dato id debe ser un string");
        if(typeof username !== 'string') throw new Error("El dato username debe ser un string");

        const objectId = new mongoose.Types.ObjectId(id) 
        let parameters = { username: username }

        const user = await UserModel.updateOne({_id:objectId}, {$set:parameters})

        return res.status(200).json({user})
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}

const deleteUser = async (req, res)=>{
    try {
        const {id} = req.params

        if(!id) throw new Error("Falta el dato id");
        if(typeof id !== 'string') throw new Error("El dato id debe ser un string");
        const objectId = new mongoose.Types.ObjectId(id) 

        const deleteUser = await UserModel.deleteOne({_id:objectId})

        return res.status(200).json({deleteUser})
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}

module.exports = {
    getUsers,
    searchUsersByUsername,
    getUser,
    createUser,
    modifyUser,
    deleteUser
}