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

// // Listening for the update event
const submitHandler = () => {
    document.addEventListener('submit', e => {
    
      let button = e.target[1]     
        
        if (e.target[1].textContent === "Update Beer") {
            e.preventDefault()
            let newDescription = e.target[0].value
                
            let options = {
            method: 'PATCH',
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
                },
            body: JSON.stringify({
                description: newDescription
            })
        }
            fetch("http://localhost:3000/beers/1", options)
            .then(response => response.json())
            .then(returnObject => renderBeer(returnObject))
        } if (e.target[1].value === "Submit") {
            e.preventDefault()
            let newReview = e.target[0].value
            let reviewList = document.querySelector('.reviews')

            let newLi = document.createElement('li')
            newLi.textContent = newReview

            reviewList.prepend(newLi)
            console.log(newLi);
            
            
        }
        


    })
}

const addReview = () => {

}

submitHandler()
getBeers()

})
