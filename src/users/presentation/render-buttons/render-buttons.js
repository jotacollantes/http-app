import {Store} from '../../store'
import './render-buttons.css'
import {RenderTable} from '../render-table/render-table'

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const RenderButtons=(element)=>{

    const nextButton=document.createElement('button')
    nextButton.innerText=' Next > '
    const currentPage=document.createElement('span')
    currentPage.id='current-page';
    currentPage.innerText=Store.getCurrentPage()
    const prevButton=document.createElement('button')
    prevButton.innerText=' < Prev '
    element.append(prevButton,currentPage,nextButton)

    nextButton.addEventListener('click',async()=>{
        await Store.loadNextPage()
         currentPage.innerText=Store.getCurrentPage()
         RenderTable(element)

    })

    prevButton.addEventListener('click',async()=>{
        await Store.loadPreviousPage()
        currentPage.innerText=Store.getCurrentPage()
        RenderTable(element)

    })

}