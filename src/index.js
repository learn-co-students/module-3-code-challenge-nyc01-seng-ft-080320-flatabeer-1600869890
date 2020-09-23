// Code here
const BASE_URL = "http://localhost:3000/beers/"
document.addEventListener('DOMContentLoaded', e=>{
    getFirstBeer();
    submitHandler();
})

function getFirstBeer(){
    fetch(BASE_URL + 1)
    .then(resp => resp.json())
    .then(beer => renderBeer(beer))
}

function renderBeer(beer){
    const detailContainer = document.querySelector(".beer-details");
    let beerBody = `<h2>${beer.name}</h2>
        <img src="${beer.image_url}">

        <form class="description" data-beer-id=${beer.id}>
          <textarea name="description">${beer.description}</textarea>
          <button>Update Beer</button>
        </form>

        <h3>Leave a Review</h3>
        <form class="review-form" data-beer-id=${beer.id}>
          <textarea></textarea>
          <input type="submit" value="Submit">
        </form>

        <h3>Customer Reviews</h3>
        <ul class="reviews">
        </ul>`;
    detailContainer.innerHTML=(beerBody);
    const reviewList = detailContainer.querySelector(".reviews");
    for (review of beer.reviews){
        reviewList.append(renderReview(review))
    };
}

function renderReview(review){
    const reviewLi = document.createElement("li");
    reviewLi.textContent = review;
    return reviewLi
}

function submitHandler(){
    document.addEventListener('submit', e=>{
        e.preventDefault();
        if (e.target.classList.contains("description")){
            updateBeer(e.target)
        }else if(e.target.classList.contains("review-form")){
            console.log("review")
        }
        
    })
}

function updateBeer(form){
    const newDescription = form.description.textContent
    const beerId = form.dataset.beerId
    const configuration = {
        method: "POST",
        headers: {"content-type": "application/json"}
    }
}


// <h2>Beer Name Goes Here</h2>
//         <img src="assets/image-placeholder.jpg">

//         <form class="description">
//           <textarea>Beer description goes here</textarea>
//           <button>Update Beer</button>
//         </form>

//         <h3>Leave a Review</h3>
//         <form class="review-form">
//           <textarea></textarea>
//           <input type="submit" value="Submit">
//         </form>

//         <h3>Customer Reviews</h3>
//         <ul class="reviews">
//           <li>Replace with actual reviews</li>
//           <li>From the server</li>
//         </ul>