// Code here
document.addEventListener("DOMContentLoaded", function() {

    const baseUrl = "http://localhost:3000/beers/"

    const getBeer = () => {
        fetch(baseUrl)
        .then(resp => resp.json())
        .then(data => renderBeers(data))
    }

    const renderBeers = (beers) => {
        for (let beer of beers) {
            renderBeer(beer)
        }
    }

    const renderBeer = (beer) => {
        const beerDetails = document.querySelector('.beer-details')
        const beerDescription = document.querySelector(".description")
        const beerReviews = document.querySelector(".reviews")

        let beerName = beerDetails.firstElementChild
        let beerDescprip = beerDescription.firstElementChild
        let beerReview = beerReviews.firstElementChild
        
        let beerImage1 = beerDetails.getElementsByTagName("img src")

        beerName.innerText = beer.name
        beerDescprip.dataset.id = beer.id
        beerDescprip.innerText = beer.description
        beerReview.innerText = beer.reviews
        // beerImage1.innerText = beer.image_url
        
    }

    const clickHandler = () => {
        document.addEventListener("click", (e) => {
            e.preventDefault()
            if  (e.target.textContent === "Update Beer") {
                updateBeer()
            } else if (e.target.textContent === "Submit"){
                submitBeer()
            }
        })
    }

    const updateBeer = () => {
        const form = document.querySelector('.description')
        const currentDesc = form.firstElementChild
        const beerId = form.firstElementChild.dataset.id

        update(beerId, currentDesc)
    }

    const update = (beerId, newDesc) => {
        const options = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                description: newDesc.value
            })
        }
        fetch(baseUrl + beerId, options)
        .then(resp => resp.json())
        .then(data => {
            newDesc.value = data.description
        })
    }

    getBeer()
    clickHandler()

    
})