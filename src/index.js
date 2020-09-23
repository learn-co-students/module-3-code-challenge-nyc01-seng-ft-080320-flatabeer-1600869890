document.addEventListener('click', e => {

const beerDetails = document.querySelector('.beer-details')



function fetchFirstBeer() {
     fetch("http://localhost:3000/beers/1")
     .then(resp => resp.json())
     .then(beer => {
          console.log(beer)
          renderBeer(beer)   
     })
}

function renderBeer(beer){
     beerDetails.innerHTML = 



}




















fetchFirstBeer()

})