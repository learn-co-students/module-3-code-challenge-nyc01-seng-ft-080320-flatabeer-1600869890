// Code here

// Render beer:

document.addEventListener("DOMContentLoaded", function(e){

    const renderBeer = (beerObj) =>{
        const beerContainer = document.querySelector('.beer-details')
        // beerContainer.dataset.id = "1"
        const header = beerContainer.querySelector('h2').textContent = `${beerObj.name}`
        const image = beerContainer.querySelector('img')
        image.innerHTML =  `<img src=${beerObj.image_url}>`
        const description = beerContainer.querySelector('form').firstElementChild.textContent = `${beerObj.description}`
    }

    const renderReviews = (beerObj) => {
        const reviewsUl = document.querySelector('.reviews')
        const  oldLis = reviewsUl.querySelectorAll('li')
            oldLis.forEach(li => li.remove())
        const arrayTest = ["hi", "meal", "ear"]
        for (i = 0; i < beerObj.reviews.length; i++) {
            const reviewLi = document.createElement('li');
            reviewLi.textContent = beerObj.reviews[i];
            reviewsUl.append(reviewLi)
          }
    }

    const getBeer = () =>{
        const beerContainer = document.querySelector('.beer-details')
        const id = beerContainer.dataset.id
        console.log(id)
        
        fetch('http://localhost:3000/beers/1')
        .then(response => response.json())
        .then(beer => 
            renderBeer(beer),
            // renderReviews(beer)
            )
            
    }

    //Update description

    const updateDescription = () =>{
        const updateForm = document.querySelector('form')
        document.addEventListener('submit', function(e){
            e.preventDefault()
            if (e.target === updateForm){
                const newDescription = document.querySelector('textarea').value
                
                const options = {
                    method: 'PATCH',
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify({description: newDescription})
                }

                fetch('http://localhost:3000/beers/1', options)
                .then(response => response.json())
                .then(beer => console.log(beer));
                
            }

        })
    }

    //Function Invocations
    // renderBeer()
    getBeer()
    // renderReviews()
    updateDescription()
})



