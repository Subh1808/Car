let car = document.getElementById("car");
let obstacles = document.querySelectorAll(".obstacle");
let scoreElement = document.getElementById("score");
let score = 0;
let gameSpeed = 1;
let carPosition = 220;
let gameOver = false;

// Move the car left and right using arrow keys
document.addEventListener("keydown", function(e) {
    if (gameOver) return; // Prevent movement after game over

    if (e.key === "ArrowLeft" && carPosition > 0) {
        carPosition -= 10;
    } else if (e.key === "ArrowRight" && carPosition < 440) {
        carPosition += 10;
    }
    car.style.left = carPosition + "px";
});

// Move the car left
document.getElementById("left-btn").addEventListener("click", function() {
    if (gameOver) return; // Prevent movement after game over

    if (carPosition > 0) {
        carPosition -= 10;
        car.style.left = carPosition + "px";
    }
});

// Move the car right
document.getElementById("right-btn").addEventListener("click", function() {
    if (gameOver) return; // Prevent movement after game over

    if (carPosition < 440) {
        carPosition += 10;
        car.style.left = carPosition + "px";
    }
});

// Move obstacles and check for collisions
function moveObstacles() {
    obstacles.forEach(function(obstacle) {
        let obstacleTop = parseInt(window.getComputedStyle(obstacle).top);

        // Reset obstacle when it goes off-screen
        if (obstacleTop > 700) {
            obstacle.style.top = "-50px";
            obstacle.style.left = Math.random() * 450 + "px";  // Randomly position obstacle
            score += 10;
            scoreElement.innerText = "Score: " + score;
        } else {
            obstacle.style.top = obstacleTop + gameSpeed + "px";
        }

        // Check for collision
        if (
            obstacleTop + 50 > 650 &&
            obstacleTop < 700 &&
            parseInt(obstacle.style.left) < carPosition + 60 &&
            parseInt(obstacle.style.left) + 50 > carPosition
        ) {
            gameOver = true;
            document.getElementById("final-score").innerText = score;
            document.getElementById("game-over").style.display = "block";
        }
    });
}

// Reset the gamea
function resetGame() {
    score = 0;
    scoreElement.innerText = "Score: 0";
    carPosition = 220;
    car.style.left = carPosition + "px";
    gameOver = false;
    document.getElementById("game-over").style.display = "none";

    // Reset obstacles positions
    obstacles.forEach(function(obstacle) {
        obstacle.style.top = "-50px";  // Reset obstacles to start position
        obstacle.style.animation = "none";  // Stop animations
        obstacle.offsetHeight;  // Trigger a reflow to reset animations
        obstacle.style.animation = "fall 2s linear infinite"; // Restart animations
    });

    // Restart the game loop
    gameLoop();
}

// Restart button functionality
document.getElementById("restart-btn").addEventListener("click", resetGame);

// Game loop
function gameLoop() {
    if (!gameOver) {
        moveObstacles();
        requestAnimationFrame(gameLoop);
    }
}

// Start the game loop initially
gameLoop();