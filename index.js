let jsonData;

function main() {
    getJsonData();
    toggleNav();
    toggleGamesSelection();
    addSelectionEvts();
}

function changeText (variable, desiredText) {
    variable.textContent = desiredText;
}

function getJsonData() {
    fetch('games.json')
        .then(response => response.json())
        .then(data => {
            jsonData = data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function toggleNav() {
    const navToggle = document.querySelector(".nav__toggle");
    const nav = document.querySelector(".nav");

    navToggle.addEventListener("click", () => {
        nav.classList.toggle("visible");
    })
}

function toggleGamesSelection() {
    const btn = document.querySelector(".games__released-btn");
    const selections = document.querySelectorAll(".games__released-selection");
    
    btn.addEventListener("click", () => {
        for (let i = 1; i < selections.length; i++) {
            selections[i].classList.toggle("visible-inline-block");
        }
        
        if (btn.textContent.toLowerCase() == "show more") {
            changeText(btn, "Hide");
        } 
        else {
            changeText(btn, "Show More");
        }
    })
}

function addSelectionEvts() {
    const selections = document.querySelectorAll(".games__released-selection");

    for (let i = 0; i < selections.length; i++) {
        selections[i].addEventListener("click", () => {
            // Will use the img src as comparison to grab correct info from JSON data
            selectionImgSrc = selections[i].firstElementChild.src.match("img.*")[0].trim();
            changeGameInfo(selectionImgSrc);
        });
    }
}

function changeGameInfo(selectionImgSrc) {
    for (const game of jsonData) {
        if (selectionImgSrc == game.imgSelection) {
            changeGameImg(game)
            changeGameVersion(game.versions, game.colors)
            changeCategoryInfo(game.releaseYrs, game.consoles, game.text)
        }
    }
}

function changeGameImg(game) {
    let gameImg = document.querySelector(".games__info-img");
    gameImg.src = game.imgSrc;
    gameImg.alt = game.title;
}

function changeGameVersion(versions, colors) {
    // Must consider games with only 1 version + special case: PSMD

    // For 2 and 1 version games

    // Target games__info-item via games__info-text (parent) b/c games__info-item not unique
    let gameInfo = document.querySelector(".games__info-text").firstElementChild;
    removeChildren(gameInfo, "games__info-version");

    // Create and add version(s) of the game selected
    for (let i = 0; i < versions.length; i++) {
        // Add the version, color, and text for each new element made
        let p = createVersion(versions[i], colors[i], "games__info-version", "p");

        // Insert into parent
        gameInfo.appendChild(p);
    }

    // PSMD
    // querySelector the games__info-item[0]
    // Delete ALL children
    // create just 1 p with .games__info-version class
    // maybe have its own special color

}

function removeChildren(parent, className) {
    // Delete the children that includes ..-version in class name
    for (let i = parent.children.length - 1; i > 0; i--) {
        let child = parent.children[i];
        if (child.classList.contains(className)) {
            child.remove();
        }
    }
}

function createVersion(version, color, className, tag) {
    let elem = document.createElement(tag);
    elem.classList.add(className, `${className}--${color}`);
    elem.textContent = version;

    return elem;
}

function changeCategoryInfo(releaseYrs, consoles, text) {
    let infoArr = [releaseYrs, consoles, text];
    let categoryInfo = document.querySelectorAll(".category-info");
    
    for (let i = 0; i < categoryInfo.length; i++) {
        categoryInfo[i].textContent = infoArr[i];
    }
}

main();