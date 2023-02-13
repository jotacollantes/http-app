import './render-table.css'
import { Store } from '../../store'
import { showModal } from '../render-modal/render-modal';
import { deleteUserById } from '../../use-cases/delete-user-by-id';

let table;

const createTable = (users) => {
    const table = document.createElement('table');
    const tableHeaders = document.createElement('thead');
    tableHeaders.innerHTML = `
    <tr>
        <th>#ID</th>
        <th>Balance</th>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Active</th>
        <th>Action</th>
    </tr>
    `
    //*EL tbody esta vacio
    const tableBody = document.createElement('tbody')

    table.append(tableHeaders, tableBody)
    return table;

}

/**
 * 
 * @param {MouseEvent} event 
 */
const tableSelectOrDeleteListener=async(event)=>{
    
    const element=event.target.className;

    const id = event.target.getAttribute('data-id')
    if (element ==='select-user'){
        
        //console.log(id)
        showModal(id)
    } else if (element ==='delete-user') {
        
        try {
            await deleteUserById(id)
            //*Para recargar la misma pagina
            await Store.reloadPage()
            //* para mostrar el numero de la pagina actual entre los botones next y prev
            document.querySelector('#current-page').innerText = Store.getCurrentPage();
        RenderTable()
            
            
        } catch (error) {
            console.log(error)
        }
    }
    
   
}




/**
 * 
 * @param {HTMLDivElement} element 
 */
export const RenderTable = (element) => {

    //* Como ya tenemos los usuarios en el state podemos accesar a ellos con getUsers()
    const users = Store.getUsers()
    //* Como es la primera ves table es nulo y se crea la tabla sin filas o vacia
    if (!table) {
        table = createTable(users)
        element.append(table)
        //TODO Listeners
        table.addEventListener('click',(event)=>tableSelectOrDeleteListener(event))
    }

    //*Genero las filas con los dattos del arreglo User[] 
    let rows = '';
    for (const user of users) {
        rows += `<tr>
        <td>${user.id}</td>
        <td>${user.balance}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.isActive}</td>
        <td>
        <a href="#/" class="select-user" data-id="${user.id}">Select</a>
        |
        <a href="#/" class="delete-user" data-id="${user.id}">Delete</a>

        </td>
        </tr>`
    }
    //Tambien puedo aplicar el querySelector a un elemento html y no solamente al document.
    table.querySelector('tbody').innerHTML = rows
}

