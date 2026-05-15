function login() {
    let nom = document.getElementById("inputTEXT").value;
    let pswd = document.getElementById("inputPSWD").value;

    let USERS = [
        { username: "user", password: "1234" },
        { username: "user1", password: "abcd" },
        { username: "user2", password: "efgh" }
    ];

    let Cpmt = USERS.find(u => u.username === nom && u.password === pswd);

    if (Cpmt) {    
        window.location.href = "../html/index.html";
    } else {
        document.getElementById("errorModal").style.display = "block";
    }

    if (nom === "" || pswd === "") {
        document.getElementById("errorModal").style.display = "block";
        
    }
}
    function errorModal() {
        document.getElementById("errorModal").style.display = "none";
    }
