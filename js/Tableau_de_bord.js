// ============================================================
// ZACKRISTOS — Page: Tableau_de_bord.js (Dashboard)
// Author: Zakaria Outaazza
// Description: Displays KPI stats, revenue chart, category pie,
//              top products table, recent orders, and category bars.
//              Also handles CSV export.
// ============================================================


// ================= DATA =================

// KPI values — these represent the restaurant's performance metrics
const kpiData = {
    totalCommandes: 120,
    revenuTotal:    5400,
    totalTables:    18,
    enAttente:      7
};

// Revenue by day of the week (for the bar chart)
const revenueParJour = {
    labels: ["Lun", "Mar", "Mer", "Jeu", "Ven"],
    values: [500, 800, 600, 1200, 900]
};

// Category distribution (for the pie chart)
const categoriesData = {
    labels:  ["Burger", "Boissons", "Desserts"],
    values:  [50, 30, 20],
    colors:  ["orange", "skyblue", "violet"]
};

// Top-selling products list
const topProduits = [
    { nom: "Whopper",         prix: 85,  ventes: 120 },
    { nom: "Coca Cola",       prix: 12,  ventes: 90  },
    { nom: "Donut",           prix: 15,  ventes: 70  },
    { nom: "Chicken Burger",  prix: 45,  ventes: 55  },
    { nom: "Ice Cream",       prix: 20,  ventes: 40  },
];

// Sample recent orders (last 5)
const commandesRecentes = [
    { numero: 101, description: "Burger Menu - 120 Dh" },
    { numero: 102, description: "Burger Menu - 120 Dh" },
    { numero: 103, description: "Burger Menu - 120 Dh" },
    { numero: 104, description: "Burger Menu - 120 Dh" },
    { numero: 105, description: "Burger Menu - 120 Dh" },
];

// Category progress bars data
const progressCategories = [
    { nom: "Burger",    pourcentage: 80 },
    { nom: "Boissons",  pourcentage: 60 },
    { nom: "Desserts",  pourcentage: 40 },
];


// ================= DOM =================

const elemDate           = document.getElementById("date");
const elemTotalCommandes = document.getElementById("orders");
const elemRevenu         = document.getElementById("revenue");
const elemTables         = document.getElementById("tables");
const elemEnAttente      = document.getElementById("pending");
const elemTableauBody    = document.getElementById("tableBody");
const elemCommandesRec   = document.getElementById("recentOrders");
const elemBars           = document.getElementById("bars");
const elemAlerte         = document.getElementById("alertBox");


// ================= VARIABLES =================
// No mutable state variables needed for this page (display-only)


// ================= DISPLAY FUNCTIONS =================

/**
 * Displays today's date in the dashboard header.
 */
function afficherDate() {
    const aujourdhui = new Date();
    elemDate.innerHTML = aujourdhui.toLocaleDateString("fr-FR", {
        weekday: "long",
        year:    "numeric",
        month:   "long",
        day:     "numeric"
    });
}

/**
 * Fills in the 4 KPI stat cards with data from kpiData.
 */
function afficherKPI() {
    elemTotalCommandes.textContent = kpiData.totalCommandes;
    elemRevenu.textContent         = kpiData.revenuTotal + " Dh";
    elemTables.textContent         = kpiData.totalTables;
    elemEnAttente.textContent      = kpiData.enAttente;
}

/**
 * Renders the bar chart (revenue by day) using Chart.js.
 */
function afficherGraphiqueBarres() {
    new Chart(document.getElementById("barChart"), {
        type: "bar",
        data: {
            labels:   revenueParJour.labels,
            datasets: [{
                label:           "Revenue (Dh)",
                data:            revenueParJour.values,
                backgroundColor: "gold"
            }]
        }
    });
}

/**
 * Renders the pie chart (category breakdown) using Chart.js.
 */
function afficherGraphiqueCamembert() {
    new Chart(document.getElementById("pieChart"), {
        type: "pie",
        data: {
            labels:   categoriesData.labels,
            datasets: [{
                data:            categoriesData.values,
                backgroundColor: categoriesData.colors
            }]
        }
    });
}

/**
 * Builds the top products table rows and injects them into the DOM.
 */
function afficherTableauProduits() {
    elemTableauBody.innerHTML = topProduits.map(function(produit, index) {
        return `
            <tr>
                <td>${index + 1}</td>
                <td>${produit.nom}</td>
                <td>${produit.prix} Dh</td>
                <td>${produit.ventes}</td>
            </tr>
        `;
    }).join("");
}

/**
 * Renders the recent orders list section.
 */
function afficherCommandesRecentes() {
    elemCommandesRec.innerHTML = commandesRecentes.map(function(commande) {
        return `
            <div class="order">
                <strong>Order #${commande.numero}</strong>
                <br>
                ${commande.description}
            </div>
        `;
    }).join("");
}

/**
 * Renders category progress bars with percentage fills.
 */
function afficherBarresCategories() {
    elemBars.innerHTML = progressCategories.map(function(categorie) {
        return `
            <p>${categorie.nom}</p>
            <div class="bar">
                <div class="fill" style="width:${categorie.pourcentage}%">
                    ${categorie.pourcentage}%
                </div>
            </div>
        `;
    }).join("");
}

/**
 * Initializes the entire dashboard by calling all display functions.
 */
function initialiserDashboard() {
    afficherDate();
    afficherKPI();
    afficherGraphiqueBarres();
    afficherGraphiqueCamembert();
    afficherTableauProduits();
    afficherCommandesRecentes();
    afficherBarresCategories();
}


// ================= FILTERS =================
// Not applicable on this page (dashboard is display-only)


// ================= CRUD =================
// Not applicable on this page (dashboard is read-only)


// ================= SEARCH =================
// Not applicable on this page


// ================= MODALS =================
// Not applicable on this page


// ================= EVENTS =================

/**
 * Handles the CSV export button click.
 * Shows a temporary success alert message for 3 seconds.
 * In a real app, this would generate and download a CSV file.
 */
function exportCSV() {
    elemAlerte.style.display = "block";

    setTimeout(function() {
        elemAlerte.style.display = "none";
    }, 3000);
}

// Launch the dashboard on page load
initialiserDashboard();
