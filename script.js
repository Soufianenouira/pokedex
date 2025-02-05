let responsesAsJson = [];
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

function init(){
    fetchPokes();
    
}

async function fetchPokes() {
    for (let i = 1; i <= 100; i++) {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        responseAsJson = await response.json();
        responsesAsJson.push(responseAsJson);
    }
    console.log(responsesAsJson);
    renderAllPokes();
    
}

async function renderAllPokes(){
    for (let i = 0; i < 100; i++) {
    let pokeName = responsesAsJson[i].forms[0].name;
    let pokeType = responsesAsJson[i].types[0].type.name;
    document.getElementById('main-content').innerHTML += 
    ` <div id="poke-cart${i}" class = "cart" style="background-color: ${colours[pokeType]};">
        <h3 id="poke-name" onclick="openPokeCart('${colours[pokeType]}', ${i})">${pokeName}</h3>
        <div class="infos">
            <div id="type-infos${i}" class="type-infos"></div>
            <div class="poke-img-container">
            <img id="poke-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i+1}.svg" class="poke-img">
            </div>
        </div>
    </div>`;
       renderTypes(i, `type-infos${i}`);
       
    }
}

function renderTypes(i, elementId){
    for (let index = 0; index < responsesAsJson[i].types.length; index++) {
        let pokeType = responsesAsJson[i].types[index].type.name;
        document.getElementById(elementId).innerHTML += 
        `<div id="cart-btn" class="type-container">${pokeType}</div>`;
    }
}

function openPokeCart(pokecolor, i){
    document.getElementById('poke-dialog').style.display = "flex";
    document.getElementById('poke-dialog').innerHTML += 
    `<div id='dialog-cart' class='dialog-cart' style="background-color: ${pokecolor};">
        <div class="dialog-cart-main-infos">
            <div id='dialog-cart-main-infos-left'>
                <button class="go-back-btn"><img class="go-back-btn-img" src="./img/arrow-27324_1280.png"></button>
                <h2>${ responsesAsJson[i].forms[0].name}</h2>
            </div>
            <div>
                <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25 40s15-11 15-20c0-6-4-10-9-10-4 0-7 3-9 7-2-4-5-7-9-7-5 0-9 4-9 10 0 9 15 20 15 20z" fill="none" stroke="white" stroke-width="3" />
                </svg>
                <p>#00${i}</p>
            </div>
        </div>
        <img id="poke-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i+1}.svg" class="poke-dialog-img">
        <div id='dialog-cart-info' class='dialog-cart-info'>
        </div>
    </div>`;

    renderTypes(i, 'dialog-cart-main-infos-left');
}