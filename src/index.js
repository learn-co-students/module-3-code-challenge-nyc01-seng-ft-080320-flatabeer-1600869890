
document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = 'http://localhost:3000/beers/'
    const firstBeerId = 1

    const getBeer= (url, id) => {    
        fetch(url + id)
        .then(resp => resp.json())
        .then(beer => renderBeer(beer))
    }

    const renderBeer = beer => {
        const beerDetailDiv = document.querySelector('.beer-details')
        beerDetailDiv.dataset.beerId = beer.id
        const beerHeader = beerDetailDiv.querySelector('h2').textContent = beer.name
        const beerImg = beerDetailDiv.querySelector('img').src = beer.image_url

        const descriptionForm = beerDetailDiv.querySelector('form')
        const textArea = descriptionForm.querySelector('textarea').textContent = beer.description

        const beerReviews = beer.reviews

        renderReviews(beerReviews)   
    }

    const renderReviews = reviews => {
        const ul = document.querySelector('.reviews')
        ul.innerHTML = ""

        for(const review of reviews){
            const li = document.createElement('li')
            li.textContent = review
            const button = document.createElement('button')
            button.textContent = 'x'
            button.className = "delete"
        
            ul.append(li)
            li.append(button)
        }    
    }

    const submitListner = () => {
        document.addEventListener('submit', e => {
            e.preventDefault()
            if(e.target.matches('.description')){
                updateDescription(e.target)
            }else if(e.target.matches('.review-form')){
                newReview(e.target)
            }
        })
    }

    const newReview = target => {
        const form = target
        const textArea = target.querySelector('textarea')
        const newReview = textArea.value
        
        updateReviews(newReview)
        form.reset()
    }

    const updateReviews = (newReview) => {
        const beerId = document.querySelector('.beer-details').dataset.beerId
        
        fetch(baseUrl + beerId)
        .then(resp => resp.json())
        // .then(beer => ( saveReviews(newReview, beer.reviews)))
        .then(beer => {
            beer.reviews.push(newReview)
            saveReviews(beer.reviews)
        })
    }

    const saveReviews = (beerReviews) => {
        const id = document.querySelector('.beer-details').dataset.beerId
        
        reviews = {
            reviews: beerReviews
        }

        let options = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(reviews)
        }
        
        fetch(baseUrl + id, options)
        .then(resp => resp.json())
        .then(beer => renderReviews(beer.reviews))
    }

    const updateDescription = target => {
        const textArea = target.querySelector('textarea')
        const newDescription = textArea.value
        const beerId = document.querySelector('.beer-details').dataset.beerId

        description = {
            description: newDescription
        }

        let options = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(description)
        }

        fetch(baseUrl + beerId, options)
        .then(resp => resp.json())
        .then(beer => renderBeer(beer))
    }

    const clickListner = () => {
        document.addEventListener('click', e => {
            if(e.target.matches(".delete")){
                deleteReview(e.target)
            }else if (e.target.matches('.side-beer')){
                const beerId = e.target.dataset.beerId
                getBeer(baseUrl, beerId)
            }
        })
    }

    const deleteReview = target => {
        const beerId = document.querySelector('.beer-details').dataset.beerId
        const review = target.parentElement.textContent.slice(0, -1)
        
        fetch(baseUrl + beerId)
        .then(resp => resp.json())
        .then(beer => editDeletedReview(beer.reviews, review))
    }

    const editDeletedReview = (reviews, reviewToDelete) => {
        updatedReviews = []
        for(review of reviews) {
            if(review !== reviewToDelete) {
                updatedReviews.push(review)
            }
        }
        saveReviews(updatedReviews)
    }

    renderAllBeers = () => {
        const ul = document.querySelector('ul')
        ul.innerHTML = ""

        fetch(baseUrl)
        .then(resp => resp.json())
        .then(beers => {
            for(beer of beers) {
                const li = document.createElement('li')
                li.className = "side-beer"
                li.dataset.beerId = beer.id
                li.textContent = beer.name
                ul.append(li)
            }
        })
    }

    renderAllBeers()
    clickListner()
    submitListner()
    getBeer(baseUrl, firstBeerId) 
})


// As a user, I can:

// - See the first beer's details, including its **name, image, description, and reviews**, when the page loads

//1. dom contentloaded listner
//2. get request for beer 1
//3. render beer 1

// - Change the beer's description and **still see that change when reloading the page**
//1. submit listner
//2. get update
//3. patch request
//4. render on page

// - Add a review for the beer (no persistence needed)
//1. submit listner
//2. get new review
//4. render on page