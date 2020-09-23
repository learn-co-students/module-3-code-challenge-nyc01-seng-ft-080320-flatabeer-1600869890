const urlBeer1 = "http://localhost:3000/beers/1"
// load the content and render all of the beer objects
    document.addEventListener("DOMContentLoaded", e => {



    fetchBeer(urlBeer1);
    submitHandler();
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

            <form class="description" data-beer-id=${beerObj.id}>
            <textarea name="description">${beerObj.description}</textarea>
            <button>Update Beer</button>
            </form>

            <h3>Leave a Review</h3>
            <form class="review-form" data-beer-id=${beerObj.id}>
            <textarea name="review"></textarea>
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
        const reviewList = document.querySelector(".reviews")
        const beerReviews = beerObj.reviews;
        for(const review of beerReviews) {
            const reviewLi = document.createElement('li');
            reviewLi.textContent = review;
            reviewList.append(reviewLi);
        }
    }
    
    //submit handler for the description update
    const submitHandler = () => {
        document.addEventListener('submit', e => {
            e.preventDefault();
            if (e.target.matches('.description')) {
                updateDescription(e.target);
        //add a submit handle for the reviews
            } else if(e.target.matches('.review-form')) {
                postNewReview(e.target)
            }
        })
    }
    //function to send the patch request
    const updateDescription = form => {
        //const beerId = form.dataset.beerId;
        const description = form.description.value;
        
        //console.dir(description);

        const options = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                description: description
            })
        };

        fetch(urlBeer1, options)
        .then(response => response.json())
        .then(beerUpdate => {
            removePreviousDiv();
            renderBeer(beerUpdate);
            renderReviews(beerUpdate);
        })
    }
    //remove the old description on DOM and re-render the new description
    const removePreviousDiv = () => {
        const main = document.querySelector('main');
        main.innerHTML = ""
    }
    
    //function to post a new review on DOM
    //no persistence required
    // const postNewReview = form => {
        
    //     const newReview = form.review.value;

    //     const reviewList = document.querySelector(".reviews");
    //     const reviewLi = document.createElement('li');
    //     reviewLi.textContent = newReview;

    //     reviewList.prepend(reviewLi);

    // }

    //Review Persistence Attmept
    const postNewReview = form => {
        const currentReviews = []
        const newReview = form.review.value;
        const beerDiv = form.parentElement;
        const reviewUl = beerDiv.querySelector('ul');
        const reviewLis = reviewUl.children
        for (const review of reviewLis) {
            currentReviews.push(review.textContent);
        }
        
        currentReviews.unshift(newReview);

        //console.log(currentReviews);
        const options = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                reviews: currentReviews
            })
        }
        fetch
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