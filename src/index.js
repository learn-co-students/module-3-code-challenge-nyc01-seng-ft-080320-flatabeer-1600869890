document.addEventListener('DOMContentLoaded', () => {
    getBeer(1)
    clickHandler()
})

const BASE_URL = 'http://localhost:3000/beers/'

const getBeer = (beerId) => {
    fetch(BASE_URL + beerId)
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

    beerContainer.dataset.id = beerObj.id
    nameH2.textContent = beerObj.name 
    beerImage.src = beerObj.image_url
    // beerDesc.dataset.id = beerObj.id
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
        } else if (e.target.value === 'Submit'){
            submitReview()
        }
        
    })
}

const updateBeerDescription = () => {
    const descForm = document.querySelector('.description')
    const currentDescNode = descForm.firstElementChild
    const beerId = descForm.parentElement.dataset.id

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

const submitReview = () => {
    const reviewForm = document.querySelector('.review-form')
    const newReview = reviewForm.querySelector('textarea').value

    renderReview(newReview)
}

const renderReview = (review) => {
    const reviewsUl = document.querySelector('.reviews')
    const beerId = reviewsUl.parentElement.dataset.id
    const newReviewLi = document.createElement('li')
    newReviewLi.textContent = review

    reviewsUl.prepend(newReviewLi)

    // get the array of reviews from the DOM
    // const reviews = getReviews(reviewsUl)

    // create a PATCH request
    // capture the response
    // rerender the reviews/ beer info

    
}

// const getReviews = (reviewsNode) => {
//     const reviewsArray = []
//     const reviewsCollection = reviewsNode.querySelectorAll('li')

//     for (const el in reviewsCollection){
//         // console.log(node)
//         reviewsArray.push(el.textContent)
//     }
//     console.log(reviewsArray)
// }


/*As a user, I can:
√ See the first beer's details, including its **name, image, description, and reviews**, when the page loads
√ Change the beer's description and **still see that change when reloading the page**
√ Add a review for the beer (no persistence needed) */