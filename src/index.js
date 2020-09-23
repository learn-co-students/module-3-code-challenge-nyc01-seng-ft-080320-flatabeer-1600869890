document.addEventListener('DOMContentLoaded', e => {
    const baseUrl = 'http://localhost:3000/beers/'

    const getFirstBeer = () => {
        fetch(baseUrl + 1)
        .then(response => response.json())
        .then(beer => renderBeer(beer))
    }

    const renderBeer = (beer) => {
        document.querySelector('h2').textContent = beer.name
        document.querySelector('img').src = beer.image_url
        document.querySelector('textarea').textContent = beer.description
        document.querySelector('.reviews li').textContent = beer.reviews
    }

    const submitHandler = () => {
        
        document.addEventListener('submit', e => {
            e.preventDefault()
            if(e.target.matches('.description')){
                const form = e.target
                const updateDescription = form[0].value 

                const options = {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        accept: 'application/json'
                    },
                    body: JSON.stringify({description: updateDescription})
                }
                fetch(baseUrl + 1, options)
                .then(response => response.json())
                .then(updatedDescription => {
                    document.querySelector('textarea').textContent = updatedDescription.description
                })
            }
            if(e.target.matches('.review-form')){
                const customerReviews = document.querySelector('.reviews li')

                const reviewForm = e.target
                
                const reviewText = reviewForm[0].value
                const reviewLi = document.createElement('li')
                reviewLi.innerText = reviewText

                customerReviews.append(reviewLi)
            }
            
        })
    }

    submitHandler()
    getFirstBeer()
})







// ## Endpoints

// Your base URL for your API will be: http://localhost:3000

// The endpoints you will need are:

// - GET `/beers/[:id]` (start with /beers/1)
// - PATCH `/beers/[:id]`
// - GET `/beers` (for Advanced Deliverables only)

// ## Core Deliverables

// As a user, I can:

// 1). See the first beer's details, including its **name, image, description, and reviews**, when the page loads

    // √- Get beer data
    // √- Add beer info

// 2). Change the beer's description and **still see that change when reloading the page**

    // √- Listen for submit event
    // √- Edit beer description

// 3). Add a review for the beer (no persistence needed)

    // √- Add a review