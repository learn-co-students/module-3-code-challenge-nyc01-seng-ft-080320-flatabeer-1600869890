document.addEventListener('DOMContentLoaded', e => {
  const baseURL = 'http:localhost:3000/beers';
  const reviewUl = document.querySelector('.reviews');
  const beerListUl = document.querySelector('nav').firstElementChild;
  const reviewForm = document.querySelector('.review-form');  
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
  };

  const fetchBeerList = () => {
    fetch(baseURL)
      .then(resp => resp.json())
      .then(json => renderBeerList(json));
  };

  const renderBeerList = (beers) => {
    removeChildren(beerListUl);
    for (let beer of beers) {
      renderBeerName(beer);
    }
  };

  const renderBeerName = (beer) => {
    const newBeerName = document.createElement('li');
    newBeerName.dataset.beerId = beer.id;
    newBeerName.textContent = beer.name;

    beerListUl.append(newBeerName);
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
    
    removeChildren(reviewUl);

    // not using for...of loop here because I need the index later
    for (let i = 0; i < beer.reviews.length; i++) {
      renderReview(i, beer.reviews[i]);
    }
  };

  const renderReview = (i, review) => {
    const newReview = document.createElement('li');
    newReview.textContent = review;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.dataset.reviewIndex = i;
    deleteButton.textContent = 'Delete';    

    reviewUl.append(deleteButton);
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

  const addBeerReview = () => {
    const newReview = reviewForm.querySelector('textarea').value;
    const reviews = getReviews();

    reviews.push(newReview);
    reviewForm.querySelector('textarea').value = '';

    patchReviews(reviews);
  };

  const deleteReview = (reviewIndex) => {
    // using patch here, not delete, since we're updating an entry rather than deleting one
    // if the api included a review model, I'd use a delete request to the appropriate review
    const reviews = getReviews();
    reviews.splice(reviewIndex, 1);
    
    patchReviews(reviews);
  }

  const removeChildren = (parent) => {
    while (parent.firstElementChild) {
      parent.firstElementChild.remove();
    }
  };

  const getReviews = () => {
    const reviewsLis = Array.from(reviewUl.querySelectorAll('li'));
    return reviewsLis.map(li => li.textContent);
  };

  const patchReviews = (reviews) => {
    const beerId = parseInt(reviewForm.parentElement.dataset.id, 10);

    fetch(`${baseURL}/${beerId}`, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify({
        reviews: reviews
      })
    })
      .then(resp => resp.json())
      .then(json => renderBeer(json));
  };

  const clickHandler = () => {
    document.addEventListener('click', e => {
      if (e.target.matches('button')) {
        e.preventDefault();
        if (e.target.parentElement.matches('.description')) {
          updateBeerDesc();
        } else if (e.target.matches('.delete')) {
          deleteReview(e.target.dataset.reviewIndex);
        }
      } else if (e.target.matches('li') && e.target.parentElement === beerListUl) {
        fetchBeer(parseInt(e.target.dataset.beerId, 10));
      }
    });

    document.addEventListener('submit', e => {
      e.preventDefault();
      addBeerReview();
    });
  };

  fetchBeerList();
  fetchBeer(1);
  clickHandler();

});