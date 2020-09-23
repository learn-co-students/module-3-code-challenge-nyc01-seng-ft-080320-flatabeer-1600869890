// Code here
document.addEventListener("DOMContentLoaded", e => {



const getBeers = () => {
    
    fetch("http://localhost:3000")
    .then(response => response.json())
    .then(beersArray => console.log(beersArray))

}




getBeers()
})

