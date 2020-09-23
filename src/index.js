// Code here
document.addEventListener('DOMContentLoaded', e => {
    const beerProfile = document.querySelector('div.beer-details');
    console.log(beerProfile);

    //load first beer and display it
    const firstBeer = dbBeer(getURL('beers/1'));
    firstBeer.then(beer => displayBeer(beer, beerProfile));

    // setup submit handlers
    setupSubmitHandlers();

    //setup click handler for delete review
    setupDeleteReviewClickHandler();

    //render Beer List
    const beerList = document.querySelector('nav ul');
    let listOfBeer = dbBeer(getURL('beers/'));
    listOfBeer.then(beers => renderBeerList(beers, beerList));
});

function getURL(endpoint){
    let baseURL = 'http://localhost:3000/';
    if (endpoint){
        baseURL += endpoint;
    }
    return baseURL;
}

function dbBeer(url, options){
    console.log('querying: ', url, 'with options: ', options);
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
    const reviewFrm = container.querySelector('form.review-form');

    container.dataset.beerId = beer.id;
    imageEl.src = beer.image_url;
    descEl.value = beer.description;
    descEl.parentElement.dataset.beerId = beer.id;

    reviewsList.innerHTML = "";
    reviewFrm.dataset.beerId = beer.id;

    for(let review of beer.reviews){
        reviewsList.appendChild(renderElement(review));
    }

}

function renderElement(review){
    const revEl = document.createElement('li');
    revEl.textContent = review;

    return revEl;
}

function setupSubmitHandlers(){
    document.addEventListener('submit', e => {
        if(e.target.matches('form.description')){
            e.preventDefault();
            const textArea =  e.target.querySelector('textarea');
            const descObj = {'description': textArea.value};
            const updateDescOptions = buildOptions('PATCH', getHeaders(), descObj);
            const updatedBeer = dbBeer(getURL('beers/'+e.target.dataset.beerId), updateDescOptions);
            console.log(updatedBeer);
        }else if(e.target.matches('form.review-form')){
            e.preventDefault();
            console.log('submitting a review....');

            const reviewsList = e.target.parentElement.querySelector('ul.reviews');

            const review = e.target.querySelector('textarea').value;
            if (review != ""){
                reviewsList.appendChild(renderElement(review));
            }
            
            console.log(reviewsList.children);
            const updatedReviewsList = [...reviewsList.children];
            //debugger;
            const updatedReviews = updatedReviewsList.map(review => {return review.innerText});
            const updatedReviewsObj = {reviews: updatedReviews};
            const options = buildOptions('PATCH', getHeaders(), updatedReviewsObj);
            dbBeer(getURL('beers/'+e.target.dataset.beerId),options);
        }
    })
}
function getHeaders(){
    return {
        'content-type': 'application/json',
        'accept': 'application/json'
    }
}

function buildOptions(method, headers, obj){
    return {
        method: method,
        headers: headers,
        body: JSON.stringify(obj)
    }
}

function setupDeleteReviewClickHandler(){
    document.addEventListener('click', e=>{
        if (e.target.matches('ul.reviews li')){
            const reviewLi = e.target;
            let answer = confirm('Are you sure you want to delete this review?');
            if(answer){
                const reviewsList = e.target.parentElement;
                e.target.remove();
                const updatedReviewsList = [...reviewsList.children];
                //debugger;
                const updatedReviews = updatedReviewsList.map(review => {return review.innerText});
                const updatedReviewsObj = {reviews: updatedReviews};
                const options = buildOptions('PATCH', getHeaders(), updatedReviewsObj);
                dbBeer(getURL('beers/'+document.querySelector('div.beer-details').dataset.beerId),options);
            }
            
        }
    })
}

function renderBeerList(beers, container){
    container.innerHTML="";
    for(let beer of beers){
        container.appendChild(renderElement(beer.name));
    }
}
