//globz
const baseUrl = 'http://localhost:3000/beers/';

const loadBeer = (id) => {
    fetch(baseUrl + id).then(resp => resp.json()).then(beer => {
        renderBeer(beer)
    })
}

const renderBeer = (beer) => {
    const beerDiv = document.querySelector('.beer-details');
    const nameHeader = beerDiv.querySelector('h2');
    const imgEl = nameHeader.nextElementSibling;
    const beerDescription = document.querySelector('.description textarea');
    const updateButton = document.querySelector('.description button');
    //console.log(beerDiv, nameHeader, imgEl, beerForm);
    nameHeader.innerText = beer.name;

    imgEl.setAttribute('src', `${beer.image_url}`);
    beerDescription.textContent = `${beer.description}`;

    updateButton.setAttribute('data-beer-id', `${beer.id}`);
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
    let reviewUl = document.querySelector('.reviews');
    const reviewLi = document.createElement('li');

    reviewLi.innerText = `${review}`;
    reviewUl.appendChild(reviewLi);

}

const clickHandler = () => {
    document.addEventListener('click',e => {
    })
}

const formHandler = () => {
    document.addEventListener('submit',e => {
        e.preventDefault();
        if (e.target.matches('.description')) {
            //console.log('updateBtn')
            updateBeer(e.target);
        } else if (e.target.matches('.review-form')){
            //console.log('submit')
        }
    })
}

const updateBeer = (form) => {
    const updateButton = form.querySelector('button');
    const beerId = updateButton.dataset.beerId;
    const description = form.querySelector('textarea');
    const config = {
        method: 'Patch',
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json',
        },
        body: JSON.stringify({description: `${description.value}`})
    }

    fetch(baseUrl + beerId, config).then(resp => resp.json).then(updatedBeer => {
        console.log(updatedBeer);
    });
}

document.addEventListener('DOMContentLoaded', () =>
{
    loadBeer(1);
    clickHandler();
    formHandler();

});