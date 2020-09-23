// Code here
document.addEventListener('DOMContentLoaded', () => {
    getFirstBeer()
    // formHandler()
})
// 1. get the first beer 
// render existing info on the page
const getFirstBeer = () => {
    fetch("http://localhost:3000/beers/1")
    .then(response => response.json())
    .then(beer => render(beer))
}

const render = beer =>{
    console.log(beer)
    let name = document.getElementsByTagName('h2')
    name[0].innerText = beer.name

    let img = document.getElementsByTagName('img')
    img[0].src = beer.image_url
    
    formHandler(beer)
    // const descriptionForm = document.querySelector(".description")
    // descriptionForm[0].innerText = beer.description
    

    const reviews = beer.reviews
    const revUl = document.querySelector(".reviews") 
    reviews.forEach(review => {
        const revLi = document.createElement('li')
        revLi.innerText = review
        revUl.append(revLi)
    });
        
    
}

// 2. change beer description
// update db with new description
// see the updated description after reloading bthe page
   const formHandler = beer => {
       const form = document.querySelector(".description")
       
       form[0].innerText = beer.description
       form.addEventListener("submit", e => {
           e.preventDefault()
           if(e.target.innerText === "Update Beer") {
            //    get the input and replace it with existing description
               console.log(form.innerText)
             
           }
       })
   }

// 3. add a review 
// update revies in db 
// be able to added review