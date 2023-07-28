// Function to load user account data from local storage
function loadUserData() {
  return JSON.parse(localStorage.getItem("userData")) || {
    points: 0,
    autoClickerLevel: 0,
    autoClickerCost: 10,
    coins: 0,
    rebirths: 0 // Initialize rebirths to 0 for new users
  };
}

// Function to save user account data to local storage
function saveUserData(userData) {
  localStorage.setItem("userData", JSON.stringify(userData));
}

function loadAccountPage() {
  const currentUser = loadUserData();
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("username").innerText = currentUser.username;
  document.getElementById("points").innerText = currentUser.points;
  document.getElementById("autoClickerLevel").innerText = currentUser.autoClickerLevel;
  document.getElementById("autoClickerCost").innerText = currentUser.autoClickerCost;
  document.getElementById("coins").innerText = currentUser.coins;
  document.getElementById("rebirths").innerText = currentUser.rebirths;
}

function clickPoint() {
  let userData = loadUserData();
  if (userData) {
    userData.points += 1;
    saveUserData(userData);
    loadAccountPage();
  }
}

function buyAutoClicker() {
  let userData = loadUserData();
  if (userData && userData.points >= userData.autoClickerCost) {
    userData.points -= userData.autoClickerCost;
    userData.autoClickerLevel += 1;
    userData.autoClickerCost *= 2;
    saveUserData(userData);
    loadAccountPage();
  }
}

window.onload = loadAccountPage;
