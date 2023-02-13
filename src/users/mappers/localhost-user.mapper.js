import { User } from "../models/user"


/**
 * 
 * @param {Like<User>} localhostUser 
 * @returns {User}
 */


//*Esta funcion nos sirve para definir para crear instancias del Objeto User que tendra el nombre de los campos que se usaran en el sistema. Si los campos cmabian en el Backend solo es necesario cambiar el nombre del campo en un solo lugar que es este archivo
export const localhostUserToModel=(localhostUser)=>{

    const {id,isActive,balance,avatar,first_name,last_name,gender}=localhostUser

    return new User(
        {
            id,
            isActive,
            balance,
            avatar,
            //* first_name: asi viene del backend
            firstName:first_name,
            //* last_name: asi viene del backend
            lastName:last_name,
            gender
        }
        
        )

}