// YOUR 3 CHALLENGES
// Change the game to follow these rules:

// 1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
// 2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
// 3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
// */


let scores, roundScore, activePlayer, dice, gamePlaying, lastRoll, finalScoreDefault;
let Player1Score = document.getElementById('score-0');
let Player2Score = document.getElementById('score-1');
let Player1Current = document.getElementById('current-0');
let Player2Current = document.getElementById('current-1');
let Player1 = document.querySelector('div.player-0-panel');
let Player2 = document.querySelector('div.player-1-panel');
let originalBtn = document.querySelector('button.btn-original');
let modifiedBtn = document.querySelector('button.btn-modified');

init();

function init() {
    // window.script.location.pathname = 'challenge.js';
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    finalScoreDefault = 100;   
    Player1Current.textContent = '0';
    Player1Score.textContent = '0';
    Player2Score.textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('div.player-0-panel').classList.remove('winner');
    document.querySelector('div.player-1-panel').classList.remove('winner');
    document.querySelector('div.player-0-panel').classList.remove('active');
    document.querySelector('div.player-1-panel').classList.remove('active');
    document.querySelector('div.player-0-panel').classList.add('active');
    document.getElementById('submitbtn').style.display = 'block';  
    document.getElementById('inputbox').value = '';
    hideDice();
}

function hideDice() {
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

document.querySelector('.btn-roll').addEventListener('click', buttonRoll);

// Roll Button Function
function buttonRoll() {
    if(gamePlaying) {
        dice = Math.ceil(Math.random() * 6);
        dice2 = Math.ceil(Math.random() * 6);
        currentRoll = dice + dice2;
    // Display the result
    let diceImage = document.querySelector('.dice');
    let diceImage2 = document.querySelector('.dice2');
    diceImage.style.display = 'block';
    diceImage2.style.display = 'block';
    diceImage = `dice-${dice}.png`;
    diceImage2 = `dice-${dice2}.png`;
    document.querySelector('.dice').setAttribute('src', diceImage);
    document.querySelector('.dice2').setAttribute('src', diceImage2);
    // Update the roundScore IF the rolled number is NOT a 1
    if (dice === 6 && dice2 == 6) {
        // scores[activePlayer] = 0;
       document.getElementsByName(`score-${activePlayer}`).textContent = '0';
    //    lastRoll = -1;
       nextPlayer();     
    } else if (dice !== 1 && dice2 !== 1) {
           //add score
           let activePlayerCurrent = document.querySelector(`#current-${activePlayer}`)
       activePlayerCurrent.textContent = roundScore + currentRoll;
       roundScore += (dice + dice2);
    //    lastRoll = dice;
       // if the score is 6 twice in a row...
    } else { // if the score IS 1
    // Next player
    // lastRoll = -1;
    nextPlayer();
   }
//    lastRoll = dice;
   console.log(dice, dice2)
   console.log(roundScore);
}
};


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    Player1Current.textContent = '0';
    Player2Current.textContent = '0';
    playerTurn();
}

function playerTurn() {
    Player1.classList.toggle('active');
    Player2.classList.toggle('active');
        // hideDice();
        setTimeout(hideDice, 500);
    }

// Hold Button Function
document.querySelector('.btn-hold').addEventListener('click', function () {
        if (gamePlaying) {
            // Add CURRENT SCORE to the GLOBAL SCORE
            scores[activePlayer] += roundScore;
            // Update the UI
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
            // Check if player won game
            if (scores[activePlayer] >= finalScoreDefault) {
                document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
                document.querySelector('div.player-' + activePlayer + '-panel').classList.add('winner');
                document.querySelector('div.player-' + activePlayer + '-panel').classList.remove('active');
                gamePlaying = false;
                hideDice();
            } else { // Next player
                nextPlayer();
            }
            document.querySelector('#current-' + activePlayer).textContent = '0';;
        }
    }
);

document.querySelector('.btn-new').addEventListener('click', init);

// Input Box to change Final Score

function finalScoreInput() {
    let inputBox = document.querySelector('input.final-score').value;
    if (inputBox <= 5000 && inputBox > 100) {
        finalScoreDefault = inputBox;
        } else if (typeof inputBox === 'string') {
            alert('Please enter a number between 1 - 5000');
        } else {
        finalScoreDefault;
    }
    document.getElementById('submitbtn').style.display = 'none';  
    console.log(inputBox);
}

let btnSubmit = document.getElementById('submitbtn');
btnSubmit.addEventListener('click', finalScoreInput);

document.querySelector('input.final-score').addEventListener('keyup', function(event) {
    event.preventDefault();      
    if (event.keyCode === 13) {
      finalScoreInput();    
      document.getElementById('submitbtn').style.display = 'none';  
    }
  });


  modifiedBtn.addEventListener('click', function () {
    window.location.href = 'index2.html';
});
originalBtn.addEventListener('click', function () {
    window.location.href = 'index.html';
});