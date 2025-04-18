/**
 * Stores the Pokémon responses as JSON.
 * @type {Array}
 */
let responsesAsJson = []; 

/**
 * Stores the Pokémon elements that match the search query.
 * @type {Array}
 */
let searchedElements = [];

/**
 * The starting index for the Pokémon to be fetched.
 * @type {number}
 */
let startPokeNumber = 0;

/**
 * The current ending index for the fetched Pokémon.
 * @type {number}
 */
let courrentPokeNumber = 30;

/**
 * HTML code for the evolution from a Pokémon.
 * @type {string}
 */
let evolutionFromHtmlCode = ''; 

/**
 * HTML code for the evolution to a Pokémon.
 * @type {string}
 */
let evolutionToHtmlCode = ''; 

/**
 * Stores information about the evolution.
 * @type {Array}
 */
let evolvesInfos = [];

/**
 * Mapping of Pokémon types to their respective colors.
 * @type {Object}
 */
const colours = {
    normal: '#C1C88F',
    fire: '#F6B68D',
    water: '#A0B9F9',
    electric: '#F8E57D',
    grass: '#A9D87B',
    ice: '#B8E4E2',
    fighting: '#E1A58B',
    poison: '#D8A2C8',
    ground: '#F0D48A',
    flying: '#B6A9F6',
    psychic: '#F4A6B7',
    bug: '#D4E88D',
    rock: '#D3C57C',
    ghost: '#A49AC8',
    dragon: '#B4A7F6',
    dark: '#B6A68C',
    steel: '#D1D4E7',
    fairy: '#F1B7D2',
};

/**
 * Colors for progress bars representing different stats.
 * @type {Array}
 */
const progressColors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)'
];

/**
 * Initializes the app by fetching Pokémon data.
 */
function init(){
    fetchPokes();
}

/**
 * Fetches Pokémon data from the API and stores it.
 * @async
 */
async function fetchPokes() {
    document.getElementById('main-content').innerHTML = '<img class="pokeball-img" src="./img/pokemon-1635610_1280.png">';
    for (let i = startPokeNumber + 1; i <= courrentPokeNumber; i++) {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        let responseAsJson = await response.json();
        responsesAsJson.push(responseAsJson);
    }
    renderAllPokes();
}

/**
 * Renders all fetched Pokémon on the page.
 */
function renderAllPokes(){
    document.getElementById('main-content').innerHTML = '';
    for (let i = 0; i < courrentPokeNumber; i++){
        renderPoke(i);
    }
    document.getElementById('load-more-btn').style.display = 'flex';
}

/**
 * Renders Pokémon that match the search query.
 */
function rendersearchPokes(){
    if (!searchedElements.length) {
        document.getElementById('main-content').innerHTML = '<p class="error-text">there is no Pokemon with this name</p>';
    } else {
        document.getElementById('main-content').innerHTML = '';
        searchedElements.forEach(item => {
            renderPoke(item.index);
        });
    }
    document.getElementById('load-more-btn').style.display = 'none';
}

/**
 * Renders a single Pokémon on the page.
 * @param {number} i - The index of the Pokémon in the array.
 */
function renderPoke(i){
    let pokeName = responsesAsJson[i].forms[0].name.charAt(0).toUpperCase() + responsesAsJson[i].forms[0].name.slice(1);
    let pokeType = responsesAsJson[i].types[0].type.name;
    document.getElementById('main-content').innerHTML += mainContentHtmlCode(i, pokeType, pokeName);
    renderTypes(i, `type-infos${i}`);
}

/**
 * Renders the types of a specific Pokémon.
 * @param {number} i - The index of the Pokémon in the array.
 * @param {string} elementId - The HTML element ID to display the types.
 */
function renderTypes(i, elementId){
    for (let index = 0; index < responsesAsJson[i].types.length; index++) {
        let pokeType = responsesAsJson[i].types[index].type.name;
        document.getElementById(elementId).innerHTML += 
        `<div id="cart-btn" class="type-container">${pokeType}</div>`;
    }
}

/**
 * Opens the Pokémon details in a dialog window.
 * @param {number} i - The index of the Pokémon in the array.
 * @async
 */
async function openPokeCart(i){
    let pokeColor = colours[responsesAsJson[i].types[0].type.name];
    document.getElementById('poke-dialog').style.display = "flex";
    document.getElementById('poke-dialog').innerHTML = "";
    await getEvolutionContainerHtmlCode(i);
    document.getElementById('poke-dialog').innerHTML += createDialogCart(pokeColor, i);
    let statValues = getBaseStatsValuesArray(i);
    changeProgressWidth(statValues);
    setProgressvalue(statValues);
    setProgressColor(statValues);
    renderTypes(i, 'dialog-cart-types');
}

/**
 * Retrieves the base stats of a Pokémon as an array.
 * @param {number} i - The index of the Pokémon in the array.
 * @returns {Array<number>} An array of the Pokémon's base stat values.
 */
function getBaseStatsValuesArray(i){
    let arr = [];
    for (let index = 0; index < responsesAsJson[i].stats.length; index++) {
        arr.push(responsesAsJson[i].stats[index].base_stat);
    }
    return arr;
}

/**
 * Retrieves the abilities of a Pokémon as a string.
 * @param {number} i - The index of the Pokémon in the array.
 * @returns {string} A string containing the Pokémon's abilities.
 */
function getAbilities(i){
    let abilities = '';
    let separator;
    for (let index = 0; index < responsesAsJson[i].abilities.length; index++) {
        if (index === responsesAsJson[i].abilities.length - 1) {
            separator = '';
        } else {
            separator = ', ';
        }
        abilities += responsesAsJson[i].abilities[index].ability.name + separator;
    }
    return abilities;
}

/**
 * Retrieves the weight of a Pokémon.
 * @param {number} i - The index of the Pokémon in the array.
 * @returns {number} The Pokémon's weight.
 */
function getWeight(i){
    return responsesAsJson[i].weight;
}

/**
 * Retrieves the height of a Pokémon.
 * @param {number} i - The index of the Pokémon in the array.
 * @returns {number} The Pokémon's height.
 */
function getHeight(i){
    return responsesAsJson[i].height;
}

/**
 * Closes the Pokémon details dialog.
 */
function closeDialogCart(){
    document.getElementById('poke-dialog').style.display = "none";
}

/**
 * Selects a menu item and displays the corresponding container.
 * @param {string} selectedItem - The ID of the selected menu item.
 * @param {string} selectedContainer - The ID of the container to display.
 */
function selectMenuItem(selectedItem, selectedContainer) {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => item.style.textDecoration = 'none');
    document.getElementById(selectedItem).style.textDecoration = 'underline';
    document.getElementById('about-container').style.display = 'none';
    document.getElementById('base-stats-container').style.display = 'none';
    document.getElementById('evolution-container').style.display = 'none';
    document.getElementById('moves-container').style.display = 'none';
    document.getElementById(selectedContainer).style.display = 'flex';
}

/**
 * Sets the width of the progress bars based on Pokémon stats.
 * @param {Array<number>} ProgressWidth - An array containing the progress values.
 */
function changeProgressWidth(ProgressWidth) {
    for (let index = 0; index < ProgressWidth.length; index++) {
        let id = `progress-bar${index + 1}`;
        let element = document.getElementById(id);
        element.style.width = `${ProgressWidth[index]}%`;
    }
}

/**
 * Sets the stat values in the progress bars.
 * @param {Array<number>} ProgressValues - An array containing the stat values.
 */
function setProgressvalue(ProgressValues) {
    for (let index = 0; index < ProgressValues.length; index++) {
        let id = `base-stats-value${index + 1}`;
        let element = document.getElementById(id);
        element.innerHTML = ProgressValues[index];
    }
}

/**
 * Sets the colors of the progress bars based on the stats.
 * @param {Array<number>} ProgressValues - An array containing the stat values.
 */
function setProgressColor(ProgressValues) {
    for (let index = 0; index < ProgressValues.length; index++) {
        let id = `progress-bar${index + 1}`;
        let element = document.getElementById(id);
        element.style.backgroundColor = progressColors[index];
    }
}

/**
 * Navigates to the previous Pokémon in the list.
 * @param {number} i - The current Pokémon index.
 */
function back(i){
    if (i) {
        openPokeCart(i - 1);
    } else {
        openPokeCart(courrentPokeNumber - 1);
    }
}

/**
 * Navigates to the next Pokémon in the list.
 * @param {number} i - The current Pokémon index.
 */
function next(i){
    if (i < courrentPokeNumber - 1) {
        openPokeCart(i + 1);
    } else {
        openPokeCart(0);
    }
}

/**
 * Loads more Pokémon from the API.
 * @async
 */
async function loadMore(){
    document.getElementById('load-more-btn').style.display = 'none';
    startPokeNumber = courrentPokeNumber;
    courrentPokeNumber += 30;
    await fetchPokes();
}

/**
 * Toggles the visibility of the search field.
 */
function openSearchField(){
    let searchContainer = document.getElementById('search-container');
    if (searchContainer.style.display === 'flex') {
        searchContainer.style.display = 'none';
    } else {
        searchContainer.style.display = 'flex';
    }
}

/**
 * Handles changes in the search input field and filters the Pokémon.
 * @param {Event} event - The input event triggered by the search field.
 */
function handleInputChange(event){
    let inputValue = event.target.value;
    inputValue = inputValue.trim().toLowerCase();
    if (inputValue === '') {
        renderAllPokes();
    } else if (inputValue.length > 2) {
        searchedElements = responsesAsJson.map((element, index) => ({
            element,
            index
        })).filter(item => item.element.forms[0].name.startsWith(inputValue));
        rendersearchPokes();
    }
}

/**
 * Retrieves the evolutionary information of a Pokémon.
 * @param {number} i - The index of the Pokémon.
 * @async
 * @returns {Array} An array containing evolution information.
 */
async function getEvolutions(i){
    let fromResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}/`);
    let fromResponseAsJson = await fromResponse.json();
    let toResponse = await fetch(`${fromResponseAsJson.evolution_chain.url}`);
    let toResponseAsJson = await toResponse.json();
    fillEvolvesInfosWithFrom(fromResponseAsJson);
    fillEvolvesInfosWithTo(toResponseAsJson);
    return evolvesInfos;
}

/**
 * Fills the evolution information with the 'from' Pokémon data.
 * @param {Object} fromResponseAsJson - The 'from' evolution data.
 */
function fillEvolvesInfosWithFrom(fromResponseAsJson){
    if (fromResponseAsJson.evolves_from_species) {
        let evolvesFromName = fromResponseAsJson.evolves_from_species.name;
        let evolvesFromId = fromResponseAsJson.evolves_from_species.url.slice(42).replace('/', '');
        evolvesInfos = [evolvesFromId, evolvesFromName];
    } else {
        evolvesInfos[0] = '';
        evolvesInfos[1] = '';
    }
}

/**
 * Fills the evolution information with the 'to' Pokémon data.
 * @param {Object} toResponseAsJson - The 'to' evolution data.
 */
function fillEvolvesInfosWithTo(toResponseAsJson){
    if (toResponseAsJson.chain.evolves_to[0].evolves_to[0]) {
        evolvesInfos[2] = toResponseAsJson.chain.evolves_to[0].evolves_to[0].species.name;
        evolvesInfos[3] = toResponseAsJson.chain.evolves_to[0].evolves_to[0].species.url.slice(42).replace('/', '');
    } else {
        evolvesInfos[2] = toResponseAsJson.chain.evolves_to[0].species.name;
        evolvesInfos[3] = toResponseAsJson.chain.evolves_to[0].species.url.slice(42).replace('/', '');
    }
}
