// ============================================================
// ZACKRISTOS — Page: Tables.js (Gestion des tables)
// Author: Zakaria Outaazza
// Description: Manages restaurant table reservations — view,
//              reserve, edit, delete, filter, search, and toasts.
// ============================================================


// ================= DATA =================

// Total number of tables in the restaurant
const NOMBRE_TABLES = 8;

/**
 * Creates the initial table objects.
 * Each table starts as available with no reservation details.
 */
let tables = Array.from({ length: NOMBRE_TABLES }, function(_, i) {
    return {
        id:          i + 1,
        nom:         `Table ${i + 1}`,
        statut:      "available",   // "available" | "reserved"
        chevalet:    null,          // chevalet (stand) number
        client:      null,          // optional client name
        reserveeLe:  null           // Date object or null
    };
});


// ================= DOM =================

const grilleTableaux   = document.getElementById("tablesGrid");
const etatVide         = document.getElementById("emptyState");
const listeReservations = document.getElementById("reservationsList");
const sansReservation  = document.getElementById("noReservations");
const horloge          = document.getElementById("clock");


// ================= VARIABLES =================

// Currently selected filter tab ("all" | "available" | "reserved")
let filtreActif = "all";

// ID of the table being edited in the modal (null = new reservation)
let idTableEdition = null;

// ID of the table targeted for deletion confirmation
let idTableSuppression = null;


// ================= DISPLAY FUNCTIONS =================

/**
 * Updates the stat pills (Available / Reserved / Total) in the stats bar.
 */
function mettreAJourStats() {
    const reservees   = tables.filter(t => t.statut === "reserved").length;
    const disponibles = NOMBRE_TABLES - reservees;

    document.getElementById("stat-available").textContent = disponibles;
    document.getElementById("stat-reserved").textContent  = reservees;
    document.getElementById("stat-total").textContent     = NOMBRE_TABLES;
}

/**
 * Updates the live clock displayed in the stats bar.
 * Called every 30 seconds.
 */
function mettreAJourHorloge() {
    const maintenant = new Date();
    horloge.textContent =
        maintenant.toLocaleDateString("fr-FR", { weekday: "short", day: "2-digit", month: "short" }) +
        " · " +
        maintenant.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

/**
 * Formats a Date object into a readable French string.
 * @param {Date} date - The date to format
 * @returns {string} e.g. "19 mai à 14:35"
 */
function formaterDate(date) {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("fr-FR",  { day: "2-digit", month: "short" }) +
           " à " +
           d.toLocaleTimeString("fr-FR",  { hour: "2-digit", minute: "2-digit" });
}

/**
 * Builds the HTML card for a single table and appends it to the grid.
 * @param {object} table - The table object
 * @param {number} delaiAnimation - CSS animation delay index
 */
function construireCarteTable(table, delaiAnimation) {
    const carte = document.createElement("div");
    carte.className = `table-card ${table.statut}`;
    carte.style.animationDelay = `${delaiAnimation * 0.045}s`;

    const badgeStatut = table.statut === "reserved"
        ? `<span class="status-badge badge-reserved"><i class="bi bi-lock-fill"></i> Réservée</span>`
        : `<span class="status-badge badge-available"><i class="bi bi-check-circle-fill"></i> Disponible</span>`;

    const dateHeure = table.reserveeLe
        ? `<div class="table-time"><i class="bi bi-clock"></i> ${formaterDate(table.reserveeLe)}</div>`
        : "";

    const nomClient = table.client
        ? `<div style="font-size:12px;color:var(--gold)">${table.client}</div>`
        : "";

    const btnSupprimer = table.statut === "reserved"
        ? `<button class="card-action-btn btn-delete-card" onclick="confirmerSuppression(${table.id})"><i class="bi bi-trash"></i></button>`
        : "";

    carte.innerHTML = `
        <div class="table-number-badge">${table.id}</div>
        <div class="table-icon-wrap">${table.statut === "reserved" ? "🍽️" : "🪑"}</div>
        <div class="table-name">${table.nom}</div>
        <div class="chevalet-info">Chevalet : <span>${table.chevalet ?? "—"}</span></div>
        ${nomClient}
        ${badgeStatut}
        ${dateHeure}
        <div class="card-actions">
            <button class="card-action-btn btn-edit-card" onclick="modifierTable(${table.id})">
                <i class="bi bi-pencil"></i> Modifier
            </button>
            ${btnSupprimer}
        </div>
    `;

    // Clicking the card (not the buttons) also opens the edit modal
    carte.addEventListener("click", function(e) {
        if (!e.target.closest("button")) modifierTable(table.id);
    });

    return carte;
}

/**
 * Renders all table cards in the grid, applying the active filter and search.
 */
function afficherGrille() {
    grilleTableaux.innerHTML = "";
    const recherche = document.getElementById("searchInput").value.toLowerCase();

    const tablesFiltrees = tables.filter(function(t) {
        const correspondFiltre  = filtreActif === "all" || t.statut === filtreActif;
        const correspondRecherche =
            t.nom.toLowerCase().includes(recherche) ||
            (t.chevalet && String(t.chevalet).includes(recherche)) ||
            (t.client && t.client.toLowerCase().includes(recherche));
        return correspondFiltre && correspondRecherche;
    });

    if (!tablesFiltrees.length) {
        etatVide.classList.add("show");
    } else {
        etatVide.classList.remove("show");
        tablesFiltrees.forEach(function(table, index) {
            grilleTableaux.appendChild(construireCarteTable(table, index));
        });
    }
}

/**
 * Renders the "Active Reservations" list below the grid.
 * Shows a placeholder message when no tables are reserved.
 */
function afficherListeReservations() {
    listeReservations.innerHTML = "";

    const tablesReservees = tables.filter(t => t.statut === "reserved");

    if (!tablesReservees.length) {
        listeReservations.appendChild(sansReservation);
        sansReservation.style.display = "";
        return;
    }

    tablesReservees.forEach(function(table, index) {
        const ligne = document.createElement("div");
        ligne.className = "reservation-row";
        ligne.style.animationDelay = `${index * 0.05}s`;

        ligne.innerHTML = `
            <div class="res-table-icon">🍽️</div>
            <div class="res-info">
                <div class="res-name">${table.nom}${table.client ? " — " + table.client : ""}</div>
                <div class="res-sub">
                    Chevalet : ${table.chevalet ?? "—"}
                    ${table.reserveeLe ? " · " + formaterDate(table.reserveeLe) : ""}
                </div>
            </div>
            <span class="status-badge badge-reserved" style="flex-shrink:0">
                <i class="bi bi-lock-fill"></i> Réservée
            </span>
            <div class="res-actions">
                <button class="res-btn res-btn-edit" onclick="modifierTable(${table.id})">
                    <i class="bi bi-pencil"></i> Éditer
                </button>
                <button class="res-btn res-btn-del" onclick="confirmerSuppression(${table.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;

        listeReservations.appendChild(ligne);
    });
}

/**
 * Fills the table selector dropdown in the modal with all tables.
 * Preserves the currently selected value if it exists.
 */
function remplirSelectTable() {
    const selecteur = document.getElementById("selectTable");
    const valeurActuelle = selecteur.value;

    selecteur.innerHTML = '<option value="">— Sélectionnez une table —</option>';

    tables.forEach(function(t) {
        const option    = document.createElement("option");
        option.value    = t.id;
        option.textContent = `${t.nom} (${t.statut === "reserved" ? "Réservée" : "Disponible"})`;
        if (t.id == valeurActuelle) option.selected = true;
        selecteur.appendChild(option);
    });
}

/**
 * Full re-render: updates stats, grid, and reservations list.
 */
function afficherTout() {
    mettreAJourStats();
    afficherGrille();
    afficherListeReservations();
    remplirSelectTable();
}


// ================= FILTERS =================

/**
 * Updates the active filter and refreshes the table grid.
 * Attached to each filter tab button via event listeners.
 */
document.querySelectorAll(".filter-btn").forEach(function(bouton) {
    bouton.addEventListener("click", function() {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        filtreActif = this.dataset.filter;
        afficherGrille();
    });
});

// Re-render grid on every keystroke in the search field
document.getElementById("searchInput").addEventListener("input", afficherGrille);


// ================= CRUD =================

/**
 * Reads and validates the modal form, then saves the reservation.
 * Handles both creating new reservations and editing existing ones.
 */
function submitReservation() {
    const idTable  = parseInt(document.getElementById("selectTable").value);
    const chevalet = document.getElementById("chevelatInput").value.trim();
    const statut   = document.getElementById("selectStatus").value;
    const client   = document.getElementById("clientName").value.trim() || null;
    const horaireAuto = document.getElementById("autoTimeToggle").checked;

    // Validation
    if (!idTable)  return afficherToast("Veuillez sélectionner une table.", "error");
    if (!chevalet) return afficherToast("Veuillez entrer le numéro du chevalet.", "error");

    // Determine reservation date/time
    let dateReservation;
    if (horaireAuto) {
        dateReservation = new Date();
    } else {
        const date  = document.getElementById("manualDate").value;
        const heure = document.getElementById("manualTime").value;
        if (!date || !heure) return afficherToast("Veuillez entrer la date et l'heure.", "error");
        dateReservation = new Date(`${date}T${heure}`);
    }

    // Apply changes to the matching table
    const table = tables.find(t => t.id === idTable);
    if (!table) return;

    table.statut     = statut;
    table.chevalet   = parseInt(chevalet);
    table.client     = client;
    table.reserveeLe = statut === "reserved" ? dateReservation : null;

    const action = idTableEdition ? "mise à jour" : "réservée";
    fermerModal();
    afficherTout();
    afficherToast(`${table.nom} ${action} avec succès ! ✓`, "success");
}

/**
 * Frees a table — resets its status, chevalet, client, and reservation date.
 * @param {number} id - The table ID to free
 */
function supprimerReservation(id) {
    const table = tables.find(t => t.id === id);
    if (!table) return;

    table.statut     = "available";
    table.chevalet   = null;
    table.client     = null;
    table.reserveeLe = null;

    fermerConfirmation();
    afficherTout();
    afficherToast(`${table.nom} libérée avec succès.`, "success");
}


// ================= SEARCH =================
// Search is handled via the "input" event on #searchInput above
// and inside afficherGrille() where it reads the value.


// ================= MODALS =================

/**
 * Opens the reservation modal in "add" mode with a clean form.
 * @param {number|null} idPreselect - Optionally pre-select a table by ID
 */
function openModal(idPreselect = null) {
    idTableEdition = null;

    document.getElementById("modalTitle").textContent       = "RÉSERVER UNE TABLE";
    document.getElementById("submitBtn").innerHTML          = '<i class="bi bi-check-circle"></i> CONFIRMER';
    document.getElementById("selectTable").value            = idPreselect ?? "";
    document.getElementById("chevelatInput").value          = "";
    document.getElementById("selectStatus").value           = "reserved";
    document.getElementById("clientName").value             = "";
    document.getElementById("autoTimeToggle").checked       = true;
    document.getElementById("manualTimeGroup").style.display = "none";
    document.getElementById("tableStatusHint").textContent  = "";

    if (idPreselect) afficherIndiceTable(idPreselect);

    document.getElementById("reservationModal").classList.add("open");
}

/**
 * Opens the modal in "edit" mode pre-filled with a table's current data.
 * @param {number} id - The table ID to edit
 */
function modifierTable(id) {
    const table = tables.find(t => t.id === id);
    if (!table) return;

    idTableEdition = id;

    document.getElementById("modalTitle").textContent        = `MODIFIER — ${table.nom.toUpperCase()}`;
    document.getElementById("submitBtn").innerHTML           = '<i class="bi bi-pencil"></i> METTRE À JOUR';
    document.getElementById("chevelatInput").value           = table.chevalet ?? "";
    document.getElementById("selectStatus").value            = table.statut;
    document.getElementById("clientName").value              = table.client ?? "";
    document.getElementById("autoTimeToggle").checked        = true;
    document.getElementById("manualTimeGroup").style.display = "none";
    document.getElementById("tableStatusHint").textContent   = "";

    remplirSelectTable();
    document.getElementById("selectTable").value = table.id;

    document.getElementById("reservationModal").classList.add("open");
}

/**
 * Closes the reservation modal.
 */
function fermerModal() {
    document.getElementById("reservationModal").classList.remove("open");
    idTableEdition = null;
}

// Alias used in HTML onclick
function closeModal() { fermerModal(); }

/**
 * Opens the delete confirmation dialog for a specific table.
 * @param {number} id - The table ID to confirm deletion for
 */
function confirmerSuppression(id) {
    idTableSuppression = id;
    const table = tables.find(t => t.id === id);

    document.getElementById("confirmText").textContent =
        `Voulez-vous libérer ${table?.nom} et supprimer sa réservation ?`;

    document.getElementById("confirmDeleteBtn").onclick = function() {
        supprimerReservation(id);
    };

    document.getElementById("confirmModal").classList.add("open");
}

/**
 * Closes the delete confirmation dialog.
 */
function fermerConfirmation() {
    document.getElementById("confirmModal").classList.remove("open");
    idTableSuppression = null;
}

// Alias used in HTML onclick
function closeConfirm() { fermerConfirmation(); }

/**
 * Shows or hides the manual date/time input fields
 * based on the state of the auto-time toggle switch.
 */
function toggleTimeFields() {
    const autoActif = document.getElementById("autoTimeToggle").checked;
    document.getElementById("manualTimeGroup").style.display = autoActif ? "none" : "block";
}

/**
 * Displays a hint below the table selector showing its current status.
 * @param {string|number} valeur - The selected table ID value
 */
function afficherIndiceTable(valeur) {
    const indice = document.getElementById("tableStatusHint");
    if (!valeur) { indice.textContent = ""; return; }

    const table = tables.find(t => t.id == valeur);
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
 * Shows a temporary toast notification at the bottom of the screen.
 * @param {string} message - The text to display
 * @param {string} type - "success" | "error"
 */
function afficherToast(message, type) {
    const conteneur = document.getElementById("toastContainer");
    const toast     = document.createElement("div");
    toast.className = `toast-msg ${type}`;

    const icone  = type === "success" ? "bi-check-circle-fill" : "bi-exclamation-triangle-fill";
    const couleur = type === "success" ? "var(--success)" : "var(--danger)";

    toast.innerHTML = `<i class="bi ${icone}" style="color:${couleur};font-size:18px"></i><span>${message}</span>`;
    conteneur.appendChild(toast);

    // Auto-remove after 3.8 seconds
    setTimeout(function() { toast.remove(); }, 3800);
}


// ================= EVENTS =================

// Update the table hint when a table is selected from the dropdown
document.getElementById("selectTable").addEventListener("change", function(e) {
    afficherIndiceTable(e.target.value);
});

// Close modal when clicking the dark overlay background
document.getElementById("reservationModal").addEventListener("click", function(e) {
    if (e.target === this) fermerModal();
});

// Close confirm dialog when clicking the dark overlay background
document.getElementById("confirmModal").addEventListener("click", function(e) {
    if (e.target === this) fermerConfirmation();
});

// Close any open modal when the user presses the Escape key
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        fermerModal();
        fermerConfirmation();
    }
});

// Start the clock and update it every 30 seconds
mettreAJourHorloge();
setInterval(mettreAJourHorloge, 30000);

// Initial full render on page load
afficherTout();
