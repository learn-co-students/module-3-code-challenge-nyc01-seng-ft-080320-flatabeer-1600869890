
document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = 'http://localhost:3000/beers/'
    const firstBeerId = 1

    const getBeerOne = url => {    
        fetch(url + firstBeerId)
        .then(resp => resp.json())
        .then(beer => renderBeer(beer))
    }

    const renderBeer = beer => {
        const beerDetailDiv = document.querySelector('.beer-details')
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
            // const li = document.createElement('li')
            // li.textContent = review
            // ul.append(li)
            const div = document.createElement('div')
            div.innerHTML =`
                <li>${review} <button class="delete">&times</button> </li>
            `
            ul.append(div)
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

        const reviewUl = document.querySelector('.reviews')
        // const li = document.createElement('li')
        // li.textContent = newReview

        // reviewUl.append(li)
        const div = document.createElement('div')
        div.innerHTML =`
            <li>${newReview}</li>
            <button class="delete">&times</button>
        `
        reviewUl.append(div)
        
        updateReviews(newReview)
        form.reset()
    }

    const updateReviews = (newReview) => {
        fetch(baseUrl + firstBeerId)
        .then(resp => resp.json())
        .then(beer => ( saveReviews(newReview, beer.reviews)))
    }

    const saveReviews = (newReview, beerReviews) => {
        beerReviews.push(newReview)
        
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

        fetch(baseUrl + firstBeerId, options)
        .then(resp => resp.json())
        // .then(beer => console.log(beer))
    }

    const updateDescription = target => {
        const form = target
        const textArea = target.querySelector('textarea')
        const newDescription = textArea.value
        
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

        fetch(baseUrl + firstBeerId, options)
        .then(resp => resp.json())
        .then(beer => renderBeer(beer))
    }

    const clickListner = () => {
        document.addEventListener('click', e => {
            if(e.target.matches(".delete")){
                deleteReview(e.target)
            }
        })
    }

    const deleteReview = target => {
        const review = target.closest('li').textContent
        const reviewDiv = target.closest('div')
        console.log(review, reviewDiv)
    }

    clickListner()
    submitListner()
    getBeerOne(baseUrl)
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