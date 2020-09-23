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

    for (let i = 0; i < beerObj.reviews.length; i++) {
      displayReview(beerObj.reviews[i], i)
    }
  }

  function displayReview(review, index) {
    const newLi = document.createElement('li')
    newLi.innerText = review
    newLi.id = index
    document.querySelector('.reviews').append(newLi)
    const button = document.createElement('button')
    button.className = 'btn-delete'
    button.innerText = 'DELETE'
    newLi.append(button)
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

  document.querySelector('.reviews').addEventListener('click', e => {
    if(e.target.className == 'btn-delete'){
      const array = e.target.parentNode.parentNode.querySelectorAll('li')
      for (let i = 0; i < array.length; i++) {
        const element = array[i]
        if(element == e.target.parentNode){
          getReviews(e.target.parentNode.parentNode.parentNode.id, undefined, i)
          e.target.parentNode.remove()
          break
        }
      }
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

  function getReviews(beerId, newReview, reviewId) {
    fetch(`http://localhost:3000/beers/${beerId}`)
      .then(resp => resp.json())
      .then(data => updateReview(beerId, data.reviews, newReview, reviewId))
  }

  function updateReview(beerId, reviews, newReview, reviewId) {
    if(newReview){
      reviews.push(newReview)
    }else if (reviewId){
      reviews.splice(reviewId, 1)
    }
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
    const index = document.querySelector('.reviews').lastChild.id
    displayReview(newReview, parseInt(index)+1)
    getReviews(beerId, newReview)
  }
  
  getBeer(2)
})