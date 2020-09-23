// Code here
document.addEventListener('DOMContentLoaded', () => {

    
    const baseUrl = "http://localhost:3000/beers/"

    const getBeer = () => { //the first beer
        fetch(baseUrl + 1)
        .then(response => response.json())
        .then(beer => renderBeer(beer))

    }

    // const renderBeers = beers => {
    //     for(beer of beers){
    //         renderBeer(beer)
    //     }
    // }
// to show the details of a single beer
    const renderBeer = beer => {
        const beerDiv = document.querySelector('.beer-details')
        const name = document.querySelector('h2')
        const description = document.querySelector('.description')
        const review = document.querySelector('.reviews')

        //tried using textContent but beer.name didn't go through. wasn't sure what went wrong, so went with this instead.

        beerDiv.innerHTML = `
        <h2>${beer.name}</h2>
        <img src=${beer.image_url}>

        <form class="description">
          <textarea>${beer.description}</textarea>
          <button>Update Beer</button>
        </form>

        <h3>Leave a Review</h3>
        <form class="review-form">
          <textarea></textarea>
          <input type="submit" value="Submit">
        </form>

        <h3>Customer Reviews</h3>
        <ul class="reviews">
          <li>${beer.reviews}</li>
          
        `
    }

    // add Click Handlers and Submit Handlers for the update beer and reviews
    const clickHandler = () => {
        document.addEventListener('click', e => {
            if(e.target.textContent === 'UPDATE BEER'){
                const beerForm = document.querySelector('.description')
                beerForm.innerText = beer.description.value
            }else if(e.target.textContent === 'SUBMIT'){
                const reviewForm = document.querySelector('.review-form')
                reviewForm.innerText = beer.reviews.value
            }
        })
    }
    const submitHandler = () => {
        const descriptionForm = document.querySelector('description')


        form.addEventListener('submit', e => {
        e.preventDefault()
            const description = descriptionForm.description.value


        const options = {
            method: "PATCH",
            headers: {
                "content-type" : "application/json"
                "accept" : "application/json"
            },
            body: JSON.stringify(beer)
        }
        fetch(baseUrl + 1, options)
        .then(response => response.json())
        .then()


        })
    }

    //call the functions down here
    submitHandler()
    clickHandler()
    getBeer()
    renderBeer()
})