/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, prevRoll;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){

    if(gamePlaying)
    {
        // Random Number Generator
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        //console.log(dice1, dice2);
        // Display The result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-'+dice1+'.png';
        document.getElementById('dice-2').src = 'dice-'+dice2+'.png';

        if(dice1 !== 1 && dice2!==1) 
        {
            roundScore += dice1+dice2;
            document.getElementById('current-'+activePlayer).textContent = roundScore;        
        }else
        {
           // scores[activePlayer] = 0;
            //document.getElementById('score-'+activePlayer).textContent = '0';
        
            nextPlayer();
        }

       /* if(prevRoll === 6 && dice ===6)
        {
            scores[activePlayer] = 0;
            document.getElementById('score-'+activePlayer).textContent = '0';
        
            nextPlayer();                    
        }else if(dice ===1)
        {
            nextPlayer();
        }else
        {
            roundScore += dice;
            document.getElementById('current-'+activePlayer).textContent = roundScore;
            prevRoll = dice;
        }*/
    } 
});

document.querySelector('.btn-hold').addEventListener('click', function()
{
    if(gamePlaying)
    {
        scores[activePlayer] += roundScore;
    
        document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];

       // prevRoll = 0;

        var winscore = document.querySelector('.final-score').value;
        if(!winscore)
        {
            winscore = 100;    
        }
        if(scores[activePlayer]>=winscore)
        {
            document.querySelector('#name-'+activePlayer).textContent = 'WINNER :)';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            gamePlaying = false;
        }else
        {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer()
{
    activePlayer = activePlayer === 0 ? 1 : 0 ;
    roundScore = 0;
        
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
        
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

function init()
{
    gamePlaying = true;
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    prevRoll=0;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}