//experimental:

function ReviewBoi(id = null) {
    this.id = id;
    this.reviews = {};

}
ReviewBoi.prototype.init = function() {
    this.reviews[this.id] = [];
}

//globz
let reviewBoi = new ReviewBoi()
const baseUrl = 'http://localhost:3000/beers/';

//fnnies
const loadBeer = (id) => {
    fetch(baseUrl + id).then(resp => resp.json()).then(beer => {
        renderBeer(beer)
        reviewBoi.id = id;
        //reviewBoi.init();
        console.log('console log 1:', reviewBoi);
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
    //ahhh how do i got in dis hash
    console.log('console log 2:', reviewBoi.reviews);
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
            submitReview()
        }
    })
}
const submitReview = () => {
    const reviewForm = document.querySelector('.review-form');
    const review = reviewForm.querySelector('textarea').value;
    renderReview(review);
//come back
    // const config = {
    //     method: 'PATCH',
    //     headers: {
    //         'accept': 'application/json',
    //         'content-type': 'application/json',
    //     },
    //     body: JSON.stringify({reviews: })
    // }
}

const updateBeer = (form) => {
    const updateButton = form.querySelector('button');
    const beerId = updateButton.dataset.beerId;
    const description = form.querySelector('textarea');
    const config = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({'description': `${description.value}`})
    }

    fetch(baseUrl + beerId, config).then(resp => resp.json()).then(updatedBeer => {
        //console.log(updatedBeer);
        alert("Description Updated!");
        // not rendering since the text the user just updated with stays in descrip box
    });
}

document.addEventListener('DOMContentLoaded', () =>
{

    loadBeer(1);
    clickHandler();
    formHandler();

});