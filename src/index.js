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
          <textarea id="change" name="description"></textarea>
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
    detailContainer.querySelector("textarea").value = beer.description
    const reviewList = detailContainer.querySelector(".reviews");
    for (let review of beer.reviews){
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
            review(e.target)
        }



        

    })
};

function review(form) {
    console.log(document.querySelector(".review-form"))
}

function updateBeer(newStuff){
    let newDescription = (newStuff.description.value)
    
    
    const beerId = newStuff.dataset.beerId
    const configuration = {
        method: "PATCH",
        headers: {"content-type": "application/json",
                    "accepts": "application/json"},
        body: JSON.stringify({description: newDescription})
    }
    
    fetch(BASE_URL + beerId, configuration)
    .then(resp => resp.json())
    .then(console.log)
}
