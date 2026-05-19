// ============================================================
// ZACKRISTOS — Page: Commandes.js (Orders)
// Author: Zakaria Outaazza
// Description: Manages restaurant orders — add, edit, delete,
//              view details, search, filter, and pagination.
// ============================================================


// ================= DATA =================

// Product class — same structure used across the project
class Produit {
    constructor(nom, url, prix, description, categorie) {
        this.nom         = nom;
        this.url         = url;
        this.prix        = prix;
        this.description = description;
        this.categorie   = categorie;
    }
}

// Central menu data — source of truth for all available dishes
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
    new Produit("Coca Cola",          "../IMG/Coca_Cola.jpg",          12.00, "Boisson fraîche", "Boisson"),
    new Produit("Coca Zero",          "../IMG/Coca_Zero.jpg",          13.00, "Sans sucre",      "Boisson"),
    new Produit("Fanta Citron",       "../IMG/Fanta_Citron.jpg",       11.00, "Goût citron",     "Boisson"),
    new Produit("Sprite",             "../IMG/Sprite.jpg",             10.00, "Citron frais",    "Boisson"),
    new Produit("Ice Tea",            "../IMG/Ice_Tea.jpg",            14.99, "Thé glacé",       "Boisson"),
    new Produit("Mojito Fraise",      "../IMG/Mojito_Fraise.jpg",      18.00, "Menthe & fraise", "Boisson"),
    new Produit("Milkshake Chocolat", "../IMG/Milkshake_Chocolat.jpg", 24.99, "Shake chocolaté", "Boisson"),
    new Produit("Jus d'Orange",       "../IMG/Jus_d'Orange.jpg",       16.00, "Orange naturel",  "Boisson"),

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

// Orders list — each order has an id, items array, table, status, notes, and date
let commandes = [
    {
        id:     "CMD-001",
        items:  [{ nom: "Whopper",        prix: 84.99, qty: 1 }, { nom: "Coca Cola",  prix: 12.00, qty: 2 }],
        table:  "Table 3",
        statut: "Livré",
        notes:  "",
        date:   "2026-05-15 10:22"
    },
    {
        id:     "CMD-002",
        items:  [{ nom: "Chicken Crispy", prix: 29.99, qty: 2 }],
        table:  "Table 1",
        statut: "En attente",
        notes:  "Sans oignons",
        date:   "2026-05-15 11:05"
    },
    {
        id:     "CMD-003",
        items:  [{ nom: "BBQ Burger", prix: 86.00, qty: 1 }, { nom: "Tiramisu", prix: 26.99, qty: 1 }],
        table:  "Table 5",
        statut: "En cours",
        notes:  "",
        date:   "2026-05-15 11:30"
    },
    {
        id:     "CMD-004",
        items:  [{ nom: "Donut", prix: 12.99, qty: 3 }, { nom: "Ice Tea", prix: 14.99, qty: 1 }],
        table:  "À emporter",
        statut: "Annulé",
        notes:  "",
        date:   "2026-05-15 09:50"
    },
    {
        id:     "CMD-005",
        items:  [{ nom: "Cheeseburger", prix: 19.99, qty: 2 }, { nom: "Sprite", prix: 10.00, qty: 2 }],
        table:  "Table 2",
        statut: "Livré",
        notes:  "",
        date:   "2026-05-15 12:00"
    },
];


// ================= DOM =================

const tableauBody  = document.getElementById("ordersTableBody");
const etatVide     = document.getElementById("emptyState");
const infoPage     = document.getElementById("paginationInfo");
const boutonsPage  = document.getElementById("paginationBtns");


// ================= VARIABLES =================

// Currently active status filter ("all" shows everything)
let filtreActif      = "all";

// Current pagination page
let pageCourante     = 1;

// Number of orders shown per page
const TAILLE_PAGE    = 8;

// ID of the order to delete (set when confirm modal opens)
let cibleSuppression = null;

// ID of the order being edited (null = creating new)
let cibleEdition     = null;

// Items currently selected in the add/edit modal
let itemsSelectionnes = [];


// ================= DISPLAY FUNCTIONS =================

/**
 * Returns the CSS class name for a given order status badge.
 * @param {string} statut - The order status string
 * @returns {string} CSS class name
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
 * Returns a short label for a order's items.
 * Shows first item name + count of extras (e.g. "Whopper +2").
 * @param {object} commande - The order object
 * @returns {string} Short label string
 */
function etiquettePremierPlat(commande) {
    if (!commande.items.length) return "—";
    const noms = commande.items.map(i => i.nom);
    return noms.length > 1 ? `${noms[0]} +${noms.length - 1}` : noms[0];
}

/**
 * Calculates the total price of all items in an order.
 * @param {Array} items - Array of order items with prix and qty
 * @returns {string} Total formatted to 2 decimal places
 */
function calculerTotal(items) {
    return items.reduce((somme, item) => somme + item.prix * item.qty, 0).toFixed(2);
}

/**
 * Returns emoji icon for a product category.
 * @param {string} categorie - "Burger" | "Boisson" | "Dessert"
 * @returns {string} Emoji character
 */
function emojiCategorie(categorie) {
    const emojis = { Burger: "🍔", Boisson: "🥤", Dessert: "🍰" };
    return emojis[categorie] || "🍽️";
}

/**
 * Returns the current date and time as a formatted string.
 * @returns {string} e.g. "2026-05-19 14:35"
 */
function maintenant() {
    return new Date().toISOString().slice(0, 16).replace("T", " ");
}

/**
 * Generates a random unique order ID like "CMD-48392".
 * @returns {string}
 */
function genererIdCommande() {
    return "CMD-" + String(Math.floor(Math.random() * 90000) + 10000);
}

/**
 * Renders the full orders table with the current filter, search, and page.
 * Also updates stats and pagination controls.
 */
function afficherTableau() {
    const commandesFiltrees = obtenirCommandesFiltrees();
    const debut  = (pageCourante - 1) * TAILLE_PAGE;
    const tranche = commandesFiltrees.slice(debut, debut + TAILLE_PAGE);

    if (!commandesFiltrees.length) {
        tableauBody.innerHTML = "";
        etatVide.style.display = "flex";
    } else {
        etatVide.style.display = "none";
        tableauBody.innerHTML = tranche.map(function(commande, idx) {
            const produitMenu = menuData.find(m => m.nom === commande.items[0]?.nom);
            const vignette = produitMenu
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
                            <button class="btn-action edit" onclick="ouvrirModalEdition('${commande.id}')" title="Modifier"><i class="bi bi-pencil"></i></button>
                            <button class="btn-action del"  onclick="ouvrirModalConfirm('${commande.id}')" title="Supprimer"><i class="bi bi-trash3"></i></button>
                        </div>
                    </td>
                </tr>
            `;
        }).join("");
    }

    afficherPagination(commandesFiltrees.length);
    mettreAJourStats();
}

/**
 * Updates the 4 KPI stat cards at the top of the page.
 */
function mettreAJourStats() {
    document.getElementById("stat-total").textContent   = commandes.length;
    document.getElementById("stat-livre").textContent   = commandes.filter(c => c.statut === "Livré").length;
    document.getElementById("stat-attente").textContent = commandes.filter(c => c.statut === "En attente").length;

    const revenuTotal = commandes
        .reduce((somme, c) => somme + parseFloat(calculerTotal(c.items)), 0)
        .toFixed(0);
    document.getElementById("stat-revenue").textContent = revenuTotal;
}

/**
 * Renders the menu item grid inside the add/edit modal.
 * Highlights already-selected items.
 */
function afficherGrilleMenu() {
    const recherche = document.getElementById("menuSearchInput").value.toLowerCase();
    const grille    = document.getElementById("menuItemsGrid");

    const produitsFiltres = menuData.filter(m => !recherche || m.nom.toLowerCase().includes(recherche));

    grille.innerHTML = produitsFiltres.map(function(m) {
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
 * Renders the list of selected items with quantity controls.
 * Also updates the total price preview.
 */
function afficherItemsSelectionnes() {
    const liste = document.getElementById("selectedItemsList");

    if (!itemsSelectionnes.length) {
        liste.innerHTML = "";
        document.getElementById("totalPreview").textContent = "0.00 DH";
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

    const total = itemsSelectionnes.reduce((s, i) => s + i.prix * i.qty, 0).toFixed(2);
    document.getElementById("totalPreview").textContent = total + " DH";
}


// ================= FILTERS =================

/**
 * Applies the active filter and search query to return matching orders.
 * @returns {Array} Filtered list of orders
 */
function obtenirCommandesFiltrees() {
    const recherche = document.getElementById("searchInput").value.toLowerCase();

    return commandes.filter(function(c) {
        const correspondFiltre  = filtreActif === "all" || c.statut === filtreActif;
        const correspondRecherche = !recherche
            || c.id.toLowerCase().includes(recherche)
            || etiquettePremierPlat(c).toLowerCase().includes(recherche)
            || c.table.toLowerCase().includes(recherche);
        return correspondFiltre && correspondRecherche;
    });
}

/**
 * Sets the active filter and re-renders the table.
 * @param {HTMLElement} element - The clicked filter button
 * @param {string} valeur - Filter value ("all" | "En attente" | "En cours" | "Livré" | "Annulé")
 */
function setFilter(element, valeur) {
    filtreActif  = valeur;
    pageCourante = 1;

    document.querySelectorAll(".btn-filter").forEach(b => b.classList.remove("active-filter"));
    element.classList.add("active-filter");

    afficherTableau();
}

/**
 * Called on search input — resets to page 1 and re-renders.
 */
function filterOrders() {
    pageCourante = 1;
    afficherTableau();
}


// ================= CRUD =================

/**
 * Toggles a menu item in/out of the selected items list.
 * @param {string} nom - Product name
 * @param {number} prix - Product price
 * @param {string} categorie - Product category
 */
function basculerItem(nom, prix, categorie) {
    const index = itemsSelectionnes.findIndex(s => s.nom === nom);

    if (index === -1) {
        itemsSelectionnes.push({ nom, prix, qty: 1 });
    } else {
        itemsSelectionnes.splice(index, 1);
    }

    afficherGrilleMenu();
    afficherItemsSelectionnes();
}

/**
 * Changes the quantity of a selected item by a delta (+1 or -1).
 * Quantity cannot go below 1.
 * @param {string} nom - Product name
 * @param {number} delta - +1 or -1
 */
function changerQuantite(nom, delta) {
    const item = itemsSelectionnes.find(s => s.nom === nom);
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    afficherItemsSelectionnes();
}

/**
 * Removes a selected item from the selection list.
 * @param {string} nom - Product name to remove
 */
function retirerItem(nom) {
    itemsSelectionnes = itemsSelectionnes.filter(s => s.nom !== nom);
    afficherGrilleMenu();
    afficherItemsSelectionnes();
}

/**
 * Saves a new order or updates an existing one.
 * Validates that a table is selected and at least one item is chosen.
 */
function saveOrder() {
    const table  = document.getElementById("inp-table").value;
    const statut = document.getElementById("inp-status").value;
    const notes  = document.getElementById("inp-notes").value.trim();

    if (!table)                  { afficherErreur("Veuillez sélectionner une table.");          return; }
    if (!itemsSelectionnes.length) { afficherErreur("Veuillez ajouter au moins un plat."); return; }

    if (cibleEdition) {
        // EDIT MODE — update the matching order
        const index = commandes.findIndex(c => c.id === cibleEdition);
        commandes[index] = {
            ...commandes[index],
            items: itemsSelectionnes,
            table,
            statut,
            notes
        };
        fermerModalAjout();
        afficherSucces("Commande modifiée avec succès !");
    } else {
        // ADD MODE — prepend the new order to the list
        commandes.unshift({
            id:     genererIdCommande(),
            items:  itemsSelectionnes,
            table,
            statut,
            notes,
            date:   maintenant()
        });
        fermerModalAjout();
        afficherSucces("Commande créée avec succès !");
    }

    pageCourante = 1;
    afficherTableau();
}

/**
 * Removes the targeted order from the list and re-renders.
 */
function confirmDelete() {
    commandes = commandes.filter(c => c.id !== cibleSuppression);
    fermerModalConfirm();

    // Go back a page if the current page is now empty
    if ((pageCourante - 1) * TAILLE_PAGE >= obtenirCommandesFiltrees().length && pageCourante > 1) {
        pageCourante--;
    }

    afficherTableau();
    afficherSucces("Commande supprimée avec succès !");
}


// ================= SEARCH =================
// (Search is handled via filterOrders() and obtenirCommandesFiltrees() above)


// ================= MODALS =================

/**
 * Opens the add/edit modal in "create" mode with all fields reset.
 */
function openAddModal() {
    cibleEdition    = null;
    itemsSelectionnes = [];

    document.getElementById("addModalTitle").textContent  = "Ajouter une Commande";
    document.getElementById("submitBtnText").textContent  = "Créer la commande";
    document.getElementById("inp-table").value    = "";
    document.getElementById("inp-status").value   = "En attente";
    document.getElementById("inp-notes").value    = "";
    document.getElementById("menuSearchInput").value = "";

    afficherGrilleMenu();
    afficherItemsSelectionnes();
    document.getElementById("addModal").classList.add("open");
    document.body.style.overflow = "hidden";
}

/**
 * Opens the add/edit modal in "edit" mode pre-filled with an existing order.
 * @param {string} id - The order ID to edit
 */
function openEditModal(id) {
    const commande = commandes.find(c => c.id === id);
    if (!commande) return;

    cibleEdition    = id;
    itemsSelectionnes = commande.items.map(i => ({ ...i })); // shallow copy of items

    document.getElementById("addModalTitle").textContent  = "Modifier la Commande";
    document.getElementById("submitBtnText").textContent  = "Enregistrer";
    document.getElementById("inp-table").value    = commande.table;
    document.getElementById("inp-status").value   = commande.statut;
    document.getElementById("inp-notes").value    = commande.notes;
    document.getElementById("menuSearchInput").value = "";

    afficherGrilleMenu();
    afficherItemsSelectionnes();
    document.getElementById("addModal").classList.add("open");
    document.body.style.overflow = "hidden";
}

/**
 * Closes the add/edit modal.
 */
function fermerModalAjout() {
    document.getElementById("addModal").classList.remove("open");
    document.body.style.overflow = "auto";
}

// Alias used in HTML onclick
function closeAddModal() { fermerModalAjout(); }

/**
 * Opens the view modal showing full details of an order.
 * @param {string} id - The order ID to display
 */
function ouvrirModalVoir(id) {
    const commande = commandes.find(c => c.id === id);
    if (!commande) return;

    document.getElementById("viewModalContent").innerHTML = `
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

    document.getElementById("viewModal").classList.add("open");
    document.body.style.overflow = "hidden";
}

/**
 * Closes the view details modal.
 */
function closeViewModal() {
    document.getElementById("viewModal").classList.remove("open");
    document.body.style.overflow = "auto";
}

/**
 * Opens the delete confirmation modal for a specific order.
 * @param {string} id - The order ID to delete
 */
function ouvrirModalConfirm(id) {
    cibleSuppression = id;
    document.getElementById("confirmModal").classList.add("open");
    document.body.style.overflow = "hidden";
}

/**
 * Closes the delete confirmation modal.
 */
function fermerModalConfirm() {
    cibleSuppression = null;
    document.getElementById("confirmModal").classList.remove("open");
    document.body.style.overflow = "auto";
}

// Alias used in HTML onclick
function closeConfirmModal() { fermerModalConfirm(); }

/**
 * Displays a warning/error notification with a custom message.
 * @param {string} message - The error text to show
 */
function afficherErreur(message) {
    document.getElementById("info_error").innerText = message;
    document.getElementById("errorModal").style.display = "block";
}

/**
 * Closes the error notification modal.
 */
function closeErrorModal() {
    document.getElementById("errorModal").style.display = "none";
}

/**
 * Displays a success notification with a custom message.
 * Auto-closes after 3 seconds.
 * @param {string} message - The success text to show
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
function closeSuccessModal() {
    document.getElementById("successModal").style.display = "none";
}

/**
 * Renders pagination buttons and info text below the orders table.
 * @param {number} total - Total number of filtered orders
 */
function afficherPagination(total) {
    const totalPages = Math.ceil(total / TAILLE_PAGE) || 1;
    const debut = (pageCourante - 1) * TAILLE_PAGE + 1;
    const fin   = Math.min(pageCourante * TAILLE_PAGE, total);

    infoPage.textContent  = total ? `Affichage ${debut}–${fin} sur ${total}` : "Aucun résultat";
    boutonsPage.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.className   = "btn-page" + (i === pageCourante ? " active" : "");
        btn.textContent = i;
        btn.onclick     = function() { pageCourante = i; afficherTableau(); };
        boutonsPage.appendChild(btn);
    }
}


// ================= EVENTS =================

// Close any modal overlay when clicking the dark background behind it
document.querySelectorAll(".modal-overlay").forEach(function(overlay) {
    overlay.addEventListener("click", function(e) {
        if (e.target === overlay) {
            overlay.classList.remove("open");
            document.body.style.overflow = "auto";

            // Also reset the delete target if the confirm modal was closed
            if (overlay.id === "confirmModal") cibleSuppression = null;
        }
    });
});

// Initial render on page load
afficherTableau();
