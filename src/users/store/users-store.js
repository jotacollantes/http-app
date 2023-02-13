import { User } from '../models/user';
import {loadUsersByPage} from '../use-cases/load-users-by-page'

const state={
    currentPage:0,
    users:[]
}

export const loadNextPage=async()=>{
    //throw new Error('not implemented')
    //* Cuando se carga la aplicacion se carga la pagina 0+1
   const users= await loadUsersByPage(state.currentPage + 1)
   //*Valido si existe usuarios
   if (users.length===0) return;
   state.currentPage+=1
   state.users=users

}


export const loadPreviousPage=async()=>{
     //throw new Error('not implemented')

     if (state.currentPage -1 === 0) return;

    const users =await loadUsersByPage(state.currentPage -1)
    if (users.length===0) return;
    state.currentPage-=1
    state.users=users
}

/**
 * 
 * @param {User} userUpdated 
 */
export const onUserChanged=(userUpdated)=>{
    //throw new Error('not implemented')

    let wasFound=false
    //*Actualizo el state.user con la informacion actualizada del usuario
    state.users=state.users.map((user)=>{
        if (user.id===userUpdated.id)
        {  
            wasFound=true
            return userUpdated
        }
        return user
    })

    //*Validacion en caso de que hayan menos de 10 usuarios en pantalla 

    if (state.users.length < 10 && !wasFound){
        state.users.push(userUpdated)
    }
}

export const reloadPage=async()=>{
    const users =await loadUsersByPage(state.currentPage)
    if (users.length===0){
        await loadPreviousPage()
        return;
    } 
    state.users=users
}

export const getUsers=()=>{
    //* Como los objetos son pasados por referencia , cuando se retorna un objeto se debe romper la referencia con el operador...
    return [...state.users] 
}

export const getCurrentPage=()=>{
     //* Los datos primitivos como el currentPage=0 se envian por valor
    return state.currentPage
}