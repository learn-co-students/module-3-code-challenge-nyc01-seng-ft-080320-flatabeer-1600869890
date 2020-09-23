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
    beerDetails.id = beerObj.id
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

  document.addEventListener('submit', e => {
    e.preventDefault()
    if(e.target.className == 'description'){
      updateBeerDesc(e.target.parentNode.id, e.target.firstElementChild.value)
    }else if(e.target.className == 'review-form'){
      addReview(e.target.parentNode.id, e.target.firstElementChild.value)
      e.target.reset()
    }
  })

  function updateBeerDesc(beerId, desc) {
    const options = {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        description: desc
      })
    }

    fetch(`http://localhost:3000/beers/${beerId}`, options)
  }

  function getReviews(beerId, newReview) {
    fetch(`http://localhost:3000/beers/${beerId}`)
      .then(resp => resp.json())
      .then(data => updateReview(beerId, data.reviews, newReview))
  }

  function updateReview(beerId, reviews, newReview) {
    reviews.push(newReview)
    const options = {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        reviews
      })
    }
    fetch(`http://localhost:3000/beers/${beerId}`, options)
  }

  function addReview(beerId, newReview) {
    displayReview(newReview)
    getReviews(beerId, newReview)
  }
  
  getBeer(3)
})