document.addEventListener('DOMContentLoaded', () => {
    getFirstBeer()
    clickHandler()
})

const BASE_URL = 'http://localhost:3000/beers/'

const getFirstBeer = () => {
    fetch(BASE_URL + '1')
    .then(resp => resp.json())
    .then(data => {
        renderBeer(data)
    })
}

const renderBeer = (beerObj) => {
    const beerContainer = document.querySelector('.beer-details')
    const nameH2 = beerContainer.firstElementChild
    const beerImage = beerContainer.querySelector('img')
    const beerDesc = beerContainer.querySelector('.description').firstElementChild
    const reviewsUl = beerContainer. querySelector('.reviews')

    nameH2.textContent = beerObj.name 
    beerImage.src = beerObj.image_url
    beerDesc.dataset.id = beerObj.id
    beerDesc.value = beerObj.description
    reviewsUl.innerHTML = ''

    beerObj.reviews.forEach((review) => {
        const reviewLi = document.createElement('li')
        reviewLi.textContent = review 
        reviewsUl.append(reviewLi)
    })
} 

const clickHandler = () => {
    document.addEventListener('click', e => {
        e.preventDefault()
        if (e.target.textContent === "Update Beer"){
            updateBeerDescription()
        }
        
    })
}

const updateBeerDescription = () => {
    const descForm = document.querySelector('.description')
    const currentDescNode = descForm.firstElementChild
    const beerId = descForm.firstElementChild.dataset.id

    sendPatchRequest(beerId, currentDescNode)
}

const sendPatchRequest = (beerId, descriptionNode) => {
    const options = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            description: descriptionNode.value
        })
    }
    fetch(BASE_URL + beerId, options)
    .then(resp => resp.json())
    .then(data => {
        descriptionNode.value = data.description
    })
}


/*As a user, I can:
√ See the first beer's details, including its **name, image, description, and reviews**, when the page loads
√ Change the beer's description and **still see that change when reloading the page**
- Add a review for the beer (no persistence needed) */