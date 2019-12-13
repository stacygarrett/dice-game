/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, dice, gamePlaying;
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
 
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;    
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
    hideDice();
}

function basicGameReset() {
    document.querySelector('.dice').style.top = '178px';
    document.getElementById('inputbox').style.display = 'none';
    document.getElementById('submitbtn').style.display = 'none';
    document.querySelector('.btn-roll').style.top = '410px';
    document.querySelector('.btn-hold').style.top = '460px';
}

basicGameReset();

function hideDice() {
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

hideDice();

document.querySelector('.btn-roll').addEventListener('click', buttonRoll);

// Roll Button Function
function buttonRoll() {
    if(gamePlaying) {
        dice = Math.ceil(Math.random() * 6);
        currentRoll = dice;
    // Display the result
    let diceImage = document.querySelector('.dice');
    diceImage.style.display = 'block';
    diceImage = `dice-${dice}.png`;
    document.querySelector('.dice').setAttribute('src', diceImage);
    // Update the roundScore IF the rolled number is NOT a 1
   if (dice!== 1) {
       //add score
       document.querySelector(`#current-${activePlayer}`).textContent = roundScore + currentRoll;
        roundScore += dice;
   } else { // if the score IS 1
    // Next player
    nextPlayer();
   }
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
        setTimeout(hideDice, 800);
    }

// Hold Button Function
document.querySelector('.btn-hold').addEventListener('click', function () {
        if (gamePlaying) {
            // Add CURRENT SCORE to the GLOBAL SCORE
            scores[activePlayer] += roundScore;
            // Update the UI
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            // Check if player won game
            if (scores[activePlayer] >= 100) {
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

// document.getElementsByClassName('btn-original').addEventListener

// function loadJS() {
//     if (game.src = 'app.js') {
//         // game.src = 'challenge.js';
//         game.getAttribute('src', 'challenge.js');
//     // } else game.src = 'app.js';
//     } else {
//         game.getAttribute('src', 'app.js');
// }
// }

// originalBtn.addEventListener('click', function() {
//     window.script.location.pathname = 'app.js'
// });

// modifiedBtn.addEventListener('click', function() {
//     window.script.location.pathname = 'challenge.js'
// });

modifiedBtn.addEventListener('click', function () {
    window.location.href = 'index2.html';
});
originalBtn.addEventListener('click', function () {
    window.location.href = 'index.html';
});

// function include(){
//     if(script == "on"){
//        let head = document.getElementsByTagName('head')[0];
  
//        script = document.createElement('script');
//        script.src = 'challenge.js';
//        script.type = "text/javascript";
//        script.id = "modified";
  
//        head.appendChild(script);
//        body.removeChild(script);

//     }else{
//       (src=document.getElementById("default")).parentNode.removeChild(src)
//     }
//   }
//   include();

//   function removejsfile(filename, filetype){
//     var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
//     var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
//     var allsuspects=document.getElementsByTagName(targetelement)
//     for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
//     if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
//         allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
//     }
// }
 
// removejscssfile("somescript.js", "js") //remove all occurences of "somescript.js" on page
// removejscssfile("somestyle.css", "css") //remove all occurences "somestyle.css" on page