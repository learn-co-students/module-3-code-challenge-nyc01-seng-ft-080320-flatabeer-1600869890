document.addEventListener("DOMContentLoaded", e => {

     const beerDetailsHeader = document.querySelector('.beer-details')
     const beerForm = document.querySelector('.description')


function fetchFirstBeer() {
     fetch("http://localhost:3000/beers/1")
     .then(resp => resp.json())
     .then(beer => { 
          renderBeerHeader(beer)
          renderBeerForm()

     })
     }



function renderBeerHeader(beer){
     beerDetailsHeader.innerHTML = 
     ` <h2>${beer.name}</h2>
     <img src="${beer.image_url}"> '
}

function renderBeerForm(beer){
     beerForm.innerHTML = `
          <form>
          <textarea> ${beer.description}</textarea>
          <button>Update Beer</button>
        </form> `
}

















fetchFirstBeer()

})