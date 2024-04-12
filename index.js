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
            selectionImgSrc = selections[i].firstElementChild.src.match("img.*")[0].trim();
            changeGameImg(selectionImgSrc);

        });
    }
}

function changeGameImg(selectionImgSrc) {
    for (const game of jsonData) {
        if (selectionImgSrc == game.imgSelection) {
            let gameImg = document.querySelector(".games__info-img");
            gameImg.src = game.imgSrc;
            gameImg.alt = game.title;
        }
    }
}

main();