function changeText (variable, desiredText) {
    variable.textContent = desiredText;
}

function toggleNav() {
    const navToggle = document.querySelector(".nav__toggle");
    const nav = document.querySelector(".nav");

    navToggle.addEventListener("click", () => {
        nav.classList.toggle("visible");
    })
}
toggleNav();

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
toggleGamesSelection();