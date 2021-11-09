const HAMBURGER_BUTTON = document.getElementById("hamburgerButton");
const HAMBURGER_MENU = document.getElementById("hamburgerMenu");
const HAMBURGER_CLOSE = document.getElementById("close");

HAMBURGER_BUTTON.addEventListener("click", () =>{
    HAMBURGER_MENU.style.display = "flex";
});

HAMBURGER_CLOSE.addEventListener("click", () =>{
    HAMBURGER_MENU.style.display = "none";
});


const LISTE_PRODUIT = "produit";
let listePanier = [];

if(localStorage.getItem(LISTE_PRODUIT, listePanier) != null){
    listePanier = JSON.parse(localStorage.getItem(LISTE_PRODUIT, listePanier));
    updateNotification();
} else{
    console.log("nom d'un petit bonhome");
}

function updateNotification(){
    const NOTIFICATION = document.querySelectorAll(".notif");
    let nbrNotif = 0;
    for(let i = 0; i < listePanier.length; i++){
        nbrNotif += listePanier[i].quantite;
    }

    for(let i = 0; i < NOTIFICATION.length; i++){
        NOTIFICATION[i].innerHTML = nbrNotif;
    }
}