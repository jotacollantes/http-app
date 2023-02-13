import {Store} from './store'
import { RenderTable } from './presentation/render-table/render-table'
import { RenderButtons } from './presentation/render-buttons/render-buttons'
import { RenderAddButton } from './presentation/render-add-button/render-add-button'
import { RenderModal,showModal } from './presentation/render-modal/render-modal'
import { saveUser } from './use-cases/save-user'


/**
 * 
 * @param {HTMLDivElement} element 
 */
export const UsersApp=async(element)=>
{

    element.innerHTML='Loading...'
    //Cargamos el state con los usuarios de la pagina 1
    await Store.loadNextPage()
    element.innerHTML=''
    //console.log(Store.getUsers())
    RenderTable(element)
    RenderButtons(element)
    RenderAddButton(element,()=>{
       //console.log('Invocado desde el padre')
       showModal()
       
    })
    RenderModal(element,async(userLike)=>{
       const user= await saveUser(userLike)
       Store.onUserChanged(user)
       RenderTable(element)
 

    })
   
}