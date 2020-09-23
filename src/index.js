document.addEventListener("DOMContentLoaded", e => {

     const beerDetails = document.querySelector('.beer-details')
     const beerForm = document.querySelector('.description')
     // const main = document.querySelector('main')
     const reviewsUl = document.querySelector(".reviews")


function fetchFirstBeer() {
     fetch("http://localhost:3000/beers/1")
     .then(resp => resp.json())
     .then(beer => { 
          renderBeerHeader(beer)
          renderBeerForm(beer)
          renderBeerReviews(beer)
     })
}



function renderBeerHeader(beer){
     const headerDiv = document.createElement('div')
     headerDiv.innerHTML = `
     <h2>${beer.name}</h2>
    <img src="${beer.image_url}"> `
    beerDetails.prepend(headerDiv)
  }




function renderBeerForm(beer){
     beerForm.innerHTML = `
     <form class="description">
     <textarea>${beer.description}</textarea>
     <button>Update Beer</button>
   </form> `
     }

function submitHandler(){
     beerForm.addEventListener('submit', e => {
          e.preventDefault()
          




     })


}




// function renderBeerReviews(beer){
//      for(let review of beer) {
//           const reviewLi = document.createElement('li')
//           reviewLi.textContent = `${beer.review}`
//           reviewsUl.append(reviewLi)
//           }
//      }





// submitHandler('submit', e => {
// target update  button 
// // get info from form 
// // patch




// target review submit button 
// get info from review section 
// append review lis to reviews section 


// })

















submitHandler()
fetchFirstBeer()

})