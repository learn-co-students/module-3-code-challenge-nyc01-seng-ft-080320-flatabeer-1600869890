// Code here
document.addEventListener('DOMContentLoaded', e => {

    const qs = (selector) => document.querySelector(selector)
    const ce = (element) => document.createElement(element)

    const URL = 'http://localhost:3000/beers/'
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
                const descriptionForm = e.target
                patchBeer(descriptionForm)
        
            } else if (e.target.matches('#new-object-form')) {
                const newForm = e.target
                postObject(newForm)
            }
        })}

        const patchBeer = (form, reset = false) => {
            let id = form.id.value
            let newBeer = parseInt(form.beer.value)
        
            const newBeer = {
                "description": form.description.value,
            }
        
            const options = {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newBeer)
            }
        
            fetch(URL1, options)
                .then(resp => resp.json())
                .then(renderBeer)
        }



        clickHandler()
})//dom content loaded