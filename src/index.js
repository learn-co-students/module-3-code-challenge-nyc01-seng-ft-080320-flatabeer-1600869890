// Code here
const BASE_URL = "http://localhost:3000/beers/"
document.addEventListener('DOMContentLoaded', e=>{
    getFirstBeer(1);
    submitHandler();
    clickHandler();
    getAllBeers();
})


function getFirstBeer(num){
    fetch(BASE_URL + num)
    .then(resp => resp.json())
    .then(beer => renderBeer(beer))
}
function getAllBeers(){
    fetch(BASE_URL)
    .then(resp=> resp.json())
    .then(beers => renderMenu(beers))
}

function renderMenu(beers){
    const menuUl = document.querySelector(".beerList")
    for (let beer of beers){
        const beerLi = document.createElement("li")
        beerLi.classList.add("specifc")
        beerLi.innerText= beer.name
        menuUl.append(beerLi)
    }

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
          <textarea name="review"></textarea>
          <input type="submit" value="Submit">
        </form>

        <h3>Customer Reviews</h3>
        <ul class="reviews" data-beer-id=${beer.id}>
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
    const deleteButton = document.createElement("button")
    deleteButton.classList.add("deleteReview")
    deleteButton.textContent="DELETE"
    reviewLi.append(deleteButton)
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

function clickHandler(){
    document.addEventListener("click", e=>{
        if (e.target.matches(".deleteReview")){
            deleteReview(e.target)
        }else if (e.target.matches(".specific")){
            console.log(e.target.dataset.id)
        }
    })
}
function deleteReview(button){
    const reviewLi = button.parentElement
    const beerId = button.parentElement.parentElement.dataset.beerId
    // fetch(BASE_URL + beerId, {metho: "PATCH"})
    // .then(resp => reviewLi.remove())
    // console.log(reviewLi, beerId)
}
function review(form) {
    
    const reviewUl = document.querySelector("ul.reviews")
    reviewUl.append(renderReview(form.review.value))
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
