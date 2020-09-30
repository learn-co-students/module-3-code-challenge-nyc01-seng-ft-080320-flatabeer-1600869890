document.addEventListener('DOMContentLoaded', e => {

function fetchBeer(id){
     fetch("http://localhost:3000/beers/" + id)
     .then(resp => resp.json())
     .then(beer => {
          renderBeer(beer)
     
     })
}

function renderBeer(beer){
     const beerDetailsContainer = document.querySelector(".beer-details")
     beerDetailsContainer.dataset.id = beer.id 
     const beerTitle = document.querySelector(".beer-details h2")
     beerTitle.innerHTML = `<h2>${beer.name}</h2>`
     const beerPic = document.querySelector(".beer-details img")
     beerPic.src = beer.image_url 
     const beerDeets = document.querySelector(".description textarea")
     beerDeets.textContent = beer.description
     renderReviews(beer.reviews)

     }

const updateForm = document.querySelector(".description")

function updateDescription() {
updateForm.addEventListener('submit', e => {
     e.preventDefault()
     const update = document.querySelector(".description textarea").value
     const beerId = document.querySelector(".beer-details").dataset.id


     options = {
          method: "PATCH",
          headers: {
          “content-type”: “application/json"
          "accept": "application/json"
          }
          body: JSON.stringify({ description: update})
     }

     fetch("http://localhost:3000/beers" + beerId, options)
     .then(res => res.json())
     .then(console.log)

})
}
function renderReviews(reviews){
     for(let review of reviews){
          reviewLi.textContent = review 
          reviewContainer.append(reviewLi)
     }

}
const reviewContainer = document.querySelector(".reviews")
const reviewLi = document.createElement('li')
const reviewSpace = document.querySelector(".review-form textarea")
const reviewForm = document.querySelector(".review-form")

reviewForm.addEventListener('submit', e => {
     e.preventDefault()
     const newReview = document.createElement('li')
     newReview.textContent = reviewSpace.value
     reviewContainer.prepend(newReview)

})


















updateDescription(1)
fetchBeer(1)

})