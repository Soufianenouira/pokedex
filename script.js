let responseAsJson;
const colours = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};

async function renderAllPokes(){
    for (let i = 1; i < 50; i++) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    responseAsJson = await response.json()
    let pokeName =  responseAsJson.forms[0].name;
    document.getElementById('main-content').innerHTML += 
    ` <div id="poke-cart${i}" class = cart>
        <p id="poke-name">${pokeName}</p>
        <div class="infos">
            <div id="type-infos${i}" class="type-infos"></div>
            <div class="poke-img-container">
            <img id="poke-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i}.svg" class="poke-img">
            </div>
        </div>
    </div>`;
       //console.log(responseAsJson);
       findTypes(i);
       
    }
}

function findTypes(i){
    for (let index = 0; index < responseAsJson.types.length; index++) {
        let PokeType = responseAsJson.types[index].type.name;
        document.getElementById(`type-infos${i}`).innerHTML += 
        `<div id="cart-btn" class="type-container">${PokeType}</div>`;
        if(index == 0){
            document.getElementById(`poke-cart${i}`).style.backgroundColor = colours[PokeType];
        }
    }
}