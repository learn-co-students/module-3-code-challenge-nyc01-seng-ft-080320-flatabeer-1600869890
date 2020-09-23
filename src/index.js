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
        image.scr = beer.img_url
    }
})//dom content loaded