Code here
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



// document.addEventListener("DOMContentLoaded", () => {

//     const baseUrl = "http://localhost:3000/beers/"
//     const fetchBeers = () => {
//         fetch(baseUrl)
//     .then(res => res.json())
//     .then(beers =>(renderBeer(beers)))
//     }

//     const renderBeer = (beer) => {
//         const beerName = document.querySelector("h2")
//         const beerImage = document.querySelector('img')
//         const beerInfo = document.querySelector(".description")
//         const beerDescription = beerInfo.querySelector("textarea")
//         beerInfo.dataset.beerId = beer[0].id
        

//         beerName.textContent = beer[0].name
//         beerImage.src = beer[0].image_url
//         beerDescription.textContent = beer[0].description

//         const userReview = document.querySelector(".reviews")
//         userReview.innerHTML = ""
//         };

//         const submitHandler = () => {
//            const firstForm = document.querySelector(".description")
//            const secondForm = document.querySelector(".review-form")

//             firstForm.addEventListener("submit", e => {
//                 e.preventDefault();
//                 const description = e.target[0].value
//                 console.log(description)
                
//                let beerId = e.target.dataset.beerId
               
//             //   console.log(e.target)
//               const options = {
//                   method: "PATCH",
//                   headers: {
//                       "content-type": "application/json",
//                       "accept": "application/json"
//                   },
//                   body: JSON.stringify({description: description})
//               }
//               fetch(baseUrl + beerId, options)
//               .then(res => res.json())
//               .then(data => fetchBeers())
//             })

//             secondForm.addEventListener("submit", (e) =>{
//                 e.preventDefault()
//                const reviewText = e.target[0].value
//                const review = document.querySelector(".reviews")
//                 const newRev = review.append(reviewText)
//                const options = {
//                    method: "POST",
//                    headers: {
//                     "content-type": "application/json",
//                     "accept": "application/json"
//                 },
//                 body: JSON.stringify() 
//                }
//             })
//         }

// submitHandler();
// fetchBeers();
// });
