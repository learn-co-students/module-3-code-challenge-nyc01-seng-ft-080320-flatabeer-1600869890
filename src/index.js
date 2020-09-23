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
        const info = qs('.beer-details')
        const beerName = ce('div')
        
    }

})//dom content loaded