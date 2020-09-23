document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Loaded")
    const BEER_URL = 'http://localhost:3000/beers'
    const mainBody = document.querySelector('main')
    const updateForm = document.querySelector('.description')
    let reviewForm = document.querySelector('.review-form')
    const beerNav = document.getElementById('nav-ul')
    

    function getFirstBeer() {
        fetch(BEER_URL + '/1')
        .then(resp => resp.json())
        .then(beer => {
            mainBody.innerHTML = ''
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
        <form class="description" data-id="${beer.id}">
            <textarea id="description-text-area">${beer.description}</textarea>
            <button>Update Beer</button>
        </form>

        <h3>Leave a Review</h3>
        <form class="review-form" data-id="${beer.id}">
          <textarea id="comment-text-area"></textarea>
          <input type="submit" value="Submit">
        </form>
        
        <h3>Customer Reviews</h3>
        <ul class="reviews" data-id="${beer.id}">
          ${beer.reviews.map (review => {
            return `<li> ${review} <button id="delete">X</button></li>`}).join('')}
        </ul>
        `
        mainBody.append(newDiv)
    }

    function updateBeer(updateForm) {
        let beerId = updateForm.getAttribute('data-id')
        let textArea = updateForm.querySelector('#description-text-area')
        fetch(BEER_URL + '/' + beerId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "description": textArea.value
            })
        })
        .then( resp => resp.json())
        .then( beer => {
            mainBody.innerHTML = ''
            renderBeer(beer)
        })
    }

    function leaveComment(commentForm) {
        let newLi = document.createElement('li')
        let newBtn = document.createElement('button')
        newBtn.textContent = "X"
        newBtn.id = "delete"
        let reviews = document.querySelector('.reviews')
        let reviewContent = commentForm.querySelector('#comment-text-area')
        newLi.textContent = reviewContent.value
        newLi.appendChild(newBtn)
        reviews.appendChild(newLi)
        commentForm.reset();
    }

    function renderBeerNav(beer) {
        newLi = document.createElement('li')
        newLi.dataset.id = beer.id
        newLi.id = beer.name
        newLi.textContent = beer.name
        beerNav.appendChild(newLi)
    }

    function getAllBeers() {
        fetch(BEER_URL)
        .then(resp => resp.json())
        .then(beers => {
            beers.forEach (beer => 
                renderBeerNav(beer))
        })
    }
    function getBeer(beer) {
        fetch(BEER_URL + '/' + beer)
        .then(resp => resp.json())
        .then(resp => {
            mainBody.innerHTML = ''
            renderBeer(resp)
            })
        }

    submitHandler = () => {
        document.addEventListener('submit', e => {
            e.preventDefault();
            if (e.target.matches('.description')) {
                updateBeer(e.target)
            } if (e.target.matches('.review-form')) {
                console.log(e.target)
                leaveComment(e.target);
            }
        })
    }
    clickHandler = () => {
        document.addEventListener('click', e => {
            if (e.target.matches('#delete')) {
                e.target.parentElement.remove();
            }
            if (e.target.parentNode.matches("#nav-ul")) {
                getBeer(e.target.dataset.id)
            }
        })
    }
    clickHandler();
    submitHandler();
    getFirstBeer();
    getAllBeers();
})