// --------------------------------------------------------          
// Nom et prénom: Zakaria Outaazza                                    ++++           +++++++++++++|
// --------------------------------------------------------           ++++          ++++           
//                                                                    ++++          +++
//  ____________| controle: N°3 javaScript |_______________           ++++            ++++++
// |                                                       |          ++++               +++++++++
// |     Project: ZACKRISTOS - Zakaria Restaurant system   |          ++++                       +++
// |     Date: début:2026-05-06 - Fin:2026-05-12           |    +++   ++++    +++               ++++
// |_______________________________________________________|    ++++++++++    +++    |+++++++++++++

// ================= DATA =================

// Product class 

class Produit {
    constructor(nom, url, prix, description, categorie) {
        this.nom         = nom;
        this.url         = url;
        this.prix        = prix;
        this.description = description;
        this.categorie   = categorie; 
    }
}

//   Data menu

let menuData = [
    // ── Burgers ──
    new Produit("Whopper",        "../IMG/Whopper.jpg",        84.99, "Burger géant avec viande grillée et sauce spéciale", "Burger"),
    new Produit("BBQ Burger",     "../IMG/BBQ_Burger.jpg",     86.00, "Burger sauce BBQ fumée et viande tendre",            "Burger"),
    new Produit("Chicken Royale", "../IMG/Chicken_Royale.jpg", 45.99, "Burger poulet croustillant avec sauce mayo",         "Burger"),
    new Produit("Chicken Crispy", "../IMG/Chicken_Crispy.jpg", 29.99, "Burger poulet pané très croustillant",               "Burger"),
    new Produit("Big King",       "../IMG/Big_King.jpg",       29.99, "Double steak avec fromage et sauce spéciale",        "Burger"),
    new Produit("Cheeseburger",   "../IMG/Cheeseburger.jpg",   19.99, "Burger simple avec fromage fondant",                 "Burger"),
    new Produit("Bacon Burger",   "../IMG/Bacon_Burger.jpg",   34.99, "Burger avec bacon grillé et sauce BBQ",              "Burger"),
    new Produit("Double Cheese",  "../IMG/Double_Cheese.jpg",  39.99, "Double fromage et double steak juteux",              "Burger"),
    // ── Boissons ──
    new Produit("Coca Cola",          "../IMG/Coca_Cola.jpg",          12.00, "Boisson fraîche",  "Boisson"),
    new Produit("Coca Zero",          "../IMG/Coca_Zero.jpg",          13.00, "Sans sucre",       "Boisson"),
    new Produit("Fanta Citron",       "../IMG/Fanta_Citron.jpg",       11.00, "Goût citron",      "Boisson"),
    new Produit("Sprite",             "../IMG/Sprite.jpg",             10.00, "Citron frais",     "Boisson"),
    new Produit("Ice Tea",            "../IMG/Ice_Tea.jpg",            14.99, "Thé glacé",        "Boisson"),
    new Produit("Mojito Fraise",      "../IMG/Mojito_Fraise.jpg",      18.00, "Menthe & fraise",  "Boisson"),
    new Produit("Milkshake Chocolat", "../IMG/Milkshake_Chocolat.jpg", 24.99, "Shake chocolaté",  "Boisson"),
    new Produit("Jus d'Orange",       "../IMG/Jus_dOrange.jpg",        16.00, "Orange naturel",   "Boisson"),
    // ── Desserts ──
    new Produit("Chocolate Cake", "../IMG/Chocolate_Cake.jpg", 22.99, "", "Dessert"),
    new Produit("Ice Cream",      "../IMG/Ice_Cream.jpg",      15.99, "", "Dessert"),
    new Produit("Donut",          "../IMG/Donut.jpg",          12.99, "", "Dessert"),
    new Produit("Brownie",        "../IMG/Brownie.jpg",        18.99, "", "Dessert"),
    new Produit("Cheesecake",     "../IMG/Cheesecake.jpg",     24.99, "", "Dessert"),
    new Produit("Tiramisu",       "../IMG/Tiramisu.jpg",       26.99, "", "Dessert"),
    new Produit("Pancakes",       "../IMG/Pancakes.jpg",       20.99, "", "Dessert"),
    new Produit("Muffin",         "../IMG/Muffin.jpg",         14.99, "", "Dessert"),
];


// ================= DOM =================

// Divs des cartes
const containerBurger  = document.getElementById("burger");
const containerBoisson = document.getElementById("boisson");
const containerDessert = document.getElementById("dessert");

// Section wrappers used for show/hide filtering
const sectionBurger  = document.getElementById("section-burger");
const sectionBoisson = document.getElementById("section-boisson");
const sectionDessert = document.getElementById("section-dessert");


// ================= VARIABLES =================

// Nbr éléments à afficher( clique sur "Voir plus")
let visibleCounts = {
    Burger:  4,
    Boisson: 4,
    Dessert: 4
};

// filter
let filtrX = "all";

// nouveau produit
let indexEnModification = null;


// =================  Fonctions d'affichage =================

function creerCarteHTML(produit, index) {
    return `
        <div class="col-md-3 col-sm-6">
            <div class="card w-100 h-100">
                <img src="${produit.url}" class="card-img-top" alt="${produit.nom}">
                <div class="card-body">
                    <h5 class="card-title">${produit.nom}</h5>
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

/**
 * Renders all visible products for a given category into its container.
 * Only shows up to visibleCounts[categorie] items.
 * @param {string} categorie - "Burger" | "Boisson" | "Dessert"
 */

function afficherCategorie(categorie) {
    const conteneurs = {
        Burger:  containerBurger,
        Boisson: containerBoisson,
        Dessert: containerDessert
    };

    const conteneur = conteneurs[categorie];
    conteneur.innerHTML = "";
    let cpt = 0;

    for (let i = 0; i < menuData.length; i++) {
        if (menuData[i].categorie === categorie && cpt < visibleCounts[categorie]) {
            conteneur.innerHTML += creerCarteHTML(menuData[i], i);
            cpt++;
        }
    }
}

/**
 * Renders all three categories at once.
 */
function afficherTout() {
    afficherCategorie("Burger");
    afficherCategorie("Boisson");
    afficherCategorie("Dessert");
}

/**
 * Increases the visible count for a category and re-renders it.
 * Called when the user clicks "Voir plus".
 * @param {string} categorie - "Burger" | "Boisson" | "Dessert"
 */
function voirPlus(categorie) {
    visibleCounts[categorie] += 4;
    afficherCategorie(categorie);
}

// Initial render on page load
afficherTout();


// ================= FILTERS =================

/**
 * Shows or hides category sections based on the active filter button.
 * Updates the active button style and re-renders the matching categories.
 */
document.querySelectorAll(".btn-filter").forEach(function(bouton) {
    bouton.addEventListener("click", function() {

        // Update active button style
        document.querySelectorAll(".btn-filter").forEach(b => b.classList.remove("active-filter"));
        this.classList.add("active-filter");

        filtreActif = this.dataset.cat;

        // Show/hide sections and render only the active one(s)
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


// ================= SEARCH =================

/**
 * Filters and displays products matching the search input.
 * Searches by product name across all categories.
 * If the input is empty, shows the full menu again.
 */
function rechercherPlat() {
    const motCle = document.getElementById("searchInput").value.toLowerCase().trim();

    // Reset to full display if search is cleared
    if (motCle === "") {
        afficherTout();
        return;
    }

    // Clear all containers before re-populating with results
    containerBurger.innerHTML  = "";
    containerBoisson.innerHTML = "";
    containerDessert.innerHTML = "";

    for (let i = 0; i < menuData.length; i++) {
        const produit = menuData[i];

        if (produit.nom.toLowerCase().includes(motCle)) {
            const carteHTML = creerCarteHTML(produit, i);

            if (produit.categorie === "Burger")       containerBurger.innerHTML  += carteHTML;
            else if (produit.categorie === "Boisson") containerBoisson.innerHTML += carteHTML;
            else if (produit.categorie === "Dessert") containerDessert.innerHTML += carteHTML;
        }
    }
}


// ================= CRUD =================

/**
 * Deletes a product from menuData by its index, then re-renders.
 * @param {number} index - Index of the product in menuData
 */
function supprimerProduit(index) {
    menuData.splice(index, 1);
    afficherTout();
    afficherSucces("Plat supprimé avec succès !");
}

/**
 * Opens the modal in "edit" mode pre-filled with the product's data.
 * @param {number} index - Index of the product to edit in menuData
 */
function ouvrirModifier(index) {
    const produit = menuData[index];
    indexEnModification = index;

    // Switch modal title and button to "edit" mode
    document.getElementById("modal-titre").innerText          = "Modifier le plat";
    document.getElementById("btn-valider-modal").innerHTML    = '<i class="bi bi-check-circle"></i> Enregistrer';

    // Pre-fill form with current product values
    document.getElementById("category").value    = produit.categorie;
    document.getElementById("image_sand").value  = produit.url;
    document.getElementById("nom_du_plat").value = produit.nom;
    document.getElementById("prix").value        = produit.prix;
    document.getElementById("description").value = produit.description;

    ouvrirModal();
}

/**
 * Validates the form and either adds a new product or saves edits.
 * Called when the modal's submit button is clicked.
 */
function btn2_Ajouter_au_Menu() {
    const categorie   = document.getElementById("category").value;
    const urlImage    = document.getElementById("image_sand").value;
    const nom         = document.getElementById("nom_du_plat").value.trim();
    const prix        = parseFloat(document.getElementById("prix").value);
    const description = document.getElementById("description").value.trim();

    // Validate all required fields
    if (!categorie || !urlImage || !nom || !description || isNaN(prix)) {
        afficherErreur("Veuillez remplir tous les champs.");
        return;
    }

    // EDIT MODE — update existing product
    if (indexEnModification !== null) {
        menuData[indexEnModification].nom         = nom;
        menuData[indexEnModification].url         = urlImage;
        menuData[indexEnModification].prix        = prix;
        menuData[indexEnModification].description = description;
        menuData[indexEnModification].categorie   = categorie;

        afficherTout();
        fermerModal();
        afficherSucces("Plat modifié avec succès !");
        return;
    }

    // ADD MODE — check for duplicate name
    const dejaExistant = menuData.some(p => p.nom.toLowerCase() === nom.toLowerCase());
    if (dejaExistant) {
        afficherErreur("Ce plat est déjà dans le menu.");
        return;
    }

    // Add new product and re-render its category
    menuData.push(new Produit(nom, urlImage, prix, description, categorie));
    afficherCategorie(categorie);
    fermerModal();
    afficherSucces("Plat ajouté avec succès !");
}


// ================= MODALS =================

/**
 * Opens the add/edit modal and resets the form for "add" mode.
 * Called by the "+ Ajouter au Menu" button.
 */
function Ajouter_au_Menu() {
    indexEnModification = null;

    // Reset modal to "add" mode
    document.getElementById("modal-titre").innerText       = "Ajouter au Menu";
    document.getElementById("btn-valider-modal").innerHTML = '<i class="bi bi-plus-circle"></i> Ajouter';

    // Clear all form fields
    document.getElementById("category").value    = "";
    document.getElementById("image_sand").value  = "";
    document.getElementById("nom_du_plat").value = "";
    document.getElementById("prix").value        = "";
    document.getElementById("description").value = "";

    ouvrirModal();
}

/**
 * Shows the modal overlay.
 */
function ouvrirModal() {
    const modal = document.getElementById("Modal_ajouter_au_menu");
    modal.classList.remove("d-none");
    modal.style.display       = "flex";
    document.body.style.overflow = "hidden";
}

/**
 * Hides the modal overlay and resets the edit index.
 */
function fermerModal() {
    const modal = document.getElementById("Modal_ajouter_au_menu");
    modal.classList.add("d-none");
    modal.style.display          = "none";
    document.body.style.overflow = "auto";
    indexEnModification = null;
}

// Alias used by the HTML onclick attribute
function closeModal() { fermerModal(); }

/**
 * Displays a warning/error notification modal with a custom message.
 * @param {string} message - The error text to display
 */
function afficherErreur(message) {
    document.getElementById("info_error").innerText = message;
    document.getElementById("errorModal").style.display = "block";
}

/**
 * Closes the error notification modal.
 */
function closeModalError() {
    document.getElementById("errorModal").style.display = "none";
}

/**
 * Displays a success notification modal with a custom message.
 * Auto-closes after 3 seconds.
 * @param {string} message - The success text to display
 */
function afficherSucces(message) {
    document.getElementById("info_succes").innerText = message;
    document.getElementById("successModal").style.display = "block";

    setTimeout(function() {
        document.getElementById("successModal").style.display = "none";
    }, 3000);
}

/**
 * Closes the success notification modal.
 */
function closeModalSucces() {
    document.getElementById("successModal").style.display = "none";
}

/**
 * Closes the advertisement popup modal.
 */
function closePub() {
    document.getElementById("modalPub").style.display = "none";
}


// ================= EVENTS =================

// Annonce 
setTimeout(function() {
    document.getElementById("modalPub").style.display = "flex";
}, 5000 ); /* 5s */
