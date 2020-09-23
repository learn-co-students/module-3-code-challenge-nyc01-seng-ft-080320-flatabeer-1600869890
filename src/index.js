// Code here
document.addEventListener("DOMContentLoaded", () => {
    const url = "http://localhost:3000/beers/"
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
          <textarea class="beer-description">${beer.description}</textarea>
          <button class="update-beer">Update Beer</button>
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

    const clickHandler= () => {
        document.addEventListener('click', e => {
            if(e.target.matches('.update-beer')){
                e.preventDefault()
                updateReview(e.target)
            }
        })

    }

    const submitHandler = () => {
        document.addEventListener('submit', e => {
            if(e.target.matches('.review-form')){
                e.preventDefault()
                const form = e.target
                const review = form.querySelector('textarea')
                const newReviewLi = document.createElement('li')
                newReviewLi.innerText = review.value
                const reviewUl = document.querySelector('.reviews')
                reviewUl.append(newReviewLi)
                //take contents from form and create new li and append to reviews ul

            }

        })
       

    }
    const updateReview = el => {
        const beerId = el.parentElement.parentElement.dataset.beerId

        //get new review and update beer.reveiew
        
        const textArea = el.parentElement.querySelector('textarea')
        const beerObj = {
            description: textArea.value
        }
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(beerObj)
        }
        fetch(url+beerId, options)
        .then(response => response.json())
        .then(beer => {
            const beerDiv = el.parentElement.parentElement
            const descriptionArea = beerDiv.querySelector('.beer-description')
            descriptionArea.innerText = beer.description
        })
    }

    

    clickHandler()
    submitHandler()
    getAndDisplayBeer()
})