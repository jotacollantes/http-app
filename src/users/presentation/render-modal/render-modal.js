import modalHtml from './render-modal.html?raw'
import './render-modal.css'
import {User} from '../../models/user'
import { getUserById } from '../../use-cases/get-user-by-id';




let modal,form;

//*Lo inicializo como objeto para siempre poder hacer el operador spread
let loadedUser= {};


//Todo cargar usuario por id
/**
 * 
 * @param {String|Number} id 
 */
export const showModal=async(id)=>{
    modal?.classList.remove('hide-modal')
    loadedUser= {};
    if (!id) return;
    const user =await getUserById(id)
    console.log(user)
    setFormValues(user)
}

export const hideModal=(loadedUser)=>{
    //todo reset del formulario
    modal?.classList.add('hide-modal')
    //*Para resetear el formulario
    form?.reset();


}
/**
 * 
 * @param {User} user 
 */
const setFormValues=(user)=>{
     form.querySelector('[name="firstName"]').value=user.firstName
     form.querySelector('[name="lastName"]').value=user.lastName
     form.querySelector('[name="balance"]').value=user.balance
     form.querySelector('[name="isActive"]').checked=user.isActive
     //*Aqui asigno los valores que si se dan mantenimiento en el formulario o sea firstname, lastname, balance e isActive y los valores que no se da mantenimiento como gender y avatar
     loadedUser=user
}
/**
 * 
 * @param {HTMLDivElement} element,
 * @param {(userLike)=>Promise<void>} callback 
 */
export const RenderModal=(element,callback)=>{

    if (modal)return;

    modal=document.createElement('div');
    modal.innerHTML=modalHtml
    //*Creo las clases para el elemento modal
    modal.className='modal-container hide-modal'
    //*Puede hacer un querySelector a un elemento y no necesariamente al document

    //!Selectores
    form=modal.querySelector('form')


    //!Listener

    modal.addEventListener('click',(event)=> {
        //*SI le dan click al modal-coantainer no hago nada
        if(event.target.className !== 'modal-container') return;
        //*en este punto le dio click al modal container que es lo que envuelve al formulario
        hideModal()

    })

    form.addEventListener('submit',async(event)=>{
        event.preventDefault()
        //alert('Formulario enviado')


         //*Aqui hago la propagacion de loadedUser que contiene todos los campos que se reciben en el Backend. Si no enviamos todos los campos, el registro se va a mantener  con los campos first_name,last_name,balance e isActive. Si no se envia gender o avatar esos campos se borraran del registro. 
        const userLike={...loadedUser}
        //* le envio la referencia al formulario form
        const formData=new FormData(form)
        
       
        for (const elemento of formData) {

             //* formData tiene esta estructura iterable: [["firstname", "Juan Jose "], ["lastname", "Collantes"], ["balance", 1233]]
            //console.log(elemento)
            const [key,value]=elemento
            
            if (key==='balance'){
                //*Propiedad computada
                userLike[key]=Number(value)
                continue;
            }
            if (key==='isActive' ){
                
                userLike[key]= (value==='on') ? true : false
                
                 continue;
            }
            userLike[key]=value.trim()
        }
        //console.log({userLike})

        //TODO guardar usuario
        await callback(userLike)

        hideModal()

    })
    element.append(modal)

}