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
    
    const descriptionForm = document.querySelector(".description")
    descriptionForm[0].innerText = beer.description
    // descriptionForm.textContent = beer.description 

    const reviews = beer.reviews
    const revUl = document.querySelector(".reviews") 
    reviews.forEach(review => {
        const revLi = document.createElement('li')
        revLi.innerText = review
        revUl.append(revLi)
    });
        
    

}