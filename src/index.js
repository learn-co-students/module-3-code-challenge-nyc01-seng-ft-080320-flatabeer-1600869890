//globz
const baseUrl = 'http://localhost:3000/beers/';

const loadBeer = (id) => {
    fetch(baseUrl + id).then(resp => resp.json()).then(beer => {
        renderBeer(beer)
    })
}

const renderBeer = (beer) => {
    const beerDiv = document.querySelector('.beer-details');
    const nameHeader = beerDiv.querySelector('h2')
    const imgEl = nameHeader.nextElementSibling;
    const beerDescription = document.querySelector('.description textarea')
    //console.log(beerDiv, nameHeader, imgEl, beerForm);
    nameHeader.innerText = beer.name;

    imgEl.setAttribute('src', `${beer.image_url}`);
    beerDescription.textContent = `${beer.description}`;

    renderBeerReviews(beer);
}

const renderBeerReviews = (beer) => {
    const reviews = beer.reviews;
    //console.log(reviews);

    for (let review of reviews) {
        renderReview(review);
    }
}

const renderReview = (review) => {
    //console.log(review);
    const reviewUl = document.getElementsByClassName('reviews');
    const reviewEl = document.createElement('li').innerText = `${review}`;

}

document.addEventListener('DOMContentLoaded', () =>
{
    loadBeer(1);

});