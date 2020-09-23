document.addEventListener('DOMContentLoaded', e => {
  const baseURL = 'http:localhost:3000/beers';
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
  };

  const fetchBeer = (beerId) => {
    fetch(`${baseURL}/${beerId}`)
      .then(resp => resp.json())
      .then(json => renderBeer(json));
  };

  const renderBeer = (beer) => {
    const deetsDiv = document.querySelector('.beer-details');
    deetsDiv.dataset.id = beer.id;
    
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

  const updateBeerDesc = () => {
    const editForm = document.querySelector('.description');

    const beerId = parseInt(editForm.parentElement.dataset.id, 10);
    const editedDesc = editForm.querySelector('textarea').value;

    fetch(`${baseURL}/${beerId}`, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify({
        description: editedDesc
      })
    })
      .then(resp => resp.json())
      .then(json => renderBeer(json));
  };

  const clickHandler = () => {
    document.addEventListener('click', e => {
      if (e.target.matches('button')) {
        e.preventDefault();

        updateBeerDesc();
      }
    });
  };

  fetchBeer(1);
  clickHandler();

});