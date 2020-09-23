// Code here
// name, image, description, and reviews
document.addEventListener('DOMContentLoaded', () =>{
  function getBeer(beerId) {
    fetch(`http://localhost:3000/beers/${beerId}`)
      .then(resp => resp.json())
      .then(data => displayBeer(data))
  }

  function displayBeer(beerObj) {
    const beerDetails = document.querySelector('.beer-details')
    beerDetails.firstElementChild.innerText = beerObj.name
    beerDetails.querySelector('img').src = beerObj.image_url
    beerDetails.querySelector('.description').querySelector('textarea').innerText = beerObj.description

    for (const review of beerObj.reviews) {
      displayReview(review)
    }
  }

  function displayReview(review) {
    const newLi = document.createElement('li')
    newLi.innerText = review
    document.querySelector('.reviews').append(newLi)
  }
  
  getBeer(1)
})