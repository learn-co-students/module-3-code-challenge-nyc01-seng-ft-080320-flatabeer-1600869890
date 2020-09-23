// Add a review for the beer (no persistence needed)

document.addEventListener("DOMContentLoaded", () => {

    const BEERS_URL = "http://localhost:3000/beers/"

    document.addEventListener("submit", (e) => {
        e.preventDefault();
        if (e.target.matches(".description")) {
            patchDescription(e.target)
        } else if (e.target.matches(".review-form")) {
            patchReview(e.target)
            e.target.reset()
        }
    })

    document.addEventListener("click", (e) => {
        if (e.target.matches(".delete-review")) {
            const beer_id = e.target.dataset.beer_id
            deleteReview(e.target.parentElement, beer_id)
        }
    })

    const deleteReview = (el, beerId) => {
        const reviewIndex = parseInt(el.dataset.num)

        fetch(BEERS_URL+beerId)
        .then(response => response.json())
        .then(beer => {
           let reviews = beer.reviews
           reviews.splice(reviewIndex, 1)
           deletePatch(reviews, beerId)
        })


    }
    
    const deletePatch = (reviews, beerId) => {

        const reviewObj = {
            reviews: reviews
        }

        fetchOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify(reviewObj)
        }

        fetch(BEERS_URL+beerId, fetchOptions)
        .then(response => response.json())
        .then(obj => {
            const beerInt = parseInt(beerId)
            getBeer(beerInt)
        })
    }

    // const addReview = reviewForm => {
    //     const newReviewText = document.getElementById("review-area").value

    //     // no persistance
    //     // const reviewUl = document.querySelector(".reviews")
    //     // const reviewLi = document.createElement("li")
    //     // reviewLi.textContent = newReviewText
    //     // reviewUl.append(reviewLi)
    // }

    const patchReview = reviewForm => {
        const newReview = document.getElementById("review-area").value
        const beerId = reviewForm.dataset.beer_id

        fetch(BEERS_URL+beerId)
        .then(response => response.json())
        .then(beer => {
            const revObj = makeReviewObj(beer, newReview)
            patchReviews(revObj, beer)
        })
    }

    const patchReviews = (revObj, beer) => {

        const fetchOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify(revObj)
        }

        fetch(BEERS_URL+beer.id, fetchOptions)
        .then(response => response.json())
        .then(renderBeer)
    }

    const makeReviewObj = (beer, newReview) => {
        const oldReviews = beer.reviews
        oldReviews.push(newReview)
        const reviewObj = {
            reviews: oldReviews
        }
        return reviewObj
    }

    const patchDescription = beerForm => {
        const newDesc = document.getElementById("desc-area").value
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
                <textarea id="desc-area">${beer.description}</textarea>
                <button>Update Beer</button>
            </form>

            <h3>Leave a Review</h3>
            <form data-beer_id=${beer.id} class="review-form">
                <textarea id="review-area"></textarea>
                <input type="submit" value="Submit">
            </form>

            <h3>Customer Reviews</h3>
            <ul class="reviews">
            </ul>
        `
        appendReviews(beer, beerDiv);

    }

    const appendReviews = (beerObj, beerDiv) => {
        const reviewUl = beerDiv.querySelector("ul")
        const reviews = beerObj.reviews
        let count = 0
        for (const review of reviews) {
            let reviewLi = document.createElement("li")
            reviewLi.textContent = review
            reviewLi.dataset.num = count
            let button = document.createElement("button")
            button.classList.add("delete-review")
            button.textContent = "Delete Review"
            button.dataset.beer_id = beerObj.id
            reviewLi.append(button)
            reviewUl.append(reviewLi)
            count++
        }
    }


    getBeer(2);
})