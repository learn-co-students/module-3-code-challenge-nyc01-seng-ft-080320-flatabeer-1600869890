document.addEventListener('DOMContentLoaded', e => {
 // Code here
 const dClass = document.querySelector('.beer-details')
 const url = "http://localhost:3000/beers/"
 const ulBeer = document.querySelector('.reviews')
 //const form = document.querySelector('description')
 // name, image description and reviews
 const getBeers = () => {
  fetch(url + 1)
   .then(res => res.json())
   .then(beer => renderBeer(beer))
 }
 const renderBeer = beer => {
  const beerDetail = document.querySelector('.beer-details')
  beerDetail.dataset.beerId = beer.id
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







  beer.reviews.forEach(review => { renderReview(review) })
 }
 const renderReview = review => {
  //console.log(ulBeer.children)
  const myReviews = document.createElement('li')
  myReviews.textContent = review


  ulBeer.append(myReviews)
 }

 const submitHandler = () => {
  document.addEventListener('submit', e => {
   e.preventDefault()
   if (e.target.className === 'description') {
    //console.log(e.target)
    const form1 = e.target
    // e.target.dataset.id =
    //console.log(formId)
    //console.log(form1[0].value)
    const new_description = form1[0].value
    //console.log(document.querySelector('.beer-details').dataset.beerId)
    const id = document.querySelector('.beer-details').dataset.beerId

    //form1.reset()
    const options = {
     method: "PATCH",
     headers: {
      "content-type": "application/json",
      "accept": "application/json"
     },
     body: JSON.stringify({ description: new_description })

    }
    fetch(url + id, options)
     .then(res => res.json())
     .then(console.log)




   } if (e.target.className === 'review-form') {
    //console.log(e.target)
    const formTwo = e.target
    const my_review = formTwo[0].value
    const newLi = document.querySelector('li')
    newLi.textContent = my_review
    //console.log(my_review)
    ulBeer.prepend(my_review)

   }

  })

 }
 // didnt have much time to do the last

 // add an event listener to submit button 
 // const clickHandler = () => {
 //  document.addEventListener('click', e => {

 //  })
 // }




 getBeers()
 submitHandler()
 //clickHandler()
})