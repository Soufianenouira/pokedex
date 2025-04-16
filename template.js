
function createDialogCart(pokeColor, i){
    
    let htmlCode =
    `<div id='dialog-cart' class='dialog-cart' style="background-color: ${pokeColor};">
        <div class="dialog-cart-main-infos">
            <div id='dialog-cart-main-infos-left'>
                <button class="dialog-close-btn" onclick="closeDialogCart()">X</button>
                <h2>${ responsesAsJson[i].forms[0].name.charAt(0).toUpperCase() + responsesAsJson[i].forms[0].name.slice(1)}</h2>
                <div id='dialog-cart-types'></div>
            </div>
            <div>
                <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25 40s15-11 15-20c0-6-4-10-9-10-4 0-7 3-9 7-2-4-5-7-9-7-5 0-9 4-9 10 0 9 15 20 15 20z" fill="none" stroke="white" stroke-width="3" />
                </svg>
                <p>#00${i+1}</p>
            </div>
        </div>
        <div class='dialog-cart-img'>
            <img id="poke-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i+1}.svg" class="poke-dialog-img">
        </div>
        <div id='dialog-cart-info' class='dialog-cart-info'>
            <div class="menu">
                <a id="menu-item1" class="menu-item" onclick="selectMenuItem('menu-item1', 'about-container')" style="text-decoration: underline;">About</a>
                <a id="menu-item2" class="menu-item" onclick="selectMenuItem('menu-item2', 'base-stats-container')">Base Stats</a>
                <a id="menu-item3" class="menu-item" onclick="selectMenuItem('menu-item3', 'evolution-container')">Evolution</a>
                
            </div>
            <div id='about-container'>
                ${getAboutContainerHtmlCode(i)}
            </div>
            <div id='base-stats-container'>
                ${getBaseStatsContainerHtmlCode(i)}
            </div>
            <div id='evolution-container'>
                ${evolutionFromHtmlCode}
                <div>
                    <p class='text-align'>${ responsesAsJson[i].forms[0].name}</p>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i+1}.svg" class="poke-img">
                </div>
                ${evolutionToHtmlCode}
            </div>
            <div id='moves-container'>
                moves${getMovesContainerHtmlCode(i)}
            </div>
            <div class='back-next-btns'>
            <button class='back-next-btn' onclick='back(${i})'>←</button>
            <button class='back-next-btn' onclick='next(${i})'>→</button>
            </div>
        </div>
    </div>`;

    return htmlCode;
}

function getBaseStatsContainerHtmlCode(i){
    let htmlCode = 
    `
    <table>
        <tr>
            <td class='text-color-bcbfbf'>HP</td>
            <td id='base-stats-value1'></td>
            <td>
                <div class="progress-bar-container">
                    <div id='progress-bar1' class="progress-bar"  width="30px"></div>
                </div>
                
            </td>
        </tr>
        <tr>
            <td class='text-color-bcbfbf'>Attack</td>
            <td id='base-stats-value2'></td>
            <td>
                <div class="progress-bar-container">
                    <div id='progress-bar2' class="progress-bar"></div>
                </div>
                
            </td>
        </tr>
        <tr>
            <td class='text-color-bcbfbf'>Defense</td>
            <td id='base-stats-value3'></td>
            <td>
                <div class="progress-bar-container">
                    <div id='progress-bar3' class="progress-bar"></div>
                </div>
                
            </td>
        </tr>
        <tr>
            <td class='text-color-bcbfbf'>Sp. Atk</td>
            <td id='base-stats-value4'></td>
            <td>
                <div class="progress-bar-container">
                    <div id='progress-bar4' class="progress-bar"></div>
                </div>
                
            </td>
        </tr>
        <tr>
            <td class='text-color-bcbfbf'>Sp. Def</td>
            <td id='base-stats-value5'></td>
            <td>
                <div class="progress-bar-container">
                    <div id='progress-bar5' class="progress-bar"></div>
                </div>
                
            </td>
        </tr>
        <tr>
            <td class='text-color-bcbfbf'>Speed</td>
            <td id='base-stats-value6'></td>
            <td>
                <div class="progress-bar-container">
                    <div id='progress-bar6' class="progress-bar"></div>
                </div>
                
            </td>
        </tr>
    </table>`;
    return htmlCode;
}

async function getEvolutionContainerHtmlCode(i){
    let evolvesFromInfos = await getEvolutions(i+1);
    if (evolvesFromInfos[0] != ''){
        evolutionFromHtmlCode = 
        `<div>
            <p class='text-align'>${evolvesFromInfos[1]}</p>
            <div class='display-flex-center'><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${evolvesFromInfos[0]}.svg" class="poke-img">→</div>
        </div>`;
    }else{
        evolutionFromHtmlCode = '';
    }
    if(evolvesFromInfos[2] != responsesAsJson[i].forms[0].name){
        evolutionToHtmlCode = 
            `<div>
                <p class='text-align'>${evolvesFromInfos[2]}</p>
                <div class='display-flex-center'>→<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${evolvesFromInfos[3]}.svg" class="poke-img"></div>
            </div>`;
    }else{
        evolutionToHtmlCode = '';
    }
}

function getMovesContainerHtmlCode(i){
    let htmlCode = ``;
}

function getAboutContainerHtmlCode(i){
    let htmlCode = 
    `
    <table>
        <tr>
            <td class='text-color-bcbfbf'>Species</td>
            <td>${ responsesAsJson[i].forms[0].name.charAt(0).toUpperCase() + responsesAsJson[i].forms[0].name.slice(1)}</td>
        </tr>
        <tr>
            <td class='text-color-bcbfbf'>Height</td>
            <td>${getHeight(i)}</td>
        </tr>
        <tr>
            <td class='text-color-bcbfbf'>weight</td>
            <td>${getWeight(i)}</td>
        </tr>
        <tr>
            <td class='text-color-bcbfbf'>Abilities</td>
            <td>${getAbilities(i)}</td>
        </tr>
    </table>`;
    return htmlCode;
}

function mainContentHtmlCode(i, pokeType, pokeName){
    let htmlCode =
    ` <div id="poke-cart${i}" class = "cart" onclick="openPokeCart(${i})" style="background-color: ${colours[pokeType]};">
    <h3 id="poke-name">${pokeName}</h3>
    <div class="infos">
        <div id="type-infos${i}" class="type-infos"></div>
        <div class="poke-img-container">
        <img id="poke-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i+1}.svg" class="poke-img">
        </div>
    </div>
</div>`;
return htmlCode;
}