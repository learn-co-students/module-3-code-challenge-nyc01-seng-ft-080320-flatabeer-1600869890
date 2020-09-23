// Code here
document.addEventListener('DOMContentLoaded', () => {
    getFirstBeer()
})

const getFirstBeer = () => {
    fetch("http://localhost:3000/beers/1")
    .then(response => response.json())
    .then(beer => render(beer))
}

const render = beer =>{
    console.log(beer)
    let name = document.getElementsByTagName('h2')
    name[0].innerText = beer.name

    let img = document.getElementsByTagName('img')
    img[0].src = beer.image_url
    
    const form = document.querySelector(".description")
    form.textContent = beer.description 

    
}