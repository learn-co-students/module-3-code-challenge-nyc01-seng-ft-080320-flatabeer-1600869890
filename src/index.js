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
        beerDiv.innerHTML = `
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
          <li>Replace with actual reviews</li>
          <li>From the server</li>
        </ul>
        
        `
    }



    getAndDisplayBeer()
})