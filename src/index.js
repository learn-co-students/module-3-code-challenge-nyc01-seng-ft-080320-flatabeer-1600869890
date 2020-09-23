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
      console.log(e.target.className)
    }
  })
  function updateBeerDesc(beerId, desc) {
    console.log(beerId, desc)
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
  
  getBeer(1)
})