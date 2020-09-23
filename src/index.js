// Code here

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Loaded")
    const BEER_URL = 'http://localhost:3000/beers'
    const mainBody = document.querySelector('main')
    const updateForm = document.querySelector('.description')
    

    function getFirstBeer() {
        fetch(BEER_URL + '/1')
        .then(resp => resp.json())
        .then(beer => {
            renderBeer(beer)
        })
    }

    function renderBeer(beer) {
        let newDiv = document.createElement('div')
        newDiv.className = 'beer-details'
        newDiv.dataset.id = beer.id
        newDiv.innerHTML = `
        <h2 id="name">${beer.name}</h2>
        <img id="img" src="${beer.image_url}">
        <form class="description" data-form-id="${beer.id}">
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
          ${beer.reviews.map (review => {
            return `<li> ${review} </li>`}).join('')}
        </ul>
        `
        mainBody.append(newDiv)
    }

    function updateBeer(beer) {
        fetch(BEER_URL + '/' + )

    }

    function leaveComment(comment) {

    }

    clickHandler = () => {
        document.addEventListener('submit', e => {
            e.preventDefault();
            if (e.target.matches('.description')) {
            updateBeer(e.target)
            } if (e.target.matches('.reviews')) {
                leaveComment(e.target)
            }
        })

    }
    

    getFirstBeer();
})