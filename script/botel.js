let boolProduitExist = false;

const NOM_PRODUIT = "The botel";
const LISTE_PRODUIT = "produit";
const PRIX_PRODUIT = 3.99;
const NOM_IMAGE = "bottle.png";
let indice = 0;

let listePanier = [];
if(localStorage.getItem(LISTE_PRODUIT, listePanier) != null){
    listePanier = JSON.parse(localStorage.getItem(LISTE_PRODUIT, listePanier));

    for(let i = 0; i < listePanier.length; i++){
        if(listePanier[i].nom == NOM_PRODUIT){
            indice = i;
            boolProduitExist = true;
        }
    }

    /*while(listePanier[indice].nom != NOM_PRODUIT){
        indice++;
    }*/
}

updateNotification();
/******************************************************/

const HAMBURGER_BUTTON = document.getElementById("hamburgerButton");
const HAMBURGER_MENU = document.getElementById("hamburgerMenu");
const HAMBURGER_CLOSE = document.getElementById("close");

HAMBURGER_BUTTON.addEventListener("click", () =>{
    HAMBURGER_MENU.style.display = "flex";
});

HAMBURGER_CLOSE.addEventListener("click", () =>{
    HAMBURGER_MENU.style.display = "none";
});

/***********************************************************/

const REMOVE = document.getElementById("remove");
const ADD = document.getElementById("add");
const QUANTITY = document.getElementById("quantity");
const PRICE = document.getElementById("price");

let quantityOfProduct = 1;
quantityOfProduct = returnQuantityvalue();
PRICE.innerHTML = "Prix: " + (quantityOfProduct*PRIX_PRODUIT).toFixed(2) + "€"; 


ADD.addEventListener("click", () =>{
    if(quantityOfProduct >= 100){
        quantityOfProduct = 100;
    } else{
        quantityOfProduct++;
    }
    PRICE.innerHTML = "Prix: " +  (quantityOfProduct*PRIX_PRODUIT).toFixed(2) + "€";
    QUANTITY.value = quantityOfProduct;
});

REMOVE.addEventListener("click", () =>{
    if(quantityOfProduct <= 1){
        quantityOfProduct = 1;
    } else{
        quantityOfProduct--;
    }
    PRICE.innerHTML = "Prix: " + (quantityOfProduct*PRIX_PRODUIT).toFixed(2) + "€";
    QUANTITY.value = quantityOfProduct;
});

QUANTITY.addEventListener("change", () =>{
    quantityOfProduct = returnQuantityvalue();
    PRICE.innerHTML = "Prix: " + (quantityOfProduct*PRIX_PRODUIT).toFixed(2) + "€";
    QUANTITY.value = quantityOfProduct;
});

function returnQuantityvalue(){
    let valid = parseInt(QUANTITY.value);
    if(isNaN(valid)){
        valid = quantityOfProduct;
    } else{
        if(valid >= 100){
            valid = 100;
        }
        if(valid <= 1){
            valid = 1;
        }
    }
    return valid;
}

/****************************************** */

const ADD_TO_CART = document.getElementById("addToCart");

ADD_TO_CART.addEventListener("click", () =>{
    if(!boolProduitExist){
        boolProduitExist = true;
        let produit = {
            nom : NOM_PRODUIT,
            prix : PRIX_PRODUIT,
            quantite : quantityOfProduct,
            image : NOM_IMAGE
        }
        indice = listePanier.length;

        listePanier.push(produit);
        localStorage.setItem(LISTE_PRODUIT, JSON.stringify(listePanier));
    } else{
        listePanier[indice].quantite += quantityOfProduct;
        if(listePanier[indice].quantite >= 100){
            listePanier[indice].quantite = 100;
            window.alert("Pour des raisons personnelles, j'ai mis la limite à 100. Et vous êtes à 100 objets de ce type dans votre panier.")
        }
        localStorage.setItem(LISTE_PRODUIT, JSON.stringify(listePanier));
    }
    updateNotification();

    const NOTIFICATION_AJOUT = document.querySelector(".notificationAjoutPanier");
    NOTIFICATION_AJOUT.style.display = "flex";
    NOTIFICATION_AJOUT.classList.add("notificationAjoutPanierAnimation");

    setTimeout(() => {
        NOTIFICATION_AJOUT.style.display = "none";
        NOTIFICATION_AJOUT.classList.remove("notificationAjoutPanierAnimation");
    }, 1750);
});

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