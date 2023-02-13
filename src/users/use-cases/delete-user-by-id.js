import axios from 'axios'
/**
 * 
 * @param {String|Number} id
 */
export const deleteUserById=async(id)=>{

    const url=`${import.meta.env.VITE_BASE_URL}/users/${id}`
    //console.log({url})
    //* El put le dice al backend que actualice todos los campos el patch solo envia ciertos campos a modificar todo depende del backend
    const {data:deletedUser}=await axios.delete(url)
    console.log({deletedUser})
    return true;
}