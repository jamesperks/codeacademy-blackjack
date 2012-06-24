// Card Constructor
function Card(numSuit,numValue){
    var suit = numSuit;
    var value = numValue;
    this.getSuit = function(){
        return suit;
    };
    this.getNumber = function(){
        return value;
    };
    this.getValue = function(){
        if (value > 10){
            return 10;
        }
        else if(value === 1){
            return 11;
        }
        else {
            return value;
        }
    };
}

function Hand(playerName){
    var cards = [];
    cards[0] = deal();
    cards[1] = deal();
    var player = playerName;
    this.getHand = function(){
        return cards;
    };
    this.score = function(){
        var x = cards.length;
        var aces = 0;
        var sum = 0;
        for(i=0; i<x;i++){
            sum += cards[i].getValue();
            if (cards[i].getValue()===11){
                aces++;    
            }
        }
        while(sum>21 && aces!==0){
            sum -=10;
            aces --;
        }
        return sum;
    };

    this.printHand = function(){
        var x = cards.length;
        var cardSuit = ["clubs","diamonds","hearts","spades"];
        var cardValue = ["Ace",2,3,4,5,6,7,8,9,10,"Jack","Queen","King"];
        var curHand = player+"'s hand: ";
        for (i=0;i<x;i++){
            curHand = curHand + cardValue[cards[i].getNumber()-1] +" of "+ cardSuit[cards[i].getSuit()-1]+", ";
        }
        curHand = curHand + "for a score of " + this.score();
        return curHand;
    };
    this.hitMe = function(){
        newCard = deal();
        cards.push(newCard);
    };
}

function deal(){
    var randomSuit = Math.floor(Math.random()*4+1);
    var randomValue = Math.floor(Math.random()*13+1);
    return new Card(randomSuit,randomValue);
}

function playAsDealer(){
    var dealerHand = new Hand("Dealer");
    while(dealerHand.score()<17){
        dealerHand.hitMe();
    }
    //console.log(dealerHand.printHand());
    return dealerHand;
}

function playAsPlayer(){
    var playerHand = new Hand("Player");
    var decision = confirm( playerHand.printHand() + ". Hit?");
    while(decision){
        playerHand.hitMe();
        decision = confirm( playerHand.printHand() + ". Hit?");
    }
    //console.log(playerHand.printHand());
    return playerHand;
}

function declareWinner(userHand,dealerHand){
    var userScore = userHand.score();
    var dealerScore = dealerHand.score();
    //console.log(userScore +" "+dealerScore);
    if (userScore>21){
        if (dealerScore>21){
            return "You tied!";
        } else {
            return "You lose!";
        }
    }
    else if(dealerScore>21){
        return "You win!";
    }
    else if(userScore>dealerScore){
        return "You win!";
    }
    else if(userScore===dealerScore){
        return "You tied!";
    }
    else {
        return "You lose";
    }
}
