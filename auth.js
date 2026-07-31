// ================================
// WearhubStyle Demo Auth (localStorage based)
// ================================

// ---- Register ----

let registerForm = document.getElementById("register-form");

if (registerForm) {

    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim().toLowerCase();
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirm-password").value;

        if (password.length < 6) {
            showAuthMessage("Password must be at least 6 characters long", "error");
            return;
        }

        if (password !== confirmPassword) {
            showAuthMessage("Passwords do not match", "error");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        let alreadyExists = users.find(function (user) {
            return user.email === email;
        });

        if (alreadyExists) {
            showAuthMessage("An account with this email already exists. Please login.", "error");
            return;
        }

        users.push({
            name: name,
            email: email,
            password: password
        });

        localStorage.setItem("users", JSON.stringify(users));

        localStorage.setItem("currentUser", JSON.stringify({
            name: name,
            email: email
        }));

        showAuthMessage("Account created successfully! Redirecting...", "success");

        setTimeout(function () {
            window.location.href = "index.html";
        }, 1200);

    });

}

// ---- Login ----

let loginForm = document.getElementById("login-form");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        let email = document.getElementById("email").value.trim().toLowerCase();
        let password = document.getElementById("password").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        let matchedUser = users.find(function (user) {
            return user.email === email && user.password === password;
        });

        if (!matchedUser) {
            showAuthMessage("Invalid email or password", "error");
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify({
            name: matchedUser.name,
            email: matchedUser.email
        }));

        showAuthMessage("Login successful! Redirecting...", "success");

        setTimeout(function () {
            window.location.href = "index.html";
        }, 1000);

    });

}

// ---- Shared message helper ----

function showAuthMessage(message, type) {

    let msgBox = document.getElementById("auth-message");

    if (!msgBox) return;

    msgBox.textContent = message;
    msgBox.className = "auth-message " + type;

}
