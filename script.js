const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard      = false;
let fistCard,secondCard;

function flipCard(){
    if(lockBoard)return;
    if(this ===fistCard)return;


    this.classList.toggle('flip')

    if(!hasFlippedCard){
        hasFlippedCard = true;
        fistCard = this;
        return
    }
    hasFlippedCard = false;
    secondCard = this; 

    checkForMatch();
    
}
function checkForMatch(){
    let isMatch  = fistCard.dataset.framework === 
    secondCard.dataset.framework;
    isMatch?disableCards():unflipCards();
}
function disableCards(){
    fistCard.removeEventListener('click',flipCard);
    secondCard.removeEventListener('click',flipCard);

    resetBoard()
}
function unflipCards(){
    lockBoard = true;
    setTimeout(()=>{
        fistCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;

        resetBoard()
    },1500)
}
function resetBoard(){
    [hasFlippedCard,lockBoard] = [false,false];
    [fistCard,secondCard] = [null,null]
}

(function shuffle(){
    cards.forEach(card=>{
        let randomPos  = Math.floor(Math.random()*12)
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click',flipCard))