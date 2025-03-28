// Get references to HTML elements
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const newGameButton = document.getElementById('new-game-button');
const message = document.getElementById('message');
const history = document.getElementById('history');
const menuScreen = document.getElementById('menu-screen');
const gameArea = document.querySelector('.game-area');


// Game variables
let targetNumber;
let guessCount;
let gameActive;
let maxRange;

// Load the menu
function initMenu() {
    menuScreen.style.display = 'block';
    message.style.display = 'none';
    gameArea.style.display = 'none';
    history.style.display = 'none';
}

// Initialize the game
function initGame(difficulty) {
    menuScreen.style.display = 'none';
    message.style.display = 'block';
    gameArea.style.display = 'block';
    history.style.display = 'block';

    switch(difficulty) {
        case 'easy':
            maxRange = 20;
            break;
        case 'medium':
            maxRange = 100;
            break;
        case 'hard':
            maxRange = 1000;
            break;
        default:
            maxRange = 100;
    }
    
    guessInput.setAttribute('max', maxRange);
    document.getElementById('max-range').textContent = maxRange;

    targetNumber = Math.floor(Math.random() * maxRange) + 1; // Random number between 1-maxRange
    guessCount = 0;
    gameActive = true;
    message.textContent = `I'm thinking of a number between 1 and ${maxRange}!`;
    message.style.color = "black";
    history.innerHTML = ""; // Clear history
    guessInput.value = ""; // Clear input
    guessInput.focus(); // Focus on the input field
    console.log("Game initialized. Target number:", targetNumber); // For debugging
}

// Handle guess submission
function handleGuess() {
    if (!gameActive) {
        message.textContent = "Please start a new game first!";
        return;
    }

    const userGuess = parseInt(guessInput.value);
    
    // Validate input
    if (isNaN(userGuess) || userGuess < 1 || userGuess > maxRange) {
        message.textContent = `Please enter a valid number between 1 and ${maxRange}.`;
        message.style.color = "red";
        return;
    }

    guessCount++;
    
    // Add to history
    const historyEntry = document.createElement('p');
    historyEntry.textContent = `Guess #${guessCount}: ${userGuess}`;
    history.prepend(historyEntry);

    // Check guess
    if (userGuess === targetNumber) {
        message.textContent = `Congratulations! You guessed the number in ${guessCount} tries!`;
        message.style.color = "green";
        gameActive = false;
    } else if (userGuess < targetNumber) {
        message.textContent = "Too low! Try a higher number.";
        message.style.color = "blue";
    } else {
        message.textContent = "Too high! Try a lower number.";
        message.style.color = "blue";
    }

    // Clear input and focus
    guessInput.value = "";
    guessInput.focus();
}

// Event listeners
guessButton.addEventListener('click', handleGuess);
newGameButton.addEventListener('click', initMenu);

// Allow pressing Enter to submit guess
guessInput.addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
        handleGuess();
    }
});

// Initialize game when page loads
window.onload = initMenu();