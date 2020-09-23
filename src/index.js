document.addEventListener('DOMContentLoaded', () => {
const baseUrl = 'http://localhost:3000/beers/'
const firstBeer = 1


    
    const fetchBeer = () => {
        fetch(baseUrl + firstBeer)
        .then(res => res.json())
        .then(beer=> renderSingleBeer(beer))
    }

    const renderSingleBeer = (beer) => {
        const beerDetailsPage = document.querySelector('.beer-details')
        const beerName = beerDetailsPage.querySelector('h2')
        beerName.innerText = beer.name
        const beerIMG = beerDetailsPage.querySelector('img')
        beerIMG.src = beer.image_url
        const beerDescForm = beerDetailsPage.querySelector('.description')
        beerDescForm.dataset.id = beer.id
        const description = beerDescForm.querySelector('textarea')
        description.innerText = beer.description
        const descButton = beerDescForm.querySelector('button')
        descButton.id = "update-beer-button"
        descButton.type = "submit"
        const reviewForm = document.querySelector('.review-form')
        reviewForm.dataset.id = beer.id
        

        renderReviews(beer)
    }

    const renderReviews = beer => {
        const reviewsContainer = document.querySelector('.reviews')
        reviewsContainer.innerHTML = ""
        const reviewsArray = beer.reviews
        
            for(let review of reviewsArray){
                const reviewLi = document.createElement('li')
                reviewLi.innerText = review
                reviewsContainer.appendChild(reviewLi)
            }

    }

    const submitHandler = () => {
        const formA = document.querySelector('.description')
        const formB = document.querySelector('.review-form')

        formA.addEventListener('submit', e => {
            e.preventDefault();
            const form = e.target
            patchDesc(form)

            })
        

            // document.addEventListener('submit', e => {
            //     if (e.target.matches('#update-beer-button'))
            //     e.preventDefault();
            //     console.log(e)
            
    
            //     })
        formB.addEventListener('submit', e => {
            e.preventDefault();
            const form = e.target
            postReview(form)
        })
        }


    const patchDesc = form => {
        const objId = form.dataset.id
        const objDesc = form.querySelector('textarea')
        const objUpdate = { description: objDesc.value }

    

        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(objUpdate)
        }

        fetch(baseUrl + objId, options )
        .then(res => res.json())
        .then(data => fetchBeer())

    }

    const postReview = form => {
        const objId = form.dataset.id
        const objDesc = form.querySelector('textarea')
        const objUpdate = objDesc.value
        const newReviewLi = document.createElement('li')
        const reviewUL = document.querySelector('.reviews')
        newReviewLi.textContent = objUpdate
        reviewUL.appendChild(newReviewLi)

    }

     
   
    
    submitHandler();
    fetchBeer();


})
    // Code here

// honestly I am really pissed that I just spent 50 minutes because I tried to add an event listener in the wrong place and I 100% couldve delivered this perfectly. 