document.addEventListener("DOMContentLoaded", function() {
    const { z } = window.Zod;
    
    const registerForm = document.getElementById('registerForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');

    // Datos de usuarios 
    const usersData= {
        'denior': {name: "Denisse Oliva", username:"denior", password:"123456", email:"denisse@gmail.com"},
        'luz22': {name: "Luz Casas", username:"luz22", password:"abcdef", email:"luz@gmail.com"}
    };

    const registerSchema = z.object({
        name: z.string().min(3, "El nombre debe tener al menos 3 carácteres").trim(),                                  
        email: z.string().email("Email no válido"),
        password: z.string().min(6, "La contraseña debe tener al menos 6 carácteres")
    });

    function clearForm(){
        nameInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';
    }

    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value,
            password: passwordInput.value.trim()
        };

        try {
            const result = registerSchema.parse(formData);
            errorMessage.textContent = "";

            const users = JSON.parse(localStorage.getItem('users')) || usersData;

            const emailRepeat = Object.values(users).some(user =>
                user.email === formData.email
            );

            if(emailRepeat){
                errorMessage.textContent = "Este email ya está registrado";
                return;
            }

            const username = formData.email.split('@')[0];
            const newUser = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                username: username
            };

            users[username] = newUser;
            
            localStorage.setItem('users', JSON.stringify(users));

            console.log(`¡Registro exitoso!\n ${JSON.stringify(result, null, 2)}`);
            alert(`¡Registro exitoso!`);
            clearForm();
        } catch (error) {
            const errors = error.issues.map(issue => issue.message);
            errorMessage.textContent = errors.join("\n");
        }
    });
});
