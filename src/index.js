// As a user, I can:

// See the first beer's details, including its name, image, description, and reviews, when the page loads DONE
// Change the beer's description and still see that change when reloading the page
// Add a review for the beer (no persistence needed)

document.addEventListener("DOMContentLoaded", () => {

    const BEERS_URL = "http://localhost:3000/beers/"

    document.addEventListener("submit", (e) => {
        if (e.target.matches(".description")) {
            e.preventDefault();
            patchDescription(e.target)
        }
    })

    const patchDescription = beerForm => {
        const newDesc = document.getElementById("textarea").value
        const beerId = beerForm.dataset.beer_id

        const patchObj = {description: newDesc}

        const fetchOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify(patchObj)
        }

        fetch(BEERS_URL+beerId, fetchOptions)
        .then(response => response.json())
        .then(renderBeer)

    }

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

            <form data-beer_id=${beer.id} class="description">
                <textarea id="textarea">${beer.description}</textarea>
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