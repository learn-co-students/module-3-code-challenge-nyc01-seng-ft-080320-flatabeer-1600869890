const urlBeer1 = "http://localhost:3000/beers/1"
// load the content and render all of the beer objects
document.addEventListener("DOMContentLoaded", e => {



fetchBeer(urlBeer1);
})
//create a fetch request (get) to get all of the beer data from api

const fetchBeer = url => {

    fetch(url)
    .then(response => response.json())
    .then(beerObj => {
        renderBeer(beerObj);
        renderReviews(beerObj);
    })
}
//include a function that will render each beer with the format listed below
const renderBeer = beerObj => {
    const beerDiv = document.createElement('div');
    beerDiv.classList.add("beer-details");
    beerDiv.innerHTML = `
        <h2>${beerObj.name}</h2>
        <img src=${beerObj.image_url}>

        <form class="description">
        <textarea>${beerObj.description}</textarea>
        <button>Update Beer</button>
        </form>

        <h3>Leave a Review</h3>
        <form class="review-form">
        <textarea></textarea>
        <input type="submit" value="Submit">
        </form>

        <h3>Customer Reviews</h3>
        <ul class="reviews">
        </ul>
    `;
    
    const main = document.querySelector('main');
    main.append(beerDiv);
}

//render the reviews indivually using the same get request
const renderReviews = beerObj => {
    const reviewLis = document.createElement('li');
    const beerReviews = beerObj.reviews;
    for(const beer of beerReviews)
    console.log(beerReviews);
}


//<li>Replace with actual reviews</li>
//<li>From the server</li>

// <div class="beer-details"></div>
// <h2>Beer Name Goes Here</h2>
// <img src="assets/image-placeholder.jpg">

// <form class="description">
//   <textarea>Beer description goes here</textarea>
//   <button>Update Beer</button>
// </form>

// <h3>Leave a Review</h3>
// <form class="review-form">
//   <textarea></textarea>
//   <input type="submit" value="Submit">
// </form>

// <h3>Customer Reviews</h3>
// <ul class="reviews">
//   <li>Replace with actual reviews</li>
//   <li>From the server</li>
// </ul>
// </div>