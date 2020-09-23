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
        const form = document.querySelector('.description')
        form.addEventListener('submit', e => {
            e.preventDefault();
            const form = e.target
            patchDesc(form)

            })
        }

    const patchDesc = form => {
        const objId = form.dataset.id
        objDesc = form.querySelector('textarea')
        
    //     const options = {
    //         method: "PATCH",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept" : "application/json"
    //         },
    //         body: JSON.stringify{(e.)}
    //     }
    }


     
   

    submitHandler();
    fetchBeer();


})
    // Code here

// honestly I am really pissed that I just spent 50 minutes because I tried to add an event listener in the wrong place and I 100% couldve delivered this perfectly. 