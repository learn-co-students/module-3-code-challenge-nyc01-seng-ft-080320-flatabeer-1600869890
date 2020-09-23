// Code here
document.addEventListener('DOMContentLoaded', e => {

    const qs = (selector) => document.querySelector(selector)
    const ce = (element) => document.createElement(element)

    const URL1 = 'http://localhost:3000/beers/1'

    fetch(URL1)
        .then(resp => resp.json())
        .then(json => renderBeer(json))

    const renderBeer = (beer) => {
        const name = qs('#name')
        const description = qs('#description')
        document.getElementById("image").src=beer.image_url
        name.textContent = beer.name
        description.textContent = beer.description
        ul = ce('ul')
        const reviews = qs('#reviews')
        reviews.innerHTML = ""
        reviews.appendChild(ul)
        beer.reviews.forEach(function (item) {
            let li = document.createElement('li');
            ul.appendChild(li);
            li.innerHTML += item;
        })
    }

        const clickHandler = () => {
            document.addEventListener('click', e => {
                e.preventDefault()
                if (e.target.matches('button')) {
                    const descriptionForm = e.target.previousElementSibling.value
                    console.log(descriptionForm)
            
                    fetch(`http://localhost:3000/beers/1`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify({
                    "description": descriptionForm
                    })
                })
                }
        })
    }

    const submitHandler = () => {
        form = qs('.review-form')
        form.addEventListener('submit', e => {
            e.preventDefault()
                const reviewForm = form.value
                const reviews = qs('#reviews')
                const newReview = ce('li')
                newReview.innerHtml = reviewForm
                reviews.append(newReview)
           
        })}

        submitHandler()

    


        clickHandler()
})//dom content loaded