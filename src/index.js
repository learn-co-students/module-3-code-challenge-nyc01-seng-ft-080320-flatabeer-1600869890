
const BASE_URL = 'http://localhost:3000/beers/'

document.addEventListener("DOMContentLoaded", ()=>{
    const _main = document.querySelector("main")
    const _form = document.getElementById('form-description')

    //clear beer details
    while (_main.firstChild) {
        _main.removeChild(_main.firstChild);
    }

    const fetchFirstBeer = () => {
        fetch(BASE_URL+'1')
        .then(response => response.json())
        .then(data => renderBeer(data))
    }

    const renderBeer = (beer) => {
        
        const beerDetails = document.createElement("div")

        // html for beer details
        beerDetails.innerHTML = `
        <h2 class="name">${beer.name}</h2>
        <img src="${beer.image_url}">

        <form class="description">
          <textarea id="form-description">${beer.description}</textarea>
          <button data-set = 'update' >Update Beer</button>
        </form>

        <h3>Leave a Review</h3>
        <form class="review-form">
          <textarea data-id = 'review' id="reviewtext"></textarea>
          <input type="submit" value="Submit" id = "Submitbtn">
        </form>

        <h3>Customer Reviews</h3>
        <ul class="reviews" id="reviews">
          <li>${beer.reviews}</li>
          <li>From the server</li>
        </ul>
        `
        // add beer to page in body of main tag
        _main.append(beerDetails)

        // add reviews
        const listBeerReviews = (beerReview) => {
            const ul = document.getElementById('reviews')
            
            for (let i = 0; i < beerReview.length; i++) {
                const element = beerReview[i];
                const li = document.createElement('li')
                li.textContent = element
                ul.append(li)
            }
        }
        listBeerReviews(beer.reviews)
    }

    const clickHandler = () => {
        _main.addEventListener('click', () =>{
            event.preventDefault()

            // Because I used textContent == Update Beer if you enter Update Beer you lock yourself from being able to UPDATE
            // Better practice is to use class or a dataset ID could not redo in time
                if(event.target.textContent == 'Update Beer'){
                    console.log("btn text")
                    const beerDescription = {
                        description: event.target.textContent
                    }
                    
                    let options = {
                        method: "PATCH",
                        headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify(beerDescription)
                    }
                    fetch(BASE_URL+'1', options)
                    .then(response => response.json())
                    .then(data => console.log('success'))
                }
                
            
                // ran out of time
                // need do a seperate fetch for reviews in order to add new review to the array of reviews
                if(event.target.id == 'Submitbtn'){
                    console.log("btn working")
                    const newReview = {
                        reviews: document.getElementById('reviewtext').value
                    }
                    
                    let options = {
                        method: "PATCH",
                        headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify(newReview)
                    }
                    fetch(BASE_URL+'1', options)
                    .then(response => response.json())
                    .then(data => console.log('success'))
                }
                
            
            
        })
    }
    
    fetchFirstBeer()

    clickHandler()
})