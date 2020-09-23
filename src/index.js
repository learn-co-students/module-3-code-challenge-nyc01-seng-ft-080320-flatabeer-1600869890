// Code here
document.addEventListener("DOMContentLoaded", e => {


// Fetch Get request for beers
const getBeers = () => {
    fetch("http://localhost:3000/beers/1")
    .then(response => response.json())
    .then(beersArray => renderBeer(beersArray))
}

//  Rendering Each Beer
const renderBeer = (beer) => {
    const beerContainer = document.querySelector('.beer-details')
    
    beerContainer.firstElementChild.textContent = beer.name
    beerContainer.children[1].src = beer.image_url
    beerContainer.children[2][0].textContent = beer.description
    beerContainer.children[6].children[1].textContent = beer.reviews[1]
    beerContainer.children[6].children[0].textContent = beer.reviews[0]
}

// Listening for the update event
    const submitHandler = () => {
        document.addEventListener('click', (e) => {
           console.log(e.target)
            // if (e.target.value === "UPDATE BEER"){
            //     e.preventDefault()
            //     console.log('Updating')
            // } if (e.target.value === "SUBMIT") {
            //     e.preventDefault()
            //     console.log('Submitting');
            // }
        })
    }

submitHandler()
getBeers()
})
