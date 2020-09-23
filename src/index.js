document.addEventListener("DOMContentLoaded", e => {

     const beerDetails = document.querySelector('.beer-details')
     const beerForm = document.querySelector('.description')


function fetchFirstBeer() {
     fetch("http://localhost:3000/beers/1")
     .then(resp => resp.json())
     .then(beer => { 
          renderBeerHeader(beer)
          renderBeerForm(beer)

     })
}



// function renderBeerHeader(beer){
//      beerDetailsHeader.innerHTML = `
//       <h2>${beer.name}</h2>
//      <img src="${beer.image_url}">`
// }

// function renderBeerForm(beer){
//      beerForm.innerHTML = `
//           <form>
//           <textarea> ${beer.description}</textarea>
//           <button>Update Beer</button>
//         </form> `
//      }


function renderBeerHeader(beer) {
     beerDetails.innerHTML = ` 
     <div class="beer-details">
        <h2>${beer.name}</h2>
        <img src="${beer.image_url}">
        `
}

function renderBeerForm(beer) {
     beerForm.innerHTML = `      
        <form class="description">
          <textarea>${beer.description}</textarea>
          <button>Update Beer</button>
        </form>
        `
}







submitHandler('submit', e => {
target update  button 
// get info from form 
// patch




target review submit button 
append review lis to reviews section 


})


















fetchFirstBeer()

})