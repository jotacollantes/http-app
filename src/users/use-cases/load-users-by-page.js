import axios from 'axios'
import {localhostUserToModel} from '../mappers/localhost-user.mapper'

/**
 * 
 * @param {Number} page
 * @returns {Promise<User[]>}
 */
export const loadUsersByPage=async(page=1)=>{
    //http://localhost:3001/users?_page=2
    //* si no existe una pagina determinada el api devuelve un arreglo vacio
    const url=`${import.meta.env.VITE_BASE_URL}/users?_page=${page}`
    //console.log({url})
    const {data:users}=await axios.get(url)
    //console.log(users)
    //*
    const usuarios=users.map((user)=>{
        return localhostUserToModel(user)

    })
    //console.log(usuarios)
    return usuarios

}