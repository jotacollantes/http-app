import axios from 'axios'
import {localhostUserToModel} from '../mappers/localhost-user.mapper'

/**
 * 
 * @param {Number|String} id
 * @returns {Promise<User>}
 */
export const getUserById=async(id)=>{
    
    //* si no existe una pagina determinada el api devuelve un arreglo vacio
    const url=`${import.meta.env.VITE_BASE_URL}/users/${id}`
    //console.log({url})
    const {data:user}=await axios.get(url)
    //console.log(users)
    //*Aqui no se hace map porque solo se procesa un usuario
    const usuario=localhostUserToModel(user)
    console.log({usuario})
    return usuario

}