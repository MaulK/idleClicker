let points = 0;
let autoClickerLevel = 0;
let autoClickerCost = 100;
let autoClickerInterval;
const MAX_LEADERBOARD_ENTRIES = 1000; // Set the maximum number of leaderboard entries to display

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
        autoClickerCost *= 100;
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
    const leaderboardList = document.getElementById("leaderboard");
    leaderboardList.innerHTML = "";

    // Fetch leaderboard data from local storage
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard.splice(MAX_LEADERBOARD_ENTRIES); // Limit the leaderboard entries to the max

    leaderboard.forEach((entry, index) => {
        const listItem = document.createElement("li");
        listItem.innerText = `#${index + 1}: Score: ${entry.score}`;
        leaderboardList.appendChild(listItem);
    });
}

// Function to update the top 10 scores on the main page
function updateTop10() {
    const top10List = document.getElementById("top10");
    top10List.innerHTML = "";

    // Fetch leaderboard data from local storage
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.sort((a, b) => b.score - a.score);
    const top10 = leaderboard.slice(0, 10); // Get the top 10 scores

    top10.forEach((entry, index) => {
        const listItem = document.createElement("li");
        listItem.innerText = `#${index + 1}: Score: ${entry.score}`;
        top10List.appendChild(listItem);
    });
}

// Call the updateLeaderboard function when the leaderboard page loads
window.onload = function() {
    if (document.getElementById("leaderboard")) {
        displayLeaderboard();
    } else {
        updateTop10();
    }
};

// Call the checkAffordability function every 100 milliseconds to update button states
setInterval(checkAffordability, 100);
