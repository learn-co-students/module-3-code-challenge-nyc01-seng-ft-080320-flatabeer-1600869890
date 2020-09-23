document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Loaded")
    const BEER_URL = 'http://localhost:3000/beers'
    const mainBody = document.querySelector('main')
    const updateForm = document.querySelector('.description')
    let reviewForm = document.querySelector('.review-form')
    

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
            return `<li> ${review} </li>`}).join('')}
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
        let reviews = document.querySelector('.reviews')
        let reviewContent = commentForm.querySelector('#comment-text-area')
        newLi.textContent = reviewContent.value
        reviews.appendChild(newLi)
        commentForm.reset();
    }

    clickHandler = () => {
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
    clickHandler();
    getFirstBeer();
})