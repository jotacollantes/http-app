import axios from 'axios'
/**
 * @returns {Promise<any>} quote information
 */
// const fetchQuote=async()=>{
//     const resp=await fetch('https://api.breakingbadquotes.xyz/v1/quotes')
//     const data=await resp.json()
//     //*La respuesta del api de brakingbas siempre devuelve un array de un solo elemento 

//     console.log(data[0])
//     return data[0]
// }

const fetchQuoteAxios=async()=>{
    const {data}=await axios.get('https://api.breakingbadquotes.xyz/v1/quotes')
   
    
    //console.log(data[0])
    return data[0]
    
}



/**
 * 
 * @param {HTMLDivElement} element 
 */
export const BreakingBadApp=async(element)=>{

    //console.log('holamundo')
    document.querySelector('#app-title').innerHTML='Breaking Bad'
    //const titulo=document.querySelector('#app-title')
   //titulo.innerHTML='Breaking Bad'
    element.innerHTML='Loading...'

   

    const quoteLabel=document.createElement('blockquote')
    const authorLabel=document.createElement('h3')
    const nextQuoteButton=document.createElement('button')
    nextQuoteButton.innerText='Next'
    
    const renderQuote=({quote,author})=>{
        console.log({quote,author})
        quoteLabel.innerHTML=quote
        authorLabel.innerHTML=author
        element.replaceChildren(quoteLabel,authorLabel,nextQuoteButton)

    }
        

     setTimeout(async() => {
        const resp= await fetchQuoteAxios()
       renderQuote(resp)
    }, 1500);


    nextQuoteButton.addEventListener('click',async()=>{
        //element.replaceChildren('','','') 
        //*Reemplaza el contenido que actualmente tiene el element: element.replaceChildren(quoteLabel,authorLabel,nextQuoteButton)
        element.innerHTML='Loading...'
     setTimeout(async() => {
        const resp= await fetchQuoteAxios()
       renderQuote(resp)
    }, 1500);
    })

}