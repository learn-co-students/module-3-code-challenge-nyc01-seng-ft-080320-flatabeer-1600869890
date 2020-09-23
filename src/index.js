document.addEventListener('DOMContentLoaded', () => {
    baseUrl = 'http://localhost:3000/beers'

    const fetchBeers = () => {
        fetch(baseUrl)
        .then(res => res.json())
        .then(beers => renderBeers(beers))
    }

    const renderBeers = beers => {
        for (let beer of beers) {
            // console.log(beer)
            renderBeer(beer)
        }
    }

    const renderBeer = beer => {
        const beerDetailsDiv = document.querySelector('.beer-details')
        beerDetailsDiv.dataset.id = beer.id
        beerDetailsDiv.innerHTML = `
        <h2>${beer.name}</h2>
        <img src=${beer.image_url}>

        <form class="description">
          <textarea>${beer.description}</textarea>
          <button class="update-button">Update Beer</button>
        </form>

        <h3>Leave a Review</h3>
        <form class="review-form">
          <textarea></textarea>
          <input type="submit" value="Submit">
        </form>

        <h3>Customer Reviews</h3>
        <ul class="reviews">
          <li>${beer.reviews}</li>
        </ul>
        `
    }
    
    const clickHandler = () => {
        document.addEventListener('click', e => {
            e.preventDefault()
            if (e.target.matches(".update-button")){
                const textArea = document.querySelector('textarea')
                const newDesc = textArea.textContent
                const beerDetailsDiv = document.querySelector('.beer-details')
                const beerId = beerDetailsDiv.dataset.id


                
                let options = {
                    method: "PATCH",
                    headers: {
                        'content-type': 'application/json',
                        'accept': 'application/json'
                    },
                    body: JSON.stringify(newDesc)
                }
            
                fetch(baseUrl + beerId, options)
                .then(res => res.json())
                .then(fetchBeers)
                
            }
        })
    }



    fetchBeers()
    clickHandler()
})
