document.addEventListener('DOMContentLoaded', e => {
 // Code here
 const dClass = document.querySelector('.beer-details')
 const url = "http://localhost:3000/beers/"
 const ulBeer = document.querySelector('.ul')
 //const form1 = document.querySelector('description')
 // name, image description and reviews
 const getBeers = () => {
  fetch(url + 1)
   .then(res => res.json())
   .then(beer => renderBeer(beer))
 }
 const renderBeer = beer => {
  const h2Tag = document.getElementsByTagName('h2')
  //h2Tag.textContent = `${beer.name}`
  //console.dir(dClass.children[1])
  dClass.children[0].innerText = `${beer.name}`
  dClass.children[1].src = `${beer.image_url}`
  const formOne = dClass.children[2]
  formOne[0].value = `${beer.description}`
  //formOne[0]
  console.log(beer)



  //divClass.append(h2Tag)







  //beer.reviews.forEach(reviewv =>{})
 }









 getBeers()
})