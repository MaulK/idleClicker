let points = 0;
let autoClickerLevel = 0;
let autoClickerCost = 10;
let autoClickerInterval;
let coins = 0;
let rebirths = 0;
const REBIRTH_CLICKS_REQUIRED = 100000;

function updatePointsDisplay() {
    document.getElementById("points").innerText = points;
}

function updateAutoClickerDisplay() {
    document.getElementById("autoClickerLevel").innerText = autoClickerLevel;
    document.getElementById("autoClickerCost").innerText = autoClickerCost;
}

function clickPoint() {
    points += 1;
    updatePointsDisplay();
}

function buyAutoClicker() {
    if (points >= autoClickerCost) {
        points -= autoClickerCost;
        autoClickerLevel += 1;
        autoClickerCost *= 2;
        updatePointsDisplay();
        updateAutoClickerDisplay();

        if (autoClickerLevel === 1) {
            autoClickerInterval = setInterval(function() {
                points += autoClickerLevel;
                updatePointsDisplay();
            }, 1000);
        }
    }
}

function checkAffordability() {
    if (points >= autoClickerCost) {
        document.getElementById("buyAutoClicker").disabled = false;
    } else {
        document.getElementById("buyAutoClicker").disabled = true;
    }
}

// Function to update the leaderboard with the latest scores
function displayLeaderboard() {
    const leaderboardTable = document.getElementById("leaderboardTable");
    leaderboardTable.innerHTML = `
      <tr>
        <th>Username</th>
        <th>Clicks</th>
        <th>Rebirths</th>
      </tr>
    `;

    // Fetch leaderboard data from local storage
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.sort((a, b) => b.clicks - a.clicks);

    leaderboard.slice(0, 10).forEach((entry, index) => {
        const row = document.createElement("tr");
        const usernameCell = document.createElement("td");
        const clicksCell = document.createElement("td");
        const rebirthsCell = document.createElement("td");

        usernameCell.innerText = entry.username;
        clicksCell.innerText = entry.clicks;
        rebirthsCell.innerText = entry.rebirths;

        row.appendChild(usernameCell);
        row.appendChild(clicksCell);
        row.appendChild(rebirthsCell);

        leaderboardTable.appendChild(row);
    });
}

// Function to handle rebirth
function rebirth() {
    if (points >= REBIRTH_CLICKS_REQUIRED) {
        points = 0;
        autoClickerLevel = 0;
        coins += 1;
        rebirths += 1;
        clearInterval(autoClickerInterval);
        updatePointsDisplay();
        updateAutoClickerDisplay();
        updateCoinsDisplay();
        updateRebirthsDisplay();
    }
}

// Function to update coins display
function updateCoinsDisplay() {
    document.getElementById("coins").innerText = coins;
}

// Function to update rebirths display
function updateRebirthsDisplay() {
    document.getElementById("rebirths").innerText = rebirths;
}

// Call the updateLeaderboard function when the leaderboard page loads
window.onload = function() {
    if (document.getElementById("leaderboard")) {
        displayLeaderboard();
    } else {
        updateTop10();
    }
};

function goToLogin() {
    window.location.href = "login.html";
}

// Function to go to the register page when the register button is clicked
function goToRegister() {
    window.location.href = "register.html";
}

// Call the checkAffordability function every 100 milliseconds to update button states
setInterval(checkAffordability, 100);
