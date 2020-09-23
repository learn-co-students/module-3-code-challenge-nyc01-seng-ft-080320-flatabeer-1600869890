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
        const beerDetails = document.querySelector(".beer-details")
        beerDetails.dataset.id = beer.id
        beerName = document.getElementsByTagName("h2")
        beerImage = document.getElementsByTagName("img")
       
       beerName.innerHTML = `
         ${beer.name} 
       `
       beerimage.innerHTML = `
       
       `
    }  
    
    const submitHandler = (beerReview) => {
        document.querySelector("")
        document.addEventListener('submit', (e) => {
            e.preventDefault();
            const beerForm = e.target

            let options = {
                method: "Post",
                headers: {
                    "content-type": "application/json",
                    "accept": "application.json"
                },
                body: JSON.stringify

            }
        })
    }

    

      

fetchBeer();
});

