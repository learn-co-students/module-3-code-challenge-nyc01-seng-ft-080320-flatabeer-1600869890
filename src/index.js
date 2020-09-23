// Code here
document.addEventListener('DOMContentLoaded', e => {
    const beerProfile = document.querySelector('div.beer-details');
    console.log(beerProfile);

    //load first beer and display it
    const firstBeer = dbBeer(getURL('beers/1'));
    firstBeer.then(beer => displayBeer(beer, beerProfile));

    // setup click handlers
    //setupClickHandlers();
});

function getURL(endpoint){
    let baseURL = 'http://localhost:3000/';
    if (endpoint){
        baseURL += endpoint;
    }
    return baseURL;
}

function dbBeer(url, options){
    if(options){
        return fetch(url, options)
            .then(res => res.json())
    }else{
        return fetch(url)
            .then(res => res.json())
    }
}

function displayBeer(beer, container){
    console.log("in display beer", beer);
    //debugger;
    const imageEl = container.querySelector('img');
    const descEl = container.querySelector('form.description textarea');
    const reviewsList = container.querySelector('ul.reviews');

    imageEl.src = beer.image_url;
    descEl.value = beer.description;
    reviewsList.innerHTML = "";

    for(let review of beer.reviews){
        reviewsList.appendChild(renderReview(review));
    }

}

function renderReview(review){
    const revEl = document.createElement('li');
    revEl.textContent = review;

    return revEl;
}

