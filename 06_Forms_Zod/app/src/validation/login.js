document.addEventListener("DOMContentLoaded", function() {
    const { z } = window.Zod; 
    
    const loginForm = document.getElementById('loginForm');
    const emailLogin = document.getElementById('emailLogin');
    const passwordLogin = document.getElementById('passwordLogin');
    const errorMessage = document.getElementById('errorLogin');

    // Esquema de validación para login
    const loginSchema = z.object({
        email: z.string().email("Email no válido"),
        password: z.string().min(6, "La contraseña debe tener al menos 6 carácteres")
    });

    function getUsers(){
        const storedUsers = JSON.parse(localStorage.getItem('users'));
        return storedUsers || initialUsers;
    }

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        errorMessage.textContent = "";

        const loginData = {
            email: emailLogin.value.trim(),
            password: passwordLogin.value.trim()
        };

        // Validación con Zod
        const result = loginSchema.safeParse(loginData);
        if (!result.success) {
            const errors = result.error.issues.map(issue => issue.message);
            errorMessage.textContent = errors.join("\n");
            return;
        }

        const allUsers = getUsers();

        // Buscar usuario
        const userFind = Object.values(allUsers).find(user => 
            user.email === loginData.email && 
            user.password === loginData.password
        );
        
        if(userFind) {
            localStorage.setItem("loggedUser", JSON.stringify(userFind));
            window.location.href = "home.html"; 
            errorMessage.textContent = "";
        } else {
            errorMessage.textContent = "Email o contraseña incorrectos";
        }
    });
});