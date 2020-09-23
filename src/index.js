// Code here
document.addEventListener('DOMContentLoaded', e => {
    const beerProfile = document.querySelector('div.beer-details');
    console.log(beerProfile);

    //load first beer and display it
    const firstBeer = dbBeer(getURL('beers/1'));
    firstBeer.then(beer => displayBeer(beer, beerProfile));

    // setup submit handlers
    setupSubmitHandlers();
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

    imageEl.src = beer.image_url;
    descEl.value = beer.description;
    descEl.parentElement.dataset.beerId = beer.id;

    reviewsList.innerHTML = "";
    reviewFrm.dataset.beerId = beer.id;
    //in case we need it not sure yet...
    reviewFrm.dataset.beerReviews = beer.reviews;

    for(let review of beer.reviews){
        reviewsList.appendChild(renderReview(review));
    }

}

function renderReview(review){
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
                reviewsList.appendChild(renderReview(review));
            }
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
