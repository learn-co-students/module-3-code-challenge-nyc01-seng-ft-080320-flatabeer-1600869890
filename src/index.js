document.addEventListener('DOMContentLoaded', e => {
  const baseURL = 'http:localhost:3000/beers';

  const fetchBeer = (beerId) => {
    fetch(`${baseURL}/${beerId}`)
      .then(resp => resp.json())
      .then(json => renderBeer(json));
  };

  const renderBeer = (beer) => {
    const deetsDiv = document.querySelector('.beer-details');
    
    const nameHeader = deetsDiv.querySelector('h2');
    nameHeader.textContent = beer.name;

    const beerImg = deetsDiv.querySelector('img');
    beerImg.src = beer['image_url'];

    const descForm = deetsDiv.querySelector('.description');
    const descBox = descForm.querySelector('textarea');
    descBox.value = beer.description;    

    const reviewUl = deetsDiv.querySelector('.reviews');
    
    removeReviews(reviewUl);

    for (let review of beer.reviews) {
      renderReview(reviewUl, review);
    }
  };

  const removeReviews = (reviewUl) => {
    while (reviewUl.firstElementChild) {
      reviewUl.firstElementChild.remove();
    }
  };

  const renderReview = (reviewUl, review) => {
    const newReview = document.createElement('li');
    newReview.textContent = review;

    reviewUl.append(newReview);
  };

  fetchBeer(1);

});