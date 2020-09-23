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
        const description = beerDescForm.querySelector('textarea')
        description.innerText = beer.description

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


    
    
    fetchBeer();


})
    // Code here





// See the first beer's details, including its name, image, description, and reviews, when the page loads
//              When DOM CONTENT loaded I can see the first beer and all its info
//              render it up.


// Change the beer's description and still see that change when reloading the page

    //this is the patch request girl! breathe. 


// Add a review for the beer (no persistence needed)
// core deliverable - just made a form and hit submit. 
//      this is the post. so you will need more than one description available. this will require an iterator?