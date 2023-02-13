import { User } from "../models/user"
import axios from 'axios'
import { userModelToLocalhost } from "../mappers/user-localhost.mapper"
import { localhostUserToModel } from "../mappers/localhost-user.mapper"



/**
 * 
 * @param {Like<User>} userLike 
 */
export const saveUser=async(userLike)=>{

    const user= new User(userLike)

    //*Falta el mapper para el proceso inverso de los campos firstName, lastName.


    if (!user.firstName || user.firstName.trim().length===0){
        throw new Error('First Name is required')
    }
    if (!user.lastName || user.lastName.trim().length===0){
        throw new Error('Last Name is required')
    }
    if (!user.balance || user.balance.length===0){
        throw new Error('balance is required')
    }

    //*Mapeamos el usuario
    const userToSave=userModelToLocalhost(user)
    let updatedUser
    if (user.id){
        // Actualizar User
        updatedUser=await updateUser(userToSave)
        
    }else{
        // Crear User
        updatedUser=await createdUser(userToSave)
    }
    return localhostUserToModel(updatedUser);
}

/**
 * 
 * @param {Like<User>} user
 */
const createdUser=async(user)=>{

    const url=`${import.meta.env.VITE_BASE_URL}/users`
    //console.log({url})
    const {data:newUser}=await axios.post(url,user)
    console.log({newUser})
    return newUser
}

/**
 * 
 * @param {Like<User>} user
 */
const updateUser=async(user)=>{

    const url=`${import.meta.env.VITE_BASE_URL}/users/${user.id}`
    //console.log({url})
    //* El put le dice al backend que actualice todos los campos el patch solo envia ciertos campos a modificar todo depende del backend
    const {data:updatedUser}=await axios.patch(url,user)
    console.log({updatedUser})
    return updatedUser
}