let peopleList = null

renderResponse = person => {
  let card = ''
  person.forEach((item) => {
    card += renderCard(item)
  })
  return card
}

renderCard = person => `
    <div class="card d-inline-block" data-test="person" style="width: 18rem;">
     <div class="card-body">
        <p data-test="person-name">name: ${person.name}</p>
        <p>gender: ${person.gender}</p>
        <p>eye color: ${person.birth_year}</p>
        <p>hair color: ${person.hair_color}</p>
      </div>
    </div>
`

const getPeople = () => {
  const req = new XMLHttpRequest()
  req.open("GET", "https://swapi.dev/api/people")
  req.onreadystatechange = () => {
    if (req.readyState == 4 && req.status == 200) {
      const response = JSON.parse(req.responseText)
      peopleList = response.results
      document.getElementById("content").innerHTML = renderResponse(response.results)
    }
  };
  req.send()
}

const validateForm = value => {
  if(!value) throw 'Required field'
}

document.getElementById("seach-form").addEventListener("submit", e => {
  e.preventDefault()
  document.getElementById("search-field").classList.remove("is-invalid")
  document.getElementById("error-text").innerHTML = ''
  const fieldValue = document.getElementById("search-field").value
  try{
    validateForm(fieldValue)
    const findPerson = peopleList.find((per) => fieldValue.toLowerCase() === per.name.toLowerCase())
    if(!findPerson) throw 'character not found'
    document.getElementById("content").innerHTML  = renderCard(findPerson)
  }catch(err){
    document.getElementById("search-field").classList.add("is-invalid")
    document.getElementById("error-text").innerHTML = err
  }
})

getPeople();
