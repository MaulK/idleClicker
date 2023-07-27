function loginUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "account.html";
        return false; // Prevent form submission
    } else {
        alert("Invalid username or password.");
        return false; // Prevent form submission
    }
}

function registerUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        alert("Username already exists. Please choose a different username.");
        return false; // Prevent form submission
    } else {
        users.push({ username, password, points: 0, autoClickerLevel: 0, autoClickerCost: 10 });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registration successful. Please login with your new account.");
        window.location.href = "login.html";
        return false; // Prevent form submission
    }
}