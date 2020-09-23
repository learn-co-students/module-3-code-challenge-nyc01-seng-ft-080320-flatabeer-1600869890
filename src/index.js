// Code here
document.addEventListener("DOMContentLoaded", () =>{
    const baseUrl = "http://localhost:3000/beers"

    const fetchBeer = () => {
        fetch(baseUrl)

        .then(res => res.json())
        .then(data => renderBeers(data))
    }

    const renderBeers = (beers) => {
       for (let beer of beers){
           renderBeer(beer)
       }
    };

    const renderBeer = (beer) => {
        const beerInfo = createElement("div")
        beerInfo.dataset.id = beer.id
        beerInfo.classList.add("beer-info")

        beerInfo.innerHTML = `
    
        `
        const beerDetails = document.querySelector(".beer-details")
        beerDetails.dataset.id = beer.id
       name = document.querySelector("h2 > div")
       image = document.querySelector("img > div")
       name.innerHTML = `
        ${beer.name}
       `
       image.innerHTML = `
        ${beer.imgageUrl}
       `
    }

    beerDetails

    const clickHandler = () => {
        document.addEventListener("click", e => {
            if (e.target.textContent === "update beer") {
                const 
            }

        })
    }
fetchBeer();
});

