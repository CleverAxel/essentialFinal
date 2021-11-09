const HAMBURGER_BUTTON = document.getElementById("hamburgerButton");
const HAMBURGER_MENU = document.getElementById("hamburgerMenu");
const HAMBURGER_CLOSE = document.getElementById("close");

HAMBURGER_BUTTON.addEventListener("click", () =>{
    HAMBURGER_MENU.style.display = "flex";
});

HAMBURGER_CLOSE.addEventListener("click", () =>{
    HAMBURGER_MENU.style.display = "none";
});

/***************************************************************/

const CONTAIN_PANIER = document.getElementById("containPanier");
const LISTE_PRODUIT = "produit";
let listePanier = [];

if(localStorage.getItem(LISTE_PRODUIT, listePanier) != null){
    listePanier = JSON.parse(localStorage.getItem(LISTE_PRODUIT, listePanier));
    main();
} else{
    console.log("nom d'un petit bonhome");
}

function main(){
    for(let i = 0; i < listePanier.length; i++){
        /*console.log("Nom du produit : " + listePanier[i].nom);
        console.log("prix du produit : " + listePanier[i].prix);
        console.log("quantite du produit : " + listePanier[i].quantite);
        console.log("image du produit : " + listePanier[i].image);
        console.log("-----------------------")*/
        if(listePanier[i].quantite > 0){
            createRow(listePanier[i]);
        }
    }
}

/****************************MENU MOBILE PANIER*********************************** */
const CLOSE_DETAIL_PANIER = document.getElementById("closeDetailPanier");
const DETAIL_PANIER = document.getElementById("detailPanier");

const ITEM = document.querySelectorAll(".item");
const PANIER_VIDE = document.querySelector(".panierVide");
const TOTAL_CONTENU_PANIER = document.querySelector(".totalContenuPanier");
if(ITEM[0] == undefined){
    PANIER_VIDE.style.display = "flex";
    TOTAL_CONTENU_PANIER.style.display = "none";
}

CLOSE_DETAIL_PANIER.addEventListener("click", () =>{
    DETAIL_PANIER.style.display = "none";
})

for(const LISTE_ITEM of ITEM){
    const INFO = LISTE_ITEM.querySelector(".info");
    INFO.addEventListener("click", () =>{
        const NOM_PRODUIT_AFFICHE = LISTE_ITEM.querySelector(".nomProduitPanier");
        const QUANTITE_PRODUIT_AFFICHE = LISTE_ITEM.querySelector(".quantiteProduitPanier"); //VALUE
        const PRIX_PRODUIT_AFFICHE = LISTE_ITEM.querySelector(".prixProduitPanier");
        const TOTAL_PRODUIT_AFFICHE = LISTE_ITEM.querySelector(".totalProduitPanier");

        /*Que dieu me pardonne pour un deux trois quatre*/
        let un = document.querySelector(".nomProduitPanierDetail");
        un.innerHTML = NOM_PRODUIT_AFFICHE.innerHTML;

        let deux = document.querySelector(".quantiteProduitPanierDetail");
        deux.innerHTML = "Quantité : "+ QUANTITE_PRODUIT_AFFICHE.value + "<span id=\"editDetailPanier\">&#9998;</span>";

        let trois = document.querySelector(".prixProduitPanierDetail");
        trois.innerHTML = PRIX_PRODUIT_AFFICHE.innerHTML;

        let quatre = document.querySelector(".totalProduitPanierDetail");
        quatre.innerHTML = TOTAL_PRODUIT_AFFICHE.innerHTML;

        DETAIL_PANIER.style.display = "flex";
    });
/***************************************AJOUTER RETIRER DIRECTEMENT DANS PANIER DANS NON MOBILE********************** */

    const REMOVE = LISTE_ITEM.querySelector(".remove");
    REMOVE.addEventListener("click", () =>{
        const QUANTITE_PRODUIT_AFFICHE = LISTE_ITEM.querySelector(".quantiteProduitPanier");
        const NOM_PRODUIT = LISTE_ITEM.querySelector(".nomProduitPanier");
        const TOTAL_PRODUIT_AFFICHE = LISTE_ITEM.querySelector(".totalProduitPanier");
        let indice = 0;

        while(listePanier[indice].nom != NOM_PRODUIT.innerHTML){
            indice++;
        }
        
        listePanier[indice].quantite--;
        if(listePanier[indice].quantite <= 1){
            listePanier[indice].quantite = 1;
        }
        QUANTITE_PRODUIT_AFFICHE.value = "x"+listePanier[indice].quantite;
        TOTAL_PRODUIT_AFFICHE.innerHTML = "Total : "+(listePanier[indice].quantite * listePanier[indice].prix).toFixed(2) + "€";
        localStorage.setItem(LISTE_PRODUIT, JSON.stringify(listePanier));
        updateTotalPanier();
        updateNotification();
    });

    const ADD = LISTE_ITEM.querySelector(".add");
    ADD.addEventListener("click", () =>{
        const QUANTITE_PRODUIT_AFFICHE = LISTE_ITEM.querySelector(".quantiteProduitPanier");
        const NOM_PRODUIT = LISTE_ITEM.querySelector(".nomProduitPanier");
        const TOTAL_PRODUIT_AFFICHE = LISTE_ITEM.querySelector(".totalProduitPanier");
        let indice = 0;

        while(listePanier[indice].nom != NOM_PRODUIT.innerHTML){
            indice++;
        }
        
        listePanier[indice].quantite++;
        if(listePanier[indice].quantite >= 100){
            listePanier[indice].quantite = 100;
        }
        QUANTITE_PRODUIT_AFFICHE.value = "x"+listePanier[indice].quantite;
        TOTAL_PRODUIT_AFFICHE.innerHTML = "Total : "+(listePanier[indice].quantite * listePanier[indice].prix).toFixed(2) + "€";
        localStorage.setItem(LISTE_PRODUIT, JSON.stringify(listePanier));
        updateTotalPanier();
        updateNotification();
    });

    const MODIF_QUANTITE = LISTE_ITEM.querySelector(".quantiteProduitPanier");
    MODIF_QUANTITE.addEventListener("change", () =>{
        const QUANTITE_PRODUIT_AFFICHE = LISTE_ITEM.querySelector(".quantiteProduitPanier");
        const NOM_PRODUIT = LISTE_ITEM.querySelector(".nomProduitPanier");
        const TOTAL_PRODUIT_AFFICHE = LISTE_ITEM.querySelector(".totalProduitPanier");
        
        let indice = 0;

        while(listePanier[indice].nom != NOM_PRODUIT.innerHTML){
            indice++;
        }

        let nouvelleValeur = parseInt(QUANTITE_PRODUIT_AFFICHE.value);
        if(isNaN(nouvelleValeur)){
            QUANTITE_PRODUIT_AFFICHE.value = "x"+listePanier[indice].quantite;
        } else{
            if(nouvelleValeur >= 100){
                nouvelleValeur = 100;
            }
            if(nouvelleValeur <= 1){
                nouvelleValeur = 1;
            }
            listePanier[indice].quantite = nouvelleValeur;
            QUANTITE_PRODUIT_AFFICHE.value = "x"+listePanier[indice].quantite;
            TOTAL_PRODUIT_AFFICHE.innerHTML = "Total : "+(listePanier[indice].quantite * listePanier[indice].prix).toFixed(2) + "€";
            localStorage.setItem(LISTE_PRODUIT, JSON.stringify(listePanier));
            updateTotalPanier();
            updateNotification();
        }
    });
    /****************************SUPPRIMER ITEM******************************** */
    const DELETE = LISTE_ITEM.querySelector(".delete");
    DELETE.addEventListener("click", () =>{
        const NOM_PRODUIT = LISTE_ITEM.querySelector(".nomProduitPanier");
        let indice = 0;

        while(listePanier[indice].nom != NOM_PRODUIT.innerHTML){
            indice++;
        }
        
        listePanier[indice].quantite = 0;
        localStorage.setItem(LISTE_PRODUIT, JSON.stringify(listePanier));
        CONTAIN_PANIER.removeChild(LISTE_ITEM);
        
        let objetRestantPanier = document.querySelector(".item");
        if(objetRestantPanier == null){
            PANIER_VIDE.style.display = "flex";
            TOTAL_CONTENU_PANIER.style.display = "none";
        }
        updateTotalPanier();
        updateNotification();
    });
}
updateTotalPanier();
updateNotification();
/**********************************CREATION LISTE PANIER**********************************************/

function createRow(detailObjet){
    let divItem = document.createElement("div");
    divItem.classList.add("item");

    let iconeProduit = document.createElement("img");
    let srcIcone = document.createAttribute("src");
    iconeProduit.setAttributeNode(srcIcone);
    iconeProduit.src = "../images/" + detailObjet.image;

    divItem.appendChild(iconeProduit);

    let nomProduitPanier = document.createElement("h3");
    nomProduitPanier.classList.add("nomProduitPanier");
    nomProduitPanier.innerHTML = detailObjet.nom;

    divItem.appendChild(nomProduitPanier);

    /*BOUTON*/
    let boutonRemove = document.createElement("button");
    /*let idRemove = document.createAttribute("id");
    boutonRemove.setAttributeNode(idRemove);
    boutonRemove.id = "remove";*/
    boutonRemove.classList.add("remove");
    boutonRemove.innerHTML = "&#8249;";

    divItem.appendChild(boutonRemove);

    let inputQuantity = document.createElement("input");
    let typeInput = document.createAttribute("type");
    typeInput.value = "text";
    inputQuantity.setAttributeNode(typeInput);

    let valueInput = document.createAttribute("value");
    valueInput.value = "x"+detailObjet.quantite;
    inputQuantity.setAttributeNode(valueInput);

    inputQuantity.classList.add("quantiteProduitPanier");

    divItem.appendChild(inputQuantity);

    let boutonAdd = document.createElement("button");
    /*let idAdd = document.createAttribute("id");
    boutonAdd.setAttributeNode(idAdd);
    boutonAdd.id = "add";*/
    boutonAdd.classList.add("add");
    boutonAdd.innerHTML = "&#8250;";

    divItem.appendChild(boutonAdd);
    /******************************/

    let prixProduitPanier = document.createElement("section");
    prixProduitPanier.classList.add("prixProduitPanier");
    prixProduitPanier.innerHTML = "Prix/U : "+detailObjet.prix + "€";

    divItem.appendChild(prixProduitPanier);

    let totalProduitPanier = document.createElement("section");
    totalProduitPanier.classList.add("totalProduitPanier");
    totalProduitPanier.innerHTML = "Total : "+(detailObjet.quantite * detailObjet.prix).toFixed(2) + "€";

    divItem.appendChild(totalProduitPanier);
    
    let info = document.createElement("span");
    info.classList.add("info");
    info.innerHTML = "&#8505;"

    divItem.appendChild(info);

    let delete_ = document.createElement("span");
    delete_.classList.add("delete");
    delete_.innerHTML = "&#10006;"

    divItem.appendChild(delete_);

    CONTAIN_PANIER.appendChild(divItem);
}


/********************PAYER CONTENU PANIER********************* */
const PAYER_CONTENU_PANIER = document.getElementById("payerContenuPanier");
PAYER_CONTENU_PANIER.addEventListener("click", () =>{
    window.alert("Bon, le temps me manque pour faire une interface de payement. Disons que vous avez tout payé.");

    PANIER_VIDE.style.display = "flex";
    TOTAL_CONTENU_PANIER.style.display = "none";

    for(let i = 0; i < ITEM.length; i++){
        CONTAIN_PANIER.removeChild(ITEM[i]);
    }

    for(let i = 0; i < listePanier.length; i++){
        listePanier[i].quantite = 0;
    }
    localStorage.setItem(LISTE_PRODUIT, JSON.stringify(listePanier));
    updateNotification();
    updateTotalPanier();

});
/****************fonction update contenu Total Panier*************** */
function updateTotalPanier(){
    const TOTAL_A_PAYER = document.querySelector(".totalContenuPanier > h2");
    let totalCalcul = 0;
    let calcul = 0;
    for(let i = 0; i < listePanier.length; i++){
        calcul = listePanier[i].quantite * listePanier[i].prix;
        totalCalcul += calcul;
    }
    TOTAL_A_PAYER.innerHTML = "Total de votre panier: " + totalCalcul.toFixed(2) + "€";
}

/*******************fonction update Notif Panier************************* */
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