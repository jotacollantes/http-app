import './render-add-button.css'

/**
 * 
 * @param {HTMLDivElement} element 
 * @param {()=>void} callback 
 */
export const RenderAddButton=(element,callback)=>{

const fabButton=document.createElement('button')
fabButton.innerText='+'
//*Añado una clase
fabButton.classList.add('fab-button')
element.append(fabButton)

//Todo
fabButton.addEventListener('click',()=>{
    //throw new Error ('fabButton not implemented')
    if(!callback) return;
    callback()
})

}