// As a user, I can:

// See the first beer's details, including its name, image, description, and reviews, when the page loads
// Change the beer's description and still see that change when reloading the page
// Add a review for the beer (no persistence needed)

document.addEventListener("DOMContentLoaded", () => {

    const BEERS_URL = "http://localhost:3000/beers/"

    const getBeer = (id) => {
        fetch(BEERS_URL+id)
        .then(response => response.json())
        .then(beer => renderBeer(beer))
    }

    const renderBeer = beer => {
        const beerDiv = document.querySelector(".beer-details")
        beerDiv.innerHTML = `
            <h2>${beer.name}</h2>
            <img src="${beer.image_url}">

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
            </ul>
        `
        addReviews(beer, beerDiv);

    }

    const addReviews = (beerObj, beerDiv) => {
        const reviewUl = beerDiv.querySelector("ul")
        const reviews = beerObj.reviews
        for (const review of reviews) {
            let reviewLi = document.createElement("li")
            reviewLi.textContent = review
            reviewUl.append(reviewLi)
        }
    }


    getBeer(1);
})


{/* <div class="beer-details">
<h2>Beer Name Goes Here</h2>
<img src="assets/image-placeholder.jpg">

<form class="description">
  <textarea>Beer description goes here</textarea>
  <button>Update Beer</button>
</form>

<h3>Leave a Review</h3>
<form class="review-form">
  <textarea></textarea>
  <input type="submit" value="Submit">
</form>

<h3>Customer Reviews</h3>
<ul class="reviews">
  <li>Replace with actual reviews</li>
  <li>From the server</li>
</ul>
</div> */}