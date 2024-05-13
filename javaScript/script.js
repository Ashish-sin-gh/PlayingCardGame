let deckId = '';

fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => res.json())
    .then(data =>{
        console.log(data);

        //keep the deckID always same - play with one deck
        if(!localStorage.getItem('deckID')){
            localStorage.setItem('deckID', data.deck_id);
        }
        deckId = localStorage.getItem('deckID');
    })
    .catch(err => console.log('error', err));
    
//draw 2 card
document.querySelector('button').addEventListener('click', drawTwoCards);

function drawTwoCards(){
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(document.getElementById('player1Img1').style.display === 'none'){
                document.getElementById('player1Img1').style.display = 'block';
            }
            if(document.getElementById('player2Img1').style.display === 'none'){
                document.getElementById('player2Img1s').style.display = 'block'
            }

            document.querySelector('#player1Img2').style.display === 'none'
            document.querySelector('#player2Img2').style.display === 'none'

            document.getElementById('player1Img1').src = data.cards[0].image;
            document.getElementById('player2Img1').src = data.cards[1].image;

            let player1value = Number(cardStringToNum(data.cards[0].value));
            let player2value = Number(cardStringToNum(data.cards[1].value));

            if(player1value > player2value){
                document.querySelector('h2').innerText = 'Player 1 Wins';
                document.querySelector('h2').style.display = 'block';
            }else if(player1value < player2value){
                document.querySelector('h2').innerText = 'Player 2 Wins';
                document.querySelector('h2').style.display = 'block';
            } else{
                document.querySelector('h2').innerText = 'match draw';
                document.querySelector('h2').style.display = 'block';
            }
        })
        .catch(err => console.log('error' + err));
}

function cardStringToNum(cardVal){
    if(cardVal === 'ACE'){
        return 14; 
    } else if(cardVal === 'KING'){
        return 13;
    } else if(cardVal === 'QUEEN'){
        return 12;
    } else if(cardVal === 'JACK'){
        return 11;
    } else {
        return cardVal;
    }
}


//clear and bring new deck
document.querySelector('#button-container > button + button').addEventListener('click', clearDeck);

function clearDeck(){
    localStorage.clear();
    fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        localStorage.setItem('deckID', data.deck_id);
        deckId = localStorage.getItem('deckID');
    })
    .catch(err => console.log('error', err));
}