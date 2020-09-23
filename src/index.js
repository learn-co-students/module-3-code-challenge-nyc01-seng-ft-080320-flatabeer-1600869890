// Code here
document.addEventListener("DOMContentLoaded", event => {
    
// See the first beer's details, including its name, image, description, and reviews, when the page loads

    fetch("http://localhost:3000/beers/1") 
    .then(response => response.json())
    .then(firstBeerJson => firstBeerDetails(firstBeerJson))

    const firstBeerDetails = (firstBeerJson) => {
        const beerDeetsDiv = document.querySelector(".beer-details")
            beerDeetsDiv.querySelector("h2").innerHTML = `${firstBeerJson.name}`
            beerDeetsDiv.querySelector("img").setAttribute('src', firstBeerJson.image_url)
            beerDeetsDiv.querySelector("form.description").querySelector("textarea").innerHTML = `${firstBeerJson.description}`
        const beerReviewsDiv = document.querySelector(".reviews")
            beerReviewsDiv.innerHTML =  ` `
            
        const beerReviews = firstBeerJson["reviews"]
            beerReviews.forEach(element => {
                const reviewLi = document.createElement("li")
                reviewLi.innerHTML = ` <p>${element}</p>`

                beerReviewsDiv.appendChild(reviewLi)
            });
        
    };
    
// Change the beer's description and still see that change when reloading the page

    const updateHandler = () => {
        const beerForm = document.querySelector("form.description")
        beerForm.addEventListener('click', event => {  
            
            if (event.target.innerHTML == "Update Beer")  {
                event.preventDefault()

                  const newBeerDescription = document.querySelector("")
                  //happy-path plan => on 'click' event on the update beer, event.preventDefault() is called, preventing form from going through;
                  //new textarea content in the form would be kept and sent over as a PATCH request to the API
                  //const pathBeerDescription(updatedBeerInfo)
                    
            };

        });
         
        //make PATCH request
    };
    //  pathBeerDescription = (updatedBeerInfo) = {
        // const options = {
            //method: "PATCH",

            // headers: {
            // "conent-type" : "application/json",
            // "accepts": "application/json"
            // },    
            //body: JSON.stringify()
        // }  

        // const beerId = updatedBeerInfo.id 
        // fetch(`http://localhost:3000/beers/` + beerId, options)
        // .then(response => response.json())
        // .then(newBeerDetail => firstBeerDetails(newBeerDetail))

    //  }



    updateHandler()


})