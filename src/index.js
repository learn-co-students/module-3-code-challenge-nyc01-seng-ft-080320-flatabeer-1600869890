// Code here
document.addEventListener("DOMContentLoaded", () =>{


    const baseUrl = `http://localhost:3000/beers/`
    const ulTag = document.querySelector("ul") // this is the first ul tag, cannot think of a more specific solution
    ulTag.innerHTML = ""

    const getBeers = () => {

        fetch(baseUrl)
        .then(resp => resp.json())
        .then(beers => {
            renderBeers(beers)})
    }

    const renderBeers = (e) => {

        e.forEach(beer => {  
            renderBeer(beer)
        });

    }

    const renderBeer = (e) => {

        const liTag = document.createElement("li")
        ulTag.append(liTag)
        liTag.id = e.id
        liTag.className = "beer-button"
        liTag.innerText = e.name
    }


    const getFirstBeer = (e = `1`) => {

        fetch(baseUrl + `${e}`)
        .then(resp => resp.json())
        .then(beer => renderFirstBeer(beer))

    }

    const sortReviews = (revs) => {

        revs.forEach(rev => {
            const revLi = document.createElement("li")
            const reviewBox = document.querySelector(".reviews")
            reviewBox.append(revLi)
            revLi.textContent = rev
        });

    }

    const renderFirstBeer = (obj) => {

        const firstBeerDiv = document.querySelector(".beer-details")
        const reviewBox = document.querySelector(".reviews")
        const firstBeerName = firstBeerDiv.querySelector("h2")
        const firstBeerImg = firstBeerDiv.querySelector("img")
        let firstBeerDesc = firstBeerDiv.querySelector("textarea")

        firstBeerName.textContent = obj.name
        firstBeerImg.src = obj.image_url
        firstBeerDesc.value = obj.description
        reviewBox.innerHTML = ""
        sortReviews(obj.reviews)
    }

    const updateFirstBeerDesc = (e) => {
        let options = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                description: e.value
            })
        }

        fetch(baseUrl+`1`, options)
        .then(resp => resp.json())
        .then(firstBeer => renderFirstBeer(firstBeer))
    }


    const leaveReview = (e) => {
        const reviewBox = document.querySelector(".reviews")
        const newReview = document.createElement("li")
        reviewBox.append(newReview)
        newReview.textContent = e.value
        arrReviewbox = []
        newReviewBox = [...reviewBox.children]
        newReviewBox.forEach(rev => {
            arrReviewbox.push(rev.textContent)
        });
        

        fetch(baseUrl + `1`, {
            method: "PATCH",
            headers: {"content-type": "application/json",
                      "accept": "application/json"},
            body: JSON.stringify({
                reviews: arrReviewbox
            })
        }).then(resp => resp.json())
        .then(beer => renderFirstBeer(beer))
    }


    const submitHandler = () => {
        document.addEventListener("submit", e =>{
            e.preventDefault();

            if(e.target.matches(".description"))
            {updateFirstBeerDesc(e.target.children[0])}

            if(e.target.matches(".review-form"))
            {leaveReview(e.target.children[0])}


        })
    }

    const clickHandler = () => {
        document.addEventListener("click", e => {

            if(e.target.matches(".beer-button")){
                getFirstBeer(e.target.id)
            }
            
        })


    }

    //run
    clickHandler();
    submitHandler();
    getFirstBeer();
    getBeers();

})