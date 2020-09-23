document.addEventListener('DOMContentLoaded', (event) => {          // standard opening to any Js code challenge

    const URL = 'http://localhost:3000/beers/'

    const getBeers = () => {
        fetch(URL)
        .then(res => res.json())
        .then(beers => {
            renderBeers(beers)
        })
    }
    function getOneBeer(id) {
            fetch(URL + id)
            .then(resp => resp.json())
            .then(json => console.log(json))
    }

    const renderBeers = beers => {
        for (let beer of beers) {
            renderBeer(beer)
        }
    }

    function renderBeer(beer) {
        const info = document.querySelector('.beer-details') // where they want us to render the info
        const beerDiv = document.createElement('div') // creates div 
        beerDiv.dataset.id = beer.id
        beerDiv.innerHTML = `
        <div class="beer-details">
        <h2>${beer.name}</h2>
        <img src="${beer.image_url}">

        <form class="description">
          <textarea>${beer.description}</textarea>
          <button>Update Beer</button>
        </form>

        <h3>Leave a Review</h3>
        <form class="review-form">
          <textarea></textarea>
          <input type="submit" value="Submit">
        </form>

        <h3>Customer Reviews</h3>
        <ul class="reviews">
          <li>${beer.reviews}</li>
          <li>From the server</li>
        </ul>
      </div>
        `
        info.append(beerDiv)
    }


    function clickHandler() {
        const info = document.querySelector('.beer-details')
        info.addEventListener('click', e => {
           const beer = e.target.closest('div')
           if (beer) {
              const id = beer.dataset.id
              getOneBeer(id);
           }
        })
    }


    clickHandler();
    getBeers();
   
   
}); 