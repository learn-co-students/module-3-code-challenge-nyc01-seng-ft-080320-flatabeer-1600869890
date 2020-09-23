// Code here
document.addEventListener("DOMContentLoaded", event => {
    
    
    const baseUrl = "http://localhost:3000/"


    // See the first beer's details, including its name, image, description, and reviews, when the page loads

    fetch("http://localhost:3000/beers/1") 
    .then(response => response.json())
    .then(firstBeerJson => firstBeerDetails(firstBeerJson))

    const firstBeerDetails = (firstBeerJson) => {
        console.log(firstBeerJson)
        const beerName = firstBeerJson
        const beerDeetsDiv = document.querySelector(".beer-details")
            beerDeetsDiv.querySelector("h2").innerHTML = `${firstBeerJson.name}`
            beerDeetsDiv.querySelector("img").setAttribute('src', firstBeerJson.image_url)
            beerDeetsDiv.querySelector("form.description").querySelector("textarea").innerHTML = `${firstBeerJson.description}`
            
       
        console.log(beerDeetsDiv.querySelector("h2"))
        
    }

})