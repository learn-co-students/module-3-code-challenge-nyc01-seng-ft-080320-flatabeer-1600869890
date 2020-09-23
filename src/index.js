document.addEventListener('DOMContentLoaded', e => {
 // Code here
 const dClass = document.querySelector('.beer-details')
 const url = "http://localhost:3000/beers/"
 const ulBeer = document.querySelector('.reviews')
 const form = document.querySelector('description')
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
  //console.log(beer)


  beer.reviews.forEach(reviews => { renderReview(reviews) })


  //divClass.append(h2Tag)







  //beer.reviews.forEach(reviews =>{renderReview(reviews)})
 }
 const renderReview = reviews => {
  //console.dir(reviews)

  ulBeer.children[0].append(reviews)
 }

 const submitHandler = () => {
  document.addEventListener('submit', e => {
   e.preventDefault()
   //console.log(e.target)
   const form1 = e.target
   //console.log(form1[0].value)
   const old_description = form1[0].value = 




  })

 }







 getBeers()
 submitHandler()
})