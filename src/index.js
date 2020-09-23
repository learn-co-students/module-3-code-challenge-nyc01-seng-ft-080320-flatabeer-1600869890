// Code here
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    const baseUrl = 'http://localhost:3000/beers/'
    let beerId = 1;

    const fetchData = beerId => {
        fetch(baseUrl + beerId)
        .then(res => res.json())
        .then(beer =>  renderBeer(beer))
    }

    const patchDescription = (beerId, newDescription) => {
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "description": newDescription
            })
        }

        fetch(baseUrl + beerId, options)
        .then(res => res.json())
        // .then(beer => renderBeer(beer))
        .catch(error => console.log(error))
            
                    
    }

    const patchReview = (beerId, reviewArr) => {
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "reviews": reviewArr
            })
        }

        fetch(baseUrl + beerId, options)
        .then(res => res.json())
        // .then(beer => renderBeer(beer))
        .catch(error => console.log(error))
            
                    
    }


    const renderBeer = beerObj => {
        const beerDiv = document.querySelector('.beer-details')
        const beerNameHeader = beerDiv.children[0]
        beerNameHeader.dataset.id = beerObj.id
        const beerImage = beerDiv.children[1]
        const beerDescription = beerDiv.children[2][0]
        const reviewsUl = document.querySelector(".reviews")
        reviewsUl.innerHTML = ''
        beerNameHeader.textContent = beerObj.name 
        beerImage.src = beerObj.image_url
        beerDescription.textContent = beerObj.description
        

        beerObj.reviews.forEach(review => {
            const reviewLi = document.createElement('li')
            reviewLi.textContent = review
            reviewsUl.appendChild(reviewLi)
        })
    }

    const addReview = newReview => {
        const reviewsUl = document.querySelector(".reviews")
        const reviewLi = document.createElement("li")
        reviewLi.textContent = newReview
       
        reviewsUl.insertBefore(reviewLi, reviewsUl.firstChild)
        let reviewArr = []
        const reviewChildren = reviewsUl.children
        for (let i =0; i < reviewChildren.length; i++) {
            reviewArr.push(reviewChildren[i].textContent)
           
        }
       
        return reviewArr
    }



    document.addEventListener('submit', e => {
        e.preventDefault()
        if (e.target.matches(".description")) {
            const description = e.target.children[0].value
            const beerId = document.querySelector('.beer-details').children[0].getAttribute('data-id')
            patchDescription(beerId, description)
            
        }

        if (e.target.matches(".review-form")) {
            
            const reviewText = e.target.children[0].value
            const beerId = document.querySelector('.beer-details').children[0].getAttribute('data-id')
            let reviewArr = addReview(reviewText)
            
            patchReview(beerId, reviewArr)

            e.target.reset()
        }
    })


    fetchData(beerId)
});
