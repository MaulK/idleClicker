function loadAccountPage() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    document.getElementById("username").innerText = currentUser.username;
    document.getElementById("points").innerText = currentUser.points;
    document.getElementById("autoClickerLevel").innerText = currentUser.autoClickerLevel;
    document.getElementById("autoClickerCost").innerText = currentUser.autoClickerCost;
}

function clickPoint() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
        currentUser.points += 1;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        loadAccountPage();
    }
}

function buyAutoClicker() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && currentUser.points >= currentUser.autoClickerCost) {
        currentUser.points -= currentUser.autoClickerCost;
        currentUser.autoClickerLevel += 1;
        currentUser.autoClickerCost *= 2;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        loadAccountPage();
    }
}

window.onload = loadAccountPage;