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

    const getBeer = () =>{
        const beerContainer = document.querySelector('.beer-details')
        beerContainer.dataset.id = "1"
        const id = beerContainer.dataset.id
        console.log(id)
        
        fetch('http://localhost:3000/beers/' + id)
        .then(response => response.json())
        .then(beer => renderBeer(beer))
    }

    //Function Invocations
    // renderBeer()
    getBeer()

})



