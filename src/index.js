// Code here
document.addEventListener("DOMContentLoaded", () => {
    const url = "http://localhost:3000/beers"
    const getAndDisplayBeer = () => {
        fetch("http://localhost:3000/beers/1")
        .then(response => response.json())
        .then(beer => {
            renderBeer(beer)
        })
    }

    const renderBeer = beer => {
        const beerDiv = document.querySelector('.beer-details')
        const newBeerDiv = document.createElement('div')

        newBeerDiv.dataset.beerId = beer.id

        newBeerDiv.innerHTML = `
        <h2>${beer.name}</h2>
        <img src="${beer.image_url}">

        <form class="description">
          <textarea>${beer.description}</textarea>
          <button>Update Beer</button>
        </form>

        <h3>Leave a Review</h3>
        <form class="review-form">
          <textarea></textarea>
          <input type="submit" value="Submit">
        </form>
        <h3>Customer Reviews</h3>
        <ul class="reviews">
          
        </ul>
       
        `
        
        beerDiv.append(newBeerDiv)
        const beerUl = document.querySelector('.reviews')
        displayReviews(beer, beerUl)
        
        
    }

    const displayReviews = (beer, beerUl) => {
        for(const review of beer.reviews){
           const reviewLi = document.createElement('li')
           reviewLi.innerText = review
           beerUl.append(reviewLi)
        }

    }



    getAndDisplayBeer()
})