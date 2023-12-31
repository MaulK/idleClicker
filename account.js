function formatNumberWithSuffix(number) {
  const suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Si', 'Sp', 'Oc', 'N', 'Dc', 'Un', 'Duo', 'Tre', 'Qua', 'Qui', 'SE', 'SP', 'OC', 'NV', 'VIG', 'CE', 'TRV', 'QTU', 'SPZ', 'CJX', 'XQR', 'VNU', 'YZQ', 'KVZ', 'JZW', 'QZX', 'ZKL', 'HTZ', 'RXV', 'WZX', 'XVC', 'ZOL', 'LXS', 'YXZU', 'JXKZ', 'RTVX', 'ZHGX', 'QZQZ', 'VZVZ'];
  const tier = Math.floor(Math.log10(Math.abs(number)) / 3);
  const suffix = suffixes[tier];
  const scaledNumber = number / Math.pow(10, tier * 3);
  return scaledNumber.toFixed(2) + " " + suffix;
}

function loadAccountPage() {
  const currentUser = loadUserData();
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("username").innerText = currentUser.username;
  document.getElementById("points").innerText = formatNumberWithSuffix(currentUser.points);
  document.getElementById("autoClickerLevel").innerText = formatNumberWithSuffix(currentUser.autoClickerLevel);
  document.getElementById("autoClickerCost").innerText = formatNumberWithSuffix(currentUser.autoClickerCost);
  document.getElementById("coins").innerText = formatNumberWithSuffix(currentUser.coins);
  document.getElementById("rebirths").innerText = formatNumberWithSuffix(currentUser.rebirths);
}

// Function to load user account data from local storage
function loadUserData() {
  return JSON.parse(localStorage.getItem("userData")) || {};
}

// Function to save user account data to local storage
function saveUserData(userData) {
  localStorage.setItem("userData", JSON.stringify(userData));
}


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
