document.addEventListener("DOMContentLoaded", function(){
    loadUserData();
});

function loadUserData(){
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    if(loggedUser) {
        document.getElementById('profile-name').textContent = loggedUser.name;
    }
}

function logOut() {
    const confirmation = window.confirm("¿Estás seguro de que deseas cerrar sesión?");
    
    if (confirmation) {
        localStorage.removeItem("loggedUser");
        window.location.href = "index.html"; 
    }
}