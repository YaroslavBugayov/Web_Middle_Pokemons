const url = 'https://pokeapi.co/api/v2/pokemon/'
const resultElement = document.getElementById('result')
const searchElement = document.getElementById('search')
const submitElement = document.getElementById('submit')

submitElement.addEventListener('click', function(event) {
    search(searchElement.value);
})

function search(pokemonName) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url+pokemonName.toLowerCase())
    xhr.responseType = 'json'
    xhr.send()
    xhr.onload = function() {
        if (xhr.status > 300) {
            resultElement.innerHTML = '<div class="pokemon">There is no such pokemon!</div>'
        } else {
            drawPokemon(xhr.response)
        }
    }
    xhr.onerror = function(err) {
        console.log(err)
        resultElement.innerHTML = '<div class="pokemon">There was some error during search!</div>'
    }
}

function drawPokemon(pokemon) {
    resultElement.innerHTML = ''
    let pokemonElement = document.createElement('div')
    pokemonElement.classList.add('pokemon')
    pokemonElement.innerHTML = `
        <p>id: #${pokemon.id}</p>
        <hr>
        <h1>${pokemon.name}</h1>
        <img src="${pokemon.sprites.front_default}">
    `

    let typeList = document.createElement('ul')
    populateListWithTypes(pokemon.types, typeList)
    pokemonElement.appendChild(typeList)

    resultElement.appendChild(pokemonElement)
}

function populateListWithTypes(types, ul) {
    types.forEach(function(type) {
        let typeItem = document.createElement('li')
        typeItem.innerText = type.type.name;
        ul.appendChild(typeItem)
    })
}