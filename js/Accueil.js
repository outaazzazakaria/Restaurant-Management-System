// --------------------------------------------------------          
// Nom et prénom: Zakaria Outaazza                                    ++++           +++++++++++++|
// --------------------------------------------------------           ++++          ++++           
//                                                                    ++++          +++
//  ____________| controle: N°3 javaScript |_______________           ++++            ++++++
// |                                                       |          ++++               +++++++++
// |     Project: ZACKRISTOS - Zakaria Restaurant system   |          ++++                       +++
// |     Date: début:2026-05-06 - Fin:2026-05-12           |    +++   ++++    +++               ++++
// |_______________________________________________________|    ++++++++++    +++    |+++++++++++++

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ----------------| Page: index.html |---------------------

// data

class prd {
    constructor(Nom, URL, prix, description, categorie) {
        this.Nom = Nom;
        this.URL = URL;
        this.prix = prix;
        this.description = description;
        this.categorie = categorie;
    }
}

let Data_Menu = [
    // Burgers
    new prd("Whopper", "../IMG/Whopper.jpg", 84.99, "Burger géant avec viande grillée et sauce spéciale", "Burger"),
    new prd("BBQ Burger", "../IMG/BBQ_Burger.jpg", 86.00, "Burger sauce BBQ fumée et viande tendre", "Burger"),
    new prd("Chicken Royale", "../IMG/Chicken_Royale.jpg", 45.99, "Burger poulet croustillant avec sauce mayo", "Burger"),
    new prd("Chicken Crispy", "../IMG/Chicken_Crispy.jpg", 29.99, "Burger poulet pané très croustillant", "Burger"),
    new prd("Big King", "../IMG/Big_King.jpg", 29.99, "Double steak avec fromage et sauce spéciale", "Burger"),
    new prd("Cheeseburger", "../IMG/Cheeseburger.jpg", 19.99, "Burger simple avec fromage fondant", "Burger"),
    new prd("Bacon Burger", "../IMG/Bacon_Burger.jpg", 34.99, "Burger avec bacon grillé et sauce BBQ", "Burger"),
    new prd("Double Cheese", "../IMG/Double_Cheese.jpg", 39.99, "Double fromage et double steak juteux", "Burger"),
    // Boissons
    new prd("Coca Cola", "../IMG/Coca_Cola.jpg", 12.00, "Boisson fraîche", "Boisson"),
    new prd("Coca Zero", "../IMG/Coca_Zero.jpg", 13.00, "Sans sucre", "Boisson"),
    new prd("Fanta Citron", "../IMG/Fanta_Citron.jpg", 11.00, "Goût citron", "Boisson"),
    new prd("Sprite", "../IMG/Sprite.jpg", 10.00, "Citron frais", "Boisson"),
    new prd("Ice Tea", "../IMG/Ice_Tea.jpg", 14.99, "Thé glacé", "Boisson"),
    new prd("Mojito Fraise", "../IMG/Mojito_Fraise.jpg", 18.00, "Menthe & fraise", "Boisson"),
    new prd("Milkshake Chocolat", "../IMG/Milkshake_Chocolat.jpg", 24.99, "Shake chocolaté", "Boisson"),
    new prd("Jus d'Orange", "../IMG/Jus_dOrange.jpg", 16.00, "Orange naturel", "Boisson"),
    // Desserts
    new prd("Chocolate Cake", "../IMG/Chocolate_Cake.jpg", 22.99, "", "Dessert"),
    new prd("Ice Cream", "../IMG/Ice_Cream.jpg", 15.99, "", "Dessert"),
    new prd("Donut", "../IMG/Donut.jpg", 12.99, "", "Dessert"),
    new prd("Brownie", "../IMG/Brownie.jpg", 18.99, "", "Dessert"),
    new prd("Cheesecake", "../IMG/Cheesecake.jpg", 24.99, "", "Dessert"),
    new prd("Tiramisu", "../IMG/Tiramisu.jpg", 26.99, "", "Dessert"),
    new prd("Pancakes", "../IMG/Pancakes.jpg", 20.99, "", "Dessert"),
    new prd("Muffin", "../IMG/Muffin.jpg", 14.99, "", "Dessert")
];

let burger  = document.getElementById("burger");
let boisson = document.getElementById("boisson");
let dessert = document.getElementById("dessert");

let counts = { Burger: 4, Boisson: 4, Dessert: 4 };

let filtreActif = "all";

let produitEnModification = null;

function afficherCategorie(categorie) {
    const conteneurs = { Burger: burger, Boisson: boisson, Dessert: dessert };
    let conteneur = conteneurs[categorie];
    conteneur.innerHTML = "";
    let nb = 0;

    for (let i = 0; i < Data_Menu.length; i++) {
        if (Data_Menu[i].categorie === categorie && nb < counts[categorie]) {
            conteneur.innerHTML += creerCard(Data_Menu[i], i);
            nb++;
        }
    }
}

function creerCard(produit, index) {
    return `
        <div class="col-md-3 col-sm-6">
            <div class="card w-100 h-100">
                <img src="${produit.URL}" class="card-img-top" alt="${produit.Nom}">
                <div class="card-body">
                    <h5 class="card-title">${produit.Nom}</h5>
                    <p class="card-text">${produit.description || "Aucune description"}</p>
                    <h3>${produit.prix} DH</h3>
                    <div class="card-actions d-flex justify-content-center gap-2 mt-2">
                        <button class="btn btn-modifier" onclick="ouvrirModifier(${index})" title="Modifier">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button class="btn btn-supprimer" onclick="supprimerProduit(${index})" title="Supprimer">
                            <i class="bi bi-trash3"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function afficherTout() {
    afficherCategorie("Burger");
    afficherCategorie("Boisson");
    afficherCategorie("Dessert");
}

afficherTout();


// ------------------ FILTRE ------------------

document.querySelectorAll(".btn-filter").forEach(btn => {
    btn.addEventListener("click", function () {
        document.querySelectorAll(".btn-filter").forEach(b => b.classList.remove("active-filter"));
        this.classList.add("active-filter");

        filtreActif = this.dataset.cat;

        const sectionBurger  = document.getElementById("section-burger");
        const sectionBoisson = document.getElementById("section-boisson");
        const sectionDessert = document.getElementById("section-dessert");

        if (filtreActif === "all") {
            sectionBurger.style.display  = "block";
            sectionBoisson.style.display = "block";
            sectionDessert.style.display = "block";
            afficherTout();
        } else if (filtreActif === "Burger") {
            sectionBurger.style.display  = "block";
            sectionBoisson.style.display = "none";
            sectionDessert.style.display = "none";
            afficherCategorie("Burger");
        } else if (filtreActif === "Boisson") {
            sectionBurger.style.display  = "none";
            sectionBoisson.style.display = "block";
            sectionDessert.style.display = "none";
            afficherCategorie("Boisson");
        } else if (filtreActif === "Dessert") {
            sectionBurger.style.display  = "none";
            sectionBoisson.style.display = "none";
            sectionDessert.style.display = "block";
            afficherCategorie("Dessert");
        }
    });
});


// ------------------ VOIR PLUS ------------------

function voirPlus(categorie) {
    counts[categorie] += 4;
    afficherCategorie(categorie);


}



// ------------------ AJOUTER AU MENU ------------------

function Ajouter_au_Menu() {
    produitEnModification = null;
    document.getElementById("modal-titre").innerText = "Ajouter au Menu";
    document.getElementById("btn-valider-modal").innerHTML = '<i class="bi bi-plus-circle"></i> Ajouter';
    document.getElementById("category").value    = "";
    document.getElementById("image_sand").value  = "";
    document.getElementById("nom_du_plat").value = "";
    document.getElementById("prix").value        = "";
    document.getElementById("description").value = "";

    let modal = document.getElementById("Modal_ajouter_au_menu");
    modal.classList.remove("d-none");
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function btn2_Ajouter_au_Menu() {
    let category    = document.getElementById("category").value;
    let image       = document.getElementById("image_sand").value;
    let nom         = document.getElementById("nom_du_plat").value.trim();
    let prix        = parseFloat(document.getElementById("prix").value);
    let description = document.getElementById("description").value.trim();

    if (category === "" || image === "" || nom === "" || description === "" || isNaN(prix)) {
        afficherErreur("Veuillez remplir tous les champs.");
        return;
    }

    if (produitEnModification !== null) {
        Data_Menu[produitEnModification].Nom         = nom;
        Data_Menu[produitEnModification].URL         = image;
        Data_Menu[produitEnModification].prix        = prix;
        Data_Menu[produitEnModification].description = description;
        Data_Menu[produitEnModification].categorie   = category;
        afficherTout();
        closeModal();
        afficherSucces("Plat modifié avec succès !");
        return;
    }

    let dejaDansMenu = Data_Menu.some(p => p.Nom.toLowerCase() === nom.toLowerCase());
    if (dejaDansMenu) {
        afficherErreur("Ce plat est déjà dans le menu.");
        return;
    }

    Data_Menu.push(new prd(nom, image, prix, description, category));
    afficherCategorie(category);
    closeModal();
    afficherSucces("Plat ajouté avec succès !");
}

function closeModal() {
    let modal = document.getElementById("Modal_ajouter_au_menu");
    modal.classList.add("d-none");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    produitEnModification = null;
}

function closeModalError() {
    document.getElementById("errorModal").style.display = "none";
}

function closeModalSucces() {
    document.getElementById("successModal").style.display = "none";
}

function afficherErreur(message) {
    document.getElementById("info_error").innerText = message;
    document.getElementById("errorModal").style.display = "block";
}

function afficherSucces(message) {
    document.getElementById("info_succes").innerText = message;
    document.getElementById("successModal").style.display = "block";
    setTimeout(() => {
        document.getElementById("successModal").style.display = "none";
    }, 3000);
}


// ------------------ SUPPRIMER ------------------

function supprimerProduit(index) {
    let categorie = Data_Menu[index].categorie;
    Data_Menu.splice(index, 1);
    afficherTout();
    afficherSucces("Plat supprimé avec succès !");
}


// ------------------ MODIFIER ------------------

function ouvrirModifier(index) {
    produitEnModification = index;
    let produit = Data_Menu[index];

    document.getElementById("modal-titre").innerText = "Modifier le plat";
    document.getElementById("btn-valider-modal").innerHTML = '<i class="bi bi-check-circle"></i> Enregistrer';

    document.getElementById("category").value    = produit.categorie;
    document.getElementById("image_sand").value  = produit.URL;
    document.getElementById("nom_du_plat").value = produit.Nom;
    document.getElementById("prix").value        = produit.prix;
    document.getElementById("description").value = produit.description;

    let modal = document.getElementById("Modal_ajouter_au_menu");
    modal.classList.remove("d-none");
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}


// ----------------| Page: .html |--------------------

function rechercherPlat() {
    let mot = document.getElementById("searchInput").value.toLowerCase();

    if (mot === "" && mot === "  ") {
        afficherTout();
        return;
    }

    burger.innerHTML  = "";
    boisson.innerHTML = "";
    dessert.innerHTML = "";

    for (let i = 0; i < Data_Menu.length; i++) {
        if (Data_Menu[i].Nom.toLowerCase().includes(mot)) {
            let card = creerCard(Data_Menu[i], i);

            if (Data_Menu[i].categorie === "Burger")       burger.innerHTML  += card;
            else if (Data_Menu[i].categorie === "Boisson") boisson.innerHTML += card;
            else if (Data_Menu[i].categorie === "Dessert") dessert.innerHTML += card;
        }
    }
}


// ------------------ PUBLICITÉ (10min) ------------------

setTimeout(() => {
    document.getElementById("modalPub").style.display = "flex";
}, 5000);

function closePub() {
    document.getElementById("modalPub").style.display = "none";
}