function login() {

    let nom = document.getElementById("inputTEXT").value;
    let pswd = document.getElementById("inputPSWD").value;

    let USERS = [
        { username: "user", password: "1234" },
        { username: "user1", password: "abcd" },
        { username: "user2", password: "efgh" }
    ];

    let X = false;

    for (let i = 0; i < USERS.length; i++) {

        if (USERS[i].username == nom && USERS[i].password == pswd) {
            X = true;
            break;
        }
    }

    if (nom == "" || pswd == "") {

        document.getElementById("errorModal").style.display = "block";

    } else if (X) {

        window.location.href = "html/Accueil.html";

    } else {

        document.getElementById("errorModal").style.display = "block";

    }

}

function closeModal() {

    document.getElementById("errorModal").style.display = "none";

}