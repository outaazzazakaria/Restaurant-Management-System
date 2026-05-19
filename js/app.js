// ════════════════════════════════════════════════════════════════
//   ZACKRISTOS — app.js
//   Author  : Zakaria Outaazza
//   Project : ZACKRISTOS – Système de Gestion Restaurant
//   Date    : 2026-05-06 → 2026-05-12
//
//   This is the SINGLE unified JavaScript file for all 4 pages:
//     • Accueil.html     → Menu (display / add / edit / delete)
//     • Commandes.html   → Orders (CRUD, filter, search, pagination)
//     • Tables.html      → Table reservations (CRUD, filter, search)
//     • Tableau_de_bord.html → Dashboard (charts, KPIs, export)
//
//   Each page section is guarded by a helper that checks whether
//   the required DOM elements exist before running any code,
//   so including this one file in every HTML page is safe.
// ════════════════════════════════════════════════════════════════


// ╔══════════════════════════════════════════════════════════════╗
// ║                       CENTRAL DATA                          ║
// ╚══════════════════════════════════════════════════════════════╝

// ================= DATA =================

/**
 * Blueprint for a menu product.
 * Used by the Menu page and the Orders page (item picker).
 */
class Produit {
    constructor(nom, url, prix, description, categorie) {
        this.nom         = nom;
        this.url         = url;
        this.prix        = prix;
        this.description = description;
        this.categorie   = categorie; // "Burger" | "Boisson" | "Dessert"
    }
}

/**
 * THE central data structure of the entire project.
 * Every page reads from — or writes to — this single array.
 * All products (menu items) live here.
 */
let menuData = [
    // ── Burgers ──────────────────────────────────────────────────
    new Produit("Whopper",        "../IMG/Whopper.jpg",        84.99, "Burger géant avec viande grillée et sauce spéciale", "Burger"),
    new Produit("BBQ Burger",     "../IMG/BBQ_Burger.jpg",     86.00, "Burger sauce BBQ fumée et viande tendre",            "Burger"),
    new Produit("Chicken Royale", "../IMG/Chicken_Royale.jpg", 45.99, "Burger poulet croustillant avec sauce mayo",         "Burger"),
    new Produit("Chicken Crispy", "../IMG/Chicken_Crispy.jpg", 29.99, "Burger poulet pané très croustillant",               "Burger"),
    new Produit("Big King",       "../IMG/Big_King.jpg",       29.99, "Double steak avec fromage et sauce spéciale",        "Burger"),
    new Produit("Cheeseburger",   "../IMG/Cheeseburger.jpg",   19.99, "Burger simple avec fromage fondant",                 "Burger"),
    new Produit("Bacon Burger",   "../IMG/Bacon_Burger.jpg",   34.99, "Burger avec bacon grillé et sauce BBQ",              "Burger"),
    new Produit("Double Cheese",  "../IMG/Double_Cheese.jpg",  39.99, "Double fromage et double steak juteux",              "Burger"),

    // ── Boissons ─────────────────────────────────────────────────
    new Produit("Coca Cola",          "../IMG/Coca_Cola.jpg",          12.00, "Boisson fraîche", "Boisson"),
    new Produit("Coca Zero",          "../IMG/Coca_Zero.jpg",          13.00, "Sans sucre",      "Boisson"),
    new Produit("Fanta Citron",       "../IMG/Fanta_Citron.jpg",       11.00, "Goût citron",     "Boisson"),
    new Produit("Sprite",             "../IMG/Sprite.jpg",             10.00, "Citron frais",    "Boisson"),
    new Produit("Ice Tea",            "../IMG/Ice_Tea.jpg",            14.99, "Thé glacé",       "Boisson"),
    new Produit("Mojito Fraise",      "../IMG/Mojito_Fraise.jpg",      18.00, "Menthe & fraise", "Boisson"),
    new Produit("Milkshake Chocolat", "../IMG/Milkshake_Chocolat.jpg", 24.99, "Shake chocolaté", "Boisson"),
    new Produit("Jus d'Orange",       "../IMG/Jus_dOrange.jpg",        16.00, "Orange naturel",  "Boisson"),

    // ── Desserts ─────────────────────────────────────────────────
    new Produit("Chocolate Cake", "../IMG/Chocolate_Cake.jpg", 22.99, "", "Dessert"),
    new Produit("Ice Cream",      "../IMG/Ice_Cream.jpg",      15.99, "", "Dessert"),
    new Produit("Donut",          "../IMG/Donut.jpg",          12.99, "", "Dessert"),
    new Produit("Brownie",        "../IMG/Brownie.jpg",        18.99, "", "Dessert"),
    new Produit("Cheesecake",     "../IMG/Cheesecake.jpg",     24.99, "", "Dessert"),
    new Produit("Tiramisu",       "../IMG/Tiramisu.jpg",       26.99, "", "Dessert"),
    new Produit("Pancakes",       "../IMG/Pancakes.jpg",       20.99, "", "Dessert"),
    new Produit("Muffin",         "../IMG/Muffin.jpg",         14.99, "", "Dessert"),
];

/**
 * All restaurant orders.
 * Each order holds: id, items[], table, statut, notes, date.
 * Used by Commandes.html and Dashboard.html.
 */
let commandes = [
    {
        id:     "CMD-001",
        items:  [{ nom: "Whopper",        prix: 84.99, qty: 1 }, { nom: "Coca Cola",  prix: 12.00, qty: 2 }],
        table:  "Table 3",    statut: "Livré",      notes: "",             date: "2026-05-15 10:22"
    },
    {
        id:     "CMD-002",
        items:  [{ nom: "Chicken Crispy", prix: 29.99, qty: 2 }],
        table:  "Table 1",    statut: "En attente", notes: "Sans oignons", date: "2026-05-15 11:05"
    },
    {
        id:     "CMD-003",
        items:  [{ nom: "BBQ Burger",  prix: 86.00, qty: 1 }, { nom: "Tiramisu", prix: 26.99, qty: 1 }],
        table:  "Table 5",    statut: "En cours",   notes: "",             date: "2026-05-15 11:30"
    },
    {
        id:     "CMD-004",
        items:  [{ nom: "Donut", prix: 12.99, qty: 3 }, { nom: "Ice Tea", prix: 14.99, qty: 1 }],
        table:  "À emporter", statut: "Annulé",     notes: "",             date: "2026-05-15 09:50"
    },
    {
        id:     "CMD-005",
        items:  [{ nom: "Cheeseburger", prix: 19.99, qty: 2 }, { nom: "Sprite", prix: 10.00, qty: 2 }],
        table:  "Table 2",    statut: "Livré",      notes: "",             date: "2026-05-15 12:00"
    },
];

/**
 * All restaurant tables.
 * Each table holds: id, nom, statut, chevalet, client, reserveeLe.
 * Used by Tables.html and Dashboard.html.
 */
const NOMBRE_TABLES = 8;

let tables = Array.from({ length: NOMBRE_TABLES }, function(_, i) {
    return {
        id:         i + 1,
        nom:        `Table ${i + 1}`,
        statut:     "available", // "available" | "reserved"
        chevalet:   null,
        client:     null,
        reserveeLe: null
    };
});

/**
 * Dashboard static data — KPIs, charts, top products, recent orders.
 * Used only by Tableau_de_bord.html.
 */
const dashboardData = {
    kpi: {
        totalCommandes: 120,
        revenuTotal:    5400,
        totalTables:    18,
        enAttente:      7
    },
    revenueParJour: {
        labels: ["Lun", "Mar", "Mer", "Jeu", "Ven"],
        values: [500, 800, 600, 1200, 900]
    },
    categories: {
        labels: ["Burger", "Boissons", "Desserts"],
        values: [50, 30, 20],
        colors: ["orange", "skyblue", "violet"]
    },
    topProduits: [
        { nom: "Whopper",        prix: 85, ventes: 120 },
        { nom: "Coca Cola",      prix: 12, ventes: 90  },
        { nom: "Donut",          prix: 15, ventes: 70  },
        { nom: "Chicken Burger", prix: 45, ventes: 55  },
        { nom: "Ice Cream",      prix: 20, ventes: 40  },
    ],
    commandesRecentes: [
        { numero: 101, description: "Burger Menu - 120 Dh" },
        { numero: 102, description: "Burger Menu - 120 Dh" },
        { numero: 103, description: "Burger Menu - 120 Dh" },
        { numero: 104, description: "Burger Menu - 120 Dh" },
        { numero: 105, description: "Burger Menu - 120 Dh" },
    ],
    progressCategories: [
        { nom: "Burger",   pourcentage: 80 },
        { nom: "Boissons", pourcentage: 60 },
        { nom: "Desserts", pourcentage: 40 },
    ]
};


// ╔══════════════════════════════════════════════════════════════╗
// ║             SHARED UTILITY FUNCTIONS                        ║
// ║  These helpers are used by more than one page section.      ║
// ╚══════════════════════════════════════════════════════════════╝

// ================= SHARED UTILITIES =================

/**
 * Safely gets a DOM element by ID.
 * Returns null (and does NOT throw) if the element doesn't exist.
 * This lets us call page-specific code without crashing other pages.
 * @param {string} id - The element ID
 * @returns {HTMLElement|null}
 */
function el(id) {
    return document.getElementById(id);
}

/**
 * Checks whether a key DOM element for a page section exists.
 * Used at the top of each page-init function to abort early
 * when the current HTML page doesn't contain that section.
 * @param {string} id - An element ID that only exists on that page
 * @returns {boolean}
 */
function pageContient(id) {
    return el(id) !== null;
}

/**
 * Calculates the total price of all items in an order.
 * @param {Array} items - Array of { nom, prix, qty }
 * @returns {string} Total formatted to 2 decimal places, e.g. "108.99"
 */
function calculerTotal(items) {
    return items.reduce(function(somme, item) {
        return somme + item.prix * item.qty;
    }, 0).toFixed(2);
}

/**
 * Returns the current date and time as a formatted string.
 * @returns {string} e.g. "2026-05-19 14:35"
 */
function maintenant() {
    return new Date().toISOString().slice(0, 16).replace("T", " ");
}

/**
 * Returns an emoji for a product category.
 * @param {string} categorie - "Burger" | "Boisson" | "Dessert"
 * @returns {string} Emoji character
 */
function emojiCategorie(categorie) {
    const emojis = { Burger: "🍔", Boisson: "🥤", Dessert: "🍰" };
    return emojis[categorie] || "🍽️";
}

/**
 * Formats a Date object into a readable French string.
 * @param {Date} date
 * @returns {string} e.g. "19 mai à 14:35"
 */
function formaterDate(date) {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("fr-FR",  { day: "2-digit", month: "short" }) +
           " à " +
           d.toLocaleTimeString("fr-FR",  { hour: "2-digit", minute: "2-digit" });
}


// ╔══════════════════════════════════════════════════════════════╗
// ║                    PAGE: ACCUEIL.HTML                       ║
// ║              Menu — Display / Add / Edit / Delete           ║
// ╚══════════════════════════════════════════════════════════════╝

// ================= DOM (Accueil) =================

// Lazily read — only assigned when the page is actually Accueil.html
let containerBurger, containerBoisson, containerDessert;
let sectionBurger,   sectionBoisson,   sectionDessert;

// ================= VARIABLES (Accueil) =================

// How many items to show per category (grows by 4 on each "Voir plus" click)
let visibleCounts = { Burger: 4, Boisson: 4, Dessert: 4 };

// Currently active filter tab on the menu page
let filtreMenu = "all";

// Index in menuData of the product being edited (null = adding a new one)
let indexEnModification = null;

// ================= DISPLAY FUNCTIONS (Accueil) =================

/**
 * Builds the HTML card markup for one product.
 * @param {Produit} produit
 * @param {number}  index - Position in menuData (needed for edit/delete)
 * @returns {string} HTML string
 */
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
                        <button class="btn btn-modifier"  onclick="ouvrirModifier(${index})"   title="Modifier"> <i class="bi bi-pencil-square"></i></button>
                        <button class="btn btn-supprimer" onclick="supprimerProduit(${index})" title="Supprimer"><i class="bi bi-trash3"></i></button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Renders all visible products of one category into its grid container.
 * Respects the visibleCounts limit for that category.
 * @param {string} categorie - "Burger" | "Boisson" | "Dessert"
 */
function afficherCategorie(categorie) {
    const conteneurs = {
        Burger:  containerBurger,
        Boisson: containerBoisson,
        Dessert: containerDessert
    };

    const conteneur = conteneurs[categorie];
    if (!conteneur) return;

    conteneur.innerHTML = "";
    let compteur = 0;

    for (let i = 0; i < menuData.length; i++) {
        if (menuData[i].categorie === categorie && compteur < visibleCounts[categorie]) {
            conteneur.innerHTML += creerCarteHTML(menuData[i], i);
            compteur++;
        }
    }
}

/**
 * Re-renders all three menu category grids at once.
 */
function afficherToutMenu() {
    afficherCategorie("Burger");
    afficherCategorie("Boisson");
    afficherCategorie("Dessert");
}

/**
 * Increases the visible count for a category by 4 and re-renders it.
 * Called by the "Voir plus" button in each category section.
 * @param {string} categorie
 */
function voirPlus(categorie) {
    visibleCounts[categorie] += 4;
    afficherCategorie(categorie);
}

// ================= FILTERS (Accueil) =================

/**
 * Attaches click handlers to the category filter buttons.
 * Shows/hides the appropriate sections and re-renders the active one(s).
 */
function initialiserFiltresMenu() {
    document.querySelectorAll(".btn-filter").forEach(function(bouton) {
        bouton.addEventListener("click", function() {
            document.querySelectorAll(".btn-filter").forEach(b => b.classList.remove("active-filter"));
            this.classList.add("active-filter");
            filtreMenu = this.dataset.cat;

            // Map of categorie → [section to show, sections to hide]
            const visibilite = {
                all:     { show: [sectionBurger, sectionBoisson, sectionDessert], rendu: afficherToutMenu },
                Burger:  { show: [sectionBurger],  hide: [sectionBoisson, sectionDessert], rendu: () => afficherCategorie("Burger")  },
                Boisson: { show: [sectionBoisson], hide: [sectionBurger,  sectionDessert], rendu: () => afficherCategorie("Boisson") },
                Dessert: { show: [sectionDessert], hide: [sectionBurger,  sectionBoisson], rendu: () => afficherCategorie("Dessert") },
            };

            const config = visibilite[filtreMenu];
            if (!config) return;

            // Show the relevant sections
            (config.show || []).forEach(s => { if (s) s.style.display = "block"; });
            // Hide the others
            (config.hide || []).forEach(s => { if (s) s.style.display = "none";  });
            // Re-render
            config.rendu();
        });
    });
}

// ================= SEARCH (Accueil) =================

/**
 * Filters and displays products matching the search input.
 * Searches by name across all categories.
 * Resets to full display when the input is cleared.
 */
function rechercherPlat() {
    const motCle = el("searchInput").value.toLowerCase().trim();

    if (motCle === "") {
        afficherToutMenu();
        return;
    }

    containerBurger.innerHTML  = "";
    containerBoisson.innerHTML = "";
    containerDessert.innerHTML = "";

    for (let i = 0; i < menuData.length; i++) {
        const produit = menuData[i];
        if (!produit.nom.toLowerCase().includes(motCle)) continue;

        const carteHTML = creerCarteHTML(produit, i);
        if      (produit.categorie === "Burger")  containerBurger.innerHTML  += carteHTML;
        else if (produit.categorie === "Boisson") containerBoisson.innerHTML += carteHTML;
        else if (produit.categorie === "Dessert") containerDessert.innerHTML += carteHTML;
    }
}

// ================= CRUD (Accueil) =================

/**
 * Removes a product from menuData by index and re-renders the full menu.
 * @param {number} index - Index of the product in menuData
 */
function supprimerProduit(index) {
    menuData.splice(index, 1);
    afficherToutMenu();
    afficherSuccesMenu("Plat supprimé avec succès !");
}

/**
 * Opens the modal in "edit" mode pre-filled with the product's data.
 * @param {number} index - Index of the product to edit
 */
function ouvrirModifier(index) {
    const produit       = menuData[index];
    indexEnModification = index;

    el("modal-titre").innerText       = "Modifier le plat";
    el("btn-valider-modal").innerHTML = '<i class="bi bi-check-circle"></i> Enregistrer';
    el("category").value    = produit.categorie;
    el("image_sand").value  = produit.url;
    el("nom_du_plat").value = produit.nom;
    el("prix").value        = produit.prix;
    el("description").value = produit.description;

    ouvrirModalMenu();
}

/**
 * Validates the form and either saves an edit or adds a new product.
 * Called by the modal's submit button.
 */
function btn2_Ajouter_au_Menu() {
    const categorie   = el("category").value;
    const urlImage    = el("image_sand").value;
    const nom         = el("nom_du_plat").value.trim();
    const prix        = parseFloat(el("prix").value);
    const description = el("description").value.trim();

    if (!categorie || !urlImage || !nom || !description || isNaN(prix)) {
        afficherErreurMenu("Veuillez remplir tous les champs.");
        return;
    }

    // ── EDIT MODE ──────────────────────────────────────────────
    if (indexEnModification !== null) {
        const p       = menuData[indexEnModification];
        p.nom         = nom;
        p.url         = urlImage;
        p.prix        = prix;
        p.description = description;
        p.categorie   = categorie;

        afficherToutMenu();
        fermerModalMenu();
        afficherSuccesMenu("Plat modifié avec succès !");
        return;
    }

    // ── ADD MODE ───────────────────────────────────────────────
    const dejaExistant = menuData.some(p => p.nom.toLowerCase() === nom.toLowerCase());
    if (dejaExistant) {
        afficherErreurMenu("Ce plat est déjà dans le menu.");
        return;
    }

    menuData.push(new Produit(nom, urlImage, prix, description, categorie));
    afficherCategorie(categorie);
    fermerModalMenu();
    afficherSuccesMenu("Plat ajouté avec succès !");
}

// ================= MODALS (Accueil) =================

/**
 * Opens the add/edit modal in "add" mode with a blank form.
 * Called by the "+ Ajouter au Menu" button.
 */
function Ajouter_au_Menu() {
    indexEnModification = null;

    el("modal-titre").innerText       = "Ajouter au Menu";
    el("btn-valider-modal").innerHTML = '<i class="bi bi-plus-circle"></i> Ajouter';
    el("category").value    = "";
    el("image_sand").value  = "";
    el("nom_du_plat").value = "";
    el("prix").value        = "";
    el("description").value = "";

    ouvrirModalMenu();
}

/**
 * Shows the menu add/edit modal overlay.
 */
function ouvrirModalMenu() {
    const modal = el("Modal_ajouter_au_menu");
    modal.classList.remove("d-none");
    modal.style.display          = "flex";
    document.body.style.overflow = "hidden";
}

/**
 * Hides the menu add/edit modal overlay.
 */
function fermerModalMenu() {
    const modal = el("Modal_ajouter_au_menu");
    modal.classList.add("d-none");
    modal.style.display          = "none";
    document.body.style.overflow = "auto";
    indexEnModification          = null;
}

// HTML onclick aliases
function closeModal()      { fermerModalMenu(); }
function closeModalError() { el("errorModal").style.display   = "none"; }
function closeModalSucces(){ el("successModal").style.display = "none"; }
function closePub()        { el("modalPub").style.display     = "none"; }

/**
 * Shows the error notification modal with a custom message.
 * @param {string} message
 */
function afficherErreurMenu(message) {
    el("info_error").innerText          = message;
    el("errorModal").style.display      = "block";
}

/**
 * Shows the success notification modal with a custom message.
 * Auto-closes after 3 seconds.
 * @param {string} message
 */
function afficherSuccesMenu(message) {
    el("info_succes").innerText         = message;
    el("successModal").style.display    = "block";
    setTimeout(function() { el("successModal").style.display = "none"; }, 3000);
}

// ================= EVENTS (Accueil) =================

/**
 * Initializes everything for Accueil.html.
 * Runs only when the menu page DOM elements are present.
 */
function initialiserPageMenu() {
    if (!pageContient("burger")) return; // Not the menu page — stop here

    // Assign DOM references (only safe after guard above)
    containerBurger  = el("burger");
    containerBoisson = el("boisson");
    containerDessert = el("dessert");
    sectionBurger    = el("section-burger");
    sectionBoisson   = el("section-boisson");
    sectionDessert   = el("section-dessert");

    // First render
    afficherToutMenu();

    // Wire up filter buttons
    initialiserFiltresMenu();

    // Show the advertisement popup after 5 seconds
    setTimeout(function() {
        if (el("modalPub")) el("modalPub").style.display = "flex";
    }, 5000);
}


// ╔══════════════════════════════════════════════════════════════╗
// ║                  PAGE: COMMANDES.HTML                       ║
// ║         Orders — CRUD, Filter, Search, Pagination           ║
// ╚══════════════════════════════════════════════════════════════╝

// ================= DOM (Commandes) =================

let tableauBody, etatVideCommandes, infoPage, boutonsPage;

// ================= VARIABLES (Commandes) =================

let filtreCommandes   = "all"; // Active status filter
let pageCourante      = 1;     // Current pagination page
const TAILLE_PAGE     = 8;     // Orders shown per page
let cibleSuppression  = null;  // ID of order pending deletion
let cibleEdition      = null;  // ID of order being edited (null = new)
let itemsSelectionnes = [];    // Items selected in the add/edit modal

// ================= DISPLAY FUNCTIONS (Commandes) =================

/**
 * Returns the CSS badge class for an order status.
 * @param {string} statut
 * @returns {string}
 */
function classeStatut(statut) {
    const classes = {
        "En attente": "s-attente",
        "En cours":   "s-cours",
        "Livré":      "s-livre",
        "Annulé":     "s-annule"
    };
    return classes[statut] || "";
}

/**
 * Returns a short label for an order — first item name + extra count.
 * e.g.  "Whopper +2"  or  "Cheeseburger"
 * @param {object} commande
 * @returns {string}
 */
function etiquettePremierPlat(commande) {
    if (!commande.items.length) return "—";
    const noms = commande.items.map(i => i.nom);
    return noms.length > 1 ? `${noms[0]} +${noms.length - 1}` : noms[0];
}

/**
 * Generates a random unique order ID.
 * @returns {string} e.g. "CMD-48392"
 */
function genererIdCommande() {
    return "CMD-" + String(Math.floor(Math.random() * 90000) + 10000);
}

/**
 * Renders the full orders table respecting the active filter, search,
 * and current page. Also refreshes stats and pagination.
 */
function afficherTableauCommandes() {
    const filtrees = obtenirCommandesFiltrees();
    const debut    = (pageCourante - 1) * TAILLE_PAGE;
    const tranche  = filtrees.slice(debut, debut + TAILLE_PAGE);

    if (!filtrees.length) {
        tableauBody.innerHTML         = "";
        etatVideCommandes.style.display = "flex";
    } else {
        etatVideCommandes.style.display = "none";
        tableauBody.innerHTML = tranche.map(function(commande, idx) {
            const produitMenu = menuData.find(m => m.nom === commande.items[0]?.nom);
            const vignette    = produitMenu
                ? `<img src="${produitMenu.url}" class="plat-thumb" alt="${produitMenu.nom}" onerror="this.outerHTML='<div class=plat-thumb-ph>🍔</div>'">`
                : `<div class="plat-thumb-ph"><i class="bi bi-egg-fried"></i></div>`;

            return `
                <tr>
                    <td style="color:#888;font-size:12px">${debut + idx + 1}</td>
                    <td><span class="order-id">${commande.id}</span></td>
                    <td>
                        <div class="plat-cell">
                            ${vignette}
                            <span class="plat-name">${etiquettePremierPlat(commande)}</span>
                        </div>
                    </td>
                    <td style="color:#ccc;font-size:13px">${commande.table}</td>
                    <td class="price-cell">${commande.items[0] ? commande.items[0].prix.toFixed(2) + " DH" : "—"}</td>
                    <td class="total-cell">${calculerTotal(commande.items)} DH</td>
                    <td><span class="status-badge ${classeStatut(commande.statut)}">${commande.statut}</span></td>
                    <td>
                        <div class="actions-cell">
                            <button class="btn-action view" onclick="ouvrirModalVoir('${commande.id}')"    title="Voir">    <i class="bi bi-eye"></i></button>
                            <button class="btn-action edit" onclick="openEditModal('${commande.id}')"      title="Modifier"><i class="bi bi-pencil"></i></button>
                            <button class="btn-action del"  onclick="ouvrirModalConfirm('${commande.id}')" title="Supprimer"><i class="bi bi-trash3"></i></button>
                        </div>
                    </td>
                </tr>
            `;
        }).join("");
    }

    afficherPaginationCommandes(filtrees.length);
    mettreAJourStatsCommandes();
}

/**
 * Updates the 4 KPI stat cards (total, livré, en attente, revenu).
 */
function mettreAJourStatsCommandes() {
    el("stat-total").textContent   = commandes.length;
    el("stat-livre").textContent   = commandes.filter(c => c.statut === "Livré").length;
    el("stat-attente").textContent = commandes.filter(c => c.statut === "En attente").length;
    el("stat-revenue").textContent = commandes
        .reduce((s, c) => s + parseFloat(calculerTotal(c.items)), 0)
        .toFixed(0);
}

/**
 * Renders the item picker grid inside the add/edit modal.
 * Highlights already-selected items.
 */
function afficherGrilleMenu() {
    const recherche = el("menuSearchInput").value.toLowerCase();
    const grille    = el("menuItemsGrid");
    if (!grille) return;

    const filtres = menuData.filter(m => !recherche || m.nom.toLowerCase().includes(recherche));

    grille.innerHTML = filtres.map(function(m) {
        const estSelectionne = itemsSelectionnes.find(s => s.nom === m.nom);
        return `
            <div class="menu-item-card ${estSelectionne ? "selected" : ""}" onclick="basculerItem('${m.nom}', ${m.prix}, '${m.categorie}')">
                <img src="${m.url}" alt="${m.nom}" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
                <span class="mi-emoji" style="display:none">${emojiCategorie(m.categorie)}</span>
                <div class="mi-name">${m.nom}</div>
                <div class="mi-price">${m.prix.toFixed(2)} DH</div>
            </div>
        `;
    }).join("");
}

/**
 * Renders the selected items list with quantity controls and total preview.
 */
function afficherItemsSelectionnes() {
    const liste = el("selectedItemsList");
    if (!liste) return;

    if (!itemsSelectionnes.length) {
        liste.innerHTML = "";
        el("totalPreview").textContent = "0.00 DH";
        return;
    }

    liste.innerHTML = itemsSelectionnes.map(function(s) {
        return `
            <div class="selected-item-row">
                <span class="sel-name">${s.nom}</span>
                <span class="sel-price">${s.prix.toFixed(2)} DH</span>
                <div class="qty-control">
                    <button class="qty-btn" onclick="changerQuantite('${s.nom}', -1)">−</button>
                    <span class="qty-num">${s.qty}</span>
                    <button class="qty-btn" onclick="changerQuantite('${s.nom}', +1)">+</button>
                </div>
                <button class="sel-remove" onclick="retirerItem('${s.nom}')"><i class="bi bi-x"></i></button>
            </div>
        `;
    }).join("");

    el("totalPreview").textContent =
        itemsSelectionnes.reduce((s, i) => s + i.prix * i.qty, 0).toFixed(2) + " DH";
}

/**
 * Renders pagination buttons and displays "X–Y sur Z" info.
 * @param {number} total - Total number of filtered orders
 */
function afficherPaginationCommandes(total) {
    const totalPages = Math.ceil(total / TAILLE_PAGE) || 1;
    const debut      = (pageCourante - 1) * TAILLE_PAGE + 1;
    const fin        = Math.min(pageCourante * TAILLE_PAGE, total);

    infoPage.textContent  = total ? `Affichage ${debut}–${fin} sur ${total}` : "Aucun résultat";
    boutonsPage.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const btn       = document.createElement("button");
        btn.className   = "btn-page" + (i === pageCourante ? " active" : "");
        btn.textContent = i;
        btn.onclick     = function() { pageCourante = i; afficherTableauCommandes(); };
        boutonsPage.appendChild(btn);
    }
}

// ================= FILTERS (Commandes) =================

/**
 * Applies the active status filter and search query, returning matching orders.
 * @returns {Array}
 */
function obtenirCommandesFiltrees() {
    const recherche = el("searchInput") ? el("searchInput").value.toLowerCase() : "";
    return commandes.filter(function(c) {
        const correspondFiltre    = filtreCommandes === "all" || c.statut === filtreCommandes;
        const correspondRecherche = !recherche
            || c.id.toLowerCase().includes(recherche)
            || etiquettePremierPlat(c).toLowerCase().includes(recherche)
            || c.table.toLowerCase().includes(recherche);
        return correspondFiltre && correspondRecherche;
    });
}

/**
 * Sets the active status filter and re-renders the table.
 * @param {HTMLElement} element - The clicked filter button
 * @param {string} valeur - "all" | "En attente" | "En cours" | "Livré" | "Annulé"
 */
function setFilter(element, valeur) {
    filtreCommandes = valeur;
    pageCourante    = 1;
    document.querySelectorAll(".btn-filter").forEach(b => b.classList.remove("active-filter"));
    element.classList.add("active-filter");
    afficherTableauCommandes();
}

/**
 * Called on search input change — resets to page 1 and re-renders.
 */
function filterOrders() {
    pageCourante = 1;
    afficherTableauCommandes();
}

// ================= CRUD (Commandes) =================

/**
 * Toggles a menu item in or out of the selected items list.
 * @param {string} nom
 * @param {number} prix
 * @param {string} categorie
 */
function basculerItem(nom, prix, categorie) {
    const index = itemsSelectionnes.findIndex(s => s.nom === nom);
    if (index === -1) itemsSelectionnes.push({ nom, prix, qty: 1 });
    else              itemsSelectionnes.splice(index, 1);
    afficherGrilleMenu();
    afficherItemsSelectionnes();
}

/**
 * Adjusts the quantity of a selected item by delta (+1 or -1).
 * Minimum quantity is 1.
 * @param {string} nom
 * @param {number} delta
 */
function changerQuantite(nom, delta) {
    const item = itemsSelectionnes.find(s => s.nom === nom);
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    afficherItemsSelectionnes();
}

/**
 * Removes an item from the selected list.
 * @param {string} nom
 */
function retirerItem(nom) {
    itemsSelectionnes = itemsSelectionnes.filter(s => s.nom !== nom);
    afficherGrilleMenu();
    afficherItemsSelectionnes();
}

/**
 * Saves the current modal form as a new order or as edits to an existing one.
 * Validates that a table is selected and at least one item is chosen.
 */
function saveOrder() {
    const table  = el("inp-table").value;
    const statut = el("inp-status").value;
    const notes  = el("inp-notes").value.trim();

    if (!table)                    { afficherErreurCommandes("Veuillez sélectionner une table.");      return; }
    if (!itemsSelectionnes.length) { afficherErreurCommandes("Veuillez ajouter au moins un plat.");   return; }

    if (cibleEdition) {
        // ── EDIT MODE ──────────────────────────────────────────
        const index    = commandes.findIndex(c => c.id === cibleEdition);
        commandes[index] = { ...commandes[index], items: itemsSelectionnes, table, statut, notes };
        fermerModalAjoutCommande();
        afficherSuccesCommandes("Commande modifiée avec succès !");
    } else {
        // ── ADD MODE ───────────────────────────────────────────
        commandes.unshift({ id: genererIdCommande(), items: itemsSelectionnes, table, statut, notes, date: maintenant() });
        fermerModalAjoutCommande();
        afficherSuccesCommandes("Commande créée avec succès !");
    }

    pageCourante = 1;
    afficherTableauCommandes();
}

/**
 * Permanently removes the targeted order and re-renders.
 */
function confirmDelete() {
    commandes = commandes.filter(c => c.id !== cibleSuppression);
    fermerModalConfirmCommande();
    if ((pageCourante - 1) * TAILLE_PAGE >= obtenirCommandesFiltrees().length && pageCourante > 1) pageCourante--;
    afficherTableauCommandes();
    afficherSuccesCommandes("Commande supprimée avec succès !");
}

// ================= MODALS (Commandes) =================

/**
 * Opens the add/edit modal in "create" mode with a clean form.
 */
function openAddModal() {
    cibleEdition      = null;
    itemsSelectionnes = [];
    el("addModalTitle").textContent  = "Ajouter une Commande";
    el("submitBtnText").textContent  = "Créer la commande";
    el("inp-table").value    = "";
    el("inp-status").value   = "En attente";
    el("inp-notes").value    = "";
    el("menuSearchInput").value = "";
    afficherGrilleMenu();
    afficherItemsSelectionnes();
    el("addModal").classList.add("open");
    document.body.style.overflow = "hidden";
}

/**
 * Opens the add/edit modal in "edit" mode pre-filled with the order's data.
 * @param {string} id - The order ID to edit
 */
function openEditModal(id) {
    const commande    = commandes.find(c => c.id === id);
    if (!commande) return;
    cibleEdition      = id;
    itemsSelectionnes = commande.items.map(i => ({ ...i }));
    el("addModalTitle").textContent  = "Modifier la Commande";
    el("submitBtnText").textContent  = "Enregistrer";
    el("inp-table").value    = commande.table;
    el("inp-status").value   = commande.statut;
    el("inp-notes").value    = commande.notes;
    el("menuSearchInput").value = "";
    afficherGrilleMenu();
    afficherItemsSelectionnes();
    el("addModal").classList.add("open");
    document.body.style.overflow = "hidden";
}

/** Closes the add/edit modal. */
function fermerModalAjoutCommande() {
    el("addModal").classList.remove("open");
    document.body.style.overflow = "auto";
}
function closeAddModal() { fermerModalAjoutCommande(); }

/**
 * Opens the view modal showing full order details.
 * @param {string} id
 */
function ouvrirModalVoir(id) {
    const commande = commandes.find(c => c.id === id);
    if (!commande) return;

    el("viewModalContent").innerHTML = `
        <div class="view-section">
            <div class="view-section-title">Informations générales</div>
            <div class="view-row"><span class="view-key">ID</span>     <span class="view-val">${commande.id}</span></div>
            <div class="view-row"><span class="view-key">Table</span>  <span class="view-val">${commande.table}</span></div>
            <div class="view-row"><span class="view-key">Date</span>   <span class="view-val">${commande.date}</span></div>
            <div class="view-row"><span class="view-key">Statut</span> <span class="view-val"><span class="status-badge ${classeStatut(commande.statut)}">${commande.statut}</span></span></div>
            ${commande.notes ? `<div class="view-row"><span class="view-key">Notes</span><span class="view-val">${commande.notes}</span></div>` : ""}
        </div>
        <div class="view-section">
            <div class="view-section-title">Plats commandés</div>
            ${commande.items.map(i => `
                <div class="view-row">
                    <span class="view-key">${i.nom} × ${i.qty}</span>
                    <span class="view-val">${(i.prix * i.qty).toFixed(2)} DH</span>
                </div>
            `).join("")}
        </div>
        <div class="view-total-row">
            <span class="view-total-label">Total</span>
            <span class="view-total-val">${calculerTotal(commande.items)} DH</span>
        </div>
    `;
    el("viewModal").classList.add("open");
    document.body.style.overflow = "hidden";
}

/** Closes the view details modal. */
function closeViewModal() {
    el("viewModal").classList.remove("open");
    document.body.style.overflow = "auto";
}

/**
 * Opens the delete confirmation modal for an order.
 * @param {string} id
 */
function ouvrirModalConfirm(id) {
    cibleSuppression = id;
    el("confirmModal").classList.add("open");
    document.body.style.overflow = "hidden";
}

/** Closes the delete confirmation modal. */
function fermerModalConfirmCommande() {
    cibleSuppression = null;
    el("confirmModal").classList.remove("open");
    document.body.style.overflow = "auto";
}
function closeConfirmModal() { fermerModalConfirmCommande(); }

/**
 * Shows the error notification (Commandes page).
 * @param {string} message
 */
function afficherErreurCommandes(message) {
    el("info_error").innerText     = message;
    el("errorModal").style.display = "block";
}
function closeErrorModal() { el("errorModal").style.display = "none"; }

/**
 * Shows the success notification (Commandes page). Auto-closes after 3s.
 * @param {string} message
 */
function afficherSuccesCommandes(message) {
    el("info_succes").innerText        = message;
    el("successModal").style.display   = "block";
    setTimeout(function() { el("successModal").style.display = "none"; }, 3000);
}
function closeSuccessModal() { el("successModal").style.display = "none"; }

// ================= EVENTS (Commandes) =================

/**
 * Initializes everything for Commandes.html.
 * Runs only when the orders page DOM elements are present.
 */
function initialiserPageCommandes() {
    if (!pageContient("ordersTableBody")) return; // Not the orders page

    tableauBody         = el("ordersTableBody");
    etatVideCommandes   = el("emptyState");
    infoPage            = el("paginationInfo");
    boutonsPage         = el("paginationBtns");

    // First render
    afficherTableauCommandes();

    // Close any modal overlay when clicking its dark background
    document.querySelectorAll(".modal-overlay").forEach(function(overlay) {
        overlay.addEventListener("click", function(e) {
            if (e.target !== overlay) return;
            overlay.classList.remove("open");
            document.body.style.overflow = "auto";
            if (overlay.id === "confirmModal") cibleSuppression = null;
        });
    });
}


// ╔══════════════════════════════════════════════════════════════╗
// ║                   PAGE: TABLES.HTML                         ║
// ║         Table reservations — CRUD, Filter, Search           ║
// ╚══════════════════════════════════════════════════════════════╝

// ================= DOM (Tables) =================

let grilleTableaux, etatVideTables, listeReservations, sansReservation, horlogeTables;

// ================= VARIABLES (Tables) =================

let filtresTables     = "all"; // "all" | "available" | "reserved"
let idTableEdition    = null;  // ID of table being edited
let idTableSuppression = null; // ID of table pending deletion

// ================= DISPLAY FUNCTIONS (Tables) =================

/**
 * Refreshes the stat pills: Available / Reserved / Total.
 */
function mettreAJourStatsTables() {
    const reservees   = tables.filter(t => t.statut === "reserved").length;
    const disponibles = NOMBRE_TABLES - reservees;
    el("stat-available").textContent = disponibles;
    el("stat-reserved").textContent  = reservees;
    el("stat-total").textContent     = NOMBRE_TABLES;
}

/**
 * Updates the live clock in the stats bar. Called every 30 seconds.
 */
function mettreAJourHorloge() {
    if (!horlogeTables) return;
    const now = new Date();
    horlogeTables.textContent =
        now.toLocaleDateString("fr-FR", { weekday: "short", day: "2-digit", month: "short" }) +
        " · " +
        now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

/**
 * Builds and returns a table card DOM element.
 * @param {object} table
 * @param {number} delai - Animation delay index
 * @returns {HTMLElement}
 */
function construireCarteTable(table, delai) {
    const carte = document.createElement("div");
    carte.className        = `table-card ${table.statut}`;
    carte.style.animationDelay = `${delai * 0.045}s`;

    const badgeStatut = table.statut === "reserved"
        ? `<span class="status-badge badge-reserved"><i class="bi bi-lock-fill"></i> Réservée</span>`
        : `<span class="status-badge badge-available"><i class="bi bi-check-circle-fill"></i> Disponible</span>`;

    carte.innerHTML = `
        <div class="table-number-badge">${table.id}</div>
        <div class="table-icon-wrap">${table.statut === "reserved" ? "🍽️" : "🪑"}</div>
        <div class="table-name">${table.nom}</div>
        <div class="chevalet-info">Chevalet : <span>${table.chevalet ?? "—"}</span></div>
        ${table.client ? `<div style="font-size:12px;color:var(--gold)">${table.client}</div>` : ""}
        ${badgeStatut}
        ${table.reserveeLe ? `<div class="table-time"><i class="bi bi-clock"></i> ${formaterDate(table.reserveeLe)}</div>` : ""}
        <div class="card-actions">
            <button class="card-action-btn btn-edit-card" onclick="modifierTable(${table.id})">
                <i class="bi bi-pencil"></i> Modifier
            </button>
            ${table.statut === "reserved"
                ? `<button class="card-action-btn btn-delete-card" onclick="confirmerSuppression(${table.id})"><i class="bi bi-trash"></i></button>`
                : ""}
        </div>
    `;

    // Clicking the card body (not a button) also opens the edit modal
    carte.addEventListener("click", function(e) {
        if (!e.target.closest("button")) modifierTable(table.id);
    });

    return carte;
}

/**
 * Renders all table cards in the grid, applying filter and search.
 */
function afficherGrilleTables() {
    if (!grilleTableaux) return;
    grilleTableaux.innerHTML = "";

    const recherche = el("searchInput") ? el("searchInput").value.toLowerCase() : "";

    const filtrees = tables.filter(function(t) {
        const correspondFiltre    = filtresTables === "all" || t.statut === filtresTables;
        const correspondRecherche =
            t.nom.toLowerCase().includes(recherche) ||
            (t.chevalet && String(t.chevalet).includes(recherche)) ||
            (t.client   && t.client.toLowerCase().includes(recherche));
        return correspondFiltre && correspondRecherche;
    });

    if (!filtrees.length) {
        etatVideTables.classList.add("show");
    } else {
        etatVideTables.classList.remove("show");
        filtrees.forEach(function(t, i) { grilleTableaux.appendChild(construireCarteTable(t, i)); });
    }
}

/**
 * Renders the active reservations list below the grid.
 */
function afficherListeReservations() {
    if (!listeReservations) return;
    listeReservations.innerHTML = "";

    const reservees = tables.filter(t => t.statut === "reserved");

    if (!reservees.length) {
        listeReservations.appendChild(sansReservation);
        sansReservation.style.display = "";
        return;
    }

    reservees.forEach(function(t, i) {
        const ligne = document.createElement("div");
        ligne.className        = "reservation-row";
        ligne.style.animationDelay = `${i * 0.05}s`;
        ligne.innerHTML = `
            <div class="res-table-icon">🍽️</div>
            <div class="res-info">
                <div class="res-name">${t.nom}${t.client ? " — " + t.client : ""}</div>
                <div class="res-sub">Chevalet : ${t.chevalet ?? "—"}${t.reserveeLe ? " · " + formaterDate(t.reserveeLe) : ""}</div>
            </div>
            <span class="status-badge badge-reserved" style="flex-shrink:0"><i class="bi bi-lock-fill"></i> Réservée</span>
            <div class="res-actions">
                <button class="res-btn res-btn-edit" onclick="modifierTable(${t.id})"><i class="bi bi-pencil"></i> Éditer</button>
                <button class="res-btn res-btn-del"  onclick="confirmerSuppression(${t.id})"><i class="bi bi-trash"></i></button>
            </div>
        `;
        listeReservations.appendChild(ligne);
    });
}

/**
 * Populates the table selector dropdown in the reservation modal.
 */
function remplirSelectTable() {
    const selecteur      = el("selectTable");
    if (!selecteur) return;
    const valeurActuelle = selecteur.value;

    selecteur.innerHTML = '<option value="">— Sélectionnez une table —</option>';
    tables.forEach(function(t) {
        const opt      = document.createElement("option");
        opt.value      = t.id;
        opt.textContent = `${t.nom} (${t.statut === "reserved" ? "Réservée" : "Disponible"})`;
        if (t.id == valeurActuelle) opt.selected = true;
        selecteur.appendChild(opt);
    });
}

/**
 * Full re-render for Tables.html: stats + grid + reservations + dropdown.
 */
function afficherToutTables() {
    mettreAJourStatsTables();
    afficherGrilleTables();
    afficherListeReservations();
    remplirSelectTable();
}

// ================= FILTERS (Tables) =================
// Filter button listeners are attached inside initialiserPageTables()

// ================= CRUD (Tables) =================

/**
 * Reads and validates the reservation modal form, then saves the changes.
 */
function submitReservation() {
    const idTable     = parseInt(el("selectTable").value);
    const chevalet    = el("chevelatInput").value.trim();
    const statut      = el("selectStatus").value;
    const client      = el("clientName").value.trim() || null;
    const horaireAuto = el("autoTimeToggle").checked;

    if (!idTable)  return afficherToast("Veuillez sélectionner une table.", "error");
    if (!chevalet) return afficherToast("Veuillez entrer le numéro du chevalet.", "error");

    let dateReservation;
    if (horaireAuto) {
        dateReservation = new Date();
    } else {
        const date  = el("manualDate").value;
        const heure = el("manualTime").value;
        if (!date || !heure) return afficherToast("Veuillez entrer la date et l'heure.", "error");
        dateReservation = new Date(`${date}T${heure}`);
    }

    const table = tables.find(t => t.id === idTable);
    if (!table) return;

    table.statut     = statut;
    table.chevalet   = parseInt(chevalet);
    table.client     = client;
    table.reserveeLe = statut === "reserved" ? dateReservation : null;

    const action = idTableEdition ? "mise à jour" : "réservée";
    fermerModalTable();
    afficherToutTables();
    afficherToast(`${table.nom} ${action} avec succès ! ✓`, "success");
}

/**
 * Frees a table — resets all reservation data and re-renders.
 * @param {number} id
 */
function supprimerReservation(id) {
    const table = tables.find(t => t.id === id);
    if (!table) return;
    table.statut     = "available";
    table.chevalet   = null;
    table.client     = null;
    table.reserveeLe = null;
    fermerConfirmationTable();
    afficherToutTables();
    afficherToast(`${table.nom} libérée avec succès.`, "success");
}

// ================= MODALS (Tables) =================

/**
 * Opens the reservation modal in "add" mode.
 * @param {number|null} idPreselect - Optionally pre-select a table
 */
function openModal(idPreselect = null) {
    idTableEdition = null;
    el("modalTitle").textContent        = "RÉSERVER UNE TABLE";
    el("submitBtn").innerHTML           = '<i class="bi bi-check-circle"></i> CONFIRMER';
    el("selectTable").value             = idPreselect ?? "";
    el("chevelatInput").value           = "";
    el("selectStatus").value            = "reserved";
    el("clientName").value              = "";
    el("autoTimeToggle").checked        = true;
    el("manualTimeGroup").style.display = "none";
    el("tableStatusHint").textContent   = "";
    if (idPreselect) afficherIndiceTable(idPreselect);
    el("reservationModal").classList.add("open");
}

/**
 * Opens the reservation modal in "edit" mode for an existing table.
 * @param {number} id - The table ID
 */
function modifierTable(id) {
    const table = tables.find(t => t.id === id);
    if (!table) return;
    idTableEdition = id;
    el("modalTitle").textContent        = `MODIFIER — ${table.nom.toUpperCase()}`;
    el("submitBtn").innerHTML           = '<i class="bi bi-pencil"></i> METTRE À JOUR';
    el("chevelatInput").value           = table.chevalet ?? "";
    el("selectStatus").value            = table.statut;
    el("clientName").value              = table.client ?? "";
    el("autoTimeToggle").checked        = true;
    el("manualTimeGroup").style.display = "none";
    el("tableStatusHint").textContent   = "";
    remplirSelectTable();
    el("selectTable").value = table.id;
    el("reservationModal").classList.add("open");
}

/** Closes the reservation modal. */
function fermerModalTable() {
    el("reservationModal").classList.remove("open");
    idTableEdition = null;
}
function closeModal() { fermerModalTable(); }

/**
 * Opens the delete confirmation dialog for a table.
 * @param {number} id
 */
function confirmerSuppression(id) {
    idTableSuppression = id;
    const table        = tables.find(t => t.id === id);
    el("confirmText").textContent      = `Voulez-vous libérer ${table?.nom} et supprimer sa réservation ?`;
    el("confirmDeleteBtn").onclick     = function() { supprimerReservation(id); };
    el("confirmModal").classList.add("open");
}

/** Closes the delete confirmation dialog. */
function fermerConfirmationTable() {
    el("confirmModal").classList.remove("open");
    idTableSuppression = null;
}
function closeConfirm() { fermerConfirmationTable(); }

/**
 * Toggles the manual date/time fields based on the auto-time toggle.
 */
function toggleTimeFields() {
    el("manualTimeGroup").style.display = el("autoTimeToggle").checked ? "none" : "block";
}

/**
 * Displays a status hint below the table selector.
 * @param {string|number} valeur - Selected table ID
 */
function afficherIndiceTable(valeur) {
    const indice = el("tableStatusHint");
    if (!indice) return;
    if (!valeur) { indice.textContent = ""; return; }
    const table  = tables.find(t => t.id == valeur);
    if (!table) return;
    if (table.statut === "reserved") {
        indice.textContent = `⚠️ Cette table est déjà réservée (Chevalet : ${table.chevalet ?? "—"})`;
        indice.style.color = "var(--danger)";
    } else {
        indice.textContent = "✅ Cette table est disponible.";
        indice.style.color = "var(--success)";
    }
}

/**
 * Shows a temporary toast notification.
 * @param {string} message
 * @param {string} type - "success" | "error"
 */
function afficherToast(message, type) {
    const conteneur = el("toastContainer");
    if (!conteneur) return;
    const toast     = document.createElement("div");
    toast.className = `toast-msg ${type}`;
    const icone     = type === "success" ? "bi-check-circle-fill" : "bi-exclamation-triangle-fill";
    const couleur   = type === "success" ? "var(--success)" : "var(--danger)";
    toast.innerHTML = `<i class="bi ${icone}" style="color:${couleur};font-size:18px"></i><span>${message}</span>`;
    conteneur.appendChild(toast);
    setTimeout(function() { toast.remove(); }, 3800);
}

// ================= EVENTS (Tables) =================

/**
 * Initializes everything for Tables.html.
 * Runs only when the tables page DOM elements are present.
 */
function initialiserPageTables() {
    if (!pageContient("tablesGrid")) return; // Not the tables page

    grilleTableaux    = el("tablesGrid");
    etatVideTables    = el("emptyState");
    listeReservations = el("reservationsList");
    sansReservation   = el("noReservations");
    horlogeTables     = el("clock");

    // First render
    afficherToutTables();

    // Clock — update immediately then every 30s
    mettreAJourHorloge();
    setInterval(mettreAJourHorloge, 30000);

    // Filter buttons
    document.querySelectorAll(".filter-btn").forEach(function(btn) {
        btn.addEventListener("click", function() {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            filtresTables = this.dataset.filter;
            afficherGrilleTables();
        });
    });

    // Search input
    el("searchInput").addEventListener("input", afficherGrilleTables);

    // Table selector hint
    el("selectTable").addEventListener("change", function(e) {
        afficherIndiceTable(e.target.value);
    });

    // Close modals on overlay click
    el("reservationModal").addEventListener("click", function(e) { if (e.target === this) fermerModalTable(); });
    el("confirmModal").addEventListener("click",     function(e) { if (e.target === this) fermerConfirmationTable(); });

    // Close modals on Escape key
    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape") { fermerModalTable(); fermerConfirmationTable(); }
    });
}


// ╔══════════════════════════════════════════════════════════════╗
// ║              PAGE: TABLEAU_DE_BORD.HTML                     ║
// ║     Dashboard — KPIs, Charts, Top Products, Export          ║
// ╚══════════════════════════════════════════════════════════════╝

// ================= DISPLAY FUNCTIONS (Dashboard) =================

/**
 * Displays today's date in the dashboard header.
 */
function afficherDateDashboard() {
    const elemDate = el("date");
    if (!elemDate) return;
    elemDate.innerHTML = new Date().toLocaleDateString("fr-FR", {
        weekday: "long", year: "numeric", month: "long", day: "numeric"
    });
}

/**
 * Fills the 4 KPI stat cards from dashboardData.kpi.
 */
function afficherKPI() {
    el("orders").textContent  = dashboardData.kpi.totalCommandes;
    el("revenue").textContent = dashboardData.kpi.revenuTotal + " Dh";
    el("tables").textContent  = dashboardData.kpi.totalTables;
    el("pending").textContent = dashboardData.kpi.enAttente;
}

/**
 * Renders the revenue bar chart (Chart.js).
 */
function afficherGraphiqueBarres() {
    new Chart(el("barChart"), {
        type: "bar",
        data: {
            labels:   dashboardData.revenueParJour.labels,
            datasets: [{ label: "Revenue (Dh)", data: dashboardData.revenueParJour.values, backgroundColor: "gold" }]
        }
    });
}

/**
 * Renders the category pie chart (Chart.js).
 */
function afficherGraphiqueCamembert() {
    new Chart(el("pieChart"), {
        type: "pie",
        data: {
            labels:   dashboardData.categories.labels,
            datasets: [{ data: dashboardData.categories.values, backgroundColor: dashboardData.categories.colors }]
        }
    });
}

/**
 * Builds the top products table.
 */
function afficherTableauProduits() {
    el("tableBody").innerHTML = dashboardData.topProduits.map(function(p, i) {
        return `<tr><td>${i + 1}</td><td>${p.nom}</td><td>${p.prix} Dh</td><td>${p.ventes}</td></tr>`;
    }).join("");
}

/**
 * Renders the recent orders list.
 */
function afficherCommandesRecentes() {
    el("recentOrders").innerHTML = dashboardData.commandesRecentes.map(function(c) {
        return `<div class="order"><strong>Order #${c.numero}</strong><br>${c.description}</div>`;
    }).join("");
}

/**
 * Renders the category progress bars.
 */
function afficherBarresCategories() {
    el("bars").innerHTML = dashboardData.progressCategories.map(function(c) {
        return `<p>${c.nom}</p><div class="bar"><div class="fill" style="width:${c.pourcentage}%">${c.pourcentage}%</div></div>`;
    }).join("");
}

// ================= EVENTS (Dashboard) =================

/**
 * Handles the CSV export button.
 * Shows a brief success alert for 3 seconds.
 */
function exportCSV() {
    const alertBox = el("alertBox");
    if (!alertBox) return;
    alertBox.style.display = "block";
    setTimeout(function() { alertBox.style.display = "none"; }, 3000);
}

/**
 * Initializes everything for Tableau_de_bord.html.
 * Runs only when the dashboard DOM elements are present.
 */
function initialiserPageDashboard() {
    if (!pageContient("barChart")) return; // Not the dashboard page

    afficherDateDashboard();
    afficherKPI();
    afficherGraphiqueBarres();
    afficherGraphiqueCamembert();
    afficherTableauProduits();
    afficherCommandesRecentes();
    afficherBarresCategories();
}


// ╔══════════════════════════════════════════════════════════════╗
// ║                       APP BOOTSTRAP                         ║
// ║  Detect the current page and run only its initializer.      ║
// ╚══════════════════════════════════════════════════════════════╝

// ================= EVENTS (Boot) =================

/**
 * Entry point — called once the DOM is fully loaded.
 * Detects which page is active and initializes only that page's logic.
 */
document.addEventListener("DOMContentLoaded", function() {
    initialiserPageMenu();
    initialiserPageCommandes();
    initialiserPageTables();
    initialiserPageDashboard();
});
