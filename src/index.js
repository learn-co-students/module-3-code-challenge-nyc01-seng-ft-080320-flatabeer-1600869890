// Code here
document.addEventListener("DOMContentLoaded", event => {
    
    
    const baseUrl = "http://localhost:3000/"


    // See the first beer's details, including its name, image, description, and reviews, when the page loads

    fetch("http://localhost:3000/beers/1") 
    .then(response => response.json())
    .then(firstBeerJson => firstBeerDetails(firstBeerJson))

    const firstBeerDetails = (firstBeerJson) => {
        console.log("firstBeerJson:", firstBeerJson["reviews"])
        const beerName = firstBeerJson
        const beerDeetsDiv = document.querySelector(".beer-details")
            beerDeetsDiv.querySelector("h2").innerHTML = `${firstBeerJson.name}`
            beerDeetsDiv.querySelector("img").setAttribute('src', firstBeerJson.image_url)
            beerDeetsDiv.querySelector("form.description").querySelector("textarea").innerHTML = `${firstBeerJson.description}`
        const beerReviews = firstBeerJson["reviews"]
        const beerReviewsDiv = document.querySelector(".reviews")
            beerReviewsDiv.innerHTML =  ` `

    //    const beerReviews = document.querySelector(".reviews") => use in case above doesnt work
        beerReviews.forEach(element => {
            const reviewLi = document.createElement("li")
            reviewLi.innerHTML = ` <p>${element}</p>`

            beerReviewsDiv.appendChild(reviewLi)

            
        });
        
    }

})